import { getPlayerInfo, parseTimeToSeconds, formatSecondsToTime } from '../models/utils.js';

// Simulação das funções necessárias para o exemplo funcionar
const respostasDesafio1 = {
    q1: "false",
    q2: "false",
    q3: "true",
    q4: "false"
};


let elapsedSeconds = 0;
let intervalId = null;

function startTimer(callback) {
    intervalId = setInterval(() => {
        elapsedSeconds++;
        const tempoAtual = startSeconds + elapsedSeconds; // soma com tempo salvo
        callback(formatSecondsToTime(tempoAtual));        // exibe o tempo real total
    }, 1000);
}

// Código principal do desafio
const timeElement = document.getElementById("time");
const nameSpan = document.getElementById("playerName");
const feedback = document.getElementById("feedback");

// Recuperar e exibir nome do jogador
const { nome, tempoInicial } = getPlayerInfo();
nameSpan.textContent = nome;

// Iniciar cronômetro a partir do tempo salvo
const startSeconds = parseTimeToSeconds(tempoInicial);
startTimer((formatted) => {
    timeElement.textContent = formatted;
});

window.verificarRespostas = function () {
    let erros = 0;
    const continueBtn = document.getElementById("continueBtn");
    for (let key in respostasDesafio1) {
        const input = document.getElementById(key);
        const userAnswer = input.value.trim().toLowerCase();
        const correct = respostasDesafio1[key];

        if (userAnswer !== correct) {
            erros++;
        }
    }

    if (erros === 0) {
        clearInterval(intervalId); // ✅ Para o cronômetro

        const jogadas = localStorage.getItem("move1") || "0";
        const tempoTotalSegundos = startSeconds + elapsedSeconds;
        const tempoTotalFormatado = formatSecondsToTime(tempoTotalSegundos);
        continueBtn.disabled = true;
        localStorage.setItem("tempo1", tempoTotalFormatado); // ✅ Salva o tempo final
        localStorage.setItem("mapa", 2); // Avança para o próximo nível

        feedback.innerHTML = `
          <div style="text-align: center;">
            🎉 <strong>PARABÉNS!</strong> Você completou o Nível 1!<br><br>
            🕒 <strong>Tempo:</strong> ${tempoTotalFormatado}<br>
            🎯 <strong>Jogadas:</strong> ${jogadas}<br><br>
            Pronto para o próximo desafio?<br>
            <button class="level-btn" onclick="window.location.href='game.html'">
              ⚡ IR PARA NÍVEL 2 ⚡
            </button>
          </div>
        `;
        feedback.className = "feedback-success";
    } else {
        feedback.innerHTML = `
          <div style="text-align: center;">
            <strong>⚠️ ATENÇÃO!</strong><br><br>
            Algumas respostas estão incorretas.<br>
            <strong>Verifique suas respostas novamente!</strong>
          </div>
        `;
        feedback.className = "feedback-error";
    }
};

// Adicionar funcionalidade de Enter para submeter
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        verificarRespostas();
    }
});

// Efeito de digitação nos inputs
document.querySelectorAll('.question-input').forEach(input => {
    input.addEventListener('input', function () {
        this.style.transform = 'scale(1.02)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});
