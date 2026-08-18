// =======================================================
// TESTI LEGALI INTEGRALI IN MARKDOWN (Mantenuti su app.js)
// =======================================================

const privacyPolicyText = `
# ARES OS — Privacy Policy

## 1. Identity of the Data Controller

No legal entity, company name, registered address, VAT number, or formal legal representative could be identified anywhere on the website or in the repository. The only identifiable parties are individual GitHub accounts associated with the project:

- GitHub organization: \`ares-os-official\`
- Contributors credited elsewhere by the project (per project documentation supplied separately): GitHub user **Eddyx12** (developer & founder) and GitHub user **ildenteproibito** (tweaker)

This is **not sufficient** to establish a data controller for legal purposes. Before publication, the project owner must supply:
- A contact address or registered office
- A contact email for privacy requests

Until this is supplied, this Privacy Policy **cannot be considered legally complete or GDPR-compliant**, and no claim of compliance is made.

---

## 2. Scope

This Privacy Policy applies only to the website at https://ares-os-official.github.io/ and its two pages (home page and wallpapers page). It does not apply to:
- Discord (governed by Discord's own privacy policy)
- GitHub.com itself (governed by GitHub's own privacy statement)
- Any future ARES OS software product (the operating system itself), which is not yet released and is outside the scope of this document until it exists and can be audited

## 3. Categories of Personal Data

The site includes a newsletter subscription form. **The only personal data actively collected is the email address a visitor voluntarily submits through that form.** There are no other forms, no login system, and no account creation anywhere on the site.

No name, no authentication data, and no payment data are collected. The submitted email address is stored, together with a subscription timestamp and status, in a Cloudflare D1 database operated for this project. A hashed (non-reversible) form of the submitting IP address is temporarily stored separately, solely to limit automated abuse of the form, and is not linked to the stored email address.

No self-service unsubscribe or data-deletion mechanism currently exists on the site. Until one is added, unsubscribe/deletion requests must be made through the contact channel described in Section 17.

## 4. Purposes and Legal Bases

Based on the verified site implementation, the applicable purposes are:
- **Operating and delivering the website** (loading pages, fonts, and scripts so the site displays correctly).
- **Sending ARES OS project updates to newsletter subscribers**, based on the visitor's consent given by submitting the newsletter form.

## 5. Third-Party Services (verified from page source)

The following third-party resources are loaded directly by the browser when visiting the site. Each involves the visitor's browser making a direct request to that third party, which inherently transmits the visitor's IP address to that third party as part of standard web protocol.

No analytics, advertising, or tracking script (e.g., Google Analytics, Meta Pixel, or similar) was found anywhere in the audited page source.

Users of these third-party services should refer to each provider's own privacy documentation for details of how they process data:
- Google (Fonts): https://policies.google.com/privacy
- Cloudflare (cdnjs): https://www.cloudflare.com/privacypolicy/
- unpkg / npm: https://docs.npmjs.com/policies/privacy

Separately, and only when the newsletter form is submitted, the entered email address and a hashed IP fragment are sent to a Cloudflare Workers/D1 backend operated for this project, for the purposes described in Section 3 and 4. This is a first-party data processor for the newsletter, not a resource loaded automatically by every visitor. See Cloudflare's privacy policy above for how Cloudflare itself processes data on its infrastructure.

This project does not control, and is not responsible for, how these third parties process data on their own servers.

## 6. Cookies

**No cookie-setting code was found** in the audited HTML or inline scripts. The site does not display a cookie consent banner. Whether any of the site's separate JavaScript files set cookies could not be verified, if the project owner confirms that no cookies are set anywhere in those files, this section should be updated to state plainly that the site does not use cookies. If any cookie is found to be set, this policy must be updated accordingly **before publication**, and a consent mechanism may be legally required depending on the cookie's purpose and the visitor's jurisdiction.

## 7. Interactive Features

The site includes an on-page "terminal" mockup with a text input field, presented as a decorative simulation of an operating-system terminal. **It is not verified whether text entered here is transmitted anywhere or processed only within the browser.** This must be confirmed by inspecting js/terminal.js before publication.

## 8. Discord and GitHub Links

- The "Join Discord Community" button opens https://discord.gg/dnDszT3t3g in a new tab. This is a plain external link, not an OAuth or account-linking flow. No Discord account data is accessed, requested, or processed by this website.
- The "GitHub" footer button opens https://github.com/ares-os-official/ares-os-official.github.io in a new tab, a plain external link.

Both Discord and GitHub are independently operated third-party platforms. This project has no access to, and is not responsible for, any data a visitor may separately choose to share with them.

## 9. Downloads

The site currently displays a download modal with a placeholder SHA-256 hash (...) and a disabled/inactive download flow, consistent with the site's own "Coming Soon" status. **No software is currently distributed through the site.** This section must be revisited once downloads become active, at which point download logs, file integrity mechanisms, and any related processing should be documented.

## 10. International Data Transfers

Cannot be assessed without knowing the controller's location (Section 1). Note, as a verified fact, that GitHub Pages hosting is operated by GitHub, Inc. (a U.S. company); visitors outside the United States loading this site will have their request routed to GitHub's infrastructure as an inherent part of using GitHub Pages.

## 11. Data Retention

No retention period is set or documented by this project for most data categories. Server/technical logs are retained according to GitHub's own policies, not this project's. Newsletter subscriber email addresses are kept until the subscriber requests removal (see Section 17) or the project deletes them; no automatic expiry is currently implemented. The hashed IP fragment used for abuse prevention is short-lived operational data tied to the rate-limiting window described in Section 3.

## 12. Data Security

Beyond the security inherent to GitHub Pages hosting (HTTPS), the newsletter's stored email addresses sit in a Cloudflare D1 database that is not publicly reachable; only an authenticated admin view can list subscribers, and the underlying subscription endpoint validates and sanitizes input server-side. No further security certification or audit is claimed.

## 13. User Rights

Applicable rights (access, rectification, erasure, restriction, objection, portability, and the right to lodge a complaint with a supervisory authority) depend entirely on the jurisdiction of the controller and of the visitor, which cannot currently be established (see Section 1). No automated rights-request mechanism (e.g., a self-service unsubscribe link or contact email) currently exists on the site; requests, including from newsletter subscribers, must go through the contact channel in Section 17 until one is added.

## 14. Children's Privacy

The site does not knowingly direct content at children, does not collect any personal data through forms or accounts, and contains no age-gating mechanism. No further claim (e.g., COPPA compliance) is made, as this has not been assessed by a legal professional.

## 15. Automated Decision-Making / Profiling

None identified. The site performs no personalization, scoring, or automated decision-making based on visitor data, based on verified page source.

## 16. Changes to this Policy

This policy may be updated as the website or the ARES OS project evolves, once download functionality becomes active, and once controller identity/jurisdiction information (Section 1) is supplied.

## 17. Contact

No contact email or mechanism for privacy inquiries currently exists on the site, just a discord server.

## 18. Effective Date / Last Updated

08/11/2026 (updated to reflect the newsletter subscription feature)
`;

