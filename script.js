// 3. Lógica do Simulador de Visão
const simImage = document.getElementById('sim-image');
const simOverlay = document.getElementById('sim-overlay');
const simCondition = document.getElementById('sim-condition');
const simSlider = document.getElementById('sim-slider');
const sliderValue = document.getElementById('slider-value');
const simDescription = document.getElementById('sim-description');

// Definimos o limite máximo de graus para a escala de 0 a 100%
const MAX_GRAUS = 6.0; 

const descriptions = {
    'normal': '<strong>Visão Normal:</strong> A luz passa pela córnea e pelo cristalino focando perfeitamente sobre a retina.',
    'miopia': '<strong>Miopia:</strong> Dificuldade para ver de longe. Os objetos distantes ficam desfocados porque o ponto focal se forma antes da retina.',
    'hipermetropia': '<strong>Hipermetropia:</strong> Dificuldade para ver de perto. Pode causar fadiga visual ao tentar focar objetos próximos.',
    'daltonismo-protanopia': '<strong>Protanopia (Daltonismo):</strong> Ausência de cones sensíveis à luz vermelha. Tonalidades vermelhas tendem a parecer escurecidas.',
    'daltonismo-deuteranopia': '<strong>Deuteranopia (Daltonismo):</strong> Ausência de cones sensíveis à luz verde. Dificuldade para distinguir entre tons de verde e vermelho.'
};

function updateSimulation() {
    const condition = simCondition.value;
    const val = parseFloat(simSlider.value);
    
    // Converte de % (0-100) para graus (0 a MAX_GRAUS)
    const graus = ((val / 100) * MAX_GRAUS).toFixed(2);

    // Esconde o controle de graus se for visão normal ou daltonismo
    if (condition === 'normal') {
        sliderValue.textContent = '0.00 Grau';
    } else if (condition.startsWith('daltonismo')) {
        sliderValue.textContent = val + '%';
    } else {
        sliderValue.textContent = graus + ' Graus';
    }

    simDescription.innerHTML = descriptions[condition];

    // Reset de filtros
    simImage.style.filter = 'none';
    simOverlay.style.backgroundColor = 'transparent';

    if (condition === 'miopia') {
        // Aplica desfocagem proporcional aos graus de miopia
        const blurPx = graus * 2; 
        simImage.style.filter = `blur(${blurPx}px)`;
    } else if (condition === 'hipermetropia') {
        // Aplica desfocagem proporcional aos graus de hipermetropia
        const blurPx = graus * 1.2;
        const contrastVal = 100 + (val / 2);
        simImage.style.filter = `blur(${blurPx}px) contrast(${contrastVal}%)`;
    } else if (condition === 'daltonismo-protanopia') {
        const opacity = (val / 100) * 0.7;
        simOverlay.style.backgroundColor = `rgba(0, 100, 200, ${opacity})`;
        simImage.style.filter = `grayscale(${val}%) sepia(${val / 2}%)`;
    } else if (condition === 'daltonismo-deuteranopia') {
        const opacity = (val / 100) * 0.7;
        simOverlay.style.backgroundColor = `rgba(180, 100, 0, ${opacity})`;
        simImage.style.filter = `grayscale(${val * 0.8}%)`;
    }
}

simCondition.addEventListener('change', updateSimulation);
simSlider.addEventListener('input', updateSimulation);
// 4. Funcionalidades do Menu de Acessibilidade
const accToggleBtn = document.getElementById('acc-toggle-btn');
const accMenu = document.getElementById('acc-menu');
const btnContrast = document.getElementById('btn-contrast');
const btnFontIncrease = document.getElementById('btn-font-increase');
const btnFontReset = document.getElementById('btn-font-reset');

// Abre/Fecha o menu de acessibilidade
accToggleBtn.addEventListener('click', () => {
    accMenu.classList.toggle('hidden');
});

// Ativa/Desativa o Alto Contraste
btnContrast.addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
});

// Aumenta o tamanho da fonte da página
btnFontIncrease.addEventListener('click', () => {
    document.body.classList.add('large-font');
});

// Reseta o tamanho da fonte para o normal
btnFontReset.addEventListener('click', () => {
    document.body.classList.remove('large-font');
});