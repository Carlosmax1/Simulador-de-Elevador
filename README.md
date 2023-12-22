Simulador de Elevador - Lógica
O código JavaScript fornecido implementa um simulador básico de elevadores. A seguir, descreverei a lógica por trás do código:

Variáveis e Elementos HTML
O código inicia declarando variáveis para representar o número de andares (andares), uma fila de requisições (fila), e uma matriz de objetos que representam os elevadores (elevadores). Cada elevador é definido por suas propriedades como nome, andar atual, direção, status da porta, e se está atendendo uma requisição.

O código também obtém elementos HTML relevantes, como os elementos que representam visualmente os elevadores (elevadorA e elevadorB), o formulário para entrada de requisições (form), e os campos de origem e destino (inputOrigem e inputDestino).

Função de Sleep
Há uma função sleep(ms) que é utilizada para simular a passagem do tempo, aguardando por um determinado número de milissegundos.

Atualização Visual
A função atualizarEstadoVisual() é responsável por atualizar a representação visual dos elevadores e da fila de requisições no HTML.

Atendimento da Fila
A função atenderFila() é responsável por verificar se há requisições na fila e atribuir um elevador disponível para atender cada requisição. Se todos os elevadores estiverem parados, eles são configurados para o estado de "Aguardando".

Escolha do Melhor Elevador
A função escolherMelhorElevadorDisponivel() seleciona o melhor elevador disponível para atender uma requisição. Atualmente, considera o primeiro elevador disponível na lista.

Atendimento de Requisição
A função atenderRequisicao(requisicao, elevador) simula o processo de um elevador atendendo uma requisição específica. O elevador move-se até o andar de origem, abre a porta, aguarda um período de simulação de "porta aberta", move-se até o andar de destino, fecha a porta, e marca a requisição como atendida.

Evento de Submissão do Formulário
O código adiciona um ouvinte de evento ao formulário para capturar a submissão. Quando o formulário é submetido, verifica se os valores inseridos nos campos de origem e destino são válidos (dentro da faixa de andares). Se válidos, uma nova requisição é adicionada à fila, e a função atenderFila() é chamada para iniciar o atendimento.

Validação de Andares
Foi adicionada uma validação para garantir que os andares de origem e destino estejam dentro da faixa válida (de 0 a andares - 1). Caso contrário, um alerta é exibido informando ao usuário para inserir andares válidos.

Conclusão
O código simula o funcionamento básico de elevadores, movendo-se entre andares para atender requisições da fila. As funções de simulação de tempo (sleep) e a atualização visual tornam a simulação mais realista.
