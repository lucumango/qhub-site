// GatesDragQuiz.tsx
import React from "react";

type GateIdQuiz = "I" | "X" | "H" | "T";

type QuizProblem = {
  id: string;
  initial: string;
  final: string;
  correct: GateIdQuiz;
  hint: string;
};

const PROBLEMS: QuizProblem[] = [
  {
    id: "p1",
    initial: "|0⟩",
    final: "|1⟩",
    correct: "X",
    hint: "Piensa en el NOT cuántico.",
  },
  {
    id: "p2",
    initial: "|0⟩",
    final: "(|0⟩ + |1⟩) / √2",
    correct: "H",
    hint: "La puerta que crea superposición uniforme.",
  },
  {
    id: "p3",
    initial: "|+⟩",
    final: "estado con fase π/4 en |1⟩",
    correct: "T",
    hint: "Es la que rota un poquito en torno al eje Z.",
  },
];

const GATE_LABELS: Record<GateIdQuiz, string> = {
  I: "Identidad (I)",
  X: "Pauli-X",
  H: "Hadamard (H)",
  T: "T gate",
};

const GatesDragQuiz: React.FC = () => {
  const [answers, setAnswers] = React.useState<
    Record<string, GateIdQuiz | null>
  >({
    p1: null,
    p2: null,
    p3: null,
  });

  const handleDrop = (problemId: string, gateId: GateIdQuiz) => {
    setAnswers((prev) => ({ ...prev, [problemId]: gateId }));
  };

  const isCorrect = (problem: QuizProblem) =>
    answers[problem.id] && answers[problem.id] === problem.correct;

  const handleDragStart = (e: React.DragEvent<HTMLButtonElement>, id: GateIdQuiz) => {
    e.dataTransfer.setData("gateId", id);
  };

  const handleDropArea = (e: React.DragEvent<HTMLDivElement>, problemId: string) => {
    e.preventDefault();
    const gateId = e.dataTransfer.getData("gateId") as GateIdQuiz;
    if (!gateId) return;
    handleDrop(problemId, gateId);
  };

  return (
    <div className="mt-10 bg-white rounded-2xl border border-gray-100 p-5 md:p-6 space-y-5">
      <h3 className="text-xl md:text-2xl font-staatliches text-quantum-purple">
        Quiz: ¿qué puerta transforma este estado?
      </h3>
      <p className="text-sm md:text-base text-gray-600">
        Arrastra una puerta desde la parte inferior hasta cada ejercicio
        para indicar qué operación lleva del{" "}
        <strong>estado inicial</strong> al <strong>estado final</strong>.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {PROBLEMS.map((p) => (
          <div
            key={p.id}
            className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col justify-between"
          >
            <div className="space-y-2 mb-3">
              <p className="text-xs font-semibold uppercase text-slate-500">
                Ejercicio
              </p>
              <p className="text-sm text-slate-800">
                <span className="font-mono">Estado inicial:</span>{" "}
                <span className="font-mono font-semibold">{p.initial}</span>
              </p>
              <p className="text-sm text-slate-800">
                <span className="font-mono">Estado final:</span>{" "}
                <span className="font-mono font-semibold">{p.final}</span>
              </p>
            </div>

            <div
              onDrop={(e) => handleDropArea(e, p.id)}
              onDragOver={(e) => e.preventDefault()}
              className={`flex items-center justify-center h-16 rounded-lg border-2 border-dashed text-xs text-center px-2 transition
              ${
                isCorrect(p)
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                  : answers[p.id]
                  ? "border-rose-400 bg-rose-50 text-rose-700"
                  : "border-slate-300 bg-white text-slate-400"
              }`}
            >
              {answers[p.id] ? (
                <span className="font-semibold">
                  {GATE_LABELS[answers[p.id] as GateIdQuiz]}
                </span>
              ) : (
                "Suelta aquí una puerta"
              )}
            </div>

            <p className="mt-2 text-[11px] text-slate-500">
              Pista: {p.hint}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase text-slate-500 mb-2">
          Puertas disponibles
        </p>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(GATE_LABELS) as GateIdQuiz[]).map((id) => (
            <button
              key={id}
              draggable
              onDragStart={(e) => handleDragStart(e, id)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold border border-slate-300 bg-white hover:bg-slate-100 cursor-grab active:cursor-grabbing"
            >
              {GATE_LABELS[id]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GatesDragQuiz;
