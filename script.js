// Dados do Quiz
const perguntasQuiz = [
    {
        pergunta: "1. Qual estrutura do olho é transparente e atua como a primeira lente refratando a luz?",
        opcoes: ["Retina", "Córnea", "Humor Vítreo", "Nervo Óptico"],
        correta: 1,
        explicacao: "A córnea é a camada transparente externa que realiza a primeira refração da luz."
    },
    {
        pergunta: "2. Como a imagem é projetada na retina antes de ser processada pelo cérebro?",
        opcoes: ["Aumentada", "Embaçada", "Invertida (de ponta-cabeça)", "Em preto e branco"],
        correta: 2,
        explicacao: "Devido ao formato biconvexo do cristalino, a imagem é projetada invertida na retina."
    },
    {
        pergunta: "3. Quais são os fotorreceptores responsáveis pela visão das cores?",
        opcoes: ["Bastonetes", "Cones", "Nervos", "Córneas"],
        correta: 1,
        explicacao: "Os cones são responsáveis pela percepção de cores, enquanto os bastonetes captam a luminosidade."
    },
    {
        pergunta: "4. Qual condição de visão dificulta enxergar objetos distantes?",
        opcoes: ["Hipermetropia", "Astigmatismo", "Miopia", "Presbiopia"],
        correta: 2,
        explicacao: "A miopia provoca dificuldade para focar objetos que estão longe."
    },
    {
        pergunta: "5. Qual a função do Nervo Óptico?",
        opcoes: [
            "Regular a quantidade de luz que entra",
            "Mudar de forma para ajustar o foco",
            "Preencher o espaço interno do olho",
            "Transmitir impulsos elétricos da retina para o cérebro"
        ],
        correta: 3,
        explicacao: "O nervo óptico atua como um cabo de transmissão dos sinais elétricos até o córtex visual."
    }
];
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
let indiceAtual = 0;
let pontuacao = 0;

function carregarPergunta() {
    const container = document.getElementById('quiz-container');
    if (!container) return;

    const q = perguntasQuiz[indiceAtual];
    let htmlOptions = q.opcoes.map((opcao, index) => `
        <button onclick="responder(${index})" class="w-full text-left p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500 hover:bg-slate-800/80 transition-all font-medium text-slate-200 flex justify-between items-center group">
            <span>${opcao}</span>
            <span class="w-5 h-5 rounded-full border border-slate-600 group-hover:border-cyan-400"></span>
        </button>
    `).join('');

    container.innerHTML = `
        <div class="mb-4 flex justify-between items-center text-xs font-semibold text-cyan-400">
            <span>PERGUNTA ${indiceAtual + 1} DE ${perguntasQuiz.length}</span>
        </div>
        <h3 class="text-xl font-bold text-white mb-6">${q.pergunta}</h3>
        <div class="space-y-3">
            ${htmlOptions}
        </div>
    `;
}

function responder(indiceSelecionado) {
    if (indiceSelecionado === perguntasQuiz[indiceAtual].correta) {
        pontuacao++;
    }

    indiceAtual++;

    if (indiceAtual < perguntasQuiz.length) {
        carregarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    document.getElementById('quiz-container').classList.add('hidden');
    const divResultado = document.getElementById('quiz-resultado');
    divResultado.classList.remove('hidden');
    
    document.getElementById('quiz-pontuacao').innerText =
        `Você acertou ${pontuacao} de ${perguntasQuiz.length} perguntas!`;
}

function reiniciarQuiz() {
    indiceAtual = 0;
    pontuacao = 0;
    document.getElementById('quiz-resultado').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    carregarPergunta();
}

// Inicialização de Funções e Eventos
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar Quiz
    carregarPergunta();

    // FAQ Accordion
    document.querySelectorAll('.faq-btn').forEach(button => {
        button.addEventListener('click', () => {
            const faqContent = button.nextElementSibling;
            const faqIcon = button.querySelector('.faq-icon');
            faqContent.classList.toggle('hidden');
            faqIcon.textContent = faqContent.classList.contains('hidden') ? '+' : '−';
        });
    });

    // Acessibilidade: Contraste
    const btnContraste = document.getElementById('btn-contraste');
    if (btnContraste) {
        btnContraste.addEventListener('click', () => {
            document.body.classList.toggle('alto-contraste');
        });
    }

    // Acessibilidade: Tamanho da Fonte
    let tamanhoAtual = 100;
    const btnAumentar = document.getElementById('btn-aumentar');
    const btnDiminuir = document.getElementById('btn-diminuir');

    if (btnAumentar && btnDiminuir) {
        btnAumentar.addEventListener('click', () => {
            if (tamanhoAtual < 140) {
                tamanhoAtual += 10;
                document.documentElement.style.fontSize = tamanhoAtual + '%';
            }
        });

        btnDiminuir.addEventListener('click', () => {
            if (tamanhoAtual > 80) {
                tamanhoAtual -= 10;
                document.documentElement.style.fontSize = tamanhoAtual + '%';
            }
        });
    }

    // Simulador Visual
    const simImage = document.getElementById('sim-image');
    const simOverlay = document.getElementById('sim-overlay');
    const simCondition = document.getElementById('sim-condition');
    const simSlider = document.getElementById('sim-slider');
    const sliderValue = document.getElementById('slider-value');
    const simDescription = document.getElementById('sim-description');

    if (simCondition && simSlider) {
        const descriptions = {
            'normal': '<strong>Visão Normal:</strong> A luz passa pela córnea e pelo cristalino focando perfeitamente sobre a retina.',
            'miopia': '<strong>Miopia:</strong> Dificuldade para ver de longe. Os objetos distantes ficam desfocados porque o ponto focal se forma antes da retina.',
            'hipermetropia': '<strong>Hipermetropia:</strong> Dificuldade para ver de perto. Pode causar fadiga visual ao tentar focar objetos próximos.',
            'daltonismo-protanopia': '<strong>Protanopia (Daltonismo):</strong> Ausência de cones sensíveis à luz vermelha. Tonalidades vermelhas tendem a parecer escurecidas ou acinzentadas.',
            'daltonismo-deuteranopia': '<strong>Deuteranopia (Daltonismo):</strong> Ausência de cones sensíveis à luz verde. Dificuldade para distinguir entre tons de verde, vermelho e amarelo.'
        };

        function updateSimulation() {
            const condition = simCondition.value;
            const val = simSlider.value;
            sliderValue.textContent = val + '%';
            simDescription.innerHTML = descriptions[condition];

            simImage.style.filter = 'none';
            simOverlay.style.backgroundColor = 'transparent';

            if (condition === 'miopia') {
                const blurPx = (val / 100) * 12;
                simImage.style.filter = `blur(${blurPx}px)`;
            } else if (condition === 'hipermetropia') {
                const blurPx = (val / 100) * 6;
                simImage.style.filter = `blur(${blurPx}px) contrast(${100 + (val/2)}%)`;
            } else if (condition === 'daltonismo-protanopia') {
                const opacity = (val / 100) * 0.7;
                simOverlay.style.backgroundColor = `rgba(0, 100, 200, ${opacity})`;
                simImage.style.filter = `grayscale(${val}%) sepia(${val/2}%)`;
            } else if (condition === 'daltonismo-deuteranopia') {
                const opacity = (val / 100) * 0.7;
                simOverlay.style.backgroundColor = `rgba(180, 100, 0, ${opacity})`;
                simImage.style.filter = `grayscale(${val * 0.8}%)`;
            }
        }

        simCondition.addEventListener('change', updateSimulation);
        simSlider.addEventListener('input', updateSimulation);
    }
});
