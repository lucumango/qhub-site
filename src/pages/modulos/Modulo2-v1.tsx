import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, SectionCard } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
import { Lightbulb, Atom } from "lucide-react";
import QuizSuperposicion from "@/components/QuizSuperposicion";
import AlphaBetaSlider from "@/components/AlphaBetaSlider";
import ElDesafíoDeLasCajasCuánticas from "@/components/quantum/ElDesafíoDeLasCajasCuánticas";
import VínculoCuanticoInstantaneo from "@/components/quantum/VínculoCuanticoInstantaneo";

const Modulo2 = () => {
  const [activeSection, setActiveSection] = useState("interferencia");
  const sections = [
    { id: "superposicion", title: "Superposición" },
    { id: "interferencia", title: "Interferencia" },
    { id: "entrelazamiento", title: "Entrelazamiento Cuántico" }
  ];

  // Efecto para manejar el scroll y la sección activa
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
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
      <Sidebar
        sections={sections}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        backLink="/aprendizaje"
      />
      
      <div className="flex-1">
        {/* Hero Section */}
        <div className="relative min-h-screen bg-background" id="interferencia">
          <section className="relative py-20 bg-gradient-to-br from-blue-900 to-purple-900 min-h-[80vh] flex items-center justify-center">
            <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
              <motion.h1 
                className="text-4xl md:text-6xl font-staatliches text-white mb-6"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Interferencia Cuántica
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto font-flatory leading-relaxed mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Explorando cómo las partículas pueden comportarse como ondas y partículas simultáneamente
              </motion.p>
            </div>
          </section>
        </div>

        {/* Main Content Container */}
        <section className="py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-24">
            {/* Superposición */}
            <div className="relative animate-fade-in-up" id="bits-clasicos">
              <SectionCard className="p-12"> 
                <h2 className="text-3xl md:text-5xl font-staatliches text-foreground text-center">
                Superposición
              </h2>
                <div className="flex flex-col gap-10">
            {/*  Schrödi da la bienvenida */}
            <div className="flex items-start gap-4 mb-4">
              <img
                src="/gato.png"
                alt="Schrödi"
                className="w-16 h-16 animate-float-slow"
              />
              <div className="bg-purple-100 text-lg text-purple-800 px-4 py-2 rounded-xl shadow ">
                ¡Hola! Soy <strong>Schrödi</strong>, y hoy veremos cómo
                un qubit puede estar en dos estados a la vez... ¡como si una moneda fuera cara y sello al mismo tiempo!
              </div>
            </div>

            <div className="bg-white border-l-4 border-quantum-purple p-6 rounded-xl shadow-sm">
              <p className="text-lg text-justify leading-relaxed text-gray-700">
                Imagina que lanzas una moneda al aire. Mientras gira, no sabes si cayó en
                <strong> cara </strong> o <strong> sello</strong>.  
                Solo cuando la detienes y la observas, el resultado se define.
                En el mundo cuántico, algo similar ocurre: una partícula como un electrón puede
                estar en una mezcla de varios estados al mismo tiempo, hasta que se mide.  
                A esto se le llama <strong>superposición cuántica</strong>.
              </p>
            </div>

            {/*  Tarjeta principal de explicación */}

            <p className="  text-lg text-justify leading-relaxed text-gray-700">
          Probablemente ya hayas escuchado la palabra <strong>superposición</strong>.  
          Suena misteriosa, pero en realidad describe algo muy simple.  
          Es lo que ocurre cuando un <strong>qubit</strong> no está completamente en el estado <code>|0⟩ </code>  
          ni completamente en el estado <code>|1⟩</code>,  
          sino en una mezcla de ambos al mismo tiempo.
          <br /><br />

              <div className="flex justify-center my-10">
          <img
            src="/gatoCompu.jpg"
            alt="gato computadora"
            className="
              h-96 
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

        <p className=" text-lg text-justify leading-relaxed text-gray-700">
          Matemáticamente, el estado general de un qubit se expresa como:
        </p>


        {/* 🧮 Ecuación del estado cuántico */}
        <div className=" text-lg bg-gray-100 text-gray-800 px-6 py-4 rounded-lg text-center font-mono shadow-md">
              <BlockMath math="|\psi\rangle = \alpha|0\rangle + \beta|1\rangle" />
        </div>

        {/* 📘 Explicación intuitiva */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* 🔹 Lado izquierdo — significado + tarjetas flip */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-quantum-purple/30">
            <h3 className="text-2xl font-bold text-quantum-purple mb-4">
              ¿Qué significa?
            </h3>

            <p className=" text-lg text-gray-700 leading-relaxed mb-5">
              En esta expresión, <strong>α</strong> (alfa) y <strong>β</strong> (beta)
              son los coeficientes que determinan <strong>cuánto del estado |0⟩ y cuánto del estado |1⟩ </strong>
              hay dentro del qubit.
            </p>

            {/* Flip cards: frente solo con |0⟩ y |1⟩ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              {/* Tarjeta |0⟩ */}
              <div className="relative h-44 [perspective:1000px] group" tabIndex={0}>
                <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Frente */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-quantum-purple to-quantum-lilac flex items-center justify-center shadow-md [backface-visibility:hidden]">
                    <span className="text-4xl md:text-5xl font-staatliches text-white">|0⟩</span>
                  </div>
                  {/* Reverso */}
                  <div className="absolute inset-0 rounded-xl bg-white border border-quantum-purple/40 p-5 flex items-center justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <p className="text-lg text-gray-800">
                      Si <strong>α = 1</strong> y <strong>β = 0</strong>, el qubit está completamente en <code>|0⟩</code>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tarjeta |1⟩ */}
              <div className="relative h-44 [perspective:1000px] group" tabIndex={0}>
                <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Frente */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-quantum-orange to-[#FFB066] flex items-center justify-center shadow-md [backface-visibility:hidden]">
                    <span className="text-4xl md:text-5xl font-staatliches text-white">|1⟩</span>
                  </div>
                  {/* Reverso */}
                  <div className="absolute inset-0 rounded-xl bg-white border border-quantum-orange/40 p-5 flex items-center justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <p className="text-lg text-gray-800">
                      Si <strong>α = 0</strong> y <strong>β = 1</strong>, el qubit está totalmente en <code>|1⟩</code>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mt-6 text-lg">
              Cuando <strong>α</strong> y <strong>β</strong> toman otros valores, el
              qubit se encuentra en un estado intermedio o <strong>superposición</strong>,
              donde ambos estados contribuyen con distinta intensidad.
            </p>
          </div>

          {/* 🟠 Lado derecho — Analogía del cóctel cuántico */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-quantum-orange/30">
          <h3 className="text-2xl font-bold text-quantum-orange mb-4">El cóctel cuántico 🍹</h3>

          <p className="text-lg text-gray-700 leading-relaxed mb-5">
            Imagina que el qubit es un <strong>cóctel</strong> con dos ingredientes: azul y rojo. Los 
            coeficientes <strong>α</strong> y <strong>β</strong> indican la proporción de cada uno.
          </p>

            {/* Fondo animado de mezcla */}
            <div className="rple-500 to-red-500 opacity-50 animate-gradient-x blur-lg"></div>

            <div className="relative z-10">
          
                {/* Vaso cuántico animado */}
              <div className="mb-10 flex justify-center">
                <div className="mt-6 mb-6 relative w-32 h-40 border-2 border-white/80 rounded-b-full overflow-hidden shadow-xl animate-float-slow">
                  <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-red-500 via-purple-500 to-blue-500 animate-mix  opacity-90"></div>
                </div>
              </div>
              
                <li className="text-gray-700 leading-relaxed mt-6 text-lg">
                   Si <strong>α</strong> predomina → el sabor azul domina.</li>
                <li className="text-gray-700 leading-relaxed  text-lg">
                  Si <strong>β</strong> predomina → el sabor rojo domina.</li>

            <p className="text-gray-700 leading-relaxed mt-6 text-lg">
              Y cuando ambos se combinan, el qubit está en <strong>superposición</strong>. Una
              mezcla que no es ni totalmente azul ni totalmente roja.
            </p>
              

              </div>
          </div>
        </div>

        <p className="text-lg text-justify leading-relaxed text-gray-700">
          Además, existe una relación muy importante con nuestros coeficientes α (alfa) y β (beta):
        </p>

        {/* 🧮 Ecuación de probabilidad */}
        <div className="text-lg bg-gray-100 text-gray-800 px-6 py-4 rounded-lg text-center font-mono shadow-md">
          <BlockMath math="|\alpha|^2 + |\beta|^2 = 1" />
        </div>


          <p className="text-lg text-justify leading-relaxed text-gray-700 mt-6">
            La ecuación de arriba nos indica que la suma de probabilidades siempre es del 100%. <strong>|α|²</strong> indica la probabilidad de medir <code>|0⟩</code>  
            y <strong>|β|²</strong> la de medir <code>|1⟩</code>.  
            Ambas suman 1, asegurando que el resultado sea coherente. Esto significa que al medir el qubit, 
            solo puede “colapsar” en uno de los dos estados posibles:  
            <code>|0⟩</code> o <code>|1⟩</code>.  
            La probabilidad de obtener <code>|0⟩</code> es <strong>|α|²</strong> y la de obtener <code>|1⟩</code> es <strong>|β|²</strong>.
          </p>



              {/* 🎛️ Control interactivo */}
              <div className="bg-gradient-to-r from-quantum-purple/10 to-quantum-orange/10 p-6 rounded-xl shadow-inner">
                <h3 className="text-center text-3xl font-semibold text-quantum-purple mb-2">
                  ¡Controla la superposición!
                </h3>
                <AlphaBetaSlider />
              </div>

              
          {/* 🎶 Analogía visual */}
              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-quantum-orange">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Puedes pensar en la superposición como una <strong>nota musical</strong>.  
                  una sola nota está formada por muchas frecuencias combinadas.  
            Antes de que la escuches, todas esas ondas están vibrando juntas, superpuestas.  
            Solo al oírla tu cerebro percibe una nota concreta.  
            Así funciona un qubit: vibra entre posibilidades,  
            pero solo “elige” cuando lo observas.
                </p>
              </div>



              {/* 🧩 Quiz final */}
              <QuizSuperposicion />

              <p className="text-lg text-justify leading-relaxed text-gray-700 mt-6">
            En lenguaje sencillo:  
            la superposición es lo que permite que los computadores cuánticos 
            puedan probar varias posibilidades al mismo tiempo.  
            Si un bit clásico representa una respuesta,  
            un qubit en superposición representa <strong>todas las respuestas posibles</strong> a la vez,  
            hasta que se mide y revela solo una.
          </p>


          </div>
              </SectionCard>
            </div>

            {/* Sección 1 */}
          <div className="relative animate-fade-in-up" id="bits-clasicos">
            <SectionCard className="p-12"> 
              
                
              <h2 className="text-3xl md:text-5xl font-staatliches text-foreground text-center">
                Interferencia cuántica
              </h2>
              <div className="prose prose-lg max-w-none font-arimo text-muted-foreground leading-relaxed mb-8">
                
                  
                <div className="my-10">
                {/* Tarjeta morada */}
                <Card className="bg-gradient-to-br from-quantum-purple/20 to-quantum-purple/10 border-quantum-purple/40 shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-quantum-purple">
                      <img
                        src="/mascota/schrodi-profile.png"
                        loading="lazy"
                        alt="Schrödi"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="font-staatliches text-quantum-purple">
                        Analogía de Schrödi
                      </CardTitle>
                      <CardDescription className="text-quantum-purple/70">
                        Un gato cuántico sabe de estos temas...
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <div className="absolute -top-12 right-0 w-24 h-24 opacity-10">
                    <Atom className="w-full h-full text-quantum-purple" />
                  </div>
                  <div className="bg-quantum-purple/10 p-4 rounded-lg border-l-4 border-quantum-purple">
                    <p className="font-arimo mb-4 font-flatory italic text-quantum-purple">
                      "La interferencia filtra el caos de la superposición. Diseñamos olas para reforzar las soluciones correctas y anular las de error. ¡Encontremos la verdad!"
                    </p>
                    <p className="font-arimo mb-4">
                      <strong>Imagina la interferencia como dos olas en un estanque:</strong>
                    </p>
                    <ul className="list-disc pl-6 space-y-2 font-arimo">
                      <li>
                        Refuerzo Constructiva: Si dos olas correctas se encuentran y sus picos se suman pico más pico, el resultado es una ola gigante y fuerte.
                      </li>
                      <li>
                        Cancelación Destructiva: Si una ola correcta se encuentra con una ola de error perfectamente opuesta pico más valle, ambas se anulan y el agua se queda plana.
                      </li>
                    
                    </ul>
                    <p className="font-arimo mt-4 text-sm text-quantum-purple/90 italic">
                      Esta es la clave de la computación cuántica: no probamos soluciones una por una, ¡sino que diseñamos las olas para que los errores se autodestruyan!
                    </p>
                  </div>
                </CardContent>
              </Card>
              </div>

                <div className="space-y-6 font-arimo text-muted-foreground leading-relaxed">
                      <h3 className="text-2xl font-staatliches text-foreground">
                        Interferencia: Ondas de Verdad
                      </h3>

                      <p className="text-xl mb-5">
                        Cuando tienes muchos qubits en superposición, su información no es un simple '0' y '1', sino ondas de probabilidad. Cada onda tiene picos probabilidad alta y valles probabilidad baja.
                      </p>
                      <p className="text-xl mb-5">
                        La computación cuántica manipula estas ondas para lograr dos cosas mágicas esenciales para encontrar la solución a un problema:
                      </p>
                      <ul className="list-none space-y-2 text-lg pl-10">
                        <li>
                            • <strong>Interferencia Constructiva:</strong> Las olas que representan la respuesta correcta se suman, pico más pico, haciendo que esa probabilidad sea mucho más fuerte y brillante.
                        </li>
                        <li>
                            • <strong>Interferencia Destructiva:</strong> Las olas que representan respuestas incorrectas se anulan, pico más valle, como si nunca hubieran existido. ¡Adiós respuestas erróneas!
                        </li>
                      </ul>
                  </div>

                  <div className="my-10">
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
                                      <CardTitle className="font-staatliches text-quantum-lilac">
                                        Doble rendija cuántica
                                      </CardTitle>
                                    </div>
                                  </CardHeader>
                                  <CardContent className="flex flex-col md:flex-row gap-4 items-center">
                                    <div className="bg-quantum-lilac/10 p-3 rounded-lg border-l-4 border-quantum-lilac w-full">
                                      <p className="font-arimo">
                                        <strong>¡Atención!</strong> El Experimento de la Doble Rendija Cuántica nos prueba que un qubit, en superposición, es una onda de probabilidad. Esa onda atraviesa ambas rendijas y genera interferencia consigo misma. Esta Interferencia es nuestro motor cuántico, la técnica que utilizamos para filtrar el caos. La onda se manipula para que sus picos refuercen la solución correcta y sus valles anulen las probabilidades de error. ¡Así, la Interferencia nos entrega directamente la única verdad!
                                    </p>
                                    </div>
                                    <div className="relative overflow-hidden rounded-lg shadow-xl border-4 border-quantum-purple/50">
                                        <img 
                                            src="/img/Interference.gif" 
                                            alt="GIF demostrando el patrón de ondas e interferencia de la doble rendija" 
                                            className="w-full h-auto object-cover" 
                                            loading="lazy"
                                        />
                                    </div>

                                  </CardContent>
                                </Card>
                  </div>


                
              </div>
              
            </SectionCard>
          </div>

        

          {/* Sección de entrelazamiento */}
          <div className="relative animate-fade-in-up" id="bits-clasicos">
            <SectionCard className="p-12"> 
              
                
              <h2 className="text-3xl md:text-5xl font-staatliches text-foreground text-center">
                Entrelazamiento cuántico
              </h2>
              <div className="grid md:grid-cols-2 gap-12 items-center pt-12">
                <div className="space-y-6 font-arimo text-muted-foreground leading-relaxed">
                  <p className="text-xl text-justify">
                    En el mundo clásico, las cosas parecen estar separadas, y lo que le ocurre a una no tiene por qué afectar a la otra. 
                    ¡Pero en mi <strong>universo cuántico</strong>, las reglas cambian! Aquí, algunas <strong>partículas están tan profundamente conectadas</strong>, tan enlazadas, que lo que sucede con una determina instantáneamente el estado de la otra, <strong>sin importar la distancia</strong> que las separe. ¡Es una conexión más rápida que la luz que desafía toda nuestra intuición clásica!
                  </p>

                  
                </div>

                <div className="relative flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-quantum-lilac/25 rounded-full blur-2xl scale-150"></div>
                    <img
                      src="/mascota/schrodi-pointing.png"
                      loading="lazy"
                      alt="Schrödi apuntando"
                      className="relative w-64 h-64 md:w-72 md:h-72 border-quantum-orange"
                    />
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
                                  <CardTitle className="font-staatliches text-quantum-orange text-xl">
                                    Dos partículas entrelazadas
                                  </CardTitle>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div className="bg-quantum-orange/10 p-6 rounded-xl border-l-4 border-quantum-orange">
                                  <p className="font-arimo text-lg leading-relaxed">
                                    El entrelazamiento cuántico conecta partículas de forma misteriosa. 
                                    Lo que le pase a una afecta instantáneamente a la otra. 
                                    No importa la distancia, la correlación es total.
                                  </p>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                          <div className="mt-8">
                            <VínculoCuanticoInstantaneo />
                          </div>
              
            </SectionCard>
          </div>

          

          </div>
        </section>
      </div>
    </div>
  );
};



export default Modulo2;