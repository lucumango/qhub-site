/* Tutorial súper simple: sólo resalta zonas y muestra texto */

let tutorialStep = 0;
let tutorialTimeout;

const tutorialSteps = [
  {
    title: "¡Bienvenido mago cuántico!",
    content:
      "Dale vida a tus propios circuitos cuánticos, arrastra y conecta compuertas para modificar el estado de los qubits.",
    highlight: null,
    hint: null,
  },
  {
    title: "Panel de compuertas",
    content:
      "Desde aquí puedes arrastrar compuertas hacia el circuito para aplicarlas sobre los qubits.",
    highlight: ".Q-circuit-palette",
    hint: null,
    anchor: ".Q-circuit-palette"
  },
  {
    title: "Circuito",
    content:
      "Este es el espacio donde construyes tu circuito. Cada fila representa un qubit y cada columna un paso temporal. Aquí se colocan las compuertas que modifican su estado.",
    highlight: ".Q-circuit-board-container",
    hint: null,
    anchor: "#playground"
  },
  {
    title: "Controles",
    content:
      "En esta barra encontrarás herramientas como deshacer, rehacer y opciones adicionales.",
    highlight: "#playground .Q-circuit-toolbar, .Q-circuit-toolbar",
    hint: null,
    anchor: ".Q-circuit-toolbar"
  },
  {
    title: " C – Operación controlada",
    content:
      "Este botón activa las operaciones controladas. Primero selecciona la compuerta de control y la compuerta objetivo, luego presiona C para vincularlas.",
    highlight: ".Q-circuit-toggle-control",
    hint: null,
    anchor: ".Q-circuit-toolbar"
  },
  {
    title: "S – Swap",
    content:
      "El botón S permite intercambiar el estado de dos líneas del circuito. Selecciona dos posiciones y luego presiona S para aplicar la operación Swap.",
    highlight: ".Q-circuit-toggle-swap",
    hint: null,
    anchor: ".Q-circuit-toolbar"
    
  },
  
  {
    title: "Probabilidades de resultado",
    content:
      "Esta sección muestra las probabilidades de obtener cada resultado al medir el circuito. Se actualiza automáticamente mientras editas el circuito.",
    highlight: ".prob-box",
    hint: null,
    anchor: "#probabilities-wrapper"
  },
  {
    title: "¡Listo!",
    content:
      "Ya conoces las partes esenciales del editor. Explora, combina compuertas y observa cómo tus cambios afectan el comportamiento cuántico.",
    highlight: null,
    hint: null,
  },
];

function startTutorial() {
  tutorialStep = 0;
  const overlay = document.getElementById("tutorialOverlay");
  if (!overlay) {
    console.error("No se encontró #tutorialOverlay en el DOM.");
    return;
  }
  overlay.classList.add("active");
  showTutorialStep();
}

function showTutorialStep() {
  if (tutorialStep >= tutorialSteps.length) {
    closeTutorial();
    localStorage.setItem("tutorialCompleted", "true");
    return;
  }

  const step = tutorialSteps[tutorialStep];
  const title = document.getElementById("tutorialTitle");
  const content = document.getElementById("tutorialContent");
  const nextBtn = document.getElementById("tutorialNextBtn");

  if (!title || !content || !nextBtn) {
    console.error("Elementos del overlay de tutorial incompletos.");
    return;
  }

  title.textContent = step.title;
  content.textContent = step.content;
  nextBtn.textContent =
    tutorialStep === tutorialSteps.length - 1 ? "Finalizar" : "Siguiente";

  clearHighlights();

  if (step.highlight) {
    const els = document.querySelectorAll(step.highlight);
    if (els.length > 0) {
      els.forEach((el) => el.classList.add("tutorial-highlight"));
      if (step.hint) {
        // Usamos el primer elemento para colocar el hint
        showHint(els[0], step.hint);
      }
    }
  }
  positionTutorialBox(step);
}

function nextTutorialStep() {
  tutorialStep++;
  showTutorialStep();
}

function skipTutorial() {
  closeTutorial();
}

function closeTutorial() {
  clearHighlights();
  const overlay = document.getElementById("tutorialOverlay");
  if (overlay) {
    overlay.classList.remove("active");
  }
}

function positionTutorialBox(step) {
  const overlay = document.getElementById("tutorialOverlay");
  const box = document.querySelector(".tutorial-box");
  if (!overlay || !box) return;

  // Reset a posición por defecto (abajo centrado)
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  box.style.position = "relative";
  box.style.top = "";
  box.style.left = "";
  box.style.transform = "";

  // Si el paso no tiene anchor -> posición normal
  if (!step.anchor) return;

  const target = document.querySelector(step.anchor);
  if (!target) return;

  const rect = target.getBoundingClientRect();
  const boxRect = box.getBoundingClientRect();

  // POSICIONAMIENTO POR DEFECTO -> debajo del anchor
  let top = rect.bottom + 16;
  let placeAbove = false;

  // Si no entra abajo, mover arriba
  if (top + boxRect.height > window.innerHeight - 20) {
    placeAbove = true;
  }

  // Si está muy cerca del fondo, también arriba
  if (step.id === "results") {
    placeAbove = true;
  }

  // POSICIÓN ARRIBA DEL ELEMENTO
  if (placeAbove) {
    top = rect.top - boxRect.height - 16;
  }

  const left = rect.left;

  // Hacemos la card absoluta sobre la pantalla
  box.style.position = "fixed";
  box.style.top = `${top}px`;
  box.style.left = `${left}px`;
  box.style.transform = "none";

  // Evitar que el flex center la mueva
  overlay.style.alignItems = "flex-start";
}


function clearHighlights() {
  document
    .querySelectorAll(".tutorial-highlight")
    .forEach((el) => el.classList.remove("tutorial-highlight"));
  document.querySelectorAll(".tutorial-hint").forEach((el) => el.remove());
}

/* Utilidad para mostrar el globito de ayuda */

function showHint(element, text) {
  const rect = element.getBoundingClientRect();
  const hint = document.createElement("div");
  hint.className = "tutorial-hint";
  hint.textContent = text;
  hint.style.position = "fixed";
  hint.style.left = rect.left + rect.width / 2 + "px";
  hint.style.top = rect.top - 10 + "px";
  hint.style.transform = "translateX(-50%)";
  document.body.appendChild(hint);
}


/* Arranque automático SIEMPRE */
window.addEventListener("DOMContentLoaded", () => {
  tutorialTimeout = setTimeout(() => {
    startTutorial();
  }, 400);
});


/* Reabrir desde el botón de ayuda */
window.addEventListener("click", function (e) {
  if (e.target.classList.contains("help-button")) {
    startTutorial();
  }
});
