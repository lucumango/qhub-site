import React, { useState, useEffect, useLayoutEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, SectionCard } from "@/components/ui/card";
import { Lightbulb, Zap, Atom, Cpu, Binary, Sparkles, Scale, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import { aplicacionesCuanticas } from "@/data/quantumData";
import ConceptClassification from "@/components/ConceptClassification"; 

const sections = [
    { id: "introduccion", title: "Introducción" },
    { id: "por-que-cuantica", title: "¿Por qué nos importa la cuántica?" },
    { id: "bits-clasicos", title: "Bits Clásicos" },
    { id: "qubits", title: "Qubits y Superposición" },
    { id: "importancia", title: "¿Por qué es importante?" },
    { id: "aplicaciones", title: "Aplicaciones del Futuro" },
    { id: "reflexion", title: "Reflexión Final" },
    { id: "clasificar-conceptos", title: "Quiz del módulo" },
  ];

export function Modulo1() {
  const [bitState, setBitState] = useState(false);
  const [qubitRotation, setQubitRotation] = useState(0);
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useLayoutEffect(() => {
  window.scrollTo({ top: 0, behavior: "instant" });
}, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      }, { threshold: 0.3 }
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
      {/* Contenido principal */}
      <div className="flex-1">
      <div className="relative min-h-screen bg-background" id="introduccion">
      <section className="relative py-20 bg-gradient-quantum-hero relative min-h-screen flex items-center justify-center">

  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-purple-400 rounded-full"
        initial={{ 
          x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
          y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
          opacity: 0
        }}
        animate={{
          y: [null, Math.random() * 800 - 400],
          x: [null, Math.random() * 1000 - 500],
          opacity: [0, 0.8, 0],
          scale: [0, 1.5, 0]
        }}
        transition={{ duration: Math.random() * 8 + 6, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 5}}
        style={{ filter: 'blur(1px)', boxShadow: '0 0 10px rgba(168, 85, 247, 0.6)'}}
      />
    ))}

    {/* Particulas en naranja */}
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={`orange-${i}`}
        className="absolute w-1.5 h-1.5 bg-orange-400 rounded-full"
        initial={{ 
          x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
          y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
          opacity: 0
        }}
        animate={{
          y: [null, Math.random() * 600 - 300],
          x: [null, Math.random() * 800 - 400],
          opacity: [0, 0.6, 0],
          scale: [0, 1, 0]
        }}
        transition={{ duration: Math.random() * 10 + 8, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 7 }}
        style={{ filter: 'blur(0.5px)', boxShadow: '0 0 8px rgba(251, 146, 60, 0.5)' }}
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
      De Bits a Qubits: El salto cuántico
    </motion.h1>
    
    <motion.p 
      className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto font-flatory leading-relaxed mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      Descubre cómo la información cuántica revoluciona nuestra
      comprensión de la computación y abre las puertas a un futuro
      tecnológico extraordinario
    </motion.p>

    <motion.div 
      className="relative max-w-4xl mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="grid md:grid-cols-[auto_1fr] gap-6 items-center">

        <motion.div 
          className="relative mx-auto md:mx-0"
          animate={{ 
            y: [0, -15, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-quantum-orange/40 to-quantum-purple/40 rounded-full blur-3xl scale-110 animate-pulse" />
          <div className="relative">
            <img
              src="/mascota/schrodi-reading.png"
              loading="lazy"
              alt="Schrödi, tu guía cuántico"
              className="w-64 h-64 md:w-64 md:h-64 lg:w-96 lg:h-96 object-contain drop-shadow-2xl relative z-10"
            />
          </div>
        </motion.div>

        {/* Caja de dialogo */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {/* Triangulo apuntador */}
          <div className="hidden md:block absolute left-[-10px] top-1/2 transform -translate-x-2 -translate-y-1/2 w-0 h-0 
                          border-t-[15px] border-t-transparent
                          border-r-[20px] border-r-white/10
                          border-b-[15px] border-b-transparent
                          backdrop-blur-xl" 
               style={{ filter: 'drop-shadow(-2px 0 4px rgba(0,0,0,0.1))' }}
          />
          
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
            <p className="font-arimo italic text-lg md:text-xl text-white leading-relaxed">
              "¡Hola! Soy <strong className="text-quantum-orange">Schrödi</strong>, tu guía en este viaje cuántico.
              <br />
              <span className="text-gray-300">
                Soy el gato que existe y no existe… hasta que me observas.
              </span>
              <br />
              <span className="text-quantum-orange font-bold mt-2 inline-block">
                ¡Sígueme y descubramos juntos el fascinante universo de los qubits! 
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
        {/* <span className="text-sm font-arimo">Desplázate para continuar</span> */}
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </motion.div>
  </div>
</section>

      {/* Contenido */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-24">
          {/* Sección 1 */}
          <div className="relative animate-fade-in-up" id="por-que-cuantica">
            <SectionCard>
              <h2 className="text-3xl md:text-5xl font-staatliches text-foreground mb-8 text-center">
                ¿Por qué nos importa la cuántica?
              </h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 font-arimo text-muted-foreground leading-relaxed">
                  <p className="text-lg">
                    La palabra "cuántica" puede sonar intimidante, como algo
                    reservado solo para científicos con batas blancas. Sin embargo,
                    su impacto ya está en nuestras vidas y promete revolucionar la
                    tecnología, desde los ordenadores hasta la medicina.
                  </p>

                  <p className="text-lg">
                    Imagina una tecnología tan potente que podría resolver problemas
                    que hoy nos parecen imposibles, o crear materiales con
                    propiedades nunca antes vistas. La física cuántica es la llave a
                    ese futuro, un mundo donde las reglas de lo muy pequeño son
                    extrañas y fascinantes.
                  </p>

                  <p className="text-lg">
                    No estamos hablando de ciencia ficción. Estamos hablando de la
                    próxima revolución tecnológica que definirá el siglo XXI, y
                    sígueme en este viaje para ser parte de ella.
                  </p>
                </div>

                <div className="relative flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-quantum-orange/20 rounded-full blur-2xl scale-150"></div>
                    <img
                      src="/mascota/schrodi-standing.png"
                      loading="lazy"
                      alt="Schrödi pensando"
                      className="relative w-64 h-64 md:w-72 md:h-72 border-quantum-orange"
                    />
                  </div>
                </div> 
              </div>
            </SectionCard> 
            
            <div className="mt-8 grid">
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
                      Dato Cuántico de Schrödi
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                <div className="flex flex-col md:flex-row bg-quantum-orange/10 p-6 rounded-xl border-l-4 border-quantum-orange items-center md:space-x-8">
                  <div className="flex-1 order-2 md:order-1 mt-6 md:mt-0">
                    <p className="font-arimo text-lg leading-relaxed text-gray-800">
                      <strong className="text-xl text-quantum-orange block mb-2">
                        En 2019, mi colega Sycamore —un procesador cuántico de Google— logró algo asombroso: resolver en 200 segundos un cálculo que al superordenador clásico más veloz le habría tomado 10,000 años.
                      </strong>{" "}
                      Ese momento marcó el inicio de la llamada ‘ventaja cuántica’, el punto donde la física cuántica empezó a ganarle al silicio.
                    </p>
                  </div>

                  <div className="order-1 md:order-2">
                    <img
                      src="/img/sycamore.png"
                      loading="lazy"
                      alt="Chip cuántico Sycamore"
                      className="w-full max-w-xs h-auto md:w-72 md:h-auto rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              </CardContent>
              </Card>
            </div>
          </div>

          {/* Sección 2 */}
          <div className="relative animate-fade-in-up" id="bits-clasicos">
            <SectionCard className="p-12"> 
              <div className="grid lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-3xl md:text-5xl font-staatliches text-foreground">
                  Bits Clásicos: La Base de Todo
                </h2>

                <div className="space-y-6 font-arimo text-muted-foreground leading-relaxed">
                  <p className="text-lg">
                    Para entender el salto cuántico, primero debemos entender cómo
                    funciona la informática que usamos hoy.
                  </p>

                  <h3 className="text-2xl font-staatliches text-foreground">
                    El Bit Clásico: El Interruptor de Luz
                  </h3>

                  <p className="text-lg">
                    En el mundo de los ordenadores tradicionales, la información se
                    guarda en bits. Un bit es la unidad más pequeña de información y
                    es increíblemente simple: solo puede tener dos estados, un{" "}
                    <strong>0</strong> o un <strong>1</strong>.
                  </p>

                  <p className="text-lg">
                    Todos los datos de tu computadora —imágenes, textos, videos— se
                    componen de miles de millones de estos interruptores, trabajando
                    juntos para crear la complejidad que ves en tu pantalla. Es como
                    construir una catedral con ladrillos: cada ladrillo es simple,
                    pero juntos crean algo magnífico.
                  </p>
                </div>
              </div>
              
              <div className="relative"> 
                {/* Bit clasico */}
                <motion.div
                  className="text-center space-y-6"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-2xl font-staatliches text-quantum-dark-blue">
                    Bit clásico
                  </h3>
                  <div className="relative mx-auto w-48 h-32 flex items-center justify-center">
                      <motion.div
                        className={`relative w-28 h-14 rounded-full border-4 transition-all duration-500 cursor-pointer flex items-center ${
                          bitState
                            ? "bg-quantum-orange border-quantum-orange shadow-lg shadow-quantum-orange/30"
                            : "bg-gray-600 border-gray-400"
                        }`}
                        onClick={() => setBitState(!bitState)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="w-10 h-10 bg-white rounded-full shadow-md"
                          animate={{
                            x: bitState ? 64 : 2,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      </motion.div>
                    </div>
                    <p className="text-lg font-arimo">
                      Estado:{" "}
                      <span className="text-quantum-orange font-bold">
                        {bitState ? "1 (Encendido)" : "0 (Apagado)"}
                      </span>
                    </p>
                    <p className="text-gray-300 text-sm font-arimo">
                      Un bit solo puede estar en uno de dos estados: 0 o 1
                    </p>
                  </motion.div>

              </div>
            </div>
            </SectionCard>

            <div className="mt-8">
              <Card className="bg-gradient-to-br from-quantum-dark-blue/20 to-quantum-dark-blue/10 border-quantum-dark-blue/40 shadow-2xl backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-quantum-dark-blue shadow-lg">
                      <img
                        src="/mascota/schrodi-reading.png"
                        loading="lazy"
                        alt="Schrödi leyendo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="font-staatliches text-quantum-dark-blue text-xl">
                      Mi Caja Cuántica de Analogías
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <div className="absolute -top-8 -right-8 w-20 h-20 opacity-20">
                    <Lightbulb className="w-full h-full text-quantum-dark-blue" />
                  </div>
                  <div className="bg-quantum-dark-blue/10 p-6 rounded-xl border-l-4 border-quantum-dark-blue">
                    <p className="font-arimo mb-4 font-flatory italic text-quantum-dark-blue text-lg">
                      "Para entender lo básico, te propongo pensar en un bit como
                      algo muy simple de tu día a día..."
                    </p>
                    <p className="font-arimo mb-4 text-lg">
                      <strong>
                        Piensa en un bit como un interruptor de luz en tu casa:
                      </strong>
                    </p>
                    <ul className="list-disc pl-6 space-y-3 font-arimo text-base">
                      <li>
                        Está <strong>encendido (1)</strong> o{" "}
                        <strong>apagado (0)</strong>
                      </li>
                      <li>No hay nada en el medio</li>
                      <li>Su estado es siempre claro y definitivo</li>
                      <li>
                        Millones de estos "interruptores" trabajan juntos en tu
                        computadora
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
            
          </div>

          {/* Sección 3 */}
            <div id="qubits" className="relative animate-fade-in-up">
              <SectionCard className="p-12">
                <div className="grid lg:grid-cols-3 gap-8 items-center">
                  <div className="relative flex justify-center lg:justify-start order-2 lg:order-1">
                    <div className="relative"> {/* grid md:grid-cols-2 gap-16 items-center */}
                      <motion.div
                    className="text-center space-y-6"
                    whileHover={{ scale: 1.02 }}
                    >
                    <h3 className="text-2xl font-staatliches text-quantum-purple">
                      Cúbit cuántico
                    </h3>
                    <div className="relative mx-auto w-48 h-32 flex items-center justify-center">
                      <motion.div
                        className="relative w-24 h-24 mx-auto cursor-grab active:cursor-grabbing"
                        drag
                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                        dragElastic={0.1}
                        onDrag={(_, info) => {
                          const angle =
                            Math.atan2(info.offset.y, info.offset.x) *
                            (180 / Math.PI);
                          setQubitRotation((angle + 360) % 360);
                        }}
                        animate={{ rotateY: qubitRotation }}
                        transition={{
                          type: "spring",
                          stiffness: 100,
                        }}
                      >
                        <motion.div
                          className="absolute inset-0 rounded-full bg-gradient-to-br from-quantum-purple to-quantum-orange"
                          animate={{ opacity: [0.6, 1, 0.6] }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop" as const,
                          }}
                        />
                        <motion.div
                          className="absolute inset-2 rounded-full bg-gradient-to-tr from-quantum-dark-blue to-quantum-purple"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 8,
                            ease: "linear",
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop" as const,
                          }}
                        />
                        <motion.div
                          className="absolute inset-4 rounded-full bg-white/20 backdrop-blur"
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop" as const,
                          }}
                        />
                      </motion.div>
                    </div>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={qubitRotation}
                        onChange={(e) => setQubitRotation(Number(e.target.value))}
                        className="w-full accent-quantum-orange"
                      />
                      <p className="text-lg font-arimo">
                        Superposición:{" "}
                        <span className="text-quantum-orange font-bold">
                          {(() => {
                            const prob0 = Math.round(
                              Math.pow(Math.cos((qubitRotation * Math.PI) / 360), 2) * 100
                            );
                            return `${prob0}% |0⟩ + ${100 - prob0}% |1⟩`;
                          })()}
                        </span>
                      </p>
                    </div>
                      <p className="text-gray-300 text-sm font-arimo">
                      Un cúbit puede estar en una superposición de ambos estados
                      simultáneamente. ¡Arrástrame!
                      </p>
                      </motion.div>
                    </div>
                  </div>

                  <div className="lg:col-span-2 space-y-6 order-1 lg:order-2">
                    <h2 className="text-3xl md:text-5xl font-staatliches text-foreground">
                      Qubits: La Magia de la Superposición
                    </h2>

                  <div className="bg-gradient-to-r from-quantum-purple/20 to-transparent p-6 rounded-xl mb-6 border-l-4 border-quantum-purple">
                    <p className="italic text-lg font-flatory text-quantum-purple mb-2">
                    "Sígueme a la parte más fascinante de mi mundo cuántico. Aquí
                    es donde la realidad deja de ser lo que pensabas..."
                    </p>
                    <p className="text-right text-sm font-bold text-quantum-purple/70">
                    — Schrödi, en estado de superposición
                    </p>
                  </div>

                <div className="space-y-6 font-arimo text-muted-foreground leading-relaxed">
                  <h3 className="text-2xl font-staatliches text-foreground">
                    El Qubit Cuántico: La Esfera Mágica
                  </h3>

                  <p className="text-lg">
                    Ahora, olvídate del interruptor y piensa en una esfera. Esta es
                    la mejor analogía para un qubit (quantum bit).
                  </p>

                  <p className="text-lg">
                    Mientras que un bit clásico solo puede ser 0 o 1 (los polos de
                    la esfera), un qubit puede existir en
                    <strong> cualquier punto de la superficie de esa esfera</strong>
                    . Esto significa que un qubit puede ser 0, 1, o una combinación
                    de 0 y 1 al mismo tiempo. Este estado dual se llama{" "}
                    <strong>superposición</strong>.
                  </p>

                  <p className="text-lg">
                    Solo cuando medimos el qubit, "elige" aleatoriamente ser un 0 o
                    un 1, colapsando todas las posibilidades a un estado definitivo.
                    Es como si la realidad misma fuera probabilística hasta el
                    momento de la observación.
                      </p>
                    </div>
                  </div>
                </div>
              </SectionCard>

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
                    "¿Te has preguntado alguna vez cómo puedo estar en mi caja y
                    fuera de ella al mismo tiempo? Déjame explicártelo con algo
                    más simple..."
                  </p>
                  <p className="font-arimo mb-4">
                    <strong>Imagina una moneda girando en el aire:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2 font-arimo">
                    <li>
                      Mientras gira, no es cara ni cruz, sino{" "}
                      <strong>una mezcla de ambas</strong>
                    </li>
                    <li>
                      Existe en un estado de <strong>superposición</strong> de
                      todas las posibilidades
                    </li>
                    <li>
                      Solo cuando cae y la observas, se "decide" su estado final
                    </li>
                    <li>
                      Un qubit funciona igual: permanece en superposición hasta
                      que se mide
                    </li>
                  </ul>
                  <p className="font-arimo mt-4 text-sm text-quantum-purple/90 italic">
                    Esta es la esencia de la mecánica cuántica: la realidad no
                    está determinada hasta que la observamos. ¡Por eso nosotros
                    los gatos cuánticos somos tan especiales!
                  </p>
                </div>
              </CardContent>
            </Card>
            </div>

          {/* Sección 4 */}
            <div id="importancia" className="relative animate-fade-in-up">
              <SectionCard className="p-12">
                <h2 className="text-3xl md:text-4xl font-staatliches text-foreground mb-8 text-center">
                ¿Por Qué es tan Importante esta Diferencia?
                </h2>
                <div className="prose prose-lg max-w-none font-arimo text-muted-foreground leading-relaxed mb-8">
              <p className="text-lg mb-6">
                La superposición le da a la computación cuántica un poder
                increíble que crece de forma <strong>exponencial</strong>.
              </p>

              <p className="text-lg mb-6">
                Mientras que un ordenador clásico con 2 bits solo puede estar en
                uno de los cuatro estados posibles (00, 01, 10, 11) a la vez, un
                ordenador cuántico con 2 qubits puede estar en los{" "}
                <strong>cuatro estados simultáneamente</strong> gracias a la
                superposición.
              </p>

              <p className="text-lg mb-6">
                A medida que agregamos más qubits, el número de estados que
                pueden procesar a la vez crece exponencialmente:
              </p>

              <div className="bg-quantum-lilac/10 p-6 rounded-lg mb-6">
                <ul className="list-none space-y-2 font-staatliches text-lg">
                  <li>• 1 qubit = 2 estados simultáneos</li>
                  <li>• 2 qubits = 4 estados simultáneos</li>
                  <li>• 3 qubits = 8 estados simultáneos</li>
                  <li>• 10 qubits = 1,024 estados simultáneos</li>
                  <li>
                    • 50 qubits = 1,125,899,906,842,624 estados simultáneos
                  </li>
                </ul>
              </div>

                <p className="text-lg mb-8">
                Esta capacidad de procesar múltiples posibilidades al mismo
                tiempo es lo que hace a los ordenadores cuánticos
                extraordinariamente rápidos para resolver ciertos tipos de
                problemas que son prácticamente imposibles para las computadoras
                clásicas.
                </p>
                </div>

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
                    Dato Asombroso de Schrödi
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row gap-4 items-center">
                <div className="bg-quantum-lilac/10 p-3 rounded-lg border-l-4 border-quantum-lilac w-full">
                  <p className="font-arimo">
                    <strong>
                      Imagina esto: con unos 300 qubits, un ordenador cuántico podría hacer más cálculos que átomos 
                      hay en el universo observable.
                    </strong>{" "}
                    Sí, lo sé… eso suena exagerado, pero así es la cuántica: cuanto más la entiendes, más te vuela la mente.
                    Y pensar que todo empezó con un gato en una caja…
                  </p>
                </div>
              </CardContent>
            </Card>
              </SectionCard>
            </div>

          {/* Sección 5*/}
          <div className="animate-fade-in-up" id="aplicaciones">
            <SectionCard className="p-12">
            <h2 className="text-3xl md:text-4xl font-staatliches text-foreground mb-8 text-center">
              El Futuro Cuántico: Aplicaciones que Cambiarán el Mundo
            </h2>

            <div className="prose prose-lg max-w-none font-arimo text-muted-foreground leading-relaxed mb-8">
              <p className="text-lg mb-6">
                La computación cuántica aún está en sus primeras etapas, pero
                sus promesas son enormes y están más cerca de lo que imaginas:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {aplicacionesCuanticas.map((app, index) => (
                <Card
                  key={index}
                  className={`bg-gradient-to-br from-${app.color}/10 to-${app.color}/5 border-${app.color}/30 hover-quantum`}
                >
                  <CardHeader>
                    <CardTitle className={`font-staatliches text-${app.color}`}>
                      {app.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="font-arimo">
                      {app.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <p className="text-xl font-staatliches text-foreground mb-4">
                En resumen, la cuántica no es solo una teoría extraña, sino una
                nueva forma de entender y manipular la realidad que podría
                cambiar radicalmente nuestra tecnología y nuestra sociedad.
              </p>
              <p className="text-2xl font-staatliches text-gradient-quantum">
                ¿Estás listo para el salto cuántico?
              </p>
            </div>
          </SectionCard>
          </div>

          {/* Preguntas con Schrodi */}
          <div className="animate-fade-in-up" id="reflexion">
            <Card className="bg-gradient-quantum border-quantum-purple/30 shadow-lg">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-quantum-orange">
                    <img
                      src="/mascota/schrodi-reading.png"
                      loading="lazy"
                      alt="Schrödi pensando"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <CardTitle className="text-2xl font-staatliches text-white mb-4">
                  Preguntas de Schrödi
                </CardTitle>
                <CardDescription className="text-gray-200 font-arimo">
                  Tómate unos minutos para reflexionar conmigo sobre estos
                  conceptos cuánticos y prepárate para nuestro siguiente viaje
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-white">
                  <div className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-colors">
                    <p className="font-arimo">
                      <strong>1.</strong> ¿Cómo crees que la capacidad de un
                      qubit de estar en superposición podría aplicarse a un
                      problema específico que te interese (medicina, finanzas,
                      arte, etc.)?
                    </p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-colors">
                    <p className="font-arimo">
                      <strong>2.</strong> Si un ordenador clásico es como un
                      interruptor de luz y un qubit como una moneda girando,
                      ¿qué otras analogías se te ocurren para explicar la
                      superposición cuántica?
                    </p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-colors">
                    <p className="font-arimo">
                      <strong>3.</strong> ¿Qué implicaciones éticas crees que
                      podría tener una tecnología tan poderosa como la
                      computación cuántica? ¿Cómo deberíamos prepararnos como
                      sociedad?
                    </p>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <p className="font-flatory text-quantum-orange italic">
                    "Recuerda que en el mundo cuántico, las preguntas a veces
                    son más importantes que las respuestas. ¡Te espero en el
                    próximo módulo para seguir explorando juntos!" — Schrödi
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <SectionCard className="p-12" id="clasificar-conceptos">
            <ConceptClassification />

                      {/* --- Cierre y CTA al Módulo--- */}
          <Card className="bg-gradient-quantum border-quantum-purple/30 shadow-lg mt-12">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-quantum-orange bg-white/20 p-2">
                        <img
                          src="/mascota/schrodi-reading.png"
                          loading="lazy"
                          alt="Schrödi sonriendo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    <p className="font-flatory text-2xl md:text-3xl text-white italic">
                      "¡Has completado tu inmersión en el mundo cuántico! Ahora sabes <strong>por qué nos importa</strong> y la diferencia entre Bits Clásicos y Qubits."
                    </p>
                  </CardHeader>
                  <CardContent className="text-center space-y-6">
                    <p className="font-flatory text-2xl text-quantum-orange italic">
                      "El futuro de la computación es prometedor, pero ahora... ¡a la acción!"
                    </p>
                    <p className="font-staatliches text-3xl text-white">
                      Es hora de comprender los <strong>fenómenos clave</strong> que hacen posible la cuántica. ¡El Qubit te espera!
                    </p>
                    
                    <Link 
                      to="/aprendizaje/modulo2"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-quantum-orange text-white font-staatliches text-2xl rounded-lg shadow-lg hover:bg-quantum-orange/90 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-quantum-orange focus:ring-offset-2 focus:ring-offset-quantum-purple"
                    >
                      Continúa al Módulo 2: Superposición, Interferencia y Entrelazamiento
                      <ChevronRight className="w-7 h-7" />
                    </Link>
                  </CardContent>
                </Card>
          </SectionCard>

        </div>
      </section>
    </div>
      </div>
    </div>
  );
};

export default Modulo1;