document.addEventListener("DOMContentLoaded", () => {
  const newsletterForm = document.getElementById("newsletter-form");
  const emailInput = document.getElementById("newsletter-email");
  const statusMsg = document.getElementById("newsletter-status");

  if (!newsletterForm) return;

  // Formato email standard: funziona per Gmail, Hotmail, Outlook, Yahoo,
  // PEC e qualsiasi altro provider valido, senza bisogno di regole specifiche.
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  // Domini di email temporanee/usa-e-getta più diffusi (incluso temp-mail.org
  // e i suoi alias noti). Non è una lista esaustiva - nuovi servizi nascono
  // di continuo - ma copre i casi più comuni.
  const DISPOSABLE_DOMAINS = new Set([
    "temp-mail.org", "tempmail.com", "tempmail.net", "tempmailo.com",
    "tempmailaddress.com", "temp-mail.io", "tempail.com", "tmpmail.net",
    "tmpmail.org", "10minutemail.com", "10minutemail.net", "20minutemail.com",
    "mailinator.com", "mailinator.net", "mailinator.org", "guerrillamail.com",
    "guerrillamail.net", "guerrillamail.org", "guerrillamail.biz",
    "sharklasers.com", "grr.la", "yopmail.com", "yopmail.net", "yopmail.fr",
    "throwawaymail.com", "dispostable.com", "fakeinbox.com", "getnada.com",
    "getairmail.com", "moakt.com", "moakt.cc", "emailondeck.com",
    "maildrop.cc", "trashmail.com", "trashmail.net", "mintemail.com",
    "mohmal.com", "mytemp.email", "spamgourmet.com", "dropmail.me",
    "burnermail.io", "mailnesia.com", "mailcatch.com", "spambog.com",
    "inboxkitten.com", "emailfake.com", "fakemailgenerator.com",
    "crazymailing.com", "correotemporal.org", "discardmail.com",
    "harakirimail.com", "jetable.org", "mailexpire.com", "mailnull.com",
    "spam4.me", "tempinbox.com", "0-mail.com", "1secmail.com",
    "1secmail.net", "1secmail.org", "nada.email", "luxusmail.org",
  ]);

  function isDisposableEmail(email) {
    const domain = email.split("@")[1]?.toLowerCase().trim();
    return domain ? DISPOSABLE_DOMAINS.has(domain) : false;
  }

  newsletterForm.addEventListener("submit", async (e) => {
    // FONDAMENTALE: Ferma il comportamento di default del form (reload della pagina)
    e.preventDefault();

    const email = emailInput ? emailInput.value.trim().toLowerCase() : "";

    if (!email || !EMAIL_RE.test(email)) {
      if (statusMsg) statusMsg.textContent = "Inserisci un indirizzo email valido.";
      return;
    }

    if (isDisposableEmail(email)) {
      if (statusMsg) statusMsg.textContent = "Non sono ammessi indirizzi email temporanei/usa e getta. Usa un indirizzo email normale (Gmail, Outlook, Hotmail, ecc.).";
      return;
    }

    // Configurazione Supabase
    const SUPABASE_URL = "https://ctxsxflzxpblcdbbuqrv.supabase.co";
    const SUPABASE_ANON_KEY = "sb_publishable_z1UGWWtz6Afm5iMzyRlNig_otAXhBUx";

    try {
      const submitBtn = document.getElementById("newsletter-submit");
      if (submitBtn) submitBtn.disabled = true;
      if (statusMsg) statusMsg.textContent = "Invio in corso...";

      const response = await fetch(`${SUPABASE_URL}/rest/v1/newsletter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          "Prefer": "return=minimal"
        },
        body: JSON.stringify({ email: email })
      });

      if (response.ok) {
        if (statusMsg) statusMsg.textContent = "Iscrizione completata con successo!";
        if (emailInput) emailInput.value = "";
      } else if (response.status === 409) {
        if (statusMsg) statusMsg.textContent = "Questa email è già iscritta.";
      } else {
        const errorData = await response.json().catch(() => ({}));
        if (statusMsg) statusMsg.textContent = "Errore: " + (errorData.message || "Riprova più tardi.");
      }
    } catch (err) {
      console.error("Errore di connessione a Supabase:", err);
      if (statusMsg) statusMsg.textContent = "Errore di rete. Controlla la console.";
    } finally {
      const submitBtn = document.getElementById("newsletter-submit");
      if (submitBtn) submitBtn.disabled = false;
    }
  });
});
