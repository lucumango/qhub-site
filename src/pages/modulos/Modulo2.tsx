import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import QubitMascot from "@/components/QubitMascot";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

const sections = [
  { id: "superposicion", title: "Superposición", mascot: "¡Imagina que la moneda está en cara y cruz al mismo tiempo!" },
  { id: "interferencia", title: "Interferencia", mascot: "Las ondas cuánticas se suman o cancelan como en la doble rendija." },
  { id: "medicion", title: "Medición", mascot: "Cuando observas, el qubit decide: ¿0 o 1?" },
  { id: "entrelazamiento", title: "Entrelazamiento", mascot: "Dos qubits se conectan: lo que le pase a uno afecta al otro instantáneamente." },
];

const Modulo2 = () => {
  const [activeSection, setActiveSection] = useState("superposicion");

  // Detecta la sección activa con scroll
  useEffect(() => {
    const handleScroll = () => {
      let current = "superposicion";
      sections.forEach((s) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight / 3) {
          current = s.id;
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar izquierda */}
      <aside className="w-72 bg-[#1c0f4a] text-white p-6 sticky top-0 h-screen flex flex-col justify-between">
        <div>
          {/* Botón volver a la página de aprendizaje */}
          <Link
            to="/aprendizaje"
            className="w-full mb-6 block text-center bg-white text-black rounded-lg py-2 font-semibold shadow hover:bg-gray-200"
          >
            Regresar
          </Link>

          <h3 className="text-lg mb-4">Progreso del Módulo</h3>
          <div className="space-y-4">
            {sections.map((s, idx) => (
              <div
                key={s.id}
                className={`p-3 rounded-lg text-sm cursor-pointer transition ${
                  activeSection === s.id
                    ? "bg-quantum-purple text-white"
                    : "bg-white/10 text-gray-300"
                }`}
                onClick={() =>
                  document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <span className="block font-semibold">{s.title}</span>
                <span className="text-xs text-gray-300">
                  {idx + 1} de {sections.length}
                </span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Contenido derecha */}
      <main className="flex-1 px-6 md:px-12 py-16 space-y-16 max-w-4xl mx-auto">
        {/* Título grande del módulo */}
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-staatliches text-quantum-black">
            Módulo 2: Fenómenos Cuánticos
          </h1>
          <h2 className="mt-4 text-xl text-orange-700 font-flatory">
            Superposición, interferencia, medición y entrelazamiento.
          </h2>
        </div>

        {/* Introducción al módulo */}
        <div>
          <p className="text-justify leading-relaxed text-gray-700">
            En la vida cotidiana, los objetos tienen posiciones y estados bien definidos:
            una lámpara está encendida o apagada, un libro está en la mesa o en la repisa.
            Sin embargo, al adentrarnos en el mundo cuántico (la escala de los átomos,
            electrones y fotones) estas certezas desaparecen. Aquí, las partículas siguen
            reglas extrañas que desafían nuestra intuición.
            <br /><br />
            En este módulo exploraremos cuatro de los fenómenos fundamentales que hacen
            única a la física cuántica y que son la base de la computación cuántica moderna:
          </p>
        </div>

        {/* Secciones */}
        {sections.map((s) => (
          <section
            key={s.id}
            id={s.id}
            className="bg-white shadow p-10 rounded-xl"
          >
            <h2 className="text-3xl font-bold text-quantum-purple mb-6">
              {s.title}
            </h2>

            {/* Mascota hablando */}
            <div className="flex items-start gap-4 mb-6">
              <QubitMascot className="w-16 h-16" />
              <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-xl shadow">
                {s.mascot}
              </div>
            </div>

            {/* Contenido de la sección */}
            { s.id === "superposicion" && (
            <div className="flex flex-col gap-8">
              {/* Texto explicativo */}
              <p className="text-justify leading-relaxed text-gray-700">
                En mecánica cuántica, la <strong>superposición</strong> significa que un sistema puede 
                encontrarse en varios estados posibles al mismo tiempo, hasta que se realiza una medición. 
                Un <em>qubit</em>, por ejemplo, no está limitado a ser solo <code>0</code> o solo <code>1</code>, 
                sino que puede estar en una combinación de ambos.
                <br /><br />
                Matemáticamente se expresa como:
              </p>

              {/* Ecuación */}
              <div className="bg-gray-100 text-gray-800 px-6 py-4 rounded-lg text-center font-mono shadow">
                |ψ⟩ = α|0⟩ + β|1⟩  
                <br />
                Con la condición: |α|² + |β|² = 1
              </div>

              {/* Ejemplo cotidiano */}
              <p className="text-justify leading-relaxed text-gray-700">
                Imagina una caja cerrada con una moneda dentro. 
                En el mundo clásico, la moneda ya está en cara o sello aunque no la veas.  
                Pero en el mundo cuántico, la moneda está en un estado “mixto”: cara <strong>y</strong> sello 
                al mismo tiempo, hasta que la observas.  
              </p>

              {/* Quiz interactivo */}
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 shadow">
                <h3 className="text-lg font-bold text-quantum-purple mb-4">
                  Quiz: Comprueba tu comprensión
                </h3>
                <form className="space-y-4 text-gray-700">
                  <div>
                    <p className="font-semibold mb-2">1. ¿Qué significa la superposición en un qubit?</p>
                    <label className="block">
                      <input type="radio" name="q1" className="mr-2" /> 
                      Que el qubit está indefinido y no tiene estado.
                    </label>
                    <label className="block">
                      <input type="radio" name="q1" className="mr-2" /> 
                      Que el qubit puede ser 0 y 1 a la vez hasta ser medido.
                    </label>
                    <label className="block">
                      <input type="radio" name="q1" className="mr-2" /> 
                      Que el qubit siempre cambia entre 0 y 1 muy rápido.
                    </label>
                  </div>

                  <div>
                    <p className="font-semibold mb-2">2. ¿Qué condición cumplen los coeficientes α y β?</p>
                    <label className="block">
                      <input type="radio" name="q2" className="mr-2" /> 
                      Que ambos sean siempre números enteros.
                    </label>
                    <label className="block">
                      <input type="radio" name="q2" className="mr-2" /> 
                      Que su suma sea exactamente 10.
                    </label>
                    <label className="block">
                      <input type="radio" name="q2" className="mr-2" /> 
                      Que |α|² + |β|² = 1 (probabilidades suman 100%).
                    </label>
                  </div>
                </form>
              </div>
            </div>
          )}


            { s.id === "entrelazamiento" && (
              <section className="relative z-10">
                {/* Fondo animado */}
                <div className="absolute inset-0 pointer-events-none">
                  <ParticlesBG />
                </div>
                {/* Subtítulo animado (ahora subtítulo, no título principal) */}
                
                <p className="text-justify leading-relaxed text-gray-700">
                  En el mundo clásico las cosas parecen estar separadas, y lo que le ocurre a una no tiene por qué afectar a la otra. 
                  Sin embargo, en el mundo cuántico algunas partículas están tan profundamente conectadas 
                  que lo que sucede con una determina instantáneamente el estado de la otra, 
                  sin importar la distancia que las separe.
                </p>

                {/* Ejemplo cotidiano */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-purple-700 mt-6 mb-2">Del misterio de las loncheras al misterio del universo</h4>
                  
                  {/* --- BLOQUE LONCHERAS ENTRELZADAS FLIP INICIO --- */}
                  <LoncherasEntrelazadasFlip />
                  {/* --- BLOQUE LONCHERAS ENTRELZADAS FLIP FIN --- */}
                  <p className="text-justify leading-relaxed text-gray-700">
                    Así funciona el entrelazamiento cuántico, el estado de una partícula determina el de la otra sin importar la distancia que las separe.
                  </p>
                </div>

                {/* El salto a lo real */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-purple-700 mb-2">El salto a lo real</h4>
                  <div className="text-justify leading-relaxed text-gray-700">
                    Los estados de Bell son los ejemplos más simples de este fenómeno y muestran distintos tipos de correlaciones cuánticas entre ambas partículas.
                  </div>
                  <BellStatesInteractive />
                </div>

                {/* Dos partículas entrelazadas */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-purple-700 mb-2">Dos partículas entrelazadas</h4>
                  <p className="text-justify leading-relaxed text-gray-700">
                    El entrelazamiento cuántico conecta partículas de forma misteriosa. 
                    Lo que le pase a una afecta instantáneamente a la otra. 
                    No importa la distancia, la correlación es total.
                  </p>
                  <EsferasEntrelazadas />
                  <motion.div
                    className="mt-4 text-center text-gray-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    
                    
                  </motion.div>
                </div>

                {/* Mini Quiz */}
                <div>
                  <h4 className="text-lg font-semibold text-purple-700 mb-2">Mini Quiz</h4>
                  <MiniQuiz />
                </div>
              </section>
            )}

          
          
          </section>
        ))}
      </main>
    </div>
  );
};

export default Modulo2;

// Utilidades para el slider de α y β
function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}
function round2(x: number) {
  return Math.round(x * 100) / 100;
}

// Animación de partículas interconectadas (fondo)
const ParticlesBG = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{zIndex:0}} aria-hidden>
    <circle cx="20%" cy="40%" r="7" fill="#a78bfa" opacity="0.5">
      <animate attributeName="r" values="7;10;7" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="80%" cy="60%" r="9" fill="#818cf8" opacity="0.4">
      <animate attributeName="r" values="9;13;9" dur="2.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="50%" cy="20%" r="6" fill="#c7d2fe" opacity="0.5">
      <animate attributeName="r" values="6;8;6" dur="2.2s" repeatCount="indefinite" />
    </circle>
    <line x1="20%" y1="40%" x2="80%" y2="60%" stroke="#a5b4fc" strokeWidth="2" opacity="0.3">
      <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite" />
    </line>
    <line x1="50%" y1="20%" x2="20%" y2="40%" stroke="#a5b4fc" strokeWidth="2" opacity="0.2">
      <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2.5s" repeatCount="indefinite" />
    </line>
  </svg>
);

// Tarjetas de loncheras entrelazadas
const LONCHERAS = [
  { nombre: "Vania", emoji: "🍚", texto: "Arroz con leche" },
  { nombre: "Dayana", emoji: "🍇", texto: "Mazamorra morada" },
];
function shuffleLoncheras() {
  return Math.random() > 0.5 ? [0, 1] : [1, 0];
}

const LoncherasEntrelazadasBloque = () => {
  // Opciones de postre
  const POSTRES = [
    { emoji: "🍚", nombre: "Arroz con leche" },
    { emoji: "🍇", nombre: "Mazamorra morada" },
  ];
  const NOMBRES = ["Vania", "Dayana"];
  function sortearPostres() {
    return Math.random() > 0.5 ? [0, 1] : [1, 0];
  }
  const [asignacion, setAsignacion] = useState<[number, number]>(sortearPostres());
  const [abiertas, setAbiertas] = useState<[boolean, boolean]>([false, false]);

  // Al hacer clic en una tarjeta, revela ambas
  const abrir = (idx: number) => {
    if (abiertas[0] || abiertas[1]) return;
    setAbiertas([true, true]);
  };

  // Nueva ronda: oculta y vuelve a sortear
  const nuevaRonda = () => {
    setAsignacion(() => sortearPostres()); // <--- AQUÍ se sortea aleatoriamente los postres
    setAbiertas(() => [false, false]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Narrativa previa */}
      <div className="text-justify leading-relaxed text-gray-700">
        <p>
          En el mundo clásico, las cosas parecen estar separadas: lo que le pasa a una no tiene por qué afectar a la otra.
        </p>
        <p className="text-justify leading-relaxed text-gray-700">
          Pero en el mundo cuántico, algunas partículas están tan conectadas que lo que ocurre con una determina instantáneamente el estado de la otra,<br className="hidden md:inline" />
          sin importar la distancia que las separe.
        </p>
        
      </div>

      {/* Tarjetas de loncheras */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-center mb-4">
        {[0, 1].map((idx) => (
          <motion.button
            key={NOMBRES[idx]}
            className={`
              flex-1 min-w-[180px] bg-white rounded-xl shadow-lg px-6 py-6
              flex flex-col items-center border-2 transition
              ${abiertas[idx] ? "border-quantum-purple scale-105" : "border-transparent hover:border-purple-200"}
              focus:outline-none
            `}
            whileHover={{ scale: abiertas[idx] ? 1.05 : 1.03 }}
            whileTap={{ scale: abiertas[idx] ? 1.08 : 1.04 }}
            onClick={() => abrir(idx)}
            disabled={abiertas[0] || abiertas[1]}
            aria-label={`Abrir lonchera de ${NOMBRES[idx]}`}
            type="button"
          >
            <div className="font-bold text-lg text-quantum-purple mb-2">{NOMBRES[idx]}</div>
            <AnimatePresence>
              {!abiertas[idx] && (
                <motion.div
                  key="mochila"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  className="text-5xl mb-2"
                >
                  🎒
                </motion.div>
              )}
              {abiertas[idx] && (
                <motion.div
                  key="postre"
                  initial={{ opacity: 0, scale: 0.7, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.7, y: -20 }}
                  transition={{ type: "spring", stiffness: 180, damping: 15 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-5xl mb-1">{POSTRES[asignacion[idx]].emoji}</span>
                  <span className="text-purple-700 font-semibold text-base">{POSTRES[asignacion[idx]].nombre}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      {/* Botón nueva ronda */}
      <div className="flex justify-center mb-4">
        <button
          className="bg-purple-100 text-purple-800 px-5 py-2 rounded-lg shadow font-semibold hover:bg-purple-200 transition"
          onClick={nuevaRonda}
          type="button"
        >
          Nueva ronda
        </button>
      </div>

      {/* Explicación debajo */}
      <div className="text-justify leading-relaxed text-gray-700">
        La mamá de Vania y Dayana les prepara su lonchera todos los días. En cada lonchera puede poner arroz con leche o mazamorra morada. Hasta que las chicas no abran su lonchera, ninguna sabe qué le tocó.<br />
        Pero en cuanto Vania abre la suya y ve que tiene arroz con leche, de inmediato sabe que a Dayana le tocó mazamorra morada. Y si Dayana abre primero y encuentra mazamorra morada, sabe que Vania tiene arroz con leche.
      </div>
    </div>
  );
};

// --- BLOQUE LONCHERAS ENTRELZADAS CON FLIP 3D ---
const LoncherasEntrelazadasFlip = () => {
  // Postres y nombres
  const POSTRES = [
    { emoji: "🍚", nombre: "Arroz con leche", fondo: "bg-white", texto: "text-purple-700" },
    { emoji: "🍇", nombre: "Mazamorra morada", fondo: "bg-quantum-purple text-white", texto: "text-white" },
  ];
  const NOMBRES = ["Vania", "Dayana"];
  function sortearPostres() {
    // 0: Vania arroz, Dayana mazamorra; 1: Vania mazamorra, Dayana arroz
    return Math.random() > 0.5 ? [0, 1] : [1, 0];
  }
  // Estado: [postreVania, postreDayana]
  const [asignacion, setAsignacion] = useState<[number, number]>(sortearPostres());
  // Estado de flip: [Vania, Dayana]
  const [flipped, setFlipped] = useState<[boolean, boolean]>([false, false]);
  // Quién abrió primero: 0 (Vania), 1 (Dayana), null (ninguna)
  const [primero, setPrimero] = useState<0 | 1 | null>(null);

  // Al hacer clic en una tarjeta
  const handleFlip = (idx: 0 | 1) => {
    if (flipped[0] || flipped[1]) return; // Solo permite abrir una vez por ronda
    setPrimero(idx);
    setFlipped([true, true]);
  };

  // Nueva ronda
  const nuevaRonda = () => {
    setAsignacion(() => sortearPostres());
    setFlipped(() => [false, false]);
    setPrimero(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      {/* Texto explicativo superior */}
      <div className="mb-6 w-full">
        <div className="bg-purple-50 border border-purple-200 rounded-xl px-5 py-4 shadow text-justify leading-relaxed text-gray-700 text-sm md:text-base">
          La mamá de Vania y Dayana les prepara su lonchera cada día con un postre: arroz con leche o mazamorra morada.
          Hasta que no la abren, ninguna sabe qué le tocó.
          Pero en cuanto una descubre su postre, automáticamente sabe cuál tiene la otra, aunque no la vea.

        </div>


      </div>

      {/* Tarjetas */}
      <div className="flex flex-col md:flex-row gap-6 w-full items-center justify-center mb-4">
        {[0, 1].map((idx) => {
          const isFlipped = flipped[idx];
          const postreIdx = asignacion[idx];
          // Fondo: quien abrió primero es morado, la otra blanca
          const fondo =
            isFlipped && primero === idx
              ? POSTRES[postreIdx].fondo
              : isFlipped && primero !== null
              ? POSTRES[1 - asignacion[primero!]].fondo
              : "bg-white";
          // Texto color
          const texto =
            isFlipped && primero === idx
              ? POSTRES[postreIdx].texto
              : isFlipped && primero !== null
              ? POSTRES[1 - asignacion[primero!]].texto
              : "text-purple-700";
          // Contenido de la cara posterior
          const postre =
            isFlipped && primero === idx
              ? POSTRES[postreIdx]
              : isFlipped && primero !== null
              ? POSTRES[1 - asignacion[primero!]]
              : null;

          return (
            <div
              key={NOMBRES[idx]}
              className="flex-1 min-w-[180px] max-w-xs"
            >
              <div className="perspective-[1200px]">
                <motion.div
                  className={`relative w-full h-48 md:h-56 rounded-xl shadow-lg cursor-pointer transition-transform duration-500`}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                  onClick={() => handleFlip(idx as 0 | 1)}
                  tabIndex={0}
                  aria-label={`Abrir lonchera de ${NOMBRES[idx]}`}
                >
                  {/* Cara frontal */}
                  <div
                    className={`
                      absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-white
                      border-2 ${isFlipped ? "border-transparent" : "border-quantum-purple"}
                      transition
                      backface-hidden
                    `}
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="font-bold text-lg text-quantum-purple mb-2">{NOMBRES[idx]}</div>
                    <motion.div
                      initial={false}
                      animate={{ scale: isFlipped ? 0.7 : 1, opacity: isFlipped ? 0 : 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-5xl mb-2"
                    >
                      🎒
                    </motion.div>
                  </div>
                  {/* Cara posterior */}
                  <div
                    className={`
                      absolute inset-0 flex flex-col items-center justify-center rounded-xl
                      ${fondo} transition
                      border-2 border-quantum-purple
                    `}
                    style={{
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    {postre && (
                      <>
                        <span className="text-5xl mb-1">{postre.emoji}</span>
                        <span className={`font-semibold text-base ${texto}`}>{postre.nombre}</span>
                      </>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Botón nueva ronda */}
      <div className="flex justify-center mb-4 w-full">
        <button
          className="bg-purple-100 text-purple-800 px-5 py-2 rounded-lg shadow font-semibold hover:bg-purple-200 transition"
          onClick={nuevaRonda}
          type="button"
        >
          Nueva ronda
        </button>
      </div>
    </div>
  );
};
// --- FIN BLOQUE LONCHERAS ENTRELZADAS ---

// Slider α y β
const SliderSuperposicion = () => {
  const [alpha, setAlpha] = useState(0.7);
  const [beta, setBeta] = useState(Math.sqrt(1 - 0.7 ** 2));
  const dragging = useRef(false);

  const handleAlpha = (e: React.ChangeEvent<HTMLInputElement>) => {
    const a = clamp(Number(e.target.value), 0, 1);
    setAlpha(a);
    setBeta(Math.sqrt(1 - a ** 2));
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="w-full flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <label className="block text-sm text-gray-700 mb-1">α (alfa)</label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={alpha}
            onChange={handleAlpha}
            className="w-full accent-purple-500"
          />
          <div className="text-center text-purple-700 font-mono mt-1">α = {round2(alpha)}</div>
        </div>
        <div className="flex-1">
          <label className="block text-sm text-gray-700 mb-1">β (beta)</label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={beta}
            disabled
            className="w-full accent-purple-300 opacity-60"
            readOnly
          />
          <div className="text-center text-purple-700 font-mono mt-1">β = {round2(beta)}</div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 mt-2">
        <motion.div
          className="w-12 h-12 rounded-full bg-purple-400 shadow-lg flex items-center justify-center text-white text-xl font-bold"
          animate={{ rotate: alpha * 360 }}
          transition={{ type: "spring", stiffness: 80 }}
        >
          α
        </motion.div>
        <motion.div
          className="w-12 h-12 rounded-full bg-blue-400 shadow-lg flex items-center justify-center text-white text-xl font-bold"
          animate={{ rotate: beta * 360 }}
          transition={{ type: "spring", stiffness: 80 }}
        >
          β
        </motion.div>
      </div>
      <div className="mt-2 text-gray-700 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span>
            Puedes ajustar el valor de <strong>α</strong> y ver cómo <strong>β</strong> cambia automáticamente.<br />
            La condición <span className="font-mono">|α|² + |β|² = 1</span> siempre se cumple.
          </span>
        </motion.div>
      </div>
    </div>
  );
};

// Esferas entrelazadas visual
const EsferasEntrelazadas = () => {
  const [estado, setEstado] = useState<0 | 1>(0);
  const colores = [
    { bg: "bg-purple-400", simbolo: "0" },
    { bg: "bg-blue-400", simbolo: "1" },
  ];
  const cambiar = () => setEstado((prev) => (prev === 0 ? 1 : 0));
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-center gap-8 relative">
        <motion.div
          className={`w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-3xl font-bold cursor-pointer border-4 border-white ${colores[estado].bg}`}
          whileTap={{ scale: 1.1 }}
          onClick={cambiar}
          title="Haz clic para cambiar el estado"
        >
          A
          <motion.div
            className="absolute left-1/2 top-1/2"
            style={{ pointerEvents: "none" }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </motion.div>
        {/* Línea brillante */}
        <motion.div
          className="absolute left-1/2 top-1/2"
          style={{
            width: "120px",
            height: "4px",
            background: "linear-gradient(90deg, #a78bfa 0%, #818cf8 100%)",
            zIndex: -1,
            left: "calc(50% - 60px)",
            top: "50%",
            transform: "translateY(-50%)",
            borderRadius: "2px",
            boxShadow: "0 0 12px 2px #a5b4fc88",
          }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
        />
        <motion.div
          className={`w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-3xl font-bold cursor-pointer border-4 border-white ${colores[1 - estado].bg}`}
          whileTap={{ scale: 1.1 }}
          onClick={cambiar}
          title="Haz clic para cambiar el estado"
        >
          B
        </motion.div>
      </div>
      <div className="mt-2 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-700 mt-2"
        >
          Haz clic en una esfera y verás cómo la otra cambia al instante. Así es como se manifiesta el entrelazamiento cuántico.
        </motion.div>
      </div>
    </div>
  );
};

// Mini Quiz interactivo
const QUIZ = [
  {
    pregunta: "1. Si una partícula está en el estado |ψ⟩ = α|0⟩ + β|1⟩, significa que antes de medirla: ",
    opciones: [
      { texto: "Está en ambos estados a la vez.", correcto: true, explicacion: "¡Correcto! Antes de medir, está en superposición." },
      { texto: "Ya está en 0 o 1, solo que no lo sabemos.", correcto: false, explicacion: "No, en cuántica no hay estado definido antes de medir." },
    ],
  },
  {
    pregunta: "En el estado |ψ⟩ = (1/√2)(|0⟩_A|1⟩_B + |1⟩_A|0⟩_B), las partículas A y B están…",
    opciones: [
      { texto: "Entrelazadas: lo que le pase a una afecta a la otra.", correcto: true, explicacion: "¡Exacto! Eso es el entrelazamiento cuántico." },
      { texto: "Completamente independientes.", correcto: false, explicacion: "No, están correlacionadas cuánticamente." },
    ],
  },
];

const MiniQuiz = () => {
  // Estado: [respuesta1, respuesta2] (null: no respondida, 0: opción 1, 1: opción 2)
  const [respuestas, setRespuestas] = useState<(number | null)[]>([null, null]);

  // Preguntas y opciones
  const preguntas = [
    {
      key: "q1",
      formula: String.raw`|\psi\rangle = \alpha|0\rangle + \beta|1\rangle`,
      texto: "1. Si una partícula está en el estado",
      opciones: [
        {
          texto: "Está en ambos estados a la vez.",
          correcta: true,
        },
        {
          texto: "Ya está en 0 o 1, solo que no lo sabemos.",
          correcta: false,
        },
      ],
      explicacion: [
        "¡Correcto! Antes de medir, está en superposición.",
        "No, en cuántica no hay estado definido antes de medir.",
      ],
    },
    {
      key: "q2",
      formula: String.raw`|\psi\rangle = \frac{1}{\sqrt{2}}\left(|0\rangle_A|1\rangle_B + |1\rangle_A|0\rangle_B\right)`,
      texto: "2. En el estado",
      opciones: [
        {
          texto: "Entrelazadas: lo que le pase a una afecta a la otra.",
          correcta: true,
        },
        {
          texto: "Completamente independientes.",
          correcta: false,
        },
      ],
      explicacion: [
        "¡Exacto! Eso es el entrelazamiento cuántico.",
        "No, están correlacionadas cuánticamente.",
      ],
    },
  ];

  // Maneja la respuesta
  const handleRespuesta = (idxPregunta: number, idxOpcion: number) => {
    setRespuestas((prev) => {
      const nuevo = [...prev];
      nuevo[idxPregunta] = idxOpcion;
      return nuevo;
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      
      {preguntas.map((preg, idx) => {
        const respuesta = respuestas[idx];
        return (
          <motion.div
            key={preg.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            className="bg-purple-50 rounded-xl shadow mb-8 p-6"
          >
            <div className="mb-3 text-justify text-gray-700 text-base">
              {preg.texto}
              <span className="block my-2 text-center">
                <BlockMath math={preg.formula} />
              </span>
              {idx === 0
                ? "significa que antes de medirla…"
                : "las partículas A y B están…"}
            </div>
            <div className="flex flex-col gap-3">
              {preg.opciones.map((op, j) => {
                const seleccionada = respuesta === j;
                const correcta = op.correcta;
                let borderColor = "border-transparent";
                let bgColor = "bg-purple-100";
                if (respuesta !== null) {
                  if (seleccionada && correcta) {
                    borderColor = "border-green-500";
                    bgColor = "bg-green-50";
                  } else if (seleccionada && !correcta) {
                    borderColor = "border-red-500";
                    bgColor = "bg-red-50";
                  } else {
                    borderColor = "border-transparent";
                    bgColor = "bg-purple-100";
                  }
                }
                return (
                  <button
                    key={j}
                    className={`
                      text-left w-full ${bgColor} hover:bg-purple-200 rounded-lg p-3 text-sm transition
                      border-2 ${borderColor}
                      ${seleccionada ? "font-semibold" : ""}
                    `}
                    onClick={() => handleRespuesta(idx, j)}
                    type="button"
                  >
                    {op.texto}
                  </button>
                );
              })}
            </div>
            {/* Explicación feedback */}
            <AnimatePresence>
              {respuesta !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mt-4 text-sm font-medium ${
                    preg.opciones[respuesta].correcta ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {preg.opciones[respuesta].correcta
                    ? preg.explicacion[0]
                    : preg.explicacion[1]}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

// --- Componente Estados de Bell interactivo ---
const BELL_STATES = [
  {
    key: "phi+",
    label: "Φ⁺",
    formula: String.raw`|\Phi^+\rangle = \frac{1}{\sqrt{2}} \left(|0\rangle_A|0\rangle_B + |1\rangle_A|1\rangle_B\right)`,
    desc: "Ambas partículas siempre coinciden: si una es 0, la otra también; si una es 1, la otra también.",
    colorA: "bg-purple-400",
    colorB: "bg-purple-400",
    line: "from-purple-400 to-purple-400",
  },
  {
    key: "phi-",
    label: "Φ⁻",
    formula: String.raw`|\Phi^-\rangle = \frac{1}{\sqrt{2}} \left(|0\rangle_A|0\rangle_B - |1\rangle_A|1\rangle_B\right)`,
    desc: "Ambas partículas coinciden, pero con una diferencia de fase cuántica.",
    colorA: "bg-purple-400",
    colorB: "bg-purple-400",
    line: "from-purple-400 to-purple-400",
  },
  {
    key: "psi+",
    label: "Ψ⁺",
    formula: String.raw`|\Psi^+\rangle = \frac{1}{\sqrt{2}} \left(|0\rangle_A|1\rangle_B + |1\rangle_A|0\rangle_B\right)`,
    desc: "Las partículas siempre son opuestas: si una es 0, la otra es 1, y viceversa.",
    colorA: "bg-purple-400",
    colorB: "bg-blue-400",
    line: "from-purple-400 to-blue-400",
  },
  {
    key: "psi-",
    label: "Ψ⁻",
    formula: String.raw`|\Psi^-\rangle = \frac{1}{\sqrt{2}} \left(|0\rangle_A|1\rangle_B - |1\rangle_A|0\rangle_B\right)`,
    desc: "Las partículas son opuestas, pero con una diferencia de fase cuántica.",
    colorA: "bg-purple-400",
    colorB: "bg-blue-400",
    line: "from-purple-400 to-blue-400",
  },
];

const BellStatesInteractive = () => {
  const [active, setActive] = useState(2); // Por defecto Ψ⁺

  const state = BELL_STATES[active];

  return (
    <div className="bg-purple-50 rounded-xl shadow px-6 py-5 flex flex-col md:flex-row gap-8 items-center justify-between">
      {/* Columna izquierda: ecuación y tabs */}
      <div className="flex-1 flex flex-col items-center md:items-start">
        <div className="flex gap-2 mb-4 w-full justify-center md:justify-start">
          {BELL_STATES.map((s, i) => (
            <button
              key={s.key}
              className={`px-4 py-2 rounded-lg font-bold transition border
                ${active === i
                  ? "bg-quantum-purple text-white border-quantum-purple shadow"
                  : "bg-white text-purple-700 border-purple-200 hover:bg-purple-100"}
              `}
              onClick={() => setActive(i)}
              type="button"
            >
              {s.label}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={state.key}
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.3 }}
            className="mb-2 w-full"
          >
            <BlockMath math={state.formula} />
          </motion.div>
        </AnimatePresence>
        
        <div className="text-gray-500 text-sm text-center md:text-left">{state.desc}</div>
      </div>
      {/* Columna derecha: visualización */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div
          key={state.key}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center"
        >
          <div className="relative flex items-center justify-center h-28 w-48">
            {/* Línea de conexión */}
            <div
              className={`absolute left-1/2 top-1/2 w-32 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r ${state.line} shadow`}
              style={{ zIndex: 0 }}
            />
            {/* Esfera A */}
            <motion.div
              className={`w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-2xl font-bold border-4 border-white ${state.colorA} z-10`}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              A
            </motion.div>
            {/* Espaciador */}
            <div className="w-8" />
            {/* Esfera B */}
            <motion.div
              className={`w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-2xl font-bold border-4 border-white ${state.colorB} z-10`}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: 1 }}
            >
              B
            </motion.div>
          </div>
        </motion.div>
        
      </div>
    </div>
  );
};
// --- Fin componente Estados de Bell interactivo ---

// ARREGLO DE TIPADO PARA setState
// Cambia todos los usos de setAsignacion y setAbiertas en LoncherasEntrelazadasBloque y LoncherasEntrelazadasFlip a este formato:
// setAsignacion(() => sortearPostres());
// setAbiertas(() => [false, false]);
// setFlipped(() => [true, true]);
// setFlipped(() => [false, false]);

// Por ejemplo, reemplaza:
    // setAsignacion(sortearPostres());
// por:
    // setAsignacion(() => sortearPostres());

// Y reemplaza:
    // setAbiertas([true, true]);
// por:
    // setAbiertas(() => [true, true]);

// Haz esto en todos los lugares donde uses setAsignacion, setAbiertas, setFlipped, setPrimero, etc., para evitar los errores de tipado de React.
