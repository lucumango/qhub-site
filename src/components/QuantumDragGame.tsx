import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const QuantumDragGame = () => {
  // Estado del colapso y los conteos
  const [measured, setMeasured] = useState(false);
  const [result, setResult] = useState(null);
  const [counts, setCounts] = useState({ zero: 0, one: 0 });

  // Probabilidades cuánticas (puedes hacerlas dinámicas después)
  const alpha = 0.6; // amplitud de |0>
  const beta = Math.sqrt(1 - alpha ** 2); // amplitud de |1>
  const prob0 = alpha ** 2;
  const prob1 = beta ** 2;

  const handleDrop = () => {
    const random = Math.random();
    const outcome = random < prob0 ? "|0⟩" : "|1⟩";

    setResult(outcome);
    setMeasured(true);
    setCounts(prev => ({
      zero: prev.zero + (outcome === "|0⟩" ? 1 : 0),
      one: prev.one + (outcome === "|1⟩" ? 1 : 0),
    }));
  };

  const handleReset = () => {
    setMeasured(false);
    setResult(null);
  };

  const chartData = {
    labels: ["|0⟩", "|1⟩"],
    datasets: [
      {
        label: "Frecuencia de resultados",
        data: [counts.zero, counts.one],
        backgroundColor: ["#7E22CE", "#F97316"],
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#444" },
      },
      x: {
        ticks: { color: "#444" },
      },
    },
    plugins: {
      legend: { display: false },
      title: {
        display: false,
      },
    },
  };

  return (
    <div className="bg-white rounded-xl p-8 text-center shadow-md border border-purple-200 mt-6">
      <h3 className="text-2xl font-staatliches text-quantum-purple mb-4">
        Simula una medición cuántica
      </h3>
      <p className="text-gray-700 mb-6 max-w-lg mx-auto font-flatory">
        Arrastra el <strong>medidor</strong> hacia el qubit para realizar una medición.
        Cada medición hace que el estado colapse en |0⟩ o |1⟩ con probabilidades:
       
      </p>

      <div className="flex justify-center items-center gap-10 mb-8">
        <div
          draggable
          onDragStart={handleReset}
          onDragEnd={handleDrop}
          className="w-20 h-20 bg-quantum-orange text-white rounded-full flex items-center justify-center shadow-lg cursor-grab text-3xl hover:scale-105 transition-transform"
        >
          🧭
        </div>

        <div
          className={`w-24 h-24 rounded-full transition-all duration-500 flex items-center justify-center text-3xl font-staatliches ${
            measured
              ? result === "|0⟩"
                ? "bg-quantum-purple text-white"
                : "bg-quantum-orange text-white"
              : "bg-gradient-to-br from-purple-200 to-orange-100 text-gray-800"
          }`}
        >
          {measured ? result : "ψ"}
        </div>
      </div>

      {measured && (
        <p className="mt-4 text-quantum-purple font-semibold animate-fade-in">
          El qubit ha colapsado en <strong>{result}</strong>
        </p>
      )}

      {/* 📊 Gráfico de resultados */}
      <div className="mt-10">
        <Bar data={chartData} options={chartOptions} />
      </div>

      <button
        onClick={() => setCounts({ zero: 0, one: 0 })}
        className="mt-8 px-6 py-2 rounded-full bg-quantum-purple text-white hover:bg-purple-700 transition-all"
      >
        Reiniciar conteo
      </button>
    </div>
  );
};

export default QuantumDragGame;
