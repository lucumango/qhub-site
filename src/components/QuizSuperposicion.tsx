import { useState } from "react";

const quizQuestions = [
  {
    question: "¿Qué significa la superposición en un qubit?",
    options: [
      "Que el qubit está indefinido y no tiene estado.",
      "Que el qubit puede ser 0 y 1 a la vez hasta ser medido.",
      "Que el qubit cambia entre 0 y 1 muy rápido.",
    ],
    correct: 1,
  },
  {
    question: "¿Qué condición cumplen los coeficientes α y β?",
    options: [
      "Que ambos sean números enteros.",
      "Que |α|² + |β|² = 1 (probabilidades suman 100%).",
      "Que su suma sea exactamente 10.",
    ],
    correct: 1,
  },
  {
    question: "Si |α|² = 0.36, ¿cuál debe ser el valor de |β|² para que el qubit esté normalizado?",
    options: ["0.64", "0.50", "0.36"],
    correct: 0,
  },
  {
    question: "¿Qué pasa cuando se mide un qubit en superposición?",
    options: [
      "El qubit se destruye inmediatamente.",
      "El qubit colapsa a 0 o 1 con ciertas probabilidades.",
      "El qubit se queda siempre en ambos estados.",
    ],
    correct: 1,
  },
  {
    question: "¿Qué ejemplo cotidiano ayuda a entender la superposición?",
    options: [
      "Una lámpara encendida o apagada.",
      "Una moneda que está en cara y sello al mismo tiempo hasta que la ves.",
      "Un coche moviéndose en dos calles a la vez.",
    ],
    correct: 1,
  },
];

const QuizSuperposicion = () => {
  const [step, setStep] = useState<"intro" | "quiz" | "results">("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(quizQuestions.length).fill(null));

  const handleAnswer = (idx: number) => {
    const newAnswers = [...answers];
    newAnswers[current] = idx;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (current < quizQuestions.length - 1) setCurrent(current + 1);
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleFinish = () => setStep("results");
  const handleRestart = () => {
    setAnswers(Array(quizQuestions.length).fill(null));
    setCurrent(0);
    setStep("intro");
  };

  const score = answers.reduce((acc, ans, i) => (ans === quizQuestions[i].correct ? acc + 1 : acc), 0);
  const q = quizQuestions[current];

  return (
    <div className="relative bg-purple-50 border border-purple-200 rounded-2xl shadow-lg p-8 text-center transition-all duration-500 min-h-[480px] flex flex-col justify-center items-center">
      {/* 🟣 Pantalla inicial */}
      {step === "intro" && (
        <div className="animate-fade-in-up">
          <img
            src="/gato.png"
            alt="Schrödi"
            className="w-28 mx-auto mb-4 animate-float-slow drop-shadow-[0_8px_30px_rgba(255,115,0,0.3)]"
          />
          <h2 className="text-3xl font-staatliches text-quantum-purple mb-2">
            ¡Pon a prueba tus conocimientos!
          </h2>
          <p className="text-gray-700 mb-6 font-flatory max-w-md mx-auto">
            Schrödi te acompañará mientras respondes preguntas sobre superposición y normalización cuántica.  
            Algunas requieren pensar como un verdadero físico 🧮✨
          </p>
          <button
            onClick={() => setStep("quiz")}
            className="px-6 py-3 bg-quantum-purple text-white rounded-full font-semibold hover:bg-quantum-orange transition-all shadow-md hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]"
          >
            Comenzar 🧠
          </button>
        </div>
      )}

      {/* 🧩 Preguntas */}
      {step === "quiz" && (
        <div className="w-full max-w-xl mx-auto animate-fade-in-up">
          <h3 className="text-lg font-bold text-quantum-purple mb-4">
            Quiz: Superposición y Normalización
          </h3>
          <p className="mb-4 font-semibold text-gray-800">{q.question}</p>

          <div className="space-y-2">
            {q.options.map((opt, idx) => (
              <label
                key={idx}
                className={`block px-3 py-2 rounded-lg cursor-pointer border transition ${
                  answers[current] === idx
                    ? "bg-quantum-purple text-white border-quantum-purple"
                    : "bg-white hover:bg-gray-100 border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name={`q-${current}`}
                  checked={answers[current] === idx}
                  onChange={() => handleAnswer(idx)}
                  className="hidden"
                />
                {opt}
              </label>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrev}
              disabled={current === 0}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Anterior
            </button>

            {current < quizQuestions.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-lg bg-quantum-orange text-white font-semibold hover:bg-orange-600"
              >
                Siguiente
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="px-4 py-2 rounded-lg bg-quantum-purple text-white font-semibold hover:bg-purple-700"
              >
                Terminar
              </button>
            )}
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Pregunta {current + 1} de {quizQuestions.length}
          </p>
        </div>
      )}

      {/* 🎉 Resultados */}
      {step === "results" && (
        <div className="animate-fade-in-up">
          <img
            src="/gato.png"
            alt="Schrödi feliz"
            className="w-24 mx-auto mb-4 animate-float-slow drop-shadow-[0_6px_25px_rgba(255,115,0,0.3)]"
          />
          <h3 className="text-2xl font-staatliches text-quantum-purple mb-2">¡Resultados!</h3>
          <p className="text-lg text-gray-700 mb-6">
            Obtuviste <strong>{score}</strong> de {quizQuestions.length} respuestas correctas 🎉
          </p>
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-quantum-orange text-white rounded-full font-semibold hover:bg-orange-600 transition-all shadow-md hover:shadow-[0_0_25px_rgba(249,115,22,0.4)]"
          >
            Intentar de nuevo 🔁
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizSuperposicion;

