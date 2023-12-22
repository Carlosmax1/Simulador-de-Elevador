// Variáveis
let andares = 10;
let fila = [];
let elevadores = [
  {
    nome: "A",
    andarAtual: 0,
    direcao: "Parado",
    status: "Porta Fechada",
    atendendoRequisicao: false,
  },
  {
    nome: "B",
    andarAtual: 0,
    direcao: "Parado",
    status: "Porta Fechada",
    atendendoRequisicao: false,
  },
];

// Pegando os Elementos HTML
const elevadorA = document.getElementById("elevadorA");
const elevadorB = document.getElementById("elevadorB");
const form = document.querySelector("form");
const inputOrigem = document.getElementById("origem");
const inputDestino = document.getElementById("destino");
const filaStatusList = document.getElementById("fila-status-list");

// Função para simular o sleep
async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function atualizarEstadoVisual() {
  elevadorA.innerHTML = `
    <h1>Elevador A</h1>
    <span id="andarAtualA">Andar atual: ${elevadores[0].andarAtual}</span>
    <span id="direcaoA">Direção: ${elevadores[0].direcao}</span>
    <span id="statusA">Status: ${elevadores[0].status}</span>
  `;
  elevadorB.innerHTML = `
    <h1>Elevador B</h1>
    <span id="andarAtualB">Andar atual: ${elevadores[1].andarAtual}</span>
    <span id="direcaoB">Direção: ${elevadores[1].direcao}</span>
    <span id="statusB">Status: ${elevadores[1].status}</span>
  `;

  // Atualizar a fila de requisições
  filaStatusList.innerHTML = "";
  fila.forEach((requisicao, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `Requisição ${index + 1}: Origem ${
      requisicao.origem
    }, Destino ${requisicao.destino}, Status: ${
      requisicao.atendida ? "Atendida" : "Aguardando"
    }`;
    filaStatusList.appendChild(listItem);
  });
}

async function atenderFila() {
  // Verificar se nenhum elevador está atendendo e ajustar o estado
  const todosElevadoresParados = elevadores.every(
    (elevador) =>
      elevador.status === "PortaFechada" && !elevador.atendendoRequisicao
  );

  if (todosElevadoresParados) {
    elevadores.forEach((elevador) => {
      elevador.status = "PortaFechada";
      elevador.direcao = "Aguardando";
    });
    atualizarEstadoVisual();
  }

  while (fila.length > 0) {
    const elevadorDisponivel = escolherMelhorElevadorDisponivel();

    if (elevadorDisponivel) {
      const requisicao = fila.shift();
      await atenderRequisicao(requisicao, elevadorDisponivel);
    } else {
      await sleep(1000);
    }
  }
}

function escolherMelhorElevadorDisponivel() {
  const elevadoresDisponiveis = elevadores.filter(
    (elevador) =>
      elevador.status === "Porta Fechada" && !elevador.atendendoRequisicao
  );

  if (elevadoresDisponiveis.length === 0) {
    return null;
  }

  const melhorElevador = elevadoresDisponiveis[0];

  melhorElevador.atendendoRequisicao = true;

  return melhorElevador;
}

async function atenderRequisicao(requisicao, elevador) {
  requisicao.atendida = true;

  elevador.direcao =
    requisicao.origem > elevador.andarAtual ? "Subindo" : "Descendo";
  while (elevador.andarAtual !== requisicao.origem) {
    elevador.andarAtual += elevador.direcao === "Subindo" ? 1 : -1;
    atualizarEstadoVisual();
    await sleep(1000);
  }

  elevador.status = "PortaAberta";
  atualizarEstadoVisual();
  await sleep(5000);

  // Determinar a nova direção após o fechamento da porta
  elevador.direcao =
    requisicao.destino > elevador.andarAtual ? "Subindo" : "Descendo";

  while (elevador.andarAtual !== requisicao.destino) {
    elevador.andarAtual += elevador.direcao === "Subindo" ? 1 : -1;
    atualizarEstadoVisual();
    await sleep(1000);
  }

  elevador.status = "Porta Fechada";
  elevador.atendendoRequisicao = false;
  atualizarEstadoVisual();

  // Continuar atendendo a fila após concluir a requisição atual
  atenderFila();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const origem = parseInt(inputOrigem.value);
  const destino = parseInt(inputDestino.value);

  if (!isNaN(origem) && !isNaN(destino)) {
    if (origem > 10 || destino > 10) {
      return alert("Informações inválidas");
    }
    if (origem < 0 || destino < 0) {
      return alert("Informações inválidas");
    }
    const todosElevadoresParados = elevadores.every(
      (elevador) =>
        elevador.status === "Porta Fechada" && !elevador.atendendoRequisicao
    );

    if (todosElevadoresParados) {
      elevadores.forEach((elevador) => {
        elevador.status = "Porta Fechada";
        elevador.direcao = "Aguardando";
      });
      atualizarEstadoVisual();
    }

    fila.push({
      origem,
      destino,
      atendida: false,
    });

    // Iniciar o atendimento da fila se nenhum elevador estiver atendendo
    atenderFila();
    inputDestino.value = "";
    inputOrigem.value = "";
  }
});
