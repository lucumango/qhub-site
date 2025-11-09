import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, SectionCard } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
import { Lightbulb, Atom } from "lucide-react";
import LaDobleRendijaCuantica from "@/components/quantum/LaDobleRendijaCuantica";

const Modulo2 = () => {
  const [activeSection, setActiveSection] = useState("interferencia");
  const sections = [
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

        { /* Sección de Interferencia - Componente Interactivo */}

            {/* Sección de Entrelazamiento */}
            <div className="relative" id="entrelazamiento">
              <SectionCard className="p-12">
                <h2 className="text-3xl font-staatliches text-quantum-purple mb-8">
                  Experimento de la doble rendija
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    El entrelazamiento cuántico es un fenómeno donde las partículas permanecen conectadas de tal manera que el estado de una partícula puede depender del estado de otra, sin importar la distancia que las separe.
                  </p>
                </div>
                
              </SectionCard>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
};

// Componente de partículas para el fondo
const ParticlesBG = () => (
  <div className="absolute inset-0">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-white rounded-full"
        initial={{
          x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
          y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
          opacity: 0
        }}
        animate={{
          x: [null, typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0],
          y: [null, typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0],
          opacity: [0, 0.6, 0],
          scale: [0, 1, 0]
        }}
        transition={{
          duration: Math.random() * 10 + 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 5
        }}
      />
    ))}
  </div>
);

export default Modulo2;