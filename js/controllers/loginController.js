// Adaptação do seu JavaScript original com os efeitos visuais
const input = document.querySelector(".login_input");
const loginBtn = document.querySelector(".login_button");
const loginForm = document.querySelector(".login_form");

const helpBtn = document.querySelector(".help_button");
const configBtn = document.querySelector(".config_button");




const validateInput = ({ target }) => {
    if (target.value.length > 0) {
        loginBtn.removeAttribute("disabled");
    } else {
        loginBtn.setAttribute("disabled", true);
    }
};

const handleSubmit = (event) => {
    event.preventDefault();
    console.log(input.value);
    localStorage.setItem("player", input.value);
    localStorage.setItem("mapa", 1);
    window.location = '../pages/game.html';
};

input.addEventListener('input', validateInput);
loginForm.addEventListener('submit', handleSubmit);

helpBtn.addEventListener("click", () => {
    window.location.href = "../pages/help.html"; // ajuste o caminho conforme necessário
});

configBtn.addEventListener("click", () => {
    window.location.href = "../pages/config.html"; // ajuste o caminho conforme necessário
});

// Efeitos visuais adicionais
// Efeito de digitação no placeholder
const placeholders = [
    'Digite seu nome...',
    'Qual é o seu nome?',
    'Como você se chama?',
    'Insira seu nickname...'
];

let currentPlaceholder = 0;
setInterval(() => {
    if (!input.value) {
        input.placeholder = placeholders[currentPlaceholder];
        currentPlaceholder = (currentPlaceholder + 1) % placeholders.length;
    }
}, 3000);

// Adiciona efeitos visuais aos botões
document.querySelectorAll('.game_button').forEach(button => {
    button.addEventListener('click', function (e) {
        // Efeito ripple
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.5);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// CSS para o efeito ripple
const style = document.createElement('style');
style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);

