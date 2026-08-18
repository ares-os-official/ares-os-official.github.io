document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('cookie-banner');
    const dismissBtn = document.getElementById('cookie-banner-dismiss');
    if (!banner || !dismissBtn) return;

    const STORAGE_KEY = 'ares_cookie_notice_dismissed';

    try {
        if (!localStorage.getItem(STORAGE_KEY)) {
            banner.classList.remove('hidden');
        }
    } catch {
        // localStorage unavailable (private browsing, etc.) — show the
        // banner anyway rather than risk an unhandled error.
        banner.classList.remove('hidden');
    }

    dismissBtn.addEventListener('click', () => {
        banner.classList.add('hidden');
        try { localStorage.setItem(STORAGE_KEY, '1'); } catch { /* ignore */ }
    });
});
