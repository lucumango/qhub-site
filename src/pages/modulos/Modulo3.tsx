// App.jsx
import React, { useState, useMemo } from "react";

/*
  Simulación simple de un qubit con puertas: X, Y, H, Z.
  Drag & drop desde la barra de puertas a la línea de circuito.
  Se aplica la secuencia al estado inicial |0> = [1, 0].
*/

// Matrices complejas representadas como arrays de pairs [re, im]
const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
const cadd = (a, b) => [a[0] + b[0], a[1] + b[1]];

const complex = (re, im = 0) => [re, im];

const conj = (a) => [a[0], -a[1]];

const cmulScalar = (a, scalar) => [a[0] * scalar, a[1] * scalar];

const norm2 = (a) => a[0] * a[0] + a[1] * a[1];

const stateNorm = (v) => Math.sqrt(norm2(v[0]) + norm2(v[1]));

const normalize = (v) => {
  const n = stateNorm(v);
  if (n === 0) return [complex(1, 0), complex(0, 0)];
  return [cmulScalar(v[0], 1 / n), cmulScalar(v[1], 1 / n)];
};

const addVectors = (a, b) => [cadd(a[0], b[0]), cadd(a[1], b[1])];

const matMulVec = (m, v) => {
  // m is 2x2 array of complex, v is length-2 complex array
  const r0 = addVectors(cmul(m[0][0], v[0]), cmul(m[0][1], v[1]));
  const r1 = addVectors(cmul(m[1][0], v[0]), cmul(m[1][1], v[1]));
  return [r0, r1];
};

const gates = {
  X: {
    name: "X",
    matrix: [
      [complex(0), complex(1)], // [0,1]
      [complex(1), complex(0)], // [1,0]
    ],
    desc: "NOT",
  },
  Y: {
    name: "Y",
    matrix: [
      [complex(0), complex(0, -1)], // [0, -i]
      [complex(0, 1), complex(0)], // [i, 0]
    ],
    desc: "Pauli-Y",
  },
  Z: {
    name: "Z",
    matrix: [
      [complex(1), complex(0)],
      [complex(0), complex(-1)],
    ],
    desc: "Pauli-Z",
  },
  H: {
    name: "H",
    matrix: (() => {
      const s = 1 / Math.sqrt(2);
      return [
        [complex(s), complex(s)],
        [complex(s), complex(-s)],
      ];
    })(),
    desc: "Hadamard",
  },
};

function applySequence(sequence) {
  // initial |0> = [1, 0]
  let state = [complex(1), complex(0)];
  sequence.forEach((g) => {
    state = matMulVec(gates[g].matrix, state);
  });
  // normalize small numeric error
  state = normalize(state);
  return state;
}

function probsFromState(state) {
  const p0 = norm2(state[0]);
  const p1 = norm2(state[1]);
  const sum = p0 + p1;
  return { p0: p0 / sum, p1: p1 / sum };
}

function blochFromState(state) {
  // compute Bloch vector (x,y,z) from state [a,b] where a,b complex
  // x = 2 Re(a* conj(b))
  // y = 2 Im(a* conj(b))
  // z = |a|^2 - |b|^2
  const a = state[0];
  const b = state[1];
  const aconj = conj(a);
  const a_conj_b = cmul(aconj, b);
  const x = 2 * a_conj_b[0];
  const y = 2 * a_conj_b[1];
  const z = norm2(a) - norm2(b);
  return { x, y, z };
}

