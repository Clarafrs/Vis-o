// Alterna a classe de Alto Contraste no <body>
function alternarContraste() {
    document.body.classList.toggle('alto-contraste');
}

// Controle do Tamanho da Fonte
let tamanhoFonteAtual = 100; // Porcentagem inicial

function aumentarTexto() {
    if (tamanhoFonteAtual < 150) { // Limite máximo de 150%
        tamanhoFonteAtual += 10;
        document.body.style.fontSize = tamanhoFonteAtual + '%';
    }
}

function diminuirTexto() {
    if (tamanhoFonteAtual > 80) { // Limite mínimo de 80%
        tamanhoFonteAtual -= 10;
        document.body.style.fontSize = tamanhoFonteAtual + '%';
        <script src="js/script.js"></script>
    }
}
const contrastBtn = document.getElementById('contrast-toggle');

// Verifica se o usuario ja havia ativado o alto contraste anteriormente
if (localStorage.getItem('highContrast') === 'true') {
  document.body.classList.add('high-contrast');
}

// Alterna a classe e salva a preferencia ao clicar
contrastBtn.addEventListener('click', () => {
  document.body.classList.toggle('high-contrast');
  
  const isHighContrast = document.body.classList.contains('high-contrast');
  localStorage.setItem('highContrast', isHighContrast);
});