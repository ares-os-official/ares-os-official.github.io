/**
 * ARES OS Newsletter API
 * Standalone Cloudflare Worker + D1. Deployed separately from the static
 * GitHub Pages site — the site calls this Worker's URL over fetch().
 *
 * Routes:
 *   POST /subscribe      — public, rate-limited, adds an email to D1
 *   GET  /admin           — HTML subscriber list, HTTP Basic Auth required
 *   GET  /admin/subscribers.json — same data as JSON, HTTP Basic Auth required
 *
 * Required bindings/secrets (see ../README.md for setup commands):
 *   DB              (D1 database binding)
 *   ADMIN_USER      (secret)
 *   ADMIN_PASSWORD  (secret)
 *   IP_HASH_SALT    (secret)
 *   ALLOWED_ORIGIN  (var — e.g. https://ares-os-official.github.io)
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MINUTES = 15;
const RATE_LIMIT_MAX_REQUESTS = 5;
const ADMIN_PAGE_SIZE = 200;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    try {
      if (request.method === "OPTIONS" && url.pathname === "/subscribe") {
        return handlePreflight(request, env);
      }
      if (request.method === "POST" && url.pathname === "/subscribe") {
        return await handleSubscribe(request, env);
      }
      if (request.method === "GET" && url.pathname === "/admin") {
        return await handleAdminPage(request, env);
      }
      if (request.method === "GET" && url.pathname === "/admin/subscribers.json") {
        return await handleAdminJson(request, env);
      }
      return new Response("Not found", { status: 404 });
    } catch (err) {
      // Never leak internals to the client.
      console.error("Unhandled error:", err && err.message ? err.message : err);
      return jsonResponse({ error: "Internal error. Please try again later." }, 500, corsHeaders(request, env));
    }
  },
};

// ---------------------------------------------------------------------------
// /subscribe
// ---------------------------------------------------------------------------

async function handleSubscribe(request, env) {
  const headers = corsHeaders(request, env);

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid request." }, 400, headers);
  }

  // Honeypot: hidden field bots tend to fill in. Real users never see it.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    // Pretend success so bots don't learn the field is a trap.
    return jsonResponse({ ok: true }, 200, headers);
  }

  const rawEmail = typeof body.email === "string" ? body.email : "";
  const email = rawEmail.trim().toLowerCase();

  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return jsonResponse({ error: "Please enter a valid email address." }, 400, headers);
  }

  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const ipHash = await sha256Hex(ip + ":" + env.IP_HASH_SALT);

  const limited = await isRateLimited(env, ipHash);
  if (limited) {
    return jsonResponse(
      { error: "Too many attempts. Please try again later." },
      429,
      headers
    );
  }
  await logSubmissionAttempt(env, ipHash);

  try {
    await env.DB.prepare(
      "INSERT INTO subscribers (email, status) VALUES (?, 'active')"
    )
      .bind(email)
      .run();
    return jsonResponse({ ok: true }, 201, headers);
  } catch (err) {
    // D1 raises a constraint error for duplicate emails.
    const message = err && err.message ? err.message : "";
    if (message.includes("UNIQUE")) {
      // Treat as a soft success so the UI can show a friendly
      // "you're already subscribed" message without confirming
      // or denying the email's presence to a third party.
      return jsonResponse({ ok: true, alreadySubscribed: true }, 200, headers);
    }
    console.error("DB insert error:", message);
    return jsonResponse({ error: "Could not save your subscription. Please try again." }, 500, headers);
  }
}

async function isRateLimited(env, ipHash) {
  const row = await env.DB.prepare(
    `SELECT COUNT(*) AS n FROM submission_log
     WHERE ip_hash = ? AND created_at >= datetime('now', ?)`
  )
    .bind(ipHash, `-${RATE_LIMIT_WINDOW_MINUTES} minutes`)
    .first();
  return (row?.n ?? 0) >= RATE_LIMIT_MAX_REQUESTS;
}

async function logSubmissionAttempt(env, ipHash) {
  await env.DB.prepare("INSERT INTO submission_log (ip_hash) VALUES (?)")
    .bind(ipHash)
    .run();
}

// ---------------------------------------------------------------------------
// /admin
// ---------------------------------------------------------------------------

async function handleAdminPage(request, env) {
  const authError = checkBasicAuth(request, env);
  if (authError) return authError;

  const { results } = await env.DB.prepare(
    `SELECT email, subscribed_at, status FROM subscribers
     ORDER BY subscribed_at DESC LIMIT ?`
  )
    .bind(ADMIN_PAGE_SIZE)
    .all();

  const countRow = await env.DB.prepare(
    "SELECT COUNT(*) AS n FROM subscribers WHERE status = 'active'"
  ).first();
  const totalActive = countRow?.n ?? 0;

  const rows = results
    .map(
      (r) => `
        <tr>
          <td>${escapeHtml(r.email)}</td>
          <td>${escapeHtml(r.subscribed_at)}</td>
          <td>${escapeHtml(r.status)}</td>
        </tr>`
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>ARES OS — Newsletter Subscribers</title>
<meta name="robots" content="noindex, nofollow">
<style>
  body { background:#0a0203; color:#F5F7FA; font-family:system-ui,sans-serif; padding:2rem; }
  h1 { color:#ff1a40; }
  table { border-collapse: collapse; width:100%; margin-top:1rem; }
  th, td { border:1px solid #2b0a11; padding:0.5rem 0.75rem; text-align:left; font-size:0.9rem; }
  th { background:#140305; }
  .count { color:#BFC7D5; margin-bottom:1rem; }
</style>
</head>
<body>
  <h1>ARES OS Newsletter Subscribers</h1>
  <p class="count">Active subscribers: ${totalActive} (showing latest ${results.length}, max ${ADMIN_PAGE_SIZE})</p>
  <table>
    <thead><tr><th>Email</th><th>Subscribed at (UTC)</th><th>Status</th></tr></thead>
    <tbody>${rows || '<tr><td colspan="3">No subscribers yet.</td></tr>'}</tbody>
  </table>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=UTF-8" },
  });
}

async function handleAdminJson(request, env) {
  const authError = checkBasicAuth(request, env);
  if (authError) return authError;

  const { results } = await env.DB.prepare(
    `SELECT email, subscribed_at, status FROM subscribers
     ORDER BY subscribed_at DESC LIMIT ?`
  )
    .bind(ADMIN_PAGE_SIZE)
    .all();

  return jsonResponse({ subscribers: results }, 200, {
    "Content-Type": "application/json",
  });
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function checkBasicAuth(request, env) {
  const authHeader = request.headers.get("Authorization") || "";
  const unauthorized = () =>
    new Response("Authentication required.", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="ARES OS Admin"' },
    });

  if (!authHeader.startsWith("Basic ")) return unauthorized();

  let decoded;
  try {
    decoded = atob(authHeader.slice(6));
  } catch {
    return unauthorized();
  }

  const sepIndex = decoded.indexOf(":");
  if (sepIndex === -1) return unauthorized();

  const user = decoded.slice(0, sepIndex);
  const pass = decoded.slice(sepIndex + 1);

  const userOk = timingSafeEqual(user, env.ADMIN_USER || "");
  const passOk = timingSafeEqual(pass, env.ADMIN_PASSWORD || "");

  if (!userOk || !passOk) return unauthorized();
  return null;
}

function timingSafeEqual(a, b) {
  const enc = new TextEncoder();
  const aBytes = enc.encode(a);
  const bBytes = enc.encode(b);
  if (aBytes.length !== bBytes.length) {
    // Still compare something to avoid a length-based timing signal
    // being trivially distinguishable from a mismatch.
    let dummy = 0;
    for (let i = 0; i < aBytes.length; i++) dummy |= aBytes[i];
    return false;
  }
  let diff = 0;
  for (let i = 0; i < aBytes.length; i++) diff |= aBytes[i] ^ bBytes[i];
  return diff === 0;
}

async function sha256Hex(input) {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function corsHeaders(request, env) {
  const origin = request.headers.get("Origin");
  const headers = { "Content-Type": "application/json" };
  if (origin && env.ALLOWED_ORIGIN && origin === env.ALLOWED_ORIGIN) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Methods"] = "POST, OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Content-Type";
    headers["Vary"] = "Origin";
  }
  return headers;
}

function handlePreflight(request, env) {
  return new Response(null, { status: 204, headers: corsHeaders(request, env) });
}

function jsonResponse(obj, status, headers) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}
