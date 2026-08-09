// Array di sfondi limitato esattamente a due elementi come richiesto
const wallpapers = [
  {
    id: 1,
    title: "Ares Dark Metallic",
    src: "./wallpapers/wallpaper1.png",
    res: "4K Ultra HD"
  },
  {
    id: 2,
    title: "Ares Neon Circuit",
    src: "./wallpapers/wallpaper2.png",
    res: "4K Ultra HD"
  }
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('wallpaper-grid');
    if(!grid) return; // Esegue la logica solo all'interno di wallpapers.html

    wallpapers.forEach(wp => {
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
});

// Gestione Anteprima Fullscreen e Download
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