// Sound Manager Class
export class SoundManager {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.soundEnabled = true;
    }

    createTone(frequency, duration, type = 'sine') {
        if (!this.soundEnabled) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    playCardFlip() {
        this.createTone(800, 0.1, 'square');
    }

    playMatch() {
        this.createTone(600, 0.2);
        setTimeout(() => this.createTone(800, 0.2), 100);
    }

    playWin() {
        const notes = [523, 659, 784, 1047];
        notes.forEach((note, index) => {
            setTimeout(() => this.createTone(note, 0.3), index * 150);
        });
    }

    playError() {
        this.createTone(200, 0.3, 'sawtooth');
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
    }

    isEnabled() {
        return this.soundEnabled;
    }

    resumeContext() {
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }
}

// Create particles effect
export function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Original createElement function
export function createElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

// CORREÇÃO: createCard aprimorado com melhor controle de eventos
export function createCard(character, revealCallback) {
    const card = createElement("div", "card");
    const front = createElement("div", "face front");
    const back = createElement("div", "face back");
    const nivel = localStorage.getItem("mapa") || "1";
    front.style.backgroundImage = `url(../assets/imagens/mapa${nivel}/${character}.png)`;

    card.appendChild(front);
    card.appendChild(back);

    // CORREÇÃO: Event listener mais específico
    card.addEventListener("click", (e) => {
        // Previne propagação do evento
        e.stopPropagation();
        
        // Verifica se a carta não está desabilitada ou já revelada
        if (!card.classList.contains("disabled-card") && 
            !card.classList.contains("reveal-card")) {
            revealCallback(e);
        }
    });

    return card;
}

// Modal functions
export function showWinModal(playerName, message) {
    const modal = document.getElementById('winModal');
    const winMessage = document.getElementById('winMessage');
    
    winMessage.innerHTML = message;
    modal.style.display = 'flex';
}

export function hideWinModal() {
    const modal = document.getElementById('winModal');
    modal.style.display = 'none';
}