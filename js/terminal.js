document.addEventListener('DOMContentLoaded', () => {
    const terminalEl = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');
    
    if(!terminalEl) return;

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
            
            const terminalContainer = terminalEl.parentElement;
            terminalContainer.scrollTop = terminalContainer.scrollHeight;
            
            setTimeout(typeTerminal, 40);
        } else {
            if(terminalInput) {
                terminalInput.focus();
            }
        }
    }
    
    setTimeout(typeTerminal, 800);

    let secretStage = 0;

    function triggerGlitchAndReload() {
        const style = document.createElement('style');
        style.id = 'glitch-style';
        style.innerHTML = `
            @keyframes glitchEffect {
                0% { transform: translate(0); filter: invert(0) hue-rotate(0deg); }
                20% { transform: translate(-15px, 15px) skewX(15deg); filter: invert(1) hue-rotate(90deg); }
                40% { transform: translate(15px, -15px) skewY(-15deg); filter: invert(0) hue-rotate(180deg); }
                60% { transform: translate(-20px, -10px) scale(1.05); filter: invert(1) hue-rotate(270deg); }
                80% { transform: translate(20px, 10px) skewX(-15deg); filter: invert(0) hue-rotate(360deg); }
                100% { transform: translate(0); filter: invert(1); }
            }
            .easter-egg-glitch {
                animation: glitchEffect 0.07s infinite !important;
                background-color: #ff003c !important;
                overflow: hidden !important;
            }
        `;
        document.head.appendChild(style);
        document.body.classList.add('easter-egg-glitch');

        setTimeout(() => {
            location.reload();
        }, 1800);
    }

    if(terminalInput) {
        terminalInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const val = this.value.trim();
                
                if (val !== "") {
                    terminalEl.innerHTML += `<br><span class="text-white font-bold">ARES_OS></span> ${val}<br>`;
                    
                    if (secretStage === 0) {
                        if (val.toLowerCase() === 'mibombo') {
                            secretStage = 1;
                            terminalEl.innerHTML += `
                                <br><span class="text-yellow-400 font-bold">[SECRET DETECTED]</span><br>
                                <span class="text-white font-bold">Why did you write mibombo?</span><br>
                                <span class="text-white">  [1] I don't know</span><br>
                                <span class="text-white">  [2] I secretly looked at the GitHub files</span><br>
                            `;
                        } else {
                            terminalEl.innerHTML += `<span class="text-red-500 font-bold">[ACCESS DENIED]: Ares OS is under active development. Stay tuned for the official release.</span><br>`;
                        }
                    } else if (secretStage === 1) {
                        const cleanVal = val.toLowerCase();

                        if (cleanVal === '1' || cleanVal.includes("don't know") || cleanVal.includes("dont know")) {
                            terminalEl.innerHTML += `<span class="text-yellow-400 font-mono">[SYSTEM]: Resetting environment...</span><br>`;
                            setTimeout(() => {
                                location.reload();
                            }, 1000);
                        } else if (cleanVal === '2' || cleanVal.includes('github')) {
                            terminalEl.innerHTML += `<span class="text-yellow-400 font-bold font-mono">[WARNING]: EPILEPSY WARNING - FLASHING LIGHTS AHEAD!</span><br>`;
                            terminalEl.innerHTML += `<span class="text-red-500 font-mono font-bold animate-pulse">[FATAL ERROR]: SYSTEM CORRUPTED BY UNAUTHORIZED INSPECTION!</span><br>`;
                            
                            const terminalContainer = terminalEl.parentElement;
                            terminalContainer.scrollTop = terminalContainer.scrollHeight;

                            setTimeout(() => {
                                triggerGlitchAndReload();
                            }, 3000);
                        } else {
                            terminalEl.innerHTML += `<span class="text-red-500 font-bold">[INVALID CHOICE]: Please select 1 or 2.</span><br>`;
                        }
                    }
                    
                    this.value = '';
                    const terminalContainer = terminalEl.parentElement;
                    terminalContainer.scrollTop = terminalContainer.scrollHeight;
                }
            }
        });

        terminalEl.parentElement.addEventListener('click', () => {
            terminalInput.focus();
        });
    }
});
