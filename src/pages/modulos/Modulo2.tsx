import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import QubitMascot from "@/components/QubitMascot";

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
