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
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(quizQuestions.length).fill(null));
  const [finished, setFinished] = useState(false);

  const handleAnswer = (idx: number) => {
    const newAnswers = [...answers];
    newAnswers[current] = idx;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (current < quizQuestions.length - 1) {
      setCurrent(current + 1);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const handleFinish = () => {
    setFinished(true);
  };

  const score = answers.reduce((acc, ans, i) => {
    return ans === quizQuestions[i].correct ? acc + 1 : acc;
  }, 0);

  if (finished) {
    return (
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center shadow">
        <h3 className="text-xl font-bold text-quantum-purple mb-4">Resultados</h3>
        <p className="text-lg text-gray-700">
          Obtuviste <strong>{score}</strong> de {quizQuestions.length} respuestas correctas 🎉
        </p>
      </div>
    );
  }

  const q = quizQuestions[current];

  return (
    <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 shadow">
      <h3 className="text-lg font-bold text-quantum-purple mb-4">Quiz: Superposición</h3>
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

      <p className="mt-4 text-sm text-gray-500 text-center">
        Pregunta {current + 1} de {quizQuestions.length}
      </p>
    </div>
  );
};

export default QuizSuperposicion;
