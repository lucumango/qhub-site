import { useState, useEffect } from "react";

const AlphaBetaSlider = () => {
  const [alpha, setAlpha] = useState(0.5);
  const [beta, setBeta] = useState(Math.sqrt(1 - 0.5 ** 2));

  useEffect(() => {
    setBeta(Math.sqrt(1 - alpha ** 2));
  }, [alpha]);

  // valores al cuadrado
  const alpha2 = (alpha ** 2).toFixed(3);
  const beta2 = (beta ** 2).toFixed(3);
  const suma = (alpha ** 2 + beta ** 2).toFixed(3);

  return (
    <div className="bg-gradient-to-br from-white to-purple-50 p-6 rounded-xl shadow text-center mt-10 mb-10">
      <p className="text-gray-700 mb-4">
        Ajusta el valor de <strong>α</strong> y observa cómo cambia <strong>β</strong> automáticamente.  
        Notarás que la condición <code>|α|² + |β|² = 1</code> siempre se cumple.
      </p>

      {/* sliders */}
      <div className="flex flex-col gap-6 max-w-md mx-auto">
        <div>
          <label className="text-purple-700 font-semibold">α (alfa)</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={alpha}
            onChange={(e) => setAlpha(parseFloat(e.target.value))}
            className="w-full accent-purple-500"
          />
          <p className="text-gray-800">α = {alpha.toFixed(2)}</p>
        </div>

        <div>
          <label className="text-orange-500 font-semibold">β (beta)</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={beta}
            readOnly
            className="w-full accent-quantum-orange cursor-not-allowed"
          />
          <p className="text-gray-800">β = {beta.toFixed(2)}</p>
        </div>
      </div>

      {/* círculos animados */}
      <div className="flex justify-center items-center gap-6 mt-8">
        <div
          className="w-16 h-16 rounded-full bg-purple-400 shadow-lg transition-transform duration-700"
          style={{ transform: `scale(${alpha + 0.5})` }}
        ></div>
        <div
          className="w-16 h-16 rounded-full bg-quantum-orange shadow-lg transition-transform duration-700"
          style={{ transform: `scale(${beta + 0.5})` }}
        ></div>
      </div>

      {/* tabla interactiva */}
      <div className="overflow-x-auto mt-8">
        <table className="min-w-[320px] mx-auto text-sm text-gray-800 border border-gray-300 rounded-lg shadow-sm">
          <thead className="bg-gradient-to-r from-purple-100 to-orange-100">
            <tr>
              <th className="py-2 px-4 border-b font-semibold text-purple-800">Variable</th>
              <th className="py-2 px-4 border-b font-semibold text-purple-800">Valor</th>
              <th className="py-2 px-4 border-b font-semibold text-purple-800">Elevado al cuadrado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b text-purple-700 font-medium">α (alfa)</td>
              <td className="py-2 px-4 border-b">{alpha.toFixed(3)}</td>
              <td className="py-2 px-4 border-b">{alpha2}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b text-orange-600 font-medium">β (beta)</td>
              <td className="py-2 px-4 border-b">{beta.toFixed(3)}</td>
              <td className="py-2 px-4 border-b">{beta2}</td>
            </tr>
            <tr className="bg-gradient-to-r from-purple-50 to-orange-50">
              <td className="py-2 px-4 font-semibold text-gray-700">Suma</td>
              <td className="py-2 px-4 text-gray-600">—</td>
              <td className="py-2 px-4 font-semibold text-green-700">{suma}</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-3 text-sm text-gray-600">
          💡 Observa que sin importar cómo ajustes <strong>α</strong>, la suma de <strong>|α|² + |β|²</strong> siempre será <strong>1</strong>.
        </p>
      </div>
    </div>
  );
};

export default AlphaBetaSlider;

