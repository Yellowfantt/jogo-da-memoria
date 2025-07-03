import { characterMap, matchMap } from "../models/gameModel.js";
import { createCard, createParticles, SoundManager, showWinModal, hideWinModal } from "../views/gameView.js";

const grid = document.querySelector(".grid");
const spanPlayer = document.querySelector(".player");
const time = document.querySelector(".timer");
const movesElement = document.querySelector(".moves");
const playAgainBtn = document.getElementById("playAgainBtn");
const soundToggle = document.getElementById("soundToggle");

const nivel = localStorage.getItem("mapa") || "1";
const characters = characterMap[nivel];
const matches = matchMap[nivel];

let firstCard = "";
let secondCard = "";
let loop;
let moves = 0;
let soundManager;
let isChecking = false;

function updateMoves() {
    movesElement.innerHTML = moves;
}

function updateTimer() {
    const totalSeconds = Number(time.innerHTML.split(':')[0]) * 60 + Number(time.innerHTML.split(':')[1]);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    time.innerHTML = timeString;
}

function checkEndGame() {
    const disabledCards = document.querySelectorAll(".disabled-card");
    if (disabledCards.length === 12) {
        clearInterval(loop);
        soundManager.playWin();
        const timeString = time.innerHTML;
        const message = `Parabéns! Você completou a primeira parte do nível ${nivel}!`;

        localStorage.setItem(`tempo${nivel}`, timeString);
        localStorage.setItem(`move${nivel}`, moves);

        setTimeout(() => {
            showWinModal(localStorage.getItem("player"), message);
        }, 800);
    }
}

function extractNameFromImage(backgroundImage) {
    const match = backgroundImage.match(/\/([^\/]+)\.png/);
    return match ? match[1] : "";
}

function checkCardsMatch() {
    const firstName = extractNameFromImage(firstCard.querySelector(".front").style.backgroundImage);
    const secondName = extractNameFromImage(secondCard.querySelector(".front").style.backgroundImage);

    if (matches[firstName] === secondName) {
        soundManager.playMatch();

        firstCard.firstChild.classList.add("reveal-card", "disabled-card");
        secondCard.firstChild.classList.add("reveal-card", "disabled-card");

        firstCard = "";
        secondCard = "";
        isChecking = false;
        checkEndGame();
    } else {
        soundManager.playError();

        setTimeout(() => {
            firstCard.classList.remove("reveal-card");
            secondCard.classList.remove("reveal-card");
            firstCard = "";
            secondCard = "";
            isChecking = false;
        }, 500);
    }
}

function revealCard({ target }) {
    if (isChecking) return;
    if (target.parentNode.classList.contains("reveal-card")) return;
    if (target.parentNode.classList.contains("disabled-card")) return;

    soundManager.playCardFlip();

    if (firstCard === "") {
        target.parentNode.classList.add("reveal-card");
        firstCard = target.parentNode;
    } else if (secondCard === "") {
        target.parentNode.classList.add("reveal-card");
        secondCard = target.parentNode;
        moves++;
        updateMoves();
        isChecking = true;

        setTimeout(() => {
            checkCardsMatch();
        }, 400);
    }
}

function startTimer() {
    let seconds = 0;
    loop = setInterval(() => {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        time.innerHTML = timeString;
    }, 1000);
}

function resetGame() {
    clearInterval(loop);
    firstCard = "";
    secondCard = "";
    moves = 0;
    isChecking = false;
    time.innerHTML = "00:00";
    updateMoves();
    grid.innerHTML = '';
    loadGame();
    startTimer();
}

function loadGame() {
    const shuffled = [...characters].sort(() => Math.random() - 0.5);
    shuffled.forEach((char) => {
        const card = createCard(char, revealCard, nivel);
        grid.appendChild(card);
    });
}

playAgainBtn.addEventListener('click', () => {
    hideWinModal();
    resetGame();

    if (nivel === "1") window.location = '../pages/desafio1.html';
    if (nivel === "2") window.location = '../pages/desafios2_3.html';
    if (nivel === "3") window.location = '../pages/desafios2_3.html';
});

soundToggle.addEventListener('click', function () {
    soundManager.toggleSound();
    this.textContent = soundManager.isEnabled() ? '🔊' : '🔇';

    if (soundManager.isEnabled()) {
        soundManager.playCardFlip();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'r' || e.key === 'R') {
        resetGame();
    } else if (e.key === 'm' || e.key === 'M') {
        soundToggle.click();
    }
});

window.onload = () => {
    soundManager = new SoundManager();

    document.addEventListener('click', () => {
        soundManager.resumeContext();
    }, { once: true });

    createParticles();
    spanPlayer.innerHTML = localStorage.getItem("player") || "Visitante";

    startTimer();
    loadGame();
};
