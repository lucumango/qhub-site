import React from "react";

const QuantumCircuit: React.FC = () => {
  return (
    <section
      style={{
        width: "100%",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        background: "#020617",
      }}
    >
      <header style={{ padding: "16px 20px" }}>
        <h2
          style={{
            margin: 0,
            fontSize: "18px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: "#e5e7eb",
          }}
        >
          CIRCUITO CUÁNTICO (3 QUBITS)
        </h2>
      </header>

      <iframe
        title="QuantumHub Circuit"
        src="/qjs/quantumhub.html"
        style={{
          width: "100%",
          height: "920px",
          border: "none",
          display: "block",
          background: "#020617",
        }}
      />
    </section>
  );
};

export default QuantumCircuit;
