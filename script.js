function converterPorcentagemParaGraus(porcentagem) {
    let graus = (porcentagem / 100) * 360;
    return graus;
}

// Exemplo de uso no seu input do simulador:
const inputPorcentagem = document.getElementById('input-porcentagem'); // ajuste o id conforme seu elemento
const valorPorcentagem = parseFloat(inputPorcentagem.value);
const valorEmGraus = converterPorcentagemParaGraus(valorPorcentagem);

console.log(`${valorPorcentagem}% equivale a ${valorEmGraus}°`);
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

let indiceAtual = 0;
let pontuacao = 0;

function carregarPergunta() {
    const container = document.getElementById('quiz-container');
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

// Inicializar Quiz ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    carregarPergunta();
});
// Acessibilidade: Contraste
const btnContraste = document.getElementById('btn-contraste');
if (btnContraste) {
    btnContraste.addEventListener('click', () => {
        document.body.classList.toggle('alto-contraste');
    });
}

// Acessibilidade: Controle do tamanho da fonte
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
    // Lógica do Simulador (Porcentagem para Graus)
const inputPorcentagem = document.getElementById('input-porcentagem');
const btnConverter = document.getElementById('btn-converter');
const resultadoSimulador = document.getElementById('resultado-simulador');
const valorGrausDisplay = document.getElementById('valor-graus');

if (btnConverter && inputPorcentagem) {
    btnConverter.addEventListener('click', () => {
        const valorPorcentagem = parseFloat(inputPorcentagem.value);

        if (isNaN(valorPorcentagem) || valorPorcentagem < 0 || valorPorcentagem > 100) {
            alert('Por favor, insira um valor válido entre 0 e 100%.');
            return;
        }

        // Conversão: (Porcentagem / 100) * 360
        const graus = (valorPorcentagem / 100) * 360;

        // Exibe o resultado formatado
        valorGrausDisplay.textContent = `${graus.toFixed(1)}°`;
        resultadoSimulador.classList.remove('hidden');
    });
}
}