const legalDisclaimerText = `
## 1. Nature and Purpose of ARES OS

ARES OS is presented on its website as a modified Windows operating system, built on Microsoft's LTSC IoT branches, aimed at reducing background processes and system bloat for gaming and power-user scenarios. As of the audit date, the site states the project is **"Coming Soon" / "Work in Progress"**, and no ISO or installable file is currently available for download — the site's download button and SHA-256 hash field are inactive placeholders.

## 2. Informational Nature of Website Content

The content of this website (feature descriptions, performance figures, FAQ answers) is provided for general informational purposes about the ARES OS project. It does not constitute a binding specification, a guarantee of future features, or a contractual offer.

## 3. Accuracy and Completeness of Information

The performance figures shown on the site (e.g., RAM usage comparison, "system stability" percentage, active process counts) are presented by the project itself as descriptive figures and have not been independently verified or audited as part of this documentation task. The site does not cite an independent testing methodology for these figures. Visitors should treat these as claims made by the project, not as independently verified benchmarks.

## 4. No Guarantee of Availability

The website is provided on an as-available basis. No uptime guarantee, service level, or continuity commitment is made or can be verified.

## 5. Software Use-at-Own-Risk

Because ARES OS (the operating system itself) is not yet released, no specific software disclaimer about installation risk can yet be written from verified facts. **This section must be revisited and expanded once ARES OS is actually distributed**, and should at that point clearly state, without invented guarantees, that:
- Installing a modified operating system carries inherent risk
- Users should understand system changes before applying them

## 6. Compatibility Limitations

The site's FAQ states that major anti-cheat systems, including kernel-level systems such as Valorant Vanguard and Easy Anti-Cheat, are reported to function correctly. This is presented on the site as a claim by the project, not as a result independently verified in this audit. No specific hardware or software compatibility list beyond "LTSC IoT" branches (Windows 10 21H2, Windows 11 24H2) was found.

## 7. Third-Party Services and External Links

The website links out to, or loads resources from, the following independently operated third-party services (see the accompanying Privacy Policy for the full technical list): Discord, Google Fonts, Cloudflare's CDN (cdnjs), and unpkg.com. These are independently operated services. This project:
- Does not control the content, availability, or practices of these third parties
- Does not imply any endorsement by these third parties
- Is not responsible for what happens on their platforms once a visitor navigates there

## 8. Third-Party Content

The site's Discord button links to an external platform not controlled by this project. Content on that platform is the responsibility of its operator.

## 9. Security Limitations

There isn't any specific security certifications, audits, or guarantees were found on the site, but the owner guarantees that windows update works so system security updates are available for everyone.

## 10. Intellectual Property

- The codebase powering this website is licensed under the **GNU General Public License v2.0 (GPL-2.0)**, as declared by the project.
- ARES OS is built on Microsoft's LTSC IoT Windows branches. **Windows, DirectX, and related names are trademarks of Microsoft Corporation.** This project is not affiliated with, endorsed by, or sponsored by Microsoft Corporation.
- Any other third-party trademarks, logos, or content referenced or linked from the site (e.g., Discord, Valorant, Easy Anti-Cheat) belong to their respective owners and are referenced descriptively, not as an endorsement claim.

## 11. User Responsibilities

Visitors are responsible for how they use information found on this site and for exercising their own judgment before acting on any claim made about ARES OS, particularly given the project's current "Coming Soon" status.

## 12. Limitation of Liability

A specific, enforceable limitation-of-liability clause depends on the controller's legal identity and jurisdiction (see the Privacy Policy, Section 1), which could not be established from the available information. A generic, jurisdiction-agnostic placeholder is deliberately avoided here rather than presenting unverified language as settled legal text.

## 13. No Warranties

Consistent with the GPL-2.0 license terms declared for the project, the code is provided "AS IS," without warranty of any kind, to the extent permitted by applicable law. This disclaimer of warranty is a direct term of the GPL-2.0 license itself (Sections 11–12 of the license text) and is not an invented addition.

## 14. Changes to Website/Project

The website and the ARES OS project may change at any time, particularly given its current "Work in Progress" status. This Disclaimer should be reviewed and updated alongside any material change to the site (e.g., when downloads become active).

## 15. Governing Law and Jurisdiction

Cannot be verified or stated. No operator location, legal entity, or jurisdiction is disclosed anywhere on the site. Do not publish a governing-law clause until this is supplied and confirmed.

## 16. Contact

No contact mechanism currently exists on the site for legal inquiries.

## 17. Effective Date

08/10/2026
`;