export default function App() {
  const [sequence, setSequence] = useState([]); // array of gate names
  const [draggingGate, setDraggingGate] = useState(null);

  const state = useMemo(() => applySequence(sequence), [sequence]);
  const probs = useMemo(() => probsFromState(state), [state]);
  const bloch = useMemo(() => blochFromState(state), [state]);

  const onDragStart = (e, gateName) => {
    e.dataTransfer.setData("text/plain", gateName);
    setDraggingGate(gateName);
  };

  const onDragEnd = () => setDraggingGate(null);

  const onDrop = (e) => {
    e.preventDefault();
    const gateName = e.dataTransfer.getData("text/plain");
    if (gates[gateName]) {
      setSequence((s) => [...s, gateName]);
    }
    setDraggingGate(null);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const removeGateAt = (index) =>
    setSequence((s) => s.filter((_, i) => i !== index));

  const clearSequence = () => setSequence([]);

  // Small renderer for Bloch 2D projection
  const BlochCanvas = ({ x, y }) => {
    // x,y in [-1,1]
    const size = 160;
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 8;
    const arrowX = cx + x * r;
    const arrowY = cy - y * r;
    return (
      <svg width={size} height={size} className="bloch">
        <circle cx={cx} cy={cy} r={r} fill="white" stroke="#444" strokeWidth="2"/>
        <line x1={cx} y1={cy} x2={arrowX} y2={arrowY} stroke="#2b6cb0" strokeWidth="3" strokeLinecap="round"/>
        <circle cx={arrowX} cy={arrowY} r="6" fill="#2b6cb0" />
        <text x="8" y={size - 10} fontSize="11" fill="#333">Proyección XY</text>
      </svg>
    );
  };

  return (
    <div className="app">
      <header>
        <h1>Simulador de qubit - arrastra puertas al circuito</h1>
        <p>Estado inicial: |0&gt; — arrastra X, Y, H o Z al área inferior.</p>
      </header>

      <main>
        <aside className="palette">
          <h3>Puertas</h3>
          <div className="gatesList">
            {Object.keys(gates).map((k) => (
              <div
                key={k}
                className="gateCard"
                draggable
                onDragStart={(e) => onDragStart(e, k)}
                onDragEnd={onDragEnd}
                title={gates[k].desc}
              >
                <strong>{k}</strong>
              </div>
            ))}
          </div>

          <div className="infoBox">
            <h4>Estado actual</h4>
            <div className="stateRow">
              <div>
                <div className="label">α (amp |0⟩)</div>
                <div className="value">
                  {state[0][0].toFixed(4)} {state[0][1] >= 0 ? "+" : "-"} {Math.abs(state[0][1]).toFixed(4)}i
                </div>
              </div>
              <div>
                <div className="label">β (amp |1⟩)</div>
                <div className="value">
                  {state[1][0].toFixed(4)} {state[1][1] >= 0 ? "+" : "-"} {Math.abs(state[1][1]).toFixed(4)}i
                </div>
              </div>
            </div>

            <div className="probs">
              <div>Prob(|0⟩): {(probs.p0 * 100).toFixed(2)}%</div>
              <div>Prob(|1⟩): {(probs.p1 * 100).toFixed(2)}%</div>
            </div>

            <div className="blochContainer">
              <BlochCanvas x={bloch.x} y={bloch.y} />
              <div className="blochNums">
                <div>x: {bloch.x.toFixed(3)}</div>
                <div>y: {bloch.y.toFixed(3)}</div>
                <div>z: {bloch.z.toFixed(3)}</div>
              </div>
            </div>
          </div>
        </aside>

        <section className="circuitArea">
          <h3>Circuito</h3>
          <div
            className="dropZone"
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <div className="wire">
              <div className="wireStart">|0&gt;</div>

              <div className="slots">
                {sequence.length === 0 && (
                  <div className="placeholder">Arrastra puertas aquí</div>
                )}

                {sequence.map((g, idx) => (
                  <div key={idx} className="slot">
                    <div className="gateInSlot">
                      <strong>{g}</strong>
                      <button className="removeBtn" onClick={() => removeGateAt(idx)}>✕</button>
                    </div>
                    <div className="arrow">→</div>
                  </div>
                ))}
              </div>

              <div className="wireEnd">Resultado</div>
            </div>
          </div>

          <div className="controls">
            <button onClick={clearSequence} className="btn">Limpiar secuencia</button>
            <button
              onClick={() => {
                // Añadir ejemplos
                setSequence(["H"]);
              }}
              className="btn"
            >
              Ej: H
            </button>
            <button
              onClick={() => {
                setSequence(["H", "X"]);
              }}
              className="btn"
            >
              Ej: H then X
            </button>
          </div>

          <div className="resultPanel">
            <h4>Resultado</h4>
            <div className="resultText">
              <div>
                Estado final vector: [ {state[0][0].toFixed(4)} {state[0][1] >= 0 ? "+" : "-"} {Math.abs(state[0][1]).toFixed(4)}i , {state[1][0].toFixed(4)} {state[1][1] >= 0 ? "+" : "-"} {Math.abs(state[1][1]).toFixed(4)}i ]
              </div>
              <div>Probabilidades → |0⟩: {(probs.p0 * 100).toFixed(2)}% , |1⟩: {(probs.p1 * 100).toFixed(2)}%</div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <small>Hecho para tu módulo 3 — simula puertas básicas y observa el resultado.</small>
      </footer>
    </div>
  );
}