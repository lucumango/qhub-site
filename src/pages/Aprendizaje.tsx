import { Link } from "react-router-dom";
import QubitMascot from "@/components/QubitMascot";


const modules = [
  {
    id: 1,
    title: "De Bits a Qubits",
    desc: "De los bits clásicos a la unidad básica cuántica.",
    img: "/modulo1.png",
    path: "/aprendizaje/modulo1",
  },
  {
    id: 2,
    title: "Fenómenos Cuánticos",
    desc: "Superposición, interferencia, medición y entrelazamiento.",
    img: "/modulo2.png",
    path: "/aprendizaje/modulo2",
  },
  {
    id: 3,
    title: "Lógica Cuántica",
    desc: "Probabilidades cuánticas y puertas básicas.",
    img: "/modulo3.png",
    path: "/aprendizaje/modulo3",
  },
  {
    id: 4,
    title: "Tecnologías del Qubit",
    desc: "Superconductores, iones, fotones y más.",
    img: "/modulo4.png",
    path: "/aprendizaje/modulo4",
  },
];

const Aprendizaje = () => {
  return (
    <div className="bg-white">
      {/* HERO tipo plataforma */}
      <section className="relative bg-gradient-quantum-hero">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c0f4a] to-[#4b2d7f]" />
        <div className="relative max-w-6x1 mx-auto px-6 lg:px-20 py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div className="text-white">
            <div className="flex items-center gap-3 mb-3">
              <QubitMascot className="w-20 h-20" />
              <span className="uppercase tracking-wider text-sm text-white/80">
                QuantumHub · Plataforma abierta
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-staatliches leading-tight">
              Aprende Computación Cuántica, paso a paso
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90 font-flatory">
              Módulos breves, explicaciones visuales y recursos interactivos.
              No necesitas experiencia previa, empieza donde quieras y sumérgete al mundo cuántico.
            </p>
          </div>

          {/* Imagen del computador cuántico */}
          <div className="absolute top-0 right-6">
            <img
              src="/quantum-hero.png"
              alt="Computador cuántico"
              className="w-30 max-w-xl mx-auto drop-shadow-[0_10px_40px_rgba(255,115,0,0.35)] rounded-2xl" /> 
              </div>
        </div>
      </section>

      {/* CONTEXTO corto (blanco) */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
           {/* Columna izquierda: texto */}
          <div className="lg:col-span-3 text-left">
            <h2 className="text-3xl font-bold text-quantum-purple">
              ¿Qué es esta plataforma?
            </h2>
            <p className="mt-4 text-lg text-gray-700">
              Un espacio educativo abierto creado por QuantumHub Perú para entender lo esencial de la computación cuántica
              con analogías, animaciones y ejemplos prácticos. Avanza a tu ritmo, explora por
              curiosidad o refuerza lo que ya sabes.
            </p>
            
          </div>
        </div>
        
      </section>
      
      

      {/* ROADMAP: módulos grandes + línea abajo */}
      
      <section className="py-2">
        <h2 className="max-w-6xl mx-auto px-6 gap-14 items-center text-3xl font-bold text-quantum-purple">
              Comienza tu aprendizaje 
        </h2>
        <div className="mt-6 max-w-6xl mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {modules.map(({ id, title, desc, img, path }) => (
              <Link
                to={path}
                key={id}
                className="group text-center p-6 rounded-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(168,85,247,0.35)] border border-transparent hover:border-quantum-purple/30"
                aria-label={`Abrir ${title}`}
              >
                <img
                  src={img}
                  alt={title}
                  className="w-50 h-50 mx-auto mb-6 drop-shadow-xl transition-transform duration-500 group-hover:scale-110"
                />
                <h3 className="text-xl font-bold text-quantum-orange uppercase tracking-wider">
                  MÓDULO #{id}
                </h3>
                <p className="text-lg font-semibold text-gray-900">{title}</p>
                <p className="mt-2 text-sm text-gray-600">{desc}</p>
              </Link>
            ))}
          </div>

          {/* línea debajo de TODO (no interrumpe nada) */}
          <div className="mt-12 h-[4px] rounded-full bg-gradient-to-r from-quantum-orange to-quantum-purple" />
        </div>
      </section>

      {/* POR QUÉ APRENDER AQUÍ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-quantum-purple">¿Por qué aprender aquí?</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
              <h4 className="font-bold text-quantum-black mb-1">Abierto y gratuito</h4>
              <p>Contenido para todo público, sin cuentas ni inscripciones.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
              <h4 className="font-bold text-quantum-black mb-1">Visual e interactivo</h4>
              <p>Analogías, ilustraciones y simulaciones (esfera de Bloch, doble rendija y más).</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
              <h4 className="font-bold text-quantum-black mb-1">Aprende a tu ritmo</h4>
              <p>Módulos cortos con objetivos claros y ejemplos sencillos.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Aprendizaje;
