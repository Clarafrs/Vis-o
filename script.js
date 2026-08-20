<script>
    // 1. Barra de Progresso de Leitura
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById("progress-bar").style.width = scrolled + "%";
    });

    // 2. Interatividade do FAQ
    document.querySelectorAll('.faq-btn').forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const icon = button.querySelector('span:last-child');
            content.classList.toggle('hidden');
            icon.textContent = content.classList.contains('hidden') ? '+' : '−';
        });
    });

    // 3. Lógica do Simulador de Visão (Convertido para Graus)
    const simImage = document.getElementById('sim-image');
    const simOverlay = document.getElementById('sim-overlay');
    const simCondition = document.getElementById('sim-condition');
    const simSlider = document.getElementById('sim-slider');
    const sliderValue = document.getElementById('slider-value');
    const simDescription = document.getElementById('sim-description');

    const MAX_GRAUS = 6.0; // Máximo de graus simulados (100% = 6.00 graus)

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
        
        // Converte de % (0-100) para graus
        const graus = ((val / 100) * MAX_GRAUS).toFixed(2);

        // Atualiza a exibição de texto
        if (condition === 'normal') {
            sliderValue.textContent = '0.00 Grau';
        } else if (condition.startsWith('daltonismo')) {
            sliderValue.textContent = val + '%';
        } else {
            sliderValue.textContent = graus + ' Graus';
        }

        simDescription.innerHTML = descriptions[condition];

        // Limpa filtros anteriores
        simImage.style.filter = 'none';
        simOverlay.style.backgroundColor = 'transparent';

        // Aplica as alterações visuais
        if (condition === 'miopia') {
            const blurPx = graus * 2; 
            simImage.style.filter = `blur(${blurPx}px)`;
        } else if (condition === 'hipermetropia') {
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

    // Escuta mudanças na seleção e no controle deslizante
    simCondition.addEventListener('change', updateSimulation);
    simSlider.addEventListener('input', updateSimulation);

    // Executa uma vez ao carregar a página para definir o estado inicial
    updateSimulation();
</script>