const tosText = `
## 1. Terms of Service
By using this website, you agree to these terms. Ares OS is a community-driven project offered for free.

## 2. No Resale
It is strictly prohibited to sell or re-package our builds for commercial profit.
`;

const legalTexts = {
    it: {
        privacy: { title: "Privacy Policy", content: privacyPolicyText },
        disclaimer: { title: "Disclaimer Legale", content: legalDisclaimerText },
        tos: { title: "Termini di Servizio", content: tosText }
    },
    en: {
        privacy: { title: "Privacy Policy", content: privacyPolicyText },
        disclaimer: { title: "Legal Disclaimer", content: legalDisclaimerText },
        tos: { title: "Terms of Service", content: tosText }
    }
};

// =======================================================
// PARSER MARKDOWN COMPLETO (Supporta #, ##, **, `, -, ---, links)
// =======================================================

function parseCyberMarkdown(text) {
    if (!text) return "";
    
    // Titolo H1 (# )
    let html = text.replace(
        /^# (.*$)/gim, 
        '<h1 class="text-white font-bold text-xl mb-4 tracking-widest uppercase text-crimson-500 border-b border-crimson-500/40 pb-2">$1</h1>'
    );

    // Titoli H2 (## )
    html = html.replace(
        /^## (.*$)/gim, 
        '<h2 class="text-white font-bold text-md mt-6 mb-2 tracking-widest uppercase text-crimson-500 border-b border-crimson-500/20 pb-1">$1</h2>'
    );

    // Codice inline (`codice`)
    html = html.replace(/`(.*?)`/gim, '<code class="bg-black/50 border border-crimson-500/30 text-crimson-400 px-1.5 py-0.5 rounded font-mono text-xs">$1</code>');
    
    // Grassetto (**testo**)
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong class="text-white font-semibold">$1</strong>');

    // Punti elenco (- elemento)
    html = html.replace(/^- (.*$)/gim, '<li class="ml-4 list-disc text-platinum-300 mb-1">$1</li>');

    // Separatori (---)
    html = html.replace(/^---$/gim, '<hr class="border-crimson-500/20 my-4">');

    // Link URLs (http/https)
    html = html.replace(/(https?:\/\/[^\s<]+)/gim, '<a href="$1" target="_blank" class="text-crimson-400 underline hover:text-crimson-300 break-all">$1</a>');

    // Paragrafi e a capo
    html = html.split(/\n\n+/)
        .map(p => {
            const trimmed = p.trim();
            if(trimmed.startsWith('<h1') || trimmed.startsWith('<h2') || trimmed.startsWith('<li') || trimmed.startsWith('<hr')) return trimmed;
            return `<p class="mb-4 leading-relaxed font-light">${trimmed.replace(/\n/g, '<br>')}</p>`;
        })
        .join('');

    return html;
}

