const levelSelect = document.querySelector('#level_select');
const codeInput = document.querySelector('#code_input');
const answerInput = document.querySelector('#answer_input');
const configForm = document.querySelector('.config_form');
const levelBadge = document.querySelector('#level_badge');
const submitButton = document.querySelector('.config_button');

// Atualizar badge do nível
levelSelect.addEventListener('change', () => {
    const level = levelSelect.value;
    const levelText = level === '2' ? 'Nível 2' : 'Nível 3';
    levelBadge.textContent = levelText;

    loadSavedChallenge(level); // Carrega se já tiver salvo
});

// Função para mostrar notificação
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10B981, #059669)' : 'linear-gradient(135deg, #F59E0B, #D97706)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        font-weight: 500;
        max-width: 300px;
    `;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
            document.head.removeChild(style);
        }, 300);
    }, 3000);
}

// Evento de envio do formulário
configForm.addEventListener('submit', e => {
    e.preventDefault();

    const code = codeInput.value.trim();
    const expected = answerInput.value.trim();
    const level = levelSelect.value;

    if (!code || !expected) {
        showNotification('⚠️ Preencha o código e a resposta esperada.', 'warning');
        return;
    }

    // Animação de loading
    submitButton.classList.add('loading');
    submitButton.textContent = 'Salvando...';

    setTimeout(() => {
        const levelKey = `challenge_level_${level}`;
        const challengeObj = {
            code: code,
            expected: expected
        };

        // ✅ Salvar no localStorage
        localStorage.setItem(levelKey, JSON.stringify(challengeObj));

        submitButton.classList.remove('loading');
        submitButton.textContent = '💾 Salvar Configuração';

        showNotification(`✅ Desafio do nível ${level} salvo com sucesso!`);

        // Recarrega os dados salvos após 1s
        setTimeout(() => loadSavedChallenge(level), 1000);
    }, 1000);
});

// Carregar desafio salvo ao selecionar o nível
function loadSavedChallenge(level) {
    const savedData = localStorage.getItem(`challenge_level_${level}`);
    if (savedData) {
        const { code, expected } = JSON.parse(savedData);
        codeInput.value = code;
        answerInput.value = expected;
    } else {
        codeInput.value = '';
        answerInput.value = '';
    }
}

// Ao carregar a página, inicia com nível 2 selecionado
window.addEventListener('DOMContentLoaded', () => {
    levelSelect.value = '2';
    levelBadge.textContent = 'Nível 2';
    loadSavedChallenge('2');
});

// Efeitos visuais nos campos
document.querySelectorAll('.config_select, .config_textarea, .config_input').forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.style.transform = 'translateY(-2px)';
    });

    input.addEventListener('blur', function () {
        this.parentElement.style.transform = 'translateY(0)';
    });
});
