function alternarContraste() {
    document.body.classList.toggle('alto-contraste');
}

let tamanhoFonteAtual = 100;

function aumentarTexto() {
    if (tamanhoFonteAtual < 150) { 
        tamanhoFonteAtual += 10;
        document.body.style.fontSize = tamanhoFonteAtual + '%';
    }
}

function diminuirTexto() {
    if (tamanhoFonteAtual > 80) { 
        tamanhoFonteAtual -= 10;
        document.body.style.fontSize = tamanhoFonteAtual + '%';
        <script src="js/script.js"></script>
    }
}
const contrastBtn = document.getElementById('contrast-toggle');


if (localStorage.getItem('highContrast') === 'true') {
  document.body.classList.add('high-contrast');
}


contrastBtn.addEventListener('click', () => {
  document.body.classList.toggle('high-contrast');
  
  const isHighContrast = document.body.classList.contains('high-contrast');
  localStorage.setItem('highContrast', isHighContrast);
});