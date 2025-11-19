import React, { useLayoutEffect, useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Lightbulb} from "lucide-react";


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  SectionCard,
} from "@/components/ui/card";
import { motion } from "framer-motion";

import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";
import { Link } from "react-router-dom";
import QuantumCircuit from "@/components/QuantumCircuit";
import QuantumPlayground from "@/components/QuantumPlayground";
import { BlochSphere } from "@/components/BlochSphere";
import { QubitVectorMatchGame } from "@/components/QubitVectorMatchGame";
import BlochSphereOverview from "@/components/BlochSphereOverview";

// Dentro de tu archivo del módulo (donde ya tienes SectionCard, BlockMath, InlineMath, etc.)
import GateBlochPreview from "@/components/GateBlochPreview";
import { GateSymbolLine } from "@/components/GateSymbolLine";
import GatesDragQuiz from "@/components/GatesDragQuiz";

// ---- configs de puertas ----
type GateId = "I" | "X" | "Y" | "Z" | "H" | "S" | "T";

type SingleGateConfig = {
  id: GateId;
  title: string;
  subtitle: string;
  matrix: string;
  fromLabel: string;
  toLabel: string;
  blochFrom: [number, number, number];
  blochTo: [number, number, number];
  bullets: string[];
};

const SINGLE_QUBIT_GATES: SingleGateConfig[] = [
  {
    id: "I",
    title: "Identidad (I)",
    subtitle: "No cambia el estado, pero también es una puerta.",
    matrix: "I = \\begin{pmatrix}1 & 0 \\\\ 0 & 1\\end{pmatrix}",
    fromLabel: "|ψ⟩",
    toLabel: "|ψ⟩",
    blochFrom: [0, 1, 0],
    blochTo: [0, 1, 0],
    bullets: [
      "Deja el qubit exactamente en el mismo estado.",
      "Sirve como “espera” o para alinear pasos en un circuito.",
    ],
  },
  {
    id: "X",
    title: "Pauli-X",
    subtitle: "El NOT cuántico: intercambia |0⟩ y |1⟩.",
    matrix: "X = \\begin{pmatrix}0 & 1 \\\\ 1 & 0\\end{pmatrix}",
    fromLabel: "|0⟩",
    toLabel: "|1⟩",
    blochFrom: [0, 1, 0],  // +Z
    blochTo: [0, -1, 0],   // -Z
    bullets: [
      "Equivalente al NOT clásico.",
      "Es una rotación de π alrededor del eje X de la esfera de Bloch.",
    ],
  },
  {
    id: "Y",
    title: "Pauli-Y",
    subtitle: "Como X, pero rotando alrededor del eje Y.",
    matrix: "Y = \\begin{pmatrix}0 & -i \\\\ i & 0\\end{pmatrix}",
    fromLabel: "|0⟩",
    toLabel: "|1⟩ (con fase)",
    blochFrom: [0, 1, 0],
    blochTo: [0, -1, 0],
    bullets: [
      "También lleva |0⟩ a |1⟩, pero pasando por el eje Y (añade fase).",
      "Rotación de π alrededor del eje Y en la esfera de Bloch.",
    ],
  },
  {
    id: "Z",
    title: "Pauli-Z",
    subtitle: "Invierte la fase de |1⟩, sin cambiar las probabilidades.",
    matrix: "Z = \\begin{pmatrix}1 & 0 \\\\ 0 & -1\\end{pmatrix}",
    fromLabel: "|+⟩",
    toLabel: "|-⟩",
    blochFrom: [0, 1, 0],
    blochTo: [0, 1, 0],
    bullets: [
      "A |0⟩ no le afecta: Z|0⟩ = |0⟩.",
      "A |1⟩ le cambia el signo: Z|1⟩ = -|1⟩.",
      "Rotación de π alrededor del eje Z (solo cambia la fase).",
    ],
  },
  {
    id: "H",
    title: "Hadamard (H)",
    subtitle: "Crea superposición uniforme a partir de |0⟩ o |1⟩.",
    matrix:
      "H = \\tfrac{1}{\\sqrt{2}}\\begin{pmatrix}1 & 1 \\\\ 1 & -1\\end{pmatrix}",
    fromLabel: "|0⟩",
    toLabel: "|+⟩ = (|0⟩+|1⟩)/\\sqrt{2}",
    blochFrom: [0, 1, 0],  // +Z
    blochTo: [1, 0, 0],    // +X
    bullets: [
      "Envía |0⟩ al estado |+⟩ y |1⟩ al estado |-⟩.",
      "Es una rotación de π alrededor de un eje a mitad de camino entre X y Z.",
      "Es la puerta estándar para “encender” la superposición.",
    ],
  },
  {
    id: "S",
    title: "Phase gate (S)",
    subtitle: "Rotación de 90° alrededor de Z.",
    matrix: "S = \\begin{pmatrix}1 & 0 \\\\ 0 & i\\end{pmatrix}",
    fromLabel: "|+⟩",
    toLabel: "|+i⟩",
    blochFrom: [1, 0, 0],  // +X
    blochTo: [0, 0, 1],    // +Y
    bullets: [
      "Gira el estado un cuarto de vuelta alrededor del eje Z.",
      "A |0⟩ no le hace nada; a |1⟩ le añade una fase i.",
      "S = T² (es decir, dos T gates seguidas).",
    ],
  },
  {
    id: "T",
    title: "T gate",
    subtitle: "Rotación de 45° alrededor de Z (π/4).",
    matrix: "T = \\begin{pmatrix}1 & 0 \\\\ 0 & e^{i\\pi/4}\\end{pmatrix}",
    fromLabel: "|+⟩",
    toLabel: "estado con fase π/4",
    blochFrom: [1, 0, 0],
    blochTo: [
      Math.SQRT1_2,
      0,
      Math.SQRT1_2,
    ], // mitad entre X e Y
    bullets: [
      "Da una “media S”: rotación de π/4 alrededor del eje Z.",
      "Aparece mucho en algoritmos por ser una puerta no-Clifford.",
      "Dos T seguidas equivalen a una S gate.",
    ],
  },
];