function openLegalModal(type) {
    const currentLang = localStorage.getItem('ares_lang') || 'en'; // Impostato fallback 'en' invece di 'it'
    const langData = legalTexts[currentLang] || legalTexts['en'] || legalTexts['it'];
    const modalData = langData[type] || legalTexts['en'][type] || legalTexts['it'][type];

    document.getElementById('legal-title').innerText = modalData.title;
    document.getElementById('legal-text').innerHTML = parseCyberMarkdown(modalData.content);
    document.getElementById('legal-modal').classList.add('active');

    if(typeof lucide !== 'undefined') lucide.createIcons();
}

function closeModal(id) { 
    const el = document.getElementById(id);
    if(el) el.classList.remove('active'); 
}

// Chiusura tasto ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal('download-modal');
        closeModal('legal-modal');
        closeModal('wallpaper-modal');
    }
});

// FAQ Toggle
function toggleFaq(btn) {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector('i');
    content.classList.toggle('hidden');
    icon.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
}


document.addEventListener('DOMContentLoaded', () => {
    if(typeof lucide !== 'undefined') lucide.createIcons();

    // Iniezione griglia sfondi
    const grid = document.getElementById('wallpaper-grid');
    if(grid) {
        localWallpapers.forEach(wp => {
            const card = document.createElement('div');
            card.className = "wallpaper-card glass-panel rounded-2xl overflow-hidden relative cursor-pointer group shadow-lg";
            card.innerHTML = `
                <div class="aspect-video overflow-hidden bg-[#0a0203]">
                    <img src="${wp.src}" alt="${wp.title}" class="w-full h-full object-cover">
                </div>
                <div class="overlay absolute inset-0 bg-black/60 flex flex-col justify-center items-center gap-3">
                    <i data-lucide="zoom-in" class="w-10 h-10 text-white opacity-80"></i>
                    <span class="text-white font-bold tracking-widest uppercase text-sm">${wp.title}</span>
                </div>
            `;
            card.onclick = () => openWallpaperPreview(wp);
            grid.appendChild(card);
        });
        if(typeof lucide !== 'undefined') lucide.createIcons();
    }

    // Contatori animati
    const counterSection = document.getElementById('counter-section');
    if (counterSection) {
        let started = false;
        new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting && !started) {
                started = true;
                document.querySelectorAll('.counter').forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    let cur = 0;
                    const update = () => {
                        cur += target / 60;
                        if(cur < target) { counter.innerText = Math.ceil(cur); requestAnimationFrame(update); } 
                        else { counter.innerText = target; }
                    };
                    update();
                });
            }
        }).observe(counterSection);
    }
});

function openWallpaperPreview(wp) {
    document.getElementById('wp-preview-img').src = wp.src;
    document.getElementById('wp-preview-title').innerText = wp.title;
    document.getElementById('wp-preview-res').innerText = wp.res;
    
    const dlBtn = document.getElementById('wp-download-btn');
    dlBtn.href = wp.src;
    dlBtn.download = `Ares_${wp.title.replace(/\s+/g, '_')}.png`;

    document.getElementById('wallpaper-modal').classList.add('active');
    if(typeof lucide !== 'undefined') lucide.createIcons();
}