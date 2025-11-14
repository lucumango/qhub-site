import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const modules = [
  {
    id: 1,
    title: "De Bits a Qubits",
    desc: "De los bits clásicos a la unidad básica cuántica.",
    img: "learning-path-icons/modulo1.png",
    path: "/aprendizaje/modulo1",
  },
  {
    id: 2,
    title: "Fenómenos Cuánticos",
    desc: "Superposición, interferencia, medición y entrelazamiento.",
    img: "learning-path-icons/modulo2.png",
    path: "/aprendizaje/modulo2",
  },
  {
    id: 3,
    title: "Lógica Cuántica",
    desc: "Probabilidades cuánticas y puertas básicas.",
    img: "learning-path-icons/modulo3.png",
    path: "/aprendizaje/modulo3",
  },
  {
    id: 4,
    title: "Tecnologías del Qubit",
    desc: "Superconductores, iones, fotones y más.",
    img: "learning-path-icons/modulo4.png",
    path: "/aprendizaje/modulo4",
  },
];

const faqs = [
  {
    question: "¿Necesito conocimientos previos en física o matemáticas?",
    answer:
      "No, los módulos están diseñados para ser accesibles a cualquier persona, sin importar su formación previa.",
  },
  {
    question: "¿Los cursos tienen algún costo?",
    answer: "No, todo el contenido es completamente abierto y gratuito para todos los usuarios.",
  },
  {
    question: "¿Puedo acceder desde cualquier dispositivo?",
    answer: "Sí, la plataforma es responsiva. Sin embargo, recomendamos acceder a ella utilizando laptops o computadoras para disfrutar de las actividades en cada módulo.",
  },
];

const TypewriterText = () => {
  const [text, setText] = useState("");
  const fullText =
    "Un espacio educativo abierto creado por QuantumHub Perú para entender lo esencial de la computación cuántica con analogías, animaciones y ejemplos prácticos. A través de 4 módulos o capítulos, podrás avanzar a tu ritmo, explorar por curiosidad o reforzar tus conocimientos.";


  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);


  return (
    <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-lg font-flatory whitespace-pre-line">
      {text.includes("4 módulos") ? (
        <>
          {text.split("4 módulos")[0]}
          <span className="relative font-bold text-quantum-purple px-1">
            {/* Fondo animado detrás del texto */}
            <span className="absolute inset-0 rounded-md bg-gradient-to-r from-quantum-orange/40 animate-gradient-move blur-[2px] opacity-80"></span>
            <span className="relative z-10 ">4 módulos</span>
          </span>
          {text.split("4 módulos")[1]}
        </>
      ) : (
        text
      )}
      <span className="animate-blink ml-1 text-quantum-purple"></span>
    </p>
  );
};

