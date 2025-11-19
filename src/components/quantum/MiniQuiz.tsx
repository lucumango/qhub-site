import { useState } from 'react';

type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

const MiniQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const questions: Question[] = [
    {
      id: 1,
      question: '¿Qué es el entrelazamiento cuántico?',
      options: [
        'Un tipo de enlace químico entre partículas',
        'Una conexión entre partículas que permite la comunicación instantánea',
        'Una propiedad donde el estado de una partícula depende de otra, sin importar la distancia',
        'Un método para enfriar átomos a temperaturas cercanas al cero absoluto'
      ],
      correctAnswer: 2,
      explanation: 'El entrelazamiento cuántico es un fenómeno en el que las partículas cuánticas permanecen conectadas de tal manera que el estado de una partícula depende del estado de la otra, independientemente de la distancia que las separe.'
    },
    {
      id: 2,
      question: '¿Qué famoso científico se refirió al entrelazamiento cuántico como "acción fantasmal a distancia"?',
      options: [
        'Niels Bohr',
        'Albert Einstein',
        'Werner Heisenberg',
        'Erwin Schrödinger'
      ],
      correctAnswer: 1,
      explanation: 'Albert Einstein se refirió al entrelazamiento cuántico como "spukhafte Fernwirkung" (acción fantasmal a distancia) porque le resultaba difícil aceptar sus implicaciones sobre la naturaleza de la realidad cuántica.'
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setCurrentQuestion((prev) => (prev + 1) % questions.length);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-center">{questions[currentQuestion].question}</h3>
      
      <div className="space-y-3">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            className={`w-full p-3 rounded-lg text-left transition-colors ${
              selectedAnswer === index
                ? index === questions[currentQuestion].correctAnswer
                  ? 'bg-green-100 border-2 border-green-500'
                  : 'bg-red-100 border-2 border-red-500'
                : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
            }`}
            onClick={() => !showResult && handleAnswer(index)}
            disabled={showResult}
          >
            {option}
          </button>
        ))}
      </div>

      {showResult && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="font-medium">
            {selectedAnswer === questions[currentQuestion].correctAnswer
              ? '¡Correcto!'
              : 'Incorrecto. La respuesta correcta es:'}
          </p>
          {selectedAnswer !== questions[currentQuestion].correctAnswer && (
            <p className="mt-1 font-medium">
              {questions[currentQuestion].options[questions[currentQuestion].correctAnswer]}
            </p>
          )}
          <p className="mt-2 text-sm text-gray-700">
            {questions[currentQuestion].explanation}
          </p>
          <button
            onClick={nextQuestion}
            className="mt-3 px-4 py-2 bg-quantum-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Siguiente pregunta
          </button>
        </div>
      )}

      <div className="text-center text-sm text-gray-500">
        Pregunta {currentQuestion + 1} de {questions.length}
      </div>
    </div>
  );
};

export default MiniQuiz;