const SingleGateCard: React.FC<{ gate: SingleGateConfig }> = ({ gate }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3 flex flex-col">
    <div className="flex items-center justify-between gap-2">
      <div>
        <h3 className="text-2xl font-semibold text-slate-900">{gate.title}</h3>
        <p className="text-lg text-slate-500">{gate.subtitle}</p>
      </div>
      <span className="px-2 py-1 rounded-lg bg-quantum-purple text-white text-xs font-semibold">
        1 qubit
      </span>
    </div>

    <GateSymbolLine label={gate.id} />

    <div className="mt-2">
      <BlockMath math={gate.matrix} />
      <p className="mt-1 text-lf font-semibold text-red-500">
        Ejemplo: {gate.fromLabel} → {gate.toLabel}
      </p>
    </div>

    <ul className="mt-1 list-disc list-inside text-sm text-gray-700 space-y-1 flex-1">
      {gate.bullets.map((b) => (
        <li key={b}>{b}</li>
      ))}
    </ul>

    <GateBlochPreview from={gate.blochFrom} to ={gate.blochTo} />
  </div>
);

// ---- CNOT card ----
const CNOTCard: React.FC = () => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
    <div className="flex items-center justify-between gap-2">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">
          Puerta CNOT (controlled-NOT)
        </h3>
        <p className="text-xs text-slate-500">
          Una puerta de <strong>dos qubits</strong> que actúa como interruptor.
        </p>
      </div>
      <span className="px-2 py-1 rounded-lg bg-quantum-purple text-white text-xs font-semibold">
        2 qubits
      </span>
    </div>

    <GateSymbolLine label="CNOT" qubits={2} />

    <div className="mt-2 space-y-2 text-sm text-gray-700">
      <p>
        El qubit de arriba es el <strong>control</strong> y el de abajo el{" "}
        <strong>objetivo</strong>.
      </p>
      <ul className="list-disc list-inside space-y-1">
        <li>
          Si el control está en <InlineMath math="|0\rangle" />: el objetivo{" "}
          <strong>no cambia</strong>.
        </li>
        <li>
          Si el control está en <InlineMath math="|1\rangle" />: al objetivo se
          le aplica una puerta X (se hace NOT).
        </li>
      </ul>
    </div>

    <div className="bg-slate-50 rounded-xl p-3 text-sm text-gray-700 space-y-1">
      <p className="font-semibold">En notación de matrices:</p>
      <BlockMath math={String.raw`
\text{CNOT} =
\begin{pmatrix}
1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & 0 & 1 \\
0 & 0 & 1 & 0
\end{pmatrix}
`} />
      <p className="text-xs text-slate-500">
        El orden de la base es{" "}
        <InlineMath math="|00\rangle, |01\rangle, |10\rangle, |11\rangle" />.
      </p>
    </div>
  </div>
);



const sections = [
  { id: "bit-cuantico", title: "Bit Cuántico" },
  { id: "notacion-vector", title: "Representación Vectorial" },
  { id: "notacion-ket", title: "Notación Dirac" },
  { id: "esfera-bloch", title: "Esfera de Bloch" },
  { id: "puertas-cuanticas", title: "Puertas Cuánticas" },
  { id: "circuito-cuantico", title: "Circuito Cuántico" },
  { id: "cierre", title: "Cierre del Módulo" },
];

