import React from "react";

const QuantumCircuit: React.FC = () => {
  return (
    <section
      className="mt-6 bg-gradient-to-r from-quantum-purple/5 to-quantum-orange/5 border border-quantum-purple/20 rounded-xl p-6 space-y-4"
    >
      <header>
        <h2 className="text-2xl font-semibold text-quantum-purple mb-2">
          Mini circuito 
        </h2>
      </header>
      <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  Arrasta las puertas para formar un mini circuito
                </p>
      <iframe
        title="QuantumHub Circuit"
        src="/qjs/quantumhub.html"
        style={{
          width: "100%",
          height: "800px",
          border: "none",
          display: "block",
          backgroundColor: "none",
        }}
      />

      <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  A medida que avanzas en computación cuántica, aprenderás a
                  leer estos diagramas casi como leer música: cada puerta, cada
                  línea y cada conexión tiene un significado preciso.
                </p>
    </section>
  );
};

export default QuantumCircuit;
