import React, { useState, useEffect, useLayoutEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, SectionCard } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Lightbulb, Atom, ChevronRight } from "lucide-react";
import QuizSuperposicion from "@/components/QuizSuperposicion";
import AlphaBetaSlider from "@/components/AlphaBetaSlider";
import 'katex/dist/katex.min.css'
import { BlockMath } from 'react-katex'
import QuantumMeasurementSim from "@/components/QuantumMeasurementSim";
import QuantumDragGame from "@/components/QuantumDragGame";
import VínculoCuanticoInstantaneo from "@/components/quantum/VínculoCuanticoInstantaneo";
import LoncherasEntrelazadasFlip from "@/components/quantum/LoncherasEntrelazadasFlip";
import ElDesafíoDeLasCajasCuánticas from "@/components/quantum/ElDesafíoDeLasCajasCuánticas";
import DoubleSlitInterference from "@/components/quantum/DoubleSlitInterference";
import DoubleSlitSimulator from "@/components/quantum/DoubleSlitSimulator";

const sections = [
  { id: "superposicion", title: "Superposición" },
  { id: "interferencia", title: "Interferencia", mascot: "Las ondas cuánticas se suman o cancelan como en la doble rendija." },
  { id: "medicion", title: "Medición", mascot: "Cuando observas, el qubit decide: ¿0 o 1?" },
  { id: "entrelazamiento", title: "Entrelazamiento", mascot: "Dos qubits se conectan: lo que le pase a uno afecta al otro instantáneamente." },
];
  