export function Modulo4() {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar
        sections={sections}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        backLink="/aprendizaje"
      />

      {/* Contenido principal */}
      <div className="flex-1">
        {/* HERO */}
        <div className="relative bg-background">
          <section className="relative py-20 bg-gradient-quantum-hero min-h-screen flex items-center justify-center">
            {/* Partículas moradas */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-purple-400 rounded-full"
                  initial={{
                    x:
                      Math.random() *
                      (typeof window !== "undefined" ? window.innerWidth : 1000),
                    y:
                      Math.random() *
                      (typeof window !== "undefined"
                        ? window.innerHeight
                        : 800),
                    opacity: 0,
                  }}
                  animate={{
                    y: [null, Math.random() * 800 - 400],
                    x: [null, Math.random() * 1000 - 500],
                    opacity: [0, 0.8, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: Math.random() * 8 + 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 5,
                  }}
                  style={{
                    filter: "blur(1px)",
                    boxShadow: "0 0 10px rgba(168, 85, 247, 0.6)",
                  }}
                />
              ))}

              {/* Partículas naranjas */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`orange-${i}`}
                  className="absolute w-1.5 h-1.5 bg-orange-400 rounded-full"
                  initial={{
                    x:
                      Math.random() *
                      (typeof window !== "undefined" ? window.innerWidth : 1000),
                    y:
                      Math.random() *
                      (typeof window !== "undefined"
                        ? window.innerHeight
                        : 800),
                    opacity: 0,
                  }}
                  animate={{
                    y: [null, Math.random() * 600 - 300],
                    x: [null, Math.random() * 800 - 400],
                    opacity: [0, 0.6, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 10 + 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 7,
                  }}
                  style={{
                    filter: "blur(0.5px)",
                    boxShadow: "0 0 8px rgba(251, 146, 60, 0.5)",
                  }}
                />
              ))}
            </div>

            <div className="bg-gradient-to-br from-red-500 via-yellow-300 to-blue-500" />

            <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
              <motion.h1
                className="text-4xl md:text-6xl font-staatliches text-white mb-6"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <strong className="text-quantum-orange">Módulo 4:</strong>{" "}
                Puertas y circuitos cuánticos
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto font-flatory leading-relaxed mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                El viaje final: de qubits y vectores, a puertas y circuitos cuánticos.
              </motion.p>

              <motion.div
                className="relative max-w-4xl mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="grid md:grid-cols-[auto_1fr] gap-6 items-center">
                  {/* Schrödi */}
                  <motion.div
                    className="relative mx-auto md:mx-0"
                    animate={{ y: [0, -15, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-quantum-orange/40 to-quantum-purple/40 rounded-full blur-3xl scale-110 animate-pulse" />
                    <div className="relative">
                      <img
                        src="/mascota/schrodi-mod4.png"
                        loading="lazy"
                        alt="Schrödi, tu guía cuántico"
                        className="lg:h-80 object-contain drop-shadow-2xl relative z-10"
                      />
                    </div>
                  </motion.div>

                  {/* Globo de diálogo */}
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    <div
                      className="hidden md:block absolute left-[-10px] top-1/2 transform -translate-x-2 -translate-y-1/2 w-0 h-0 
                          border-t-[15px] border-t-transparent
                          border-r-[20px] border-r-white/10
                          border-b-[15px] border-b-transparent
                          backdrop-blur-xl"
                      style={{
                        filter: "drop-shadow(-2px 0 4px rgba(0,0,0,0.1))",
                      }}
                    />
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                      <p className="font-arimo italic text-lg md:text-xl text-white leading-relaxed">
                        ¡Llegaste al último módulo! 🎉
                        <br />
                        <span className="text-gray-300">
                          Ahora no solo entenderás qué es un qubit, sino cómo lo
                          movemos, lo giramos y lo hacemos trabajar dentro de
                          circuitos cuánticos reales.
                        </span>
                        <br />
                        <span className="text-quantum-orange font-bold mt-2 inline-block">
                          Es el final del camino… pero el inicio de una nueva aventura.
                        </span>
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex flex-col items-center gap-2 text-white/60">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </div>
              </motion.div>
            </div>
          </section>
        </div>

        {/* CONTENIDO */}
        <section className="py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-24">

            {/* EL QUBIT */}
            <SectionCard id="bit-cuantico">
              <CardHeader className="p-0 mb-6">
                <h2 className="text-3xl md:text-5xl font-staatliches text-quantum-purple mb-4">
                  Bit Cuántico
                </h2>
              </CardHeader>
              <CardContent className="p-0 space-y-8">
                {/* Schrödi */}
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src="/gato.png"
                    alt="Schrödi"
                    className="w-16 h-16 animate-float-slow"
                  />
                  <div className="bg-purple-100 text-lg text-purple-800 px-4 py-2 rounded-xl shadow">
                    Antes de aprender a programar una computadora cuántica…
                    primero tienes que conocer al protagonista de todo:{" "}
                    <strong>el qubit</strong>
                  </div>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  Un <strong>bit cuántico</strong> o qubit es la versión cuántica de un bit clásico. Como sabemos,
                  en computación clásica la unidad mínima de información es el{" "}
                  <strong>bit</strong>, el cual puede valer únicamente <InlineMath math= "  0" /> o <InlineMath math="1" />. 
                  
                  Por otro lado, en computación cuántica, un qubit puede ser representado como 
                  una superposición de <InlineMath math="|0\rangle" /> o <InlineMath math="|1\rangle" />. 
                </p>

                <div className="grid md:grid-cols-1 gap-8">
  <div className="bg-white rounded-xl p-6 shadow border border-gray-100 mx-auto">
    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-12">
      {/* Texto */}
      <div className="flex-1">
        <h3 className="text-2xl font-semibold text-quantum-purple mb-2">
          Lo peculiar...
        </h3>
        <p className="text-lg text-gray-700 leading-relaxed">
          A diferencia de un bit clásico, que por sí solo “no puede hacer mucho”,
          un solo qubit ya puede exhibir fenómenos puramente cuánticos como 
          la superposición y los cambios de fase. Eso significa que, incluso sin tener muchos 
          qubits, un único qubit ya puede realizar trabajo cuántico útil.
        </p>
      </div>

      {/* Imagen decorativa */}
      <div className="mt-3 md:mt-0">
        <div className="relative">
          {/* Glow de fondo */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-quantum-purple/40 via-quantum-orange/40 to-indigo-400/40 blur-xl opacity-80" />
          
          <div className="relative rounded-2xl bg-slate-900/95 border border-white/10 p-3 shadow-xl">
            <img
              src="/quantum-bit.gif"
              alt="Representación visual de un qubit"
              loading="lazy"
              className="w-56 h-56 md:w-60 md:h-60 object-contain mb-2 drop-shadow-[0_0_18px_rgba(255,255,255,0.6)]"
            />

            {/* Etiqueta flotante */}
            <div className="px-3 py-2 rounded-full bg-white/90 text-xs font-semibold text-slate-800 shadow-lg text-center">
              Qubit en superposición
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
                </div>

                <div className="mt-8">
                  <Card className="bg-gradient-to-br from-quantum-orange/20 to-quantum-orange/10 border-quantum-orange/40 shadow-2xl backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-quantum-orange shadow-lg">
                          <img
                            src="/mascota/schrodi-profile.png"
                            loading="lazy"
                            alt="Schrödi"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardTitle className="font-staatliches text-quantum-orange text-2xl">
                          Recordemos
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-quantum-orange/10 p-6 rounded-xl border-l-4 border-quantum-orange">
                        <p className="text-lg text-gray-700 leading-relaxed">
                          Matemáticamente, el estado  general de un qubit se escribe como una
                          combinación de los estados base <InlineMath math="|0\rangle" /> y{" "}
                          <InlineMath math="|1\rangle" />:
                        </p>

                        <div className="text-lg">
                          <BlockMath math="|\psi\rangle = \alpha |0\rangle + \beta |1\rangle" />
                        </div>

                        <p className="text-lg text-gray-700 leading-relaxed">
                          Aquí, <InlineMath math="\alpha" /> y <InlineMath math="\beta" /> son{" "}
                          <strong>amplitudes complejas</strong> y para que el estado sea físicamente válido, debe estar{" "}
                          <strong>normalizado</strong>, es decir, la suma de sus módulos al cuadrado tiene que
                          ser 1:
                        </p>

                        <div className="text-lg">
                          <BlockMath math="|\alpha|^2 + |\beta|^2 = 1" />
                        </div>

                      </div>
                    </CardContent>
                  </Card>
                </div>
    
              </CardContent>
            </SectionCard>

            {/* REPRESENTACIÓN VECTORIAL */}
            <SectionCard id="notacion-vector">
              <CardHeader className="p-0 mb-6">
                <h2 className="text-3xl md:text-5xl font-staatliches text-quantum-purple mb-4">
                  Representación vectorial
                </h2>
                {/* Schrödi */}
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src="/gato.png"
                    alt="Schrödi"
                    className="w-16 h-16 animate-float-slow"
                  />
                  <div className="bg-purple-100 text-lg text-purple-800 px-4 py-2 rounded-xl shadow">
                    Recordando lo aprendido en el <Link to="/aprendizaje/modulo3" className="font-bold underline hover:text-purple-900">
                      Módulo 3,
                  </Link> ¡ahora veremos cómo 
                    representar estos estados cuánticos usando vectores 
                    para poder manipularlos matemáticamente!
                  </div>
                </div>
    
              </CardHeader>
              <CardContent className="p-0 space-y-8">
                <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  El estado de un solo qubit se describe  
                  mediante un vector columna de dos elementos. Este vector 
                  se llama vector de estado cuántico, 
                  y se representa con la notación <InlineMath math="|\psi\rangle"/>
                  .
                  Como un qubit tiene dos estados distinguibles (el "0" y el "1"), su vector 
                  debe tener dos dimensiones. 
                </p>

                <div className="flex" >
                  <QubitDimensionNote />

                 <div className="grid md:grid-cols-1 gap-8">
                  <div className="bg-white rounded-xl p-6 shadow border border-gray-100">
                    <h3 className="text-2xl font-semibold text-quantum-purple mb-3">
                      Estados base: |0⟩ y |1⟩
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                      Toda la física del qubit se construye a partir de dos
                      estados muy simples, llamados base computacional:
                    </p>
                    <div className="space-y-4">
                      <div>
                        <BlockMath math="|0\rangle = \begin{pmatrix}1 \\ 0 \end{pmatrix}" />
                        <p className="text-gray-700 text-lg mt-1">
                          <strong>Estado Cero:</strong> el qubit tiene probabilidad 100% de medir 0.
                        </p>
                      </div>
                      <div>
                        <BlockMath math="|1\rangle = \begin{pmatrix}0 \\ 1 \end{pmatrix}" />
                        <p className="text-gray-700 text-lg mt-1">
                          <strong>Estado Uno:</strong> el qubit tiene probabilidad 100% de medir 1.
                        </p>
                      </div>
                    </div>
                  </div>
      
                </div>
                </div>

                <div className="bg-white rounded-xl shadow p-6 border border-gray-100">

                <h3 className="text-2xl font-semibold text-quantum-purple mb-3">
                  Sistemas de Múltiples Qubits
                </h3>
                
                <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  Para <strong>dos qubits</strong>, el número de resultados
                  posibles se duplica por cada qubit. Con 2 qubits, hay 4 posibles resultados:
                  </p>
                  <ul className="list-disc list-inside text-lg text-gray-700 mt-2 space-y-1">
                    <li>|00⟩</li>
                    <li>|01⟩</li>
                    <li>|10⟩</li>
                    <li>|11⟩</li>
                  </ul>
                  <p className="mt-4 text-lg text-gray-700">
                    Un estado general de 2 qubits se escribe como:
                  </p>
                  <BlockMath math="|\psi\rangle = \begin{pmatrix} c_{00}\\ c_{01} \\ c_{10}\\ c_{11}\end{pmatrix}" />
                  <p className="mt-2 text-lg text-gray-700">
                    Donde cada componente es la amplitud asociada a cada uno de
                    los resultados |00⟩, |01⟩, |10⟩, |11⟩.
                  </p>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  En general, para <InlineMath math="n" /> qubits necesitamos un
                  vector de dimensión <InlineMath math="2^n" />. Esta
                  explosión exponencial es parte del poder (y el reto) de la
                  computación cuántica.
                </p>

                <QubitVectorMatchGame />

              </CardContent>
            </SectionCard>

           {/* NOTACIÓN DIRAC */}
            <SectionCard id="notacion-ket">
              <CardHeader className="p-0 mb-6">
                <h2 className="text-3xl md:text-5xl font-staatliches text-quantum-purple mb-2">
                  Notación Dirac (Bra–ket)
                </h2>
                <CardDescription className="text-base md:text-lg text-muted-foreground">
                  Una forma compacta y elegante de escribir los mismos vectores que ya
                  vimos… pero al estilo físico cuántico.
                </CardDescription>
              </CardHeader>

              <CardContent className="p-0 space-y-8">
                {/* Intro suave */}
                <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  Hasta ahora hemos escrito estados cuánticos como{" "}
                  <strong>vectores columna</strong>. La notación de{" "}
                  <strong>Dirac</strong>, también llamada{" "}
                  <strong>notación bra–ket</strong>, es solo otra forma de escribir esos
                  mismos vectores, pero mucho más cómoda cuando trabajamos con muchos
                  qubits y operaciones.
                </p>

                {/* Bloquecito tipo “Bra-ket notation” */}
                <div className="rounded-2xl bg-sky-50 border border-sky-100 px-6 py-4 shadow-sm text-center space-y-2">
                  
                  <p className="text-base md:text-lg text-slate-700">
                    Es una manera corta de escribir ciertos{" "}
                    <button className="inline-flex items-center px-2 py-0.5 rounded-full bg-white border border-sky-200 text-xs font-semibold text-sky-700">
                      vectores
                    </button>{" "}
                    usados en física cuántica, que luce así:
                  </p>
                  <p className="text-2xl md:text-3xl font-semibold text-quantum-orange">
                    ⟨bra<span className="mx-1 text-slate-500">|</span>ket⟩
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* 1. El ket */}
                  <div className="bg-white border border-gray-100 rounded-xl px-6 py-5 shadow-sm space-y-4">
                    <h3 className="text-xl font-semibold text-quantum-purple">
                      1. El ket: <InlineMath math="|\psi\rangle" />
                    </h3>

                    <p className="text-lg text-gray-700 leading-relaxed">
                      Un <strong>ket</strong> es simplemente un{" "}
                      <strong>vector columna</strong> que representa un estado cuántico.
                      Para un solo qubit:
                    </p>

                    <div className="text-lg">
                      <BlockMath math="|\psi\rangle = \begin{pmatrix}\alpha \\ \beta\end{pmatrix}" />
                    </div>

                    <p className="text-lg text-gray-700 leading-relaxed">
                      En notación Dirac, escribimos exactamente el mismo estado como:
                    </p>

                    <div className="text-lg">
                      <BlockMath math="|\psi\rangle = \alpha\,|0\rangle + \beta\,|1\rangle" />
                    </div>

                    <ul className="list-disc list-inside text-base text-gray-700 space-y-1">
                      <li>
                        <InlineMath math="\alpha" /> es la amplitud del estado{" "}
                        <InlineMath math="|0\rangle" />.
                      </li>
                      <li>
                        <InlineMath math="\beta" /> es la amplitud del estado{" "}
                        <InlineMath math="|1\rangle" />.
                      </li>
                      <li>
                        Siguen siendo números complejos y deben cumplir{" "}
                        <InlineMath math="|\alpha|^2 + |\beta|^2 = 1" />.
                      </li>
                    </ul>
                  </div>

                  {/* 2. Bra vs ket */}
                  <div className="bg-white border border-gray-100 rounded-xl px-6 py-5 shadow-sm space-y-4">
                    <h3 className="text-xl font-semibold text-quantum-purple">
                      2. El bra: <InlineMath math="\langle\psi|" /> (compañero del ket)
                    </h3>

                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                      Si el ket <InlineMath math="|\psi\rangle" /> es un vector columna,
                      el <strong>bra</strong> <InlineMath math="\langle\psi|" /> es su{" "}
                      <strong>vector fila conjugado transpuesto</strong>. Es decir:
                    </p>

                    <div className="text-lg">
                      <BlockMath
                        math={String.raw`|\psi\rangle = \begin{pmatrix}\alpha \\ \beta\end{pmatrix}
                        \quad\Longrightarrow\quad
                        \langle\psi| = \begin{pmatrix}\alpha^* & \beta^*\end{pmatrix}`}
                      />
                    </div>

                    <div className="mt-2 rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-sm md:text-base text-gray-700 space-y-2">
                      <p className="font-semibold">Ejemplo rápido:</p>
                      <p>
                        Si{" "}
                        <InlineMath
                          math={String.raw`|a\rangle = \begin{pmatrix}2 - 3i \\ 6 + 4i \\ 3 - i\end{pmatrix}`}
                        />{" "}
                        entonces su bra es:
                      </p>
                      <BlockMath
                        math={String.raw`\langle a| = \begin{pmatrix} 2 + 3i & 6 - 4i & 3 + i \end{pmatrix}`}
                      />
                      <p>
                        Observa que ahora los valores están{" "}
                        <strong>en una fila</strong> y hemos cambiado el signo de la parte
                        imaginaria (conjugado complejo).
                      </p>
                    </div>

                  </div>
                </div>
              

                {/* 3. Múltiples qubits en Dirac */}
                <div className="bg-white rounded-xl shadow p-6 border border-sky-100 space-y-4">
                  <h3 className="text-2xl font-semibold text-quantum-purple">
                    3. Múltiples qubits en notación bra–ket
                  </h3>

                  <p className="text-lg text-gray-700 leading-relaxed text-justify">
                    Para sistemas con más qubits, Dirac brilla de verdad. En vez de
                    escribir un vector de 4, 8 o 16 componentes, usamos combinaciones
                    de kets. Por ejemplo, para <strong>dos qubits</strong>:
                  </p>

                  <div className="text-lg">
                    <BlockMath math="|\psi\rangle = c_{00}|00\rangle + c_{01}|01\rangle + c_{10}|10\rangle + c_{11}|11\rangle" />
                  </div>

                  <p className="text-lg text-gray-700 leading-relaxed">
                    Cada coeficiente <InlineMath math="c_{ij}" /> es la amplitud del
                    resultado <InlineMath math="|ij\rangle" /> al medir (00, 01, 10 o 11).
                  </p>

                
                </div>

                {/* Mini-quiz de notación (tu componente) */}
                <NotationQuiz />

                {/* Tarjeta: Paul Dirac */} 
                <div className="mt-6"> 
                  <Card className="bg-gradient-to-br from-quantum-dark-blue/15 to-quantum-dark-blue/5 border 
                  border-quantum-dark-blue/40 shadow-2xl backdrop-blur-sm"> 
                  <CardHeader> 
                    <div className="flex items-center gap-3 mb-2"> 
                      <h3 className="font-staatliches text-quantum-dark-blue text-2xl md:text-3xl"> 
                        ¿Quién fue Paul Dirac? 
                      </h3> 
                      </div> 
                      <p className="text-sm md:text-base text-quantum-dark-blue/80 max-w-xl"> 
                      El creador de la notación bra–ket que estás usando en este módulo. 
                      </p> </CardHeader> <CardContent className="relative"> 
                      {/* Icono decorativo */} 
                      <div className="absolute -top-6 -right-6 w-16 h-16 opacity-20"> 
                        <Lightbulb className="w-full h-full text-quantum-dark-blue" /> </div> 
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6"> 
                        {/* Foto Dirac */} 
                        <div className="w-44 h-44 rounded-2xl overflow-hidden border-[3px] border-quantum-dark-blue shadow-lg bg-slate-900/40"> 
                        <img src="/paul-dirac.png" loading="lazy" alt="Paul Dirac" className="w-full h-full object-cover" /> 
                        </div> 
                        {/* Texto */} 
                        <div className="bg-quantum-dark-blue/5 p-5 rounded-xl border-l-4 border-quantum-dark-blue space-y-3"> 
                        <p className="font-arimo text-base md:text-lg text-slate-900"> 
                          <strong>Paul Adrien Maurice Dirac (1902–1984)</strong> fue un físico teórico británico y uno de los fundadores de la mecánica cuántica moderna. </p> 
                          <ul className="list-disc pl-5 space-y-2 font-arimo text-sm md:text-base text-slate-900"> 
                            <li> Formuló la <strong>ecuación de Dirac</strong>, que describe el electrón relativista. </li> 
                            <li> Su teoría <strong>predijo la antimateria</strong> antes de ser observada experimentalmente. </li> 
                            <li> Ganó el <strong>Nobel de Física en 1933</strong>, junto a Schrödinger. </li> 
                            <li> Introdujo la <strong>notación bra–ket</strong>{" "} <InlineMath math="\langle\psi|" /> y{" "} 
                            <InlineMath math="|\psi\rangle" />, que ahora forma parte del “idioma oficial” de la física cuántica. </li> 
                          </ul> 
                </div> </div> 
                </CardContent> 
                </Card> 
                </div> 
                </CardContent>
            </SectionCard>

            {/* ESFERA DE BLOCH */}
            <SectionCard id="esfera-bloch">
              <CardHeader className="p-0 mb-6">
                <h2 className="text-3xl md:text-5xl font-staatliches text-quantum-purple mb-4">
                  Esfera de Bloch
                </h2>
              </CardHeader>
              <CardContent className="p-0 space-y-8">
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src="/gato.png"
                    alt="Schrödi"
                    className="w-16 h-16 animate-float-slow"
                  />
                  <div className="bg-gray-100 text-lg text-gray-800 px-4 py-2 rounded-xl shadow ">
                    Ahora conoceremos una forma geométrica de visualizar todos los estados posibles
                  de un qubit, será como el “globo terráqueo” del mundo cuántico. 🌍
                  </div>

                </div>

                <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  Cualquier estado puro de un qubit se puede representar como
                  un punto en la superficie de una esfera de radio 1, llamada{" "}
                  <strong>Esfera de Bloch</strong>. Usamos dos ángulos,{" "}
                  <InlineMath math="\theta" /> y <InlineMath math="\phi" />, para
                  parametrizar el estado como se puede observar en la imagen inferior.
                </p>

   <Card className="bg-gradient-to-br from-quantum-lilac/20 to-quantum-lilac/10 border-quantum-lilac/40 shadow-md hover-quantum">
  <CardHeader>
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-quantum-lilac">
        <img
          src="/mascota/schrodi-standing.png"
          loading="lazy"
          alt="Schrödi de pie"
          className="w-full h-full object-cover"
        />
      </div>
      <CardTitle className="font-staatliches text-2xl md:text-3xl text-quantum-lilac">
        Representación de un estado
      </CardTitle>
    </div>
  </CardHeader>

  <CardContent className="flex flex-col md:flex-row gap-4 items-center">

    {/* TARJETA BASE */}
    <div className="bg-quantum-lilac/10 p-4 rounded-lg border-l-4 border-quantum-lilac w-full">

      <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-10">

        {/* ---------- TEXTO IZQUIERDA ---------- */}
        <div className="flex-1 space-y-5">

          {/* HIGHLIGHT SUTIL EN COLOR LILA */}
          <div className="bg-quantum-lilac/20 text-quantum-purple rounded-xl px-4 py-3 shadow-sm text-base">
            El punto negro  ⬤ marca la posición del <strong>estado |ψ⟩</strong> en la esfera.
          </div>

          <p className="text-gray-700 text-lg leading-relaxed">
            Un qubit en un estado puro siempre se puede representar como un punto en la superficie
            de la esfera. Sus coordenadas vienen dadas por los ángulos <strong>θ</strong> y <strong>φ</strong>:
          </p>

          {/* ECUACIÓN */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow">
            <BlockMath math="|\psi\rangle =
              \cos\left(\frac{\theta}{2}\right)|0\rangle +
              e^{i\phi}\sin\left(\frac{\theta}{2}\right)|1\rangle" />
          </div>

          {/* LISTA MÁS CLARA */}
          <ul className="text-gray-700 text-lg space-y-2">
            <li>• <strong>θ (Theta)</strong>: ángulo entre el vector estado y el eje Z.</li>
            <li>• <strong>φ (Phi)</strong>: ángulo en el plano XY.</li>
          </ul>
        </div>

        {/* ---------- IMAGEN DERECHA ---------- */}
        <div className="flex-1 flex justify-center">
          <div
            className="
              bg-white
              rounded-2xl shadow-xl p-5
              flex items-center justify-center
              border border-gray-200
            "
          >
            <img
              src="/esfera-bloch-2.png"
              alt="Esfera de Bloch"
              className="w-72 md:w-96 object-contain drop-shadow-lg"
            />
          </div>
        </div>

      </div>

    </div>
  </CardContent>
</Card>

                
    

                <BlochSphereOverview />


                <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  Muchas puertas cuánticas pueden verse como{" "}
                  <strong>rotaciones</strong> de esta esfera. Por ejemplo, una
                  puerta Pauli-X actúa como una rotación de 180° alrededor del
                  eje X, intercambiando |0⟩ y |1⟩.
                </p>

                 <div className="bg-gradient-to-r from-quantum-purple/10 to-quantum-orange/10 p-6 rounded-xl shadow-inner">
                  <BlochSphere/>
                </div>


              </CardContent>
            </SectionCard>

            {/* PUERTAS CUÁNTICAS */}
<SectionCard id="puertas-cuanticas">
  <CardHeader className="p-0 mb-6">
    <h2 className="text-3xl md:text-5xl font-staatliches text-quantum-purple mb-4">
      Puertas cuánticas
    </h2>
    <CardDescription className="text-base md:text-lg text-muted-foreground">
      Cómo transformamos estados cuánticos: las puertas como matrices
      que rotan el vector del qubit en la esfera de Bloch.
    </CardDescription>
  </CardHeader>

  <CardContent className="p-0 space-y-8">
    <div className="flex items-start gap-4 mb-4">
      <img
        src="/gato.png"
        alt="Schrödi"
        className="w-16 h-16 animate-float-slow"
      />
      <div className="bg-purple-100 text-lg text-purple-800 px-4 py-2 rounded-xl shadow ">
        En computación <strong>clásica</strong>, puertas como AND, OR o NOT
        toman bits 0/1 y los transforman en otros bits. En computación{" "}
        <strong>cuántica</strong>, hacemos algo parecido… pero con qubits
        que pueden estar en superposición. ⚛️
      </div>
    </div>

    <p className="text-lg text-gray-700 leading-relaxed text-justify">
      Una puerta cuántica es una <strong>matriz unitaria</strong> que
      actúa sobre el vector de estado del qubit. Aplicar una puerta es
      simplemente multiplicar:
    </p>

    <BlockMath math="|\psi_{\text{nuevo}}\rangle = U\,|\psi_{\text{viejo}}\rangle" />

    <p className="text-lg text-gray-700 leading-relaxed text-justify">
      En la esfera de Bloch, esto se ve como una{" "}
      <strong>rotación</strong> del vector alrededor de algún eje (X, Y o Z).
      Veamos primero las puertas de <strong>un solo qubit</strong> y luego
      una puerta controlada de dos qubits: la CNOT.
    </p>

    {/* Single-qubit gates */}
    <div className="space-y-4">
      <h3 className="text-2xl md:text-3xl font-staatliches text-quantum-purple">
        Puertas de un solo qubit
      </h3>
      <div className="grid gap-6 lg:grid-cols-2">
        {SINGLE_QUBIT_GATES.map((gate) => (
          <SingleGateCard key={gate.id} gate={gate} />
        ))}
      </div>
    </div>

    {/* Multi-qubit: CNOT */}
    <div className="space-y-4">
      <h3 className="text-2xl md:text-3xl font-staatliches text-quantum-purple">
        Puertas de varios qubits
      </h3>
      <CNOTCard />
    </div>

    {/* Quiz (placeholder) */}
    <GatesDragQuiz />
  </CardContent>
</SectionCard>

            {/* CIRCUITO CUÁNTICO */}
            <SectionCard id="circuito-cuantico">
              <CardHeader className="p-0 mb-6">
                <h2 className="text-3xl md:text-5xl font-staatliches text-quantum-purple mb-4">
                  Circuito cuántico
                </h2>
                <CardDescription className="text-base md:text-lg text-muted-foreground">
                  Esquema que muestra qué operaciones cuánticas se aplican, a qué qubits, y en qué momento dentro del flujo del algoritmo.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-8">
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src="/gato.png"
                    alt="Schrödi"
                    className="w-16 h-16 animate-float-slow"
                  />
                  <div className="bg-purple-100 text-lg text-purple-800 px-4 py-2 rounded-xl shadow ">
                    Imagina una partitura musical, pero en vez de notas tienes
                    puertas cuánticas y en vez de cuerdas tienes qubits. 🎼⚛️
                  </div>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  Un <strong>circuito cuántico</strong> se representa como una
                  serie de líneas horizontales, una por cada qubit, sobre las que se colocan las puertas.
                  Estas puertas actúan en momentos específicos y, juntas, van construyendo el algoritmo.
                  El circuito se lee de <strong>izquierda a derecha</strong>, igual que una secuencia temporal.
                </p>

                
                <div> <QuantumPlayground/> </div>
              </CardContent>
            </SectionCard>

            {/* CIERRE */}
            <SectionCard id="cierre">
              <CardHeader className="p-0 mb-6">
                <h2 className="text-3xl md:text-5xl font-staatliches text-quantum-purple mb-4">
                  ¡Has completado el Módulo 4! 🎉
                </h2>
                <CardDescription className="text-base md:text-lg text-muted-foreground">
                  Qubits, vectores, kets, puertas y circuitos: ya tienes el
                  vocabulario básico para hablar el lenguaje de los algoritmos
                  cuánticos.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  Llegaste al final del recorrido teórico de este curso. Ya
                  conoces:
                </p>
                <ul className="list-disc list-inside text-lg text-gray-700 space-y-1">
                  <li>Qué es un qubit y cómo se describe matemáticamente.</li>
                  <li>
                    Cómo visualizar sus estados en la esfera de Bloch.
                  </li>
                  <li>
                    Cómo escribir estados con vectores y con notación Dirac.
                  </li>
                  <li>
                    Qué son las puertas cuánticas y cómo actúan como matrices.
                  </li>
                  <li>
                    Cómo se combinan en un circuito cuántico que se ejecuta en
                    el tiempo.
                  </li>
                </ul>

                <div className="flex items-start gap-4 mt-4">
                  <img
                    src="/gato.png"
                    alt="Schrödi"
                    className="w-16 h-16 animate-float-slow"
                  />
                  <div className="bg-quantum-purple/10 border border-quantum-purple/30 px-4 py-3 rounded-xl shadow text-lg text-gray-800">
                    Desde aquí, el siguiente paso es empezar a{" "}
                    <strong>programar</strong> circuitos de verdad en Qiskit,
                    Cirq o simuladores online.  
                    <br />
                    <span className="text-quantum-purple font-semibold">
                      Yo seguiré contigo si decides dar ese salto 😉
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    to="/aprendizaje"
                    className="px-6 py-3 rounded-full bg-quantum-purple text-white font-semibold shadow hover:shadow-lg transition-all"
                  >
                    Volver al mapa de aprendizaje
                  </Link>
            
                </div>
              </CardContent>
            </SectionCard>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Modulo4;

/* ============================
   COMPONENTES EXTRA
   ============================ */
function QubitDimensionNote() {
  const [view, setView] = React.useState<"intuicion" | "ejemplo">("intuicion");

  return (
    <div className="max-w-md mt-4 self-start">
      <div className="relative">
        {/* Pin en la esquina */}
        <div className="absolute -top-2 left-4 w-3 h-3 rounded-full bg-orange-400 shadow-md" />

        <div className="bg-quantum-purple/95 border border-orange-300/70 rounded-xl shadow-lg px-5 py-4 -rotate-1">
          {/* Encabezado tipo post-it */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl text-orange-200 uppercase tracking-wide text-white leading-tight">
              Nota rápida
              <br />
              ¿Por qué 2 dimensiones?
            </h2>

            <div className="flex gap-1">
              <button
                onClick={() => setView("intuicion")}
                className={`px-2.5 py-0.5 rounded-full text-[12px] font-semibold transition ${
                  view === "intuicion"
                    ? "bg-orange-300 text-slate-900 shadow-sm"
                    : "bg-white/10 text-orange-100 hover:bg-white/15"
                }`}
              >
                Intuición
              </button>
              <button
                onClick={() => setView("ejemplo")}
                className={`px-2.5 py-0.5 rounded-full text-[12px] font-semibold transition ${
                  view === "ejemplo"
                    ? "bg-orange-300 text-slate-900 shadow-sm"
                    : "bg-white/10 text-orange-100 hover:bg-white/15"
                }`}
              >
                Ejemplo
              </button>
            </div>
          </div>

          {/* Contenido: cambia según la pestaña */}
          {view === "intuicion" && (
            <div className="space-y-3 text-base text-orange-50 leading-relaxed min-h-[8.5rem]">
              <p>
                Decir que el espacio de estados de un qubit tiene
                2 dimensiones
                significa que para describir cualquier estado solo necesitamos{" "}
                <span className="font-semibold text-orange-200">
                  2 números complejos
                </span>
                : una amplitud para <InlineMath math="|0\rangle" /> y otra para{" "}
                <InlineMath math="|1\rangle" />.
              </p>
              <p>
                Es como un plano con dos ejes: en lugar de <em>(x, y)</em>, aquí
                usamos <InlineMath math="\alpha" /> (peso de{" "}
                <InlineMath math="|0\rangle" />) y{" "}
                <InlineMath math="\beta" /> (peso de{" "}
                <InlineMath math="|1\rangle" />). Esas dos direcciones son
                suficientes para describir cualquier estado de un qubit.
              </p>
            </div>
          )}

          {view === "ejemplo" && (
            <div className="space-y-3 text-base text-orange-50 leading-relaxed min-h-[8.5rem]">
              <p>Imagina que el qubit está en el estado:</p>

              <div className="bg-white/10 rounded-md px-2 py-1 inline-block">
                <BlockMath math="|\psi\rangle = \begin{pmatrix} \alpha \\ \beta \end{pmatrix}" />
              </div>

              <p>
                El <span className="font-semibold text-orange-200">vector</span>{" "}
                tiene <span className="font-semibold text-orange-200">2 entradas</span>: 
                la de arriba corresponde a <InlineMath math="|0\rangle" /> y la
                de abajo a <InlineMath math="|1\rangle" />. 
              </p>
              <p className="text-[13px] text-orange-100/80">
                Si añadimos más qubits, el vector crece: 2 qubits → 4 entradas,
                3 qubits → 8 entradas, etc. Pero para un solo qubit{" "}
                <span className="font-semibold">siempre</span> son 2.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function GatesShowcase() {
  const [activeGate, setActiveGate] = useState<"X" | "H" | "Z">("X");

  const gateInfo: Record<
    "X" | "H" | "Z",
    { name: string; matrix: string; efecto: string }
  > = {
    X: {
      name: "Pauli-X (NOT cuántico)",
      matrix: "\\begin{pmatrix}0 & 1 \\\\ 1 & 0\\end{pmatrix}",
      efecto: "Intercambia |0⟩ y |1⟩. Es parecido al NOT clásico.",
    },
    H: {
      name: "Hadamard (H)",
      matrix: "\\frac{1}{\\sqrt{2}} \\begin{pmatrix}1 & 1 \\\\ 1 & -1\\end{pmatrix}",
      efecto:
        "Lleva |0⟩ y |1⟩ a estados en superposición. Es clave para la interferencia.",
    },
    Z: {
      name: "Pauli-Z",
      matrix: "\\begin{pmatrix}1 & 0 \\\\ 0 & -1\\end{pmatrix}",
      efecto:
        "Cambia la fase de |1⟩ (le pone un signo -). No altera probabilidades, pero sí la interferencia.",
    },
  };

  return (
    <div className="space-y-6">
      <p className="text-lg text-gray-700 leading-relaxed">
        Haz clic en una puerta para ver su matriz y una explicación intuitiva.
      </p>
      <div className="flex gap-4 flex-wrap">
        {(["X", "H", "Z"] as const).map(g => (
          <button
            key={g}
            onClick={() => setActiveGate(g)}
            className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold border transition-all ${
              activeGate === g
                ? "bg-quantum-purple text-white border-quantum-purple shadow-lg scale-105"
                : "bg-white text-gray-800 border-gray-200 hover:shadow-md"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-2xl font-semibold text-quantum-purple mb-2">
          {gateInfo[activeGate].name}
        </h3>
        <div className="mb-3">
          <BlockMath math={gateInfo[activeGate].matrix} />
        </div>
        <p className="text-lg text-gray-700 leading-relaxed">
          {gateInfo[activeGate].efecto}
        </p>
      </div>
    </div>
  );
}

function NotationQuiz() {
  const [answer, setAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const correct = "|1⟩";

  const options = ["|0⟩", "|1⟩", "|00⟩", "|ψ⟩"];

  function check() {
    if (!answer) {
      setFeedback("Selecciona una opción primero 🙂.");
      return;
    }
    if (answer === correct) {
      setFeedback("✅ Correcto: el vector (0,1) corresponde al estado |1⟩.");
    } else {
      setFeedback(
        "❌ Aún no. Recuerda: el primer componente es la amplitud de |0⟩ y el segundo la de |1⟩. (0,1) significa 100% de probabilidad de medir 1."
      );
    }
  }

  return (
    <div className="mt-6 bg-gradient-to-r from-quantum-purple/5 to-quantum-orange/5 border border-quantum-purple/20 rounded-xl p-6 space-y-4">
      <h3 className="text-2xl font-semibold text-quantum-purple mb-2">
        Quiz rápido 🧠
      </h3>
      <p className="text-lg text-gray-700 leading-relaxed">
        Si el estado de un qubit es el vector:
      </p>
      <BlockMath math="|\psi\rangle = \begin{pmatrix}0 \\ 1\end{pmatrix}" />
      <p className="text-lg text-gray-700 leading-relaxed mt-2">
        ¿Cómo lo escribirías en notación ket?
      </p>

      <div className="flex flex-wrap gap-3 mt-2">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => setAnswer(opt)}
            className={`px-4 py-2 rounded-full border text-lg transition-all ${
              answer === opt
                ? "bg-quantum-purple text-white border-quantum-purple"
                : "bg-white text-gray-800 border-gray-200 hover:border-quantum-purple"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      <button
        onClick={check}
        className="mt-3 px-5 py-2 rounded-full bg-quantum-orange text-white font-semibold shadow hover:shadow-md transition-all"
      >
        Comprobar
      </button>

      {feedback && (
        <p className="mt-3 text-lg text-gray-800 leading-relaxed">{feedback}</p>
      )}
    </div>
  );
}

function CircuitDragAndDrop() {
  const [slots, setSlots] = useState<(string | null)[]>([null, null, null]);
  const [feedback, setFeedback] = useState<string | null>(null);

  const gates = [
    { id: "H", label: "H (superposición)" },
    { id: "CNOT", label: "CNOT (entrelaza)" },
    { id: "X", label: "X (NOT)" },
  ];

  const correctOrder = ["H", "CNOT", "X"];

  function handleDrop(
    index: number,
    event: React.DragEvent<HTMLDivElement>
  ) {
    event.preventDefault();
    const gateId = event.dataTransfer.getData("text/plain");
    if (!gateId) return;

    const newSlots = [...slots];
    newSlots[index] = gateId;
    setSlots(newSlots);
    setFeedback(null);
  }

  function handleDragStart(
    gateId: string,
    event: React.DragEvent<HTMLDivElement>
  ) {
    event.dataTransfer.setData("text/plain", gateId);
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function checkCircuit() {
    if (slots.some(s => s === null)) {
      setFeedback("Llena los tres pasos del circuito antes de comprobar 🙂.");
      return;
    }
    const isCorrect = slots.every((g, i) => g === correctOrder[i]);
    if (isCorrect) {
      setFeedback(
        "✅ Excelente: primero creas superposición con H, luego entrelazas con CNOT y finalmente aplicas X."
      );
    } else {
      setFeedback(
        "❌ Aún no. Pista: primero pon al qubit en superposición, luego entrelaza, y deja X para el final."
      );
    }
  }

  return (
    <div className="mt-6 bg-gradient-to-r from-quantum-purple/5 to-quantum-orange/5 border border-quantum-orange/30 rounded-xl p-6 space-y-6">
      <h3 className="text-2xl font-semibold text-quantum-purple mb-2">
        Arrastra las puertas para formar un mini circuito 🔌
      </h3>
      <p className="text-lg text-gray-700 leading-relaxed">
        Construye un circuito de 2 qubits donde:
      </p>
      <ul className="list-disc list-inside text-lg text-gray-700 space-y-1">
        <li>Primero pongas al qubit 0 en superposición.</li>
        <li>Luego entrelaces los dos qubits.</li>
        <li>Finalmente apliques un NOT a ambos.</li>
      </ul>

      <div className="flex flex-wrap gap-3">
        {gates.map(g => (
          <div
            key={g.id}
            draggable
            onDragStart={e => handleDragStart(g.id, e)}
            className="px-4 py-2 rounded-xl bg-white border border-gray-200 shadow-sm cursor-grab active:cursor-grabbing text-lg"
          >
            {g.label}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <p className="text-lg text-gray-700 mb-2">
          Orden temporal del circuito (de izquierda a derecha):
        </p>
        <div className="flex gap-4">
          {slots.map((slot, idx) => (
            <div
              key={idx}
              onDrop={e => handleDrop(idx, e)}
              onDragOver={handleDragOver}
              className="flex-1 h-20 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center bg-white text-lg text-gray-500"
            >
              {slot ? slot : `Paso t${idx + 1}`}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={checkCircuit}
        className="mt-3 px-5 py-2 rounded-full bg-quantum-orange text-white font-semibold shadow hover:shadow-md transition-all"
      >
        Comprobar circuito
      </button>

      {feedback && (
        <p className="mt-3 text-lg text-gray-800 leading-relaxed">{feedback}</p>
      )}
    </div>
  );
}