const Aprendizaje = () => {
  return (
    <div className="bg-white">
      {/* HERO Section */}
      <section className="relative pt-10 pb-10 bg-gradient-to-br from-[#0B0F2F] via-[#1A114F] to-[#3B187F] text-white">
        <div className="absolute inset-0 opacity-50 pointer-events-none">
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[2px] h-[2px] bg-white/50 rounded-full animate-twinkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${4 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-2 gap-6 items-center animate-fade-in-up">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-20 h-20" />
              <div className="uppercase tracking-wider text-sm text-white/80">
                QuantumHub · Plataforma abierta
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-staatliches leading-tight">
              Aprende Computación Cuántica, paso a paso
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90 font-flatory">
              Módulos breves, explicaciones visuales y recursos interactivos.
              No necesitas experiencia previa, empieza donde quieras y sumérgete en el mundo cuántico.
            </p>
            <div className="mt-8">
              <a
                href="#modules"
                className="inline-block border px-8 py-3 rounded-full text-lg font-semibold text-white shadow-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all duration-300"
              >
                ¡Empieza ya!
              </a>
            </div>
          </div>
          {/* Computador cuántico */}
          <div className="relative lg:absolute lg:-top-7 lg:right-0 flex justify-center lg:justify-end mt-10 lg:mt-0">
            <img
              src="learning-path-icons/quantum-hero.png"
              alt="Computador cuántico"
              className="w-[0px]   lg:w-[520px] xl:w-[530px] drop-shadow-[0_10px_60px_rgba(255,115,0,0.35)] transition-all duration-300 animate-float-slow"
            />
          </div>
        </div>
      </section>


      {/* INTRODUCCIÓN */}
      <section className=" mt-12 mb-12 py-24 bg-white text-center overflow-hidden">
        {/* Fondo cuántico con partículas */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">


          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[5px] h-[5px] bg-gradient-to-r from-quantum-orange to-quantum-purple rounded-full animate-float-slow"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${4 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>


        {/* Contenido principal */}
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-quantum-purple mb-6 font-staatliches animate-fade-in">
            ¿Qué es esta plataforma?
          </h2>


          {/* Texto máquina de escribir */}
          <TypewriterText />
        </div>
      </section>
     


      {/*SCHRÖDI */}
      <section className="py-24 bg-gradient-to-br from-[#1A114F] via-[#3B187F] to-[#7E22CE] text-white text-center relative overflow-hidden">
        {/* Fondo de partículas */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[3px] h-[3px] bg-white/60 rounded-full animate-twinkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${4 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-10">
          <img
            src="mascota/gato.png"
            alt="Schrödi"
            className="w-[150px] md:w-[180px] animate-float-slow drop-shadow-[0_10px_60px_rgba(255,115,0,0.35)]"
          />
          <div>
            <h2 className="text-3xl md:text-4xl font-staatliches mb-3">
              Aprende con <span className="text-quantum-orange">Schrödi</span>
            </h2>
            <p className="mb-6 text-white/90 font-flatory max-w-xl leading-relaxed">
              Schrödi será tu compañero cuántico a lo largo del recorrido.
              ¡Explora los módulos con él y descubre cómo los qubits desafían la lógica clásica!
            </p>


            <div className="animate-quantum-beat">
              {/* Botón de llamada a la acción */}
              <a
                href="#modules"
                className="mt-20 bg-white text-quantum-purple px-8 py-3 rounded-full font-semibold shadow-lg
                          hover:bg-quantum-orange hover:text-quantum-black transition-all"
              >
                Iniciar misión
              </a>


            </div>
          </div>
        </div>


      </section>




      {/* Modules Section */}
      <section id="modules" className="py-32 bg-gradient-to-b from-white to-[#F9F8FF] relative overflow-hidden">
       
        {/* Línea decorativa detrás de las tarjetas */}
        <div className="absolute top-[55%] left-0 w-full h-[3px] bg-gradient-to-r from-quantum-purple/30 via-quantum-orange/30 to-quantum-purple/30 blur-[1px]" />


        <h2 className="text-4xl md:text-5xl font-bold text-quantum-purple mb-16 font-staatliches text-center">


            ¡Comienza tu aprendizaje!
        </h2>


        <div className="max-w-6xl mx-auto px-6 lg:px-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {modules.map(({ id, title, desc, img, path }) => (
              <Link
                to={path}
                key={id}
                className="group text-center bg-white p-6 rounded-xl border-2 hover:border-quantum-purple/40
                     transition-all duration-500 hover:-translate-y-3 shadow-md hover:shadow-[0_0_35px_rgba(168,85,247,0.3)] relative"
                aria-label={`Abrir ${title}`}
              >
                <img
                  src={img}
                  alt={title}
                  className="w-55 h-55 mx-auto mb-6 drop-shadow-xl transition-transform duration-500 group-hover:scale-110"
                />
                <h3 className="text-2xl font-extrabold text-quantum-orange uppercase tracking-wider">
                  MÓDULO #{id}
                </h3>
                <p className="text-lg font-semibold text-gray-900">{title}</p>
                <p className="mt-2 text-sm text-gray-600">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>


 






      {/* How It Works Section */}
     
      <section className=" relative py-20 bg-gradient-to-b from-[#1A114F] to-[#3B187F] text-white">
        <h2 className="text-4xl text-quantum-white mb-6 font-staatliches text-center mb-8 ">
            ¿Por qué aprender aquí?
          </h2>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white bg-opacity-10 p-6 rounded-xl shadow-lg transition-all duration-500 hover:-translate-y-5">
            <h3 className=" text-xl  mb-2">Abierto y gratuito </h3>
            <p className="text-sm">Contenido para todo público, sin cuentas ni inscripciones</p>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-xl shadow-lg transition-all duration-500 hover:-translate-y-5">
            <h3 className="text-xl mb-2">Aprende a tu Ritmo</h3>
            <p className="text-sm">Módulos cortos, claros y con ejemplos para todos los niveles.</p>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-xl shadow-lg transition-all duration-500 hover:-translate-y-5">
            <h3 className="text-xl  mb-2">Visual e Interactivo</h3>
            <p className="text-sm">Analogías, ilustraciones y simulaciones (esfera de Bloch, doble rendija y más).</p>
          </div>


        </div>
      </section>


     




      {/* FAQ con acordeón estilo original y legible */}
      <section className="py-20 mt-20 mb-20 bg-white max-w-4xl mx-auto px-10 rounded-xl border border-quantum-purple/20 shadow-lg">
        <h2 className="text-3xl font-bold text-quantum-purple mb-10 text-center font-staatliches">
          Preguntas Frecuentes
        </h2>
        <div className="space-y-6">
          {faqs.map(({ question, answer }, idx) => (
            <details
              key={idx}
              className="border border-quantum-purple rounded-lg p-5 group"
              open={idx === 0}
            >
              <summary className="font-semibold cursor-pointer list-none marker:hidden flex justify-between items-center text-quantum-purple select-none text-lg">
                {question}
                <svg
                  className="w-6 h-6 text-quantum-orange shrink-0 transition-transform duration-300 group-open:rotate-45"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                </svg>
              </summary>
              <p className="mt-3 text-gray-700 font-flatory leading-relaxed">{answer}</p>
            </details>
          ))}
        </div>
      </section>






 
    </div>
  );
};


export default Aprendizaje;