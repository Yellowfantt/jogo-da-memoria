// models/utils.js

export function getPlayerInfo() {
    const playerName = localStorage.getItem("player");
    const map = localStorage.getItem("mapa");
    const timeStr = localStorage.getItem(`tempo${map}`) || "00:00";
    return { nome: playerName, tempoInicial: timeStr };
}

export function parseTimeToSeconds(timeStr) {
    const [minutes, seconds] = timeStr.split(":").map(Number);
    return minutes * 60 + seconds;
}

export function formatSecondsToTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}