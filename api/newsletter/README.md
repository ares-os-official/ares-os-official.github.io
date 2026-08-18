# ARES OS Newsletter API

Standalone Cloudflare Worker + D1 database that powers the newsletter
subscription form on the ARES OS website. The website itself keeps
deploying to GitHub Pages unchanged — this Worker is a separate service
the frontend calls over `fetch()`.

## 1. Prerequisites

- A Cloudflare account (already have one ✅)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed and logged in:
  ```
  npm install -g wrangler
  wrangler login
  ```

## 2. Create the D1 database

```
cd api/newsletter
wrangler d1 create ares-newsletter-db
```

This prints a `database_id`. Copy it into `wrangler.toml`, replacing
`REPLACE_WITH_YOUR_D1_DATABASE_ID`.

## 3. Apply the schema

```
wrangler d1 execute ares-newsletter-db --remote --file=./schema.sql
```

## 4. Set secrets

None of these are committed to the repo. Set them interactively:

```
wrangler secret put ADMIN_USER
wrangler secret put ADMIN_PASSWORD
wrangler secret put IP_HASH_SALT
```

- `ADMIN_USER` / `ADMIN_PASSWORD` — credentials for the `/admin` page (HTTP Basic Auth). Pick a strong, unique password.
- `IP_HASH_SALT` — any long random string (e.g. `openssl rand -hex 32`). Used only to hash IPs for abuse-rate tracking; the raw IP is never stored.

## 5. Deploy

```
wrangler deploy
```

Wrangler prints the Worker's URL, e.g.:
`https://ares-newsletter-api.<your-subdomain>.workers.dev`

## 6. Point the frontend at the Worker

In `js/newsletter.js` (site root), set:

```js
const NEWSLETTER_API_URL = "https://ares-newsletter-api.<your-subdomain>.workers.dev";
```

Commit and push — GitHub Pages redeploys the static site as usual; no
change to GitHub Pages settings is required.

## Endpoints

| Method | Path                      | Auth        | Purpose                        |
|--------|---------------------------|-------------|---------------------------------|
| POST   | `/subscribe`               | none (rate-limited) | Add an email to the list |
| GET    | `/admin`                   | Basic Auth  | HTML subscriber list           |
| GET    | `/admin/subscribers.json`  | Basic Auth  | Same data as JSON              |

`/subscribe` only accepts requests with an `Origin` header matching
`ALLOWED_ORIGIN` in `wrangler.toml` (the GitHub Pages origin). There is
no public endpoint that lists subscribers.

## Notes / limitations

- Rate limiting is a simple D1-backed window (5 requests / 15 min per
  hashed IP) — sufficient to blunt basic abuse, not a substitute for
  Cloudflare's dashboard-level WAF/rate-limiting rules if you want more.
- No transactional/marketing email sending is included — this only
  collects and stores addresses, per the task scope.
- `submission_log` will grow over time. It's small (one row per
  attempt) but if you want it trimmed periodically, a scheduled Worker
  Cron Trigger deleting rows older than a day would be a safe additive
  change later.