export function Modulo2() {
  const [activeSection, setActiveSection] = useState("superposicion");
 
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

      {/* Sidebar */}
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

  {/* Particulas en morado */}

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
      <strong className="text-quantum-orange">Módulo 2:</strong> Fenómenos cuánticos
    </motion.h1>
    
    <motion.p 
      className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto font-flatory leading-relaxed mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      Superposición, interferencia, medición y entrelazamiento.

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
          {/* Mascota con resplandor */}
          <div className="absolute inset-0 bg-gradient-to-br from-quantum-orange/40 to-quantum-purple/40 rounded-full blur-3xl scale-110 animate-pulse" />
          <div className="relative">
            <img
              src="/mascota/schrodi-quantum.png"
              loading="lazy"
              alt="Schrödi, tu guía cuántico"
              className=" lg:w-98 lg:h-96 object-contain drop-shadow-2xl relative z-10"
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
              ¡Buen trabajo hasta aquí!
              <br />
              <span className="text-gray-300">
                Ahora, necesitamos mirar más de 
                cerca los fenómenos que gobiernan a los qubits y el mundo cuántico.
              </span>
              <br />
              <span className="text-quantum-orange font-bold mt-2 inline-block">
                ¿Listo para seguir aprendiendo? 
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

        {/* Introducción al módulo */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-24">
          {/* Texto inicial 1 */}
        
          <SectionCard>
            <h2 className="text-3xl md:text-5xl font-staatliches text-foreground mb-8 text-center">
              La división clásica...
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 font-arimo text-muted-foreground leading-relaxed">
                <p className="text-lg">
                  En la vida cotidiana, los objetos tienen posiciones y estados bien definidos:
                  una lámpara está encendida o apagada, un libro está en la mesa o en la repisa.
                  Sin embargo, al adentrarnos en el mundo cuántico (la escala de los átomos,
                  electrones y fotones) estas certezas desaparecen. Aquí, las partículas siguen
                  reglas extrañas que desafían nuestra intuición.
                </p>

                <p className="text-lg">
                En este módulo exploraremos cuatro de los fenómenos fundamentales que hacen
                única a la física cuántica y que son la base de la computación cuántica moderna.
                </p>
              </div>

              <div className="relative flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-quantum-orange/20 rounded-full blur-2xl scale-150"></div>
                  <img
                    src="/mascota/schrodi-intro.png"
                    loading="lazy"
                    alt="Schrödi Introducción"
                    className="relative lg:w-96  border-quantum-orange"
                  />
                </div>
              </div> 
            </div>
          </SectionCard> 

        </div>

        {/* Secciones */}
        {sections.map((s) => (
          <section
            key={s.id}
            id={s.id}
          >
        <section className="py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-24">
          
          <SectionCard >
          <h2 className="text-3xl md:text-5xl font-staatliches text-foreground text-quantum-purple mb-6">
            {s.title}
          </h2>
          {/* Superposición */}
          {s.id === "superposicion" && (
          <div className="flex flex-col gap-10">
            {/*  Schrödi da la bienvenida */}
            <div className="flex items-start gap-4 mb-4">
              <img
                src="/mascota/gato.png"
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
            src="/mascota/gatoCompu.jpg"
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
          )}  

          {/* Interferencia */}
          {s.id === "interferencia" && (
            <div>
              
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
                                                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
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

                                                  <CardHeader>
                                                  
                                                  
                                                  <h2 className="text-xl font-staatliches text-quantum-lilac">
                                                      Simulación: Experimento de la Doble rendija cuántica
                                                  </h2>
                                                  <div className="mt-6">
                                                  <DoubleSlitSimulator />
                                                  </div>
                                                  
                                                </CardHeader>
              
                                                </CardContent>
                                              </Card>
                                </div>
              
              
                              
                            </div>
            </div>
          )}     

          {/* Medición */}
          {s.id === "medicion" && (
  <div className="flex flex-col gap-10">
   
    {/*  Schrödi da la bienvenida */}
    <div className="flex items-start gap-4 mb-4">
      <img
        src="/gato.png"
        alt="Schrödi"
        className="w-16 h-16 animate-float-slow"
      />
      <div className="text-lg bg-purple-100 text-purple-800 px-4 py-2 rounded-xl shadow ">
        Una vez en superposición ¿sabes qué pasa con un <strong>qubit</strong> cuando lo observamos?👀 ¡Bienvenido al mundo de la medición cuántica!
      </div>
    </div>

    <p className="text-lg text-justify leading-relaxed text-gray-700">
      En la vida cotidiana, medir significa descubrir algo que ya existía.
Si quieres saber qué tan caliente está el día, usas un termómetro.
Si dudas si un mueble nuevo entraría en tu sala, tomas una cinta métrica.
Estas mediciones no cambian la realidad, solo la revelan.
    </p>

    {/* 🌌 Animación interactiva */}
    <QuantumMeasurementSim />

    <p className="text-lg text-gray-700 leading-relaxed"> 
      Sin embargo, una sola medición no basta para entender un sistema cuántico.
      Debido a su naturaleza probabilística, necesitamos muchas mediciones para estimar sus propiedades. En la 
      siguiente animación, observarás un <strong> gráfico de barras</strong> que acumula los resultados:
mientras más mediciones realices, más se acercarán las frecuencias experimentales
a las probabilidades teóricas.
    </p>

    <div className="bg-gradient-to-r from-quantum-purple/10 to-quantum-orange/10 p-10 rounded-xl shadow-inner">
    {/* 🎮 Juego drag & drop */}
    <QuantumDragGame />
    </div>

    {/* 🎶 Analogía visual */}
    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-quantum-orange">

      <h3 className="text-3xl font-bold text-quantum-orange mb-4">
      En una computadora cuántica... 
    </h3>
      <p className="text-lg text-gray-700 leading-relaxed">
        El proceso de medición ocurre al final de un circuito.
        Después de aplicar varias puertas cuánticas, los qubits están en superposición e interferencia.
        Sin embargo,la medición traduce la información del mundo cuántico al mundo clásico:

        <p className="text-lg  border border-quantum-orange/30 bg-quantum-orange/10 p-4 rounded-lg mt-4 mb-4">
          Colapsa todos los estados posibles en un solo resultado.
        </p>

        <p className="text-lg border border-quantum-orange/30 bg-quantum-orange/10 p-4 rounded-lg mt-4 mb-4">
        Se repite miles de veces para obtener una distribución de resultados.
        </p>

        <p className="text-lg border border-quantum-orange/30 bg-quantum-orange/10 p-4 rounded-lg mt-4 mb-4">
        Esa distribución contiene la solución del algoritmo cuántico.
        </p>

        Por eso, en los programas cuánticos reales (como en Qiskit o Cirq),
        verás que al final siempre hay una instrucción <strong> measure()</strong>.
        Sin ella, el computador no puede devolver información útil.
      </p>
    </div>
  </div>
          )}

          {/* Entrelazamiento */}
          {s.id === "entrelazamiento" && (
              <div>
                
              <div className="mt-3 grid md:grid-cols-2 gap-12 items-center pt-12">
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
              <div className="mt-12">
                <ElDesafíoDeLasCajasCuánticas />
              </div>
              <div className="mt-10">
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
                          
                          <div className="mt-6">
                            <VínculoCuanticoInstantaneo />
                          </div>

                          
                            {/* --- Cierre y CTA al Módulo --- */}
                        <Card className="bg-gradient-quantum border-quantum-purple/30 shadow-lg mt-12 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
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
                                  "¡Has navegado con éxito a través de la Superposición y la Interferencia, y has dominado el arte de la Medición y el Entrelazamiento!"
                              </p>
                          </CardHeader>
                          <CardContent className="text-center space-y-6">
                              <p className="font-flatory text-2xl text-quantum-orange italic">
                                  "Ahora ves el universo no como una cosa fija, sino como un baile de probabilidades."
                              </p>
                              <p className="font-staatliches text-3xl text-white">
                                  Para realmente construir y operar estas maravillas cuánticas, necesitamos las herramientas matemáticas correctas. ¡El siguiente paso es dominar los <strong>Números Complejos</strong> y las <strong>Matrices</strong>!
                              </p>

                              <Link
                                  to="/aprendizaje/modulo3"
                                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-quantum-orange text-white font-staatliches text-2xl rounded-lg shadow-lg hover:bg-quantum-orange/90 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-quantum-orange focus:ring-offset-2 focus:ring-offset-quantum-purple"
                              >
                                  Continúa al Módulo 3: Números Complejos y Matrices
                                  <ChevronRight className="w-7 h-7" />
                              </Link>
                          </CardContent>
                      </Card>
              </div>
          )}
          </SectionCard>
          </div> 
        </section>      
</section>
          ))}
      </section>
        </div>

      </div>
    </div>
  );
};

export default Modulo2;