import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import QubitMascot from "@/components/QubitMascot";
import QuizSuperposicion from "@/components/QuizSuperposicion";
import AlphaBetaSlider from "@/components/AlphaBetaSlider";
import 'katex/dist/katex.min.css'
import { BlockMath } from 'react-katex'


const sections = [
  { id: "superposicion", title: "Superposición" },
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

            {/* Contenido de la sección */}
            {s.id === "superposicion" && (
  <div className="flex flex-col gap-10">
    {/* 🐱 Schrödi da la bienvenida */}
    <div className="flex items-start gap-4 mb-4">
      <img
        src="/gato.png"
        alt="Schrödi"
        className="w-16 h-16 animate-float-slow"
      />
      <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-xl shadow ">
        ¡Hola! Soy <strong>Schrödi</strong>, y hoy veremos cómo
        un qubit puede estar en dos estados a la vez... ¡como si una moneda fuera cara y sello al mismo tiempo!
      </div>
    </div>

    <div className="bg-white border-l-4 border-quantum-purple p-6 rounded-xl shadow-sm">
      <p className="text-justify leading-relaxed text-gray-700">
        Imagina que lanzas una moneda al aire. Mientras gira, no sabes si cayó en
        <strong> cara </strong> o <strong> sello</strong>.  
        Solo cuando la detienes y la observas, el resultado se define.
        En el mundo cuántico, algo similar ocurre: una partícula como un electrón puede
        estar en una mezcla de varios estados al mismo tiempo, hasta que se mide.  
        A esto se le llama <strong>superposición cuántica</strong>.
      </p>
    </div>


    {/* 🌙 Tarjeta principal de explicación */}

    <p className="text-justify leading-relaxed text-gray-700">
  Probablemente ya hayas escuchado la palabra <strong>superposición</strong>.  
  Suena misteriosa, pero en realidad describe algo muy simple.  
  Es lo que ocurre cuando un <strong>qubit</strong> no está completamente en el estado <code>|0⟩</code>  
  ni completamente en el estado <code>|1⟩</code>,  
  sino en una mezcla de ambos al mismo tiempo.
  <br /><br />

      <div className="flex justify-center my-10">
  <img
    src="/gatoCompu.jpg"
    alt="gato computadora"
    className="
      w-90 
      rounded-2xl 
      shadow-lg 
      transition-all 
      duration-700 
      hover:scale-105 
      hover:shadow-[0_0_35px_rgba(168,85,247,0.4)] 
      animate-float-slow
    "
  />
</div>



  Sabemos que una computadora tradicional, como la de nuestros hogares, funciona con bits clásicos, donde solo existen dos opciones para procesar información:  
  <strong> 1</strong> (verdadero) o <strong>0</strong> (falso).  
  Pero en el mundo cuántico, el qubit no se limita a elegir.  
  En lugar de decir “soy 0” o “soy 1”, dice algo como:  
  <em> “soy un poco de los dos”</em>.  
  Esa es la esencia de la superposición.
</p>

<p className="text-justify leading-relaxed text-gray-700">
  Matemáticamente, podemos escribir a un qubit en superposición así:
</p>


    {/* 🧮 Ecuación del estado cuántico */}
    <div className="bg-gray-100 text-gray-800 px-6 py-4 rounded-lg text-center font-mono shadow-md">
      <BlockMath math="|\psi\rangle = \alpha|0\rangle + \beta|1\rangle" />
    </div>

    {/* 📘 Explicación intuitiva */}
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-md border border-quantum-purple/30">
        <h3 className="text-xl font-bold text-quantum-purple mb-3">¿Qué significa?</h3>
        <p className="text-gray-700 leading-relaxed">
          En esta fórmula, <strong>α</strong> (alfa) y <strong>β</strong> (beta) son números que representan 
  <strong> qué tanto del estado |0⟩ y del estado |1⟩</strong> hay dentro del qubit.  
  <br></br>
  <br></br>
  Si <strong>α = 1</strong> y <strong>β = 0</strong>, el qubit es completamente <code>|0⟩</code>.  
  Si <strong>α = 0</strong> y <strong>β = 1</strong>, es completamente <code>|1⟩</code>.  
  Pero si ambos tienen valores intermedios, el qubit está en superposición.
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-md border border-quantum-orange/30">
        <h3 className="text-xl font-bold text-quantum-orange mb-3">Probabilidades</h3>
        <p className="text-gray-700 leading-relaxed">
          <strong>|α|²</strong> indica la probabilidad de medir <code>|0⟩</code>  
          y <strong>|β|²</strong> la de medir <code>|1⟩</code>.  
          Ambas suman 1, asegurando que el resultado sea coherente: ¡el qubit siempre colapsa a algo!
        </p>
      </div>
    </div>

    <p className="text-justify leading-relaxed text-gray-700">
  Además, existe una relación muy importante con nuestros coeficientes α (alfa) y β (beta):
</p>

     {/* 🧮 Ecuación de probabilidad */}
    <div className="bg-gray-100 text-gray-800 px-6 py-4 rounded-lg text-center font-mono shadow-md">
      <BlockMath math="|\alpha|^2 + |\beta|^2 = 1" />
    </div>


<p className="text-justify leading-relaxed text-gray-700 mt-6">
  La ecuación de arriba nos indica que la suma de probabilidades siempre es del 100%. <strong>|α|²</strong> indica la probabilidad de medir <code>|0⟩</code>  
          y <strong>|β|²</strong> la de medir <code>|1⟩</code>.  
          Ambas suman 1, asegurando que el resultado sea coherente. Esto significa que al medir el qubit, 
          solo puede “colapsar” en uno de los dos estados posibles:  
  <code>|0⟩</code> o <code>|1⟩</code>.  
  La probabilidad de obtener <code>|0⟩</code> es <strong>|α|²</strong> y la de obtener <code>|1⟩</code> es <strong>|β|²</strong>.
</p>


{/* 🎶 Analogía visual */}
    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-quantum-orange">
      <p className="text-gray-700 leading-relaxed">
        Puedes pensar en la superposición como una <strong>nota musical</strong>.  
        una sola nota está formada por muchas frecuencias combinadas.  
  Antes de que la escuches, todas esas ondas están vibrando juntas, superpuestas.  
  Solo al oírla tu cerebro percibe una nota concreta.  
  Así funciona un qubit: vibra entre posibilidades,  
  pero solo “elige” cuando lo observas.
      </p>
    </div>



    {/* 🎛️ Control interactivo */}
    <div className="bg-gradient-to-r from-quantum-purple/10 to-quantum-orange/10 p-6 rounded-xl shadow-inner">
      <h3 className="text-center text-2xl font-semibold text-quantum-purple mb-2">
        ¡Controla la superposición!
      </h3>
      <AlphaBetaSlider />
    </div>


    {/* 🧩 Quiz final */}
    <QuizSuperposicion />

    <p className="text-justify leading-relaxed text-gray-700 mt-6">
  En lenguaje sencillo:  
  la superposición es lo que permite que los computadores cuánticos 
  puedan probar varias posibilidades al mismo tiempo.  
  Si un bit clásico representa una respuesta,  
  un qubit en superposición representa <strong>todas las respuestas posibles</strong> a la vez,  
  hasta que se mide y revela solo una.
</p>


  </div>
)}

            {s.id === "entrelazamiento" && (
              <div className="flex flex-col items-center">
                <p className="text-justify leading-relaxed text-gray-700">
                  La mamá de Vania y Dayana les prepara su lonchera todos los días. 
                  En cada lonchera puede poner arroz con leche o mazamorra morada. 
                  Hasta que las chicas no abran su lonchera, ninguna sabe qué le tocó.Pero en cuanto 
                  Vania abre la suya y ve que tiene arroz con leche, de inmediato sabe que a 
                  Dayana le tocó  mazamorra morada. Y si Dayana abre primero y encuentra  
                  mazamorra morada, sabe que Vania tiene arroz con leche.
                  <br /><br />
        
                </p>

      
              </div>
            )}

          
            {s.id !== "superposicion" && (
              <p className="text-gray-700 text-justify leading-relaxed">
                Contenido de {s.title} (pronto se agregará más detalle aquí).
              </p>
            )}
          </section>
        ))}
      </main>
    </div>
  );
};

export default Modulo2;
