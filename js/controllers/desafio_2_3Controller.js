 import { parseTimeToSeconds, formatSecondsToTime } from '../models/utils.js';
 document.getElementById("continueBtn").addEventListener("click", verificarResposta);
 
 const questoesPadrao = {
    2: {
      code: `if 20 > 2:\n    print("maior")\nelse:\n    print("menor")`,
      expected: "maior"
    },
    3: {
      code: `x = 10\ny = 20\nif x < y:\n    return "false" \nelse:\n    return "true" `,
      expected: "false"
    }
  };

  function getPlayerInfo() {
    const nome = localStorage.getItem("player") || "Player";
    const mapa = parseInt(localStorage.getItem("mapa")) || 2;
    const tempo = localStorage.getItem(`tempo${mapa}`) || "00:00";
    return { nome, tempoInicial: tempo, mapa };
  }



  function voltarHome() {
    if (confirm("Tem certeza que deseja voltar ao início? O progresso atual será perdido.")) {
      window.location.href = "./index.html";

    }
  }

  let elapsedSeconds = 0;
  let intervalId = null;
  let startSeconds = 0;
  let currentLevel = 2;
  let currentChallenge = null;

  function startTimer(callback) {
    intervalId = setInterval(() => {
      elapsedSeconds++;
      const tempoAtual = startSeconds + elapsedSeconds;
      callback(formatSecondsToTime(tempoAtual));
    }, 1000);
  }

  function carregarDesafio() {
    const challengeKey = `challenge_level_${currentLevel}`;
    const savedChallenge = localStorage.getItem(challengeKey);

    if (savedChallenge) {
      try {
        currentChallenge = JSON.parse(savedChallenge);
      } catch (e) {
        currentChallenge = questoesPadrao[currentLevel];
      }
    } else {
      currentChallenge = questoesPadrao[currentLevel];
    }

    document.getElementById("levelTitle").textContent = `DESAFIO LÓGICO NÍVEL ${currentLevel}`;
    document.getElementById("codeBlock").textContent = currentChallenge.code;
  }

  function verificarResposta() {
    const userAnswer = document.getElementById("userAnswer").value.trim();
    const feedback = document.getElementById("feedback");
    const continueBtn = document.getElementById("continueBtn");

    if (!userAnswer) {
      feedback.innerHTML = `<div style="text-align: center;"><strong>⚠️ ATENÇÃO!</strong><br><br>Por favor, digite sua resposta antes de continuar.</div>`;
      feedback.className = "feedback-error";
      return;
    }

    if (userAnswer.toLowerCase() === currentChallenge.expected.toLowerCase()) {
      clearInterval(intervalId);
      continueBtn.disabled = true;

      const jogadas = localStorage.getItem(`move${currentLevel}`) || "1";
      const tempoTotalSegundos = startSeconds + elapsedSeconds;
      const tempoTotalFormatado = formatSecondsToTime(tempoTotalSegundos);

      localStorage.setItem(`tempo${currentLevel}`, tempoTotalFormatado);

      if (currentLevel === 2) {
        localStorage.setItem("mapa", 3);
        feedback.innerHTML = `
          <div style="text-align: center;">
            🎉 <strong>PARABÉNS!</strong> Você completou o Nível 2!<br><br>
            🕒 <strong>Tempo:</strong> ${tempoTotalFormatado}<br>
            🎯 <strong>Jogadas:</strong> ${jogadas}<br><br>
            <button class="level-btn" onclick="window.location.href='game.html'">⚡ IR PARA NÍVEL 3 ⚡</button>
          </div>`;
        feedback.className = "feedback-success";

      } else if (currentLevel === 3) {
        feedback.innerHTML = `
          <div style="text-align: center;">
            🏆 <strong>VOCÊ VENCEU O JOGO!</strong><br><br>
            🕒 <strong>Tempo do Nível 3:</strong> ${tempoTotalFormatado}<br>
            🎯 <strong>Jogadas:</strong> ${jogadas}<br><br>
          <button class="level-btn" onclick="window.location.href='index.html'">🏠 VOLTAR AO INÍCIO</button>

          </div>`;
        feedback.className = "feedback-success";
      }

    } else {
      feedback.innerHTML = `<div style="text-align: center;"><strong>⚠️ ATENÇÃO!</strong><br><br>Sua resposta está incorreta.<br><strong>Analise o código novamente!</strong></div>`;
      feedback.className = "feedback-error";
    }
  }

  window.onload = function () {
    const { nome, tempoInicial, mapa } = getPlayerInfo();
    currentLevel = mapa;

    document.getElementById("playerName").textContent = nome;
    startSeconds = parseTimeToSeconds(tempoInicial);

    startTimer((formatted) => {
      document.getElementById("time").textContent = formatted;
    });

    carregarDesafio();
  };

  document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      verificarResposta();
    }
  });

  document.getElementById("userAnswer").addEventListener('input', function () {
    this.style.transform = 'scale(1.02)';
    setTimeout(() => {
      this.style.transform = 'scale(1)';
    }, 200);
  });

  window.voltarHome = voltarHome;
