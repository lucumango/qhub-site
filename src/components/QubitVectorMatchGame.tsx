import React from "react";
import { BlockMath, InlineMath } from "react-katex";

type TargetKey = "oneQubit" | "twoQubits" | "dimensionN";
type DraggableId = "expr1Q" | "expr2Q" | "exprDim";

const DRAG_ITEMS: {
  id: DraggableId;
  latex: string;
  correctTarget: TargetKey;
}[] = [
  {
    id: "expr1Q",
    latex: "|\\psi\\rangle = \\begin{pmatrix} \\alpha \\\\ \\beta \\end{pmatrix}",
    correctTarget: "oneQubit",
  },
  {
    id: "exprDim",
    latex: "\\text{dim} = 2^n",
    correctTarget: "dimensionN",
  },
  {
    id: "expr2Q",
    latex:
      "|\\psi\\rangle = \\begin{pmatrix} c_{00} \\\\ c_{01} \\\\ c_{10} \\\\ c_{11} \\end{pmatrix}",
    correctTarget: "twoQubits",
  },
];

export function QubitVectorMatchGame() {
  const [targets, setTargets] = React.useState<
    Record<TargetKey, DraggableId | null>
  >({
    oneQubit: null,
    dimensionN: null,
    twoQubits: null,
  });

  const [feedback, setFeedback] = React.useState<string | null>(null);
  const [checked, setChecked] = React.useState(false);
  const [showHint, setShowHint] = React.useState(false);

  const matchedCount = (Object.values(targets) as (DraggableId | null)[]).filter(
    Boolean
  ).length;

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    id: DraggableId
  ) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, target: TargetKey) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain") as DraggableId | null;
    if (!id) return;

    setTargets((prev) => {
      const updated: Record<TargetKey, DraggableId | null> = { ...prev };
      // Evita que un ítem esté en dos casillas a la vez
      (Object.keys(updated) as TargetKey[]).forEach((k) => {
        if (updated[k] === id) updated[k] = null;
      });
      updated[target] = id;
      return updated;
    });

    setChecked(false);
    setFeedback(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const getItemById = (id: DraggableId | null) =>
    DRAG_ITEMS.find((d) => d.id === id) ?? null;

  const handleCheck = () => {
    let allFilled = true;
    let allCorrect = true;

    (Object.keys(targets) as TargetKey[]).forEach((t) => {
      const itemId = targets[t];
      if (!itemId) {
        allFilled = false;
        return;
      }
      const item = getItemById(itemId);
      if (!item || item.correctTarget !== t) {
        allCorrect = false;
      }
    });

    setChecked(true);

    if (!allFilled) {
      setFeedback("Completa las tres casillas antes de comprobar. 😉");
    } else if (allCorrect) {
      setFeedback(
        "¡Perfecto! Relacionaste bien los vectores de 1 y 2 qubits y la dimensión 2ⁿ. ✅"
      );
    } else {
      setFeedback("Hay al menos una casilla mal emparejada. Intenta reacomodar. 🔁");
    }
  };

  const handleReset = () => {
    setTargets({
      oneQubit: null,
      twoQubits: null,
      dimensionN: null,
    });
    setChecked(false);
    setFeedback(null);
    setShowHint(false);
  };

  const progressPercent = (matchedCount / 3) * 100;

  const targetHighlight = (target: TargetKey) => {
    if (!checked || !targets[target]) return "";
    const item = getItemById(targets[target]);
    if (!item) return "";
    return item.correctTarget === target
      ? "border-emerald-400 bg-emerald-50"
      : "border-rose-400 bg-rose-50";
  };

  return (
    <div className="mt-10 bg-white border border-gray-200 rounded-2xl shadow-lg px-5 py-6 md:px-7 md:py-7 space-y-6">
      {/* Cabecera actividad */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="mt-1 w-10 h-10 rounded-2xl bg-quantum-purple/10 flex items-center justify-center">
            <span className="text-2xl">🎮</span>
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-slate-900">
              Mini-reto: ¿qué vector corresponde a qué sistema?
            </h3>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Arrastra cada expresión matemática al cuadro que mejor describa su
              significado. 
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-[11px] font-semibold uppercase tracking-wide text-quantum-purple border border-purple-100">
          Actividad 1 · Notación vectorial
        </span>
      </div>

      {/* Progreso */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-600">
          <span>
            Progreso:{" "}
            <span className="font-semibold text-quantum-orange">
              {matchedCount}/3 casillas
            </span>
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-2 bg-gradient-to-r from-quantum-purple via-quantum-orange to-emerald-400 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Targets (huecos) */}
        <div className="space-y-4">
          {/* 1 qubit */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-2">
            <p className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <span className="inline-flex w-5 h-5 rounded-full bg-slate-800 text-white text-[11px] items-center justify-center">
                1
              </span>
              Estado general de un solo qubit
            </p>
            <p className="text-sm text-slate-600">
              Vector columna que guarda las amplitudes de{" "}
              <InlineMath math="|0\rangle" /> y <InlineMath math="|1\rangle" />.
            </p>
            <div
              onDrop={(e) => handleDrop(e, "oneQubit")}
              onDragOver={handleDragOver}
              className={`mt-2 h-24 rounded-lg border-2 border-dashed bg-white flex items-center justify-center px-2 text-center transition-colors ${targetHighlight(
                "oneQubit"
              ) || "border-gray-300"}`}
            >
              {targets.oneQubit ? (
                <BlockMath math={getItemById(targets.oneQubit)!.latex} />
              ) : (
                <span className="text-xs text-gray-400">
                  Arrastra aquí la expresión del vector de 1 qubit
                </span>
              )}
            </div>
          </div>

          {/* 2 qubits */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-2">
            <p className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <span className="inline-flex w-5 h-5 rounded-full bg-slate-800 text-white text-[11px] items-center justify-center">
                2
              </span>
              Estado general de dos qubits
            </p>
            <p className="text-sm text-slate-600">
              El vector incluye amplitudes para{" "}
              <InlineMath math="|00\rangle, |01\rangle, |10\rangle, |11\rangle" />.
            </p>
            <div
              onDrop={(e) => handleDrop(e, "twoQubits")}
              onDragOver={handleDragOver}
              className={`mt-2 h-24 rounded-lg border-2 border-dashed bg-white flex items-center justify-center px-2 text-center transition-colors ${targetHighlight(
                "twoQubits"
              ) || "border-gray-300"}`}
            >
              {targets.twoQubits ? (
                <BlockMath math={getItemById(targets.twoQubits)!.latex} />
              ) : (
                <span className="text-xs text-gray-400">
                  Arrastra aquí la expresión del vector de 2 qubits
                </span>
              )}
            </div>
          </div>

          {/* dimensión n qubits */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-2">
            <p className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <span className="inline-flex w-5 h-5 rounded-full bg-slate-800 text-white text-[11px] items-center justify-center">
                3
              </span>
              Dimensión del espacio para <InlineMath math="n" /> qubits
            </p>
            <p className="text-sm text-slate-600">
              ¿Cuántas componentes tiene el vector de estado cuando el sistema tiene{" "}
              <InlineMath math="n" /> qubits?
            </p>
            <div
              onDrop={(e) => handleDrop(e, "dimensionN")}
              onDragOver={handleDragOver}
              className={`mt-2 h-24 rounded-lg border-2 border-dashed bg-white flex items-center justify-center px-2 text-center transition-colors ${targetHighlight(
                "dimensionN"
              ) || "border-gray-300"}`}
            >
              {targets.dimensionN ? (
                <BlockMath math={getItemById(targets.dimensionN)!.latex} />
              ) : (
                <span className="text-xs text-gray-400">
                  Arrastra aquí la expresión con 2^n
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Draggables y pista */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-slate-900">
              Expresiones para arrastrar
            </p>
            <button
              type="button"
              onClick={() => setShowHint((v) => !v)}
              className="text-xs px-3 py-1 rounded-full border border-quantum-orange/60 text-quantum-orange bg-orange-50 hover:bg-orange-100 transition"
            >
              {showHint ? "Ocultar pista" : "Mostrar pista"}
            </button>
          </div>

          {showHint && (
            <div className="text-xs bg-orange-50 border border-orange-200 rounded-xl px-3 py-2 text-orange-900 space-y-1">
              <p className="font-semibold">Pista rápida:</p>
              <ul className="list-disc list-inside space-y-0.5">
                <li>
                  El vector de <strong>1 qubit</strong> tiene 2 entradas.
                </li>
                <li>
                  El de <strong>2 qubits</strong> tiene 4 amplitudes (una por cada
                  combinación de bits).
                </li>
                <li>
                  Con <InlineMath math="n" /> qubits siempre hay{" "}
                  <InlineMath math="2^n" /> componentes.
                </li>
              </ul>
            </div>
          )}

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
            <p className="text-xs text-slate-600 mb-1">
              Mantén presionado y arrastra cada tarjeta hacia el recuadro correcto.
            </p>
            <div className="flex flex-col gap-3">
              {DRAG_ITEMS.map((item) => {
                const isUsed = (Object.values(targets) as (DraggableId | null)[]).includes(
                  item.id
                );
                return (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.id)}
                    className={`cursor-grab active:cursor-grabbing rounded-xl border px-3 py-2 bg-white flex items-center justify-between shadow-sm transition ${
                      isUsed
                        ? "opacity-60 border-gray-300"
                        : "hover:-translate-y-0.5 hover:shadow-md border-gray-300"
                    }`}
                  >
                    <BlockMath math={item.latex} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Botones + feedback */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex gap-2">
          <button
            onClick={handleCheck}
            className="px-4 py-2 rounded-full bg-quantum-purple text-white text-sm font-semibold shadow hover:bg-quantum-purple/90 transition"
          >
            Comprobar respuestas
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-full border border-gray-300 text-slate-700 text-sm font-semibold bg-white hover:bg-gray-50 transition"
          >
            Reiniciar actividad
          </button>
        </div>

        {feedback && (
          <p className="text-sm text-slate-700 md:text-right">{feedback}</p>
        )}
      </div>

      <div className="pt-2 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-[11px] text-slate-500">
        <span className="italic text-quantum-purple/80">
          Próximo paso en el módulo: notación Dirac (bra-ket) ⟨ψ|.
        </span>
      </div>
    </div>
  );
}
