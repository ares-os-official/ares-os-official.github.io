// Init icone
document.addEventListener('DOMContentLoaded', () => {
    if(typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// Chiusura Modali globale
function closeModal(id) { 
    const el = document.getElementById(id);
    if(el) el.classList.remove('active'); 
}

// Download Modal Logic
const editionData = {
    win10: { title: "Windows 10 21H2 LTSC IoT", hash: "a3b5c8f8d9e2... (SHA256)", url: "https://mega.nz/" },
    win11: { title: "Windows 11 24H2 LTSC IoT", hash: "f8d9e2a3b5c8... (SHA256)", url: "https://mega.nz/" }
};

function openDownloadModal(edition) {
    const data = editionData[edition];
    document.getElementById('dl-subtitle').innerText = data.title;
    document.getElementById('dl-hash').innerText = data.hash;
    document.getElementById('dl-action-btn').onclick = () => window.open(data.url, '_blank');
    document.getElementById('download-modal').classList.add('active');
}

// Modali Legali (Solo per index.html o includere struttura ovunque)
const legalTexts = {
    privacy: { title: "Privacy Policy", content: "Nessun dato raccolto. Telemetria disabilitata." },
    disclaimer: { title: "Disclaimer", content: "Uso a rischio e pericolo dell'utente." },
    tos: { title: "Termini", content: "Proibita la rivendita delle ISO modificate." }
};

function openLegalModal(type) {
    document.getElementById('legal-title').innerText = legalTexts[type].title;
    document.getElementById('legal-text').innerText = legalTexts[type].content;
    document.getElementById('legal-modal').classList.add('active');
}

// Contatori e Observer (solo se si è in index.html)
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

// FAQ Toggle
function toggleFaq(btn) {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector('i');
    content.classList.toggle('hidden');
    icon.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
}