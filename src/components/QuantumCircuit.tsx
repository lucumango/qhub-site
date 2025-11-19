import React from "react";

const QUIRK_URL =
  'https://algassert.com/quirk#circuit={"cols":[[1,1,1]]}';
// Esta URL inicializa un circuito con 3 líneas (3 qubits) y sin gates “reales”.
// Desde ahí la persona puede arrastrar compuertas igual que en la página original.

const QuantumCircuit: React.FC = () => {
  return (
    <section
      style={{
        width: "100%",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        background: "#f9fafb",
      }}
    >
      <header style={{ padding: "16px 20px" }}>
        <h2
          style={{
            margin: 0,
            fontSize: "18px",
            fontWeight: 700,
            letterSpacing: "0.08em",
          }}
        >
          CIRCUITO CUÁNTICO INTERACTIVO
        </h2>
      </header>

      <iframe
        title="Quantum circuit playground"
        src={QUIRK_URL}
        style={{
          width: "100%",
          height: "900px",
          border: "none",
          display: "block",
        }}
      />
    </section>
  );
};

export default QuantumCircuit;

