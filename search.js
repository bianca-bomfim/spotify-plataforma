// BOM DIA | BOA TARDE | BOA NOITE
const greetingElement = document.getElementById("greeting");
const currentHour = new Date().getHours();

const greetingMessage =
  currentHour >= 5 && currentHour < 12
    ? "Bom dia"
    : currentHour >= 12 && currentHour < 18
    ? "Boa tarde"
    : "Boa noite";

greetingElement.textContent = greetingMessage;

// GRID INTELIGENTE
const container = document.querySelector(".offer__list-item");

// Função para atualizar colunas da grid
function updateGridColumns() {
  const containerWidth = container.offsetWidth;
  const cardMinWidth = 180; // largura mínima de cada card
  let numColumns = Math.floor(containerWidth / cardMinWidth);

  // Pelo menos 1 coluna, e nunca mais de 5 (ou ajuste máximo que quiser)
  numColumns = Math.max(1, Math.min(numColumns, 5));

  container.style.gridTemplateColumns = `repeat(${numColumns}, minmax(${cardMinWidth}px, 1fr))`;
}

// Observa mudanças no tamanho do container
const observer = new ResizeObserver(updateGridColumns);
observer.observe(container);

// Atualiza a grid ao redimensionar a janela
window.addEventListener("resize", updateGridColumns);

// Inicializa a grid ao carregar
updateGridColumns();
