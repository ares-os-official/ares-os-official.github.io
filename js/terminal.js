document.addEventListener('DOMContentLoaded', () => {
    const terminalEl = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');
    
    if(!terminalEl) return;

    // Array dei messaggi di boot "Coming Soon"
    const terminalLines = [
        "<span class='text-yellow-400 font-bold'>[SYSTEM STATUS]: ARES OS DEVELOPMENT IN PROGRESS...</span>",
        "<span class='text-yellow-400'>[STATUS]: UNRELEASED / TECHNICAL ALPHA</span>",
        "<span class='text-red-500'>[NOTICE]: Tools, ISO builds, and downloads are currently locked.</span>",
        " ",
        "<span class='text-white font-bold'>Available Options:</span>",
        "  [1] Download Ares OS 10 LTSC <span class='text-red-500 text-xs'>[LOCKED]</span>",
        "  [2] Download Ares OS 11 LTSC <span class='text-red-500 text-xs'>[LOCKED]</span>",
        "  [3] Access Optimization Tools <span class='text-red-500 text-xs'>[LOCKED]</span>",
        "  [4] View Changelog",
        "  [5] System Benchmarks",
        "  [6] Join Beta Program",
        "  [7] Exit",
        " "
    ];
    
    let lineIndex = 0;
    
    function typeTerminal() {
        if (lineIndex < terminalLines.length) {
            terminalEl.innerHTML += terminalLines[lineIndex] + "<br>";
            lineIndex++;
            
            // Auto-scroll the terminal container down as text generates
            const terminalContainer = terminalEl.parentElement;
            terminalContainer.scrollTop = terminalContainer.scrollHeight;
            
            setTimeout(typeTerminal, 40); // Velocità di digitazione per il menu
        } else {
            // Dopo aver generato il menu, focus sull'input
            if(terminalInput) {
                terminalInput.focus();
            }
        }
    }
    
    // Inizia la sequenza di boot dopo un leggero ritardo
    setTimeout(typeTerminal, 800);

    // Event listener per gestire l'input dell'utente
    if(terminalInput) {
        terminalInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const val = this.value.trim();
                
                if (val !== "") {
                    // Stampa il comando inserito dall'utente
                    terminalEl.innerHTML += `<br><span class="text-white font-bold">ARES_OS></span> ${val}<br>`;
                    
                    // Risposta "Access Denied" per qualsiasi comando (Launchpad status)
                    terminalEl.innerHTML += `<span class="text-red-500 font-bold">[ACCESS DENIED]: Ares OS is under active development. Stay tuned for the official release.</span><br>`;
                    
                    // Resetta l'input
                    this.value = '';
                    
                    // Scrolla il contenitore in basso per mostrare il nuovo output
                    const terminalContainer = terminalEl.parentElement;
                    terminalContainer.scrollTop = terminalContainer.scrollHeight;
                }
            }
        });

        // Cliccare ovunque nell'area del terminale darà il focus all'input, per UX fluida
        terminalEl.parentElement.addEventListener('click', () => {
            terminalInput.focus();
        });
    }
});