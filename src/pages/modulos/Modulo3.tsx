import React, { useLayoutEffect, useEffect, useState, useRef, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import { Latex } from '@/components/MathRenderer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, SectionCard } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calculator, MapPin, BookOpen, ChevronRight, Binary, Sparkles, Compass, RotateCcw, Info } from "lucide-react";

const sections = [
  { id: "introduccion", title: "Introducción" },
  { id: "numeros-complejos", title: "Números Complejos" },
  { id: "por-que-importa", title: "¿Por qué importa?" },
  { id: "matrices", title: "Matrices" },
  { id: "conexion-final", title: "De la matemática al qubit" },
];
 
// math utils
type Complex = { re: number; im: number };
const toPolar = (z: Complex) => {
  const r = Math.hypot(z.re, z.im);
  const theta = Math.atan2(z.im, z.re); // rad
  return { r, theta };
};
const fromPolar = (r: number, theta: number): Complex => ({ 
  re: r * Math.cos(theta), 
  im: r * Math.sin(theta) 
});
const multiplyByI = (z: Complex): Complex => ({ re: -z.im, im: z.re });

type Mat2 = [[number, number], [number, number]];
type Vec2 = [number, number];

const matVec = (M: Mat2, v: Vec2): Vec2 => [
  M[0][0] * v[0] + M[0][1] * v[1],
  M[1][0] * v[0] + M[1][1] * v[1],
];

const presets: Record<
  "IDENTITY" | "PAULI_X" | "PAULI_Z" | "HADAMARD",
  { label: string; M: Mat2; note: string; latex: string }
> = {
  IDENTITY: {
    label: "Identidad I",
    M: [[1, 0], [0, 1]],
    note: "No cambia el estado.",
    latex: "\\begin{bmatrix}1&0\\\\0&1\\end{bmatrix}",
  },
  PAULI_X: {
    label: "Pauli-X (NOT)",
    M: [[0, 1], [1, 0]],
    note: "Intercambia |0⟩ ↔ |1⟩.",
    latex: "\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}",
  },
  PAULI_Z: {
    label: "Pauli-Z",
    M: [[1, 0], [0, -1]],
    note: "Aplica fase -1 a |1⟩.",
    latex: "\\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix}",
  },
  HADAMARD: {
    label: "Hadamard H",
    M: [[1 / Math.SQRT2, 1 / Math.SQRT2], [1 / Math.SQRT2, -1 / Math.SQRT2]],
    note: "Crea/combina superposiciones.",
    latex: "\\tfrac{1}{\\sqrt2}\\begin{bmatrix}1&1\\\\1&-1\\end{bmatrix}",
  },
};

const fadeInAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export function Modulo3() {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id)),
      { threshold: 0.3 }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
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
        <section 
            className="relative bg-gradient-quantum-hero h-[45vh] flex items-center justify-center"
            id="intro-header">
              <div className="max-w-4xl mx-auto text-center z-10 p-6 md:p-12"> 
              <h1 className="text-5xl md:text-6xl font-staatliches text-white">
                Módulo 3: Lógica Cuántica
              </h1>
              <p className="mt-4 text-xl text-white/100 font-flatory">
                Explora los fundamentos matemáticos de la computación cuántica, incluyendo números complejos (para <em>cómo es</em> un estado) y matrices (para <em>cómo cambia</em>). Verás que cada símbolo tiene un significado físico claro.
              </p>
              </div>
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-quantum-purple to-transparent pointer-events-none"></div>
          </section>

        {/* ====== Contenido ====== */}
        <section className="py-16 relative z-10">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-24">

            {/* seccion 1: intro */}
            <div className="py-2" id="introduccion">
              <motion.div {...fadeInAnimation}>
                <Card className="bg-gradient-to-br from-quantum-purple/20 to-quantum-purple/10 border-quantum-purple/40 shadow-2xl backdrop-blur-sm p-0">
                {/* Contenedor principal con Flexbox para el diseño lateral */}
                <div className="flex">
                  <div className="flex-grow p-8 md:p-12">
                      
                      {/* CardHeader */}
                      <div className="mb-4">
                          <CardTitle className="font-staatliches text-quantum-purple text-3xl">
                              ¡Bienvenidos!
                          </CardTitle>
                          <CardDescription className="font-arimo text-quantum-purple/80 text-lg">
                              El universo cuántico no habla con palabras...
                          </CardDescription>
                      </div>

                        {/* CardContent */}
                        <div className="space-y-4">
                            <p className="font-arimo text-lg md:text-xl text-foreground leading-relaxed">
                                ¡El universo cuántico habla con <strong>matemáticas</strong>! Esa gramática se basa en dos herramientas clave:
                            </p>
                            <ul className="list-none space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 bg-quantum-orange/20 text-quantum-orange rounded-full flex items-center justify-center mt-1">
                                        <Calculator className="w-5 h-5" />
                                    </div>
                                    <p className="font-arimo text-lg text-muted-foreground">
                                        <strong>Números Complejos:</strong> Expresan las <strong>amplitudes</strong> (<Latex tex="\alpha, \beta" />) y su crucial <strong>fase</strong>.
                                    </p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 bg-quantum-dark-blue/20 text-quantum-dark-blue rounded-full flex items-center justify-center mt-1">
                                        <Binary className="w-5 h-5" />
                                    </div>
                                    <p className="font-arimo text-lg text-muted-foreground">
                                        <strong>Matrices:</strong> Representan las <strong>transformaciones</strong> (las compuertas) que aplicamos a un qubit.
                                    </p>
                                </li>
                            </ul>
                            <p className="font-arimo text-lg md:text-xl text-foreground leading-relaxed">
                              Este módulo te guiará desde los números complejos <Latex tex="z=a+bi" /> —la clave para describir cómo es un estado cuántico (el famoso qubit)— hasta las matrices —la herramienta matemática que explica cómo estos estados cambian y evolucionan a través de las operaciones cuánticas (compuertas). Descubrirás que cada símbolo tiene un significado físico claro y directo, preparándote para construir tus primeros circuitos cuánticos.
                            </p>
                            <p className="font-arimo text-lg md:text-xl text-foreground leading-relaxed pt-4">
                                ¡Vamos a aprender a hablar cuántico!
                            </p>
                        </div>
                    </div>
                    {/* Columna 1: La imagen de Schrödi */}
                    <div className="flex-shrink-0 w-1/3 max-w-[200px] h-auto rounded-l-lg overflow-hidden">
                      <img
                        src="/mascota/schrodi-profile.png"
                        loading="lazy"
                        alt="Schrödi"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* seccion 2: numeros complejos */}
            <SectionCard id="numeros-complejos">
              <motion.div {...fadeInAnimation}>
                <CardHeader>
                  <CardTitle className="text-3xl md:text-5xl font-staatliches text-foreground mb-8 text-center">
                    Primera Herramienta: Números Complejos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  
                  <div className="prose text-lg prose-lg max-w-none font-arimo text-muted-foreground leading-relaxed">
                    <h3 className="text-2xl font-staatliches text-foreground">
                      El plano complejo: Donde los números ganan direcciones
                    </h3>
                    <p>
                      Recordemos que los números que usamos a diario <Latex tex="(1, -5, 0.5)" /> se representan en una sola <strong>línea</strong> (el eje real).
                      Podemos avanzar hacia la derecha (positivos) o hacia la izquierda (negativos). Hasta aquí, todo cabe en un solo eje.
                    </p>
                    <p>
                      Pero, ¿qué pasa si intentamos resolver <Latex tex="\sqrt{-1}" />? El universo matemático se expande. Presentamos la <strong>unidad imaginaria <Latex tex="i" /></strong>, definida por la propiedad de que <Latex tex="i^2 = -1" />.
                    </p>
                    <p>
                      Un <strong>Número Complejo</strong> tiene dos partes:  
                    </p>
                    <div className="my-4">
                      - una parte <strong>real</strong> (<Latex tex="a" />) 
                    </div>
                    <div className="my-4">
                      - y una parte <strong>imaginaria</strong> (<Latex tex="b" />).
                    </div>
                    <p>
                      Como tiene dos dimensiones, ya no cabe en una línea. Necesitamos un <strong>mapa</strong>: el plano complejo. Aquí:
                    </p>
                    <div className="my-4">
                      - Eje horizontal → <strong>parte real</strong>
                    </div>
                    <div className="my-4">
                      - Eje vertical → <strong>parte imaginaria</strong>.
                    </div>
                    <p>
                      Cada número complejo es un punto en este plano, y podemos representarlo mediante un vector que va desde el centro (0,0) hasta ese punto.
                    </p>
                    <div className="my-4">
                      Podemos describir ese punto de dos maneras:
                    </div>
                    <h3 className="text-2xl font-staatliches text-foreground mt-10">
                      Forma rectangular (como coordenadas)
                    </h3>
                    <p>
                      Te dice cuántos pasos vas hacia la derecha/izquierda (<Latex tex="a" />) y cuántos pasos subes/bajas (<Latex tex="b" />):
                    </p>
                    <div className="text-center my-4">
                      <Latex tex="z = a + bi" display />
                    </div>
                    <p>Es como una instrucción de GPS. </p>
                    <h3 className="text-2xl font-staatliches text-foreground mt-10">
                      Forma polar (como una brújula)
                    </h3>
                    <p>Aquí no hablamos de "pasos", sino de:</p>
                    <div className=" my-4">
                      <strong>r</strong> → qué tan lejos está el punto del centro (su "tamaño" o <strong>amplitud</strong>)
                    </div> 
                    <div className="my-4">
                      <strong><Latex tex="\theta" /></strong> → el ángulo que forma el vector (su <strong>fase</strong> o dirección)
                    </div>
                    <div className="text-center my-4">
                      <Latex tex="z = r \cdot e^{i\theta}" display />
                    </div>
                    <p>Esta forma es muy poderosa porque nos muestra directamente <strong>cómo rota el vector</strong>.</p>
                    </div>
                    
                  {/* Analogía del GPS de Schrödi */}
                  <Card className="bg-gradient-to-br from-quantum-orange/20 to-quantum-orange/10 border-quantum-orange/40 shadow-md mt-8">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-quantum-orange">
                          <img src="/mascota/schrodi-profile.png" alt="Schrödi" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <CardTitle className="font-staatliches text-quantum-orange">Analogía de Schrödi</CardTitle>
                          <CardDescription className="text-quantum-orange/70">¡Mi GPS cuántico!</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="relative">
                      <div className="absolute -top-12 right-0 w-24 h-24 opacity-10">
                        <MapPin className="w-full h-full text-quantum-orange" />
                      </div>
                      <div className="bg-quantum-orange/10 p-4 rounded-lg border-l-4 border-quantum-orange">
                        <p className="font-arimo text-lg leading-relaxed">
                          Piensa en un número complejo <Latex tex="z = a + bi" /> como una instrucción de GPS:
                          <br />
                          "Muévete <strong><Latex tex="a" /> pasos al este</strong> (eje real) y <strong><Latex tex="b" /> pasos al norte</strong> (eje imaginario)
                          <br/> 
                          Si cambias la fase, giras la brújula: ¡tu dirección cambia aunque tu distancia sea la misma!".
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </motion.div>
            </SectionCard>


            <SectionCard id="por-que-importa">
              <motion.div {...fadeInAnimation}>
                <CardHeader>
                  <CardTitle className="text-3xl md:text-5xl font-staatliches text-foreground mb-8 text-center">
                    ¿POR QUÉ IMPORTA TODO ESTO EN CUÁNTICA?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="prose prose-lg text-lg max-w-none font-arimo text-muted-foreground leading-relaxed">
                    <p>
                      En un qubit, los números complejos son los que guardan la información: sus <strong>amplitudes</strong> y sus <strong>fases</strong>.
                    </p>
                    <div className="my-4">
                      - La <strong>amplitud</strong> afecta cuán probable es un estado.
                    </div>
                    <div className="my-4">
                      - La <strong>fase</strong> afecta <strong>cómo se combinan</strong> las probabilidades cuando los estados interfieren.
                    </div>
                    <p>
                      Sin fase <strong>no hay</strong> interferencia cuántica, y sin interferencia cuántica <strong>no existe</strong> la potencia de la computación cuántica.
                    </p>
                    {/* ====== VISUALIZACIÓN INTERACTIVA ====== */}
                  <div className="grid lg:grid gap-8 items-start">
                    {/* Explicación de ejercicios */}
                    <div className="lg:col-span-1 space-y-4 font-arimo text-muted-foreground">
                      <div className="rounded-xl border p-4 bg-quantum-dark-blue/5">
                        <div className="flex text-lg items-center gap-2 text-quantum-purple font-semibold mb-2">
                          <Compass className="w-4 h-4" />
                          <span>Explora</span>
                        </div>
                        <ul className="list-disc pl-5 text-sm space-y-2 marker:text-quantum-orange">
                          <li className="text-foreground text-lg">
                            Pulsa <strong>× i</strong>: verás que es un <em>giro</em> de 90°.
                          </li>
                          <li className="text-foreground text-lg">
                            Arrastra el punto para ver cómo cambian <Latex tex="(a,b)" />, <Latex tex="r" /> y <Latex tex="\\ \theta" />.
                          </li>
                          <li className="text-foreground text-lg">
                            Usa el control deslizante para cambiar directamente la fase.
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Plano complejo interactivo */}
                    <ComplexPlane />
                    {/* Panel de valores */}
                  </div>

                  <div className="prose prose-lg max-w-none font-arimo text-muted-foreground leading-relaxed pt-8">
                    <h3 className="text-2xl font-staatliches text-foreground">
                      La Razón Cuántica: Amplitudes y Fase
                    </h3>
                    <p>
                      Esta es la conexión clave: el estado de un qubit se describe con dos amplitudes de probabilidad, <Latex tex="\alpha" /> y <Latex tex="\beta" />, ¡que son números complejos!
                    </p>
                    <div className="text-center my-4">
                      <Latex tex="|\psi\rangle = \alpha|0\rangle + \beta|1\rangle" display />
                    </div>
                    <p>
                      Como <Latex tex="\alpha" /> y <Latex tex="\beta" /> son complejos, no solo tienen un tamaño (magnitud), sino también un ángulo en el plano complejo. Ese ángulo se llama <strong>Fase</strong>.
                    </p>
                    <p>
                      La <strong>Fase</strong> es el ingrediente secreto que permite la <strong>Interferencia Cuántica</strong> (donde las probabilidades pueden sumarse o cancelarse), ¡dando a las computadoras cuánticas su poder!
                    </p>
                  </div>
                  </div>
                </CardContent>
              </motion.div>
            </SectionCard>

            {/* seccion 3: matrices */}
            <SectionCard id="matrices">
              <motion.div {...fadeInAnimation}>
                <CardHeader>
                  <CardTitle className="text-3xl md:text-5xl font-staatliches text-foreground mb-8 text-center">
                    Segunda Herramienta: Matrices 
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="prose prose-lg max-w-none font-arimo text-muted-foreground leading-relaxed">
                    <h3 className="text-2xl font-staatliches text-foreground">
                      ¿Qué es una Matriz?
                    </h3>
                    <p>
                      Una matriz es simplemente una <strong>tabla rectangular de números</strong>. Es una forma organizada de datos que puede <strong>realizar una acción</strong> sobre un vector.
                    </p>
                    <p>
                      Para un solo qubit, nos centraremos en matrices de <Latex tex="2 \times 2" /> (<Latex tex="2" /> filas, <Latex tex="2" /> columnas), que se ven así:
                    </p>
                    <div className="text-center my-4">
                      <Latex tex="M = \begin{pmatrix} a & b \\ c & d \end{pmatrix}" display />
                    </div>

                    <h3 className="text-2xl font-staatliches text-foreground mt-12">
                      Vectores como Estados Cuánticos
                    </h3>
                    <p>
                      Un vector es solo un tipo especial de matriz con una sola columna. ¡Y resulta que el estado de un qubit se representa perfectamente como un vector!
                    </p>
                    <p>
                      Recordando las amplitudes <Latex tex="\alpha" /> y <Latex tex="\beta" />, el estado del qubit <Latex tex="|\psi\rangle" /> es el vector:
                    </p>
                    <div className="text-center my-4">
                      <Latex tex="|\psi\rangle = \begin{pmatrix} \alpha \\ \beta \end{pmatrix}" display />
                    </div>
                    <p>
                      Por ejemplo, los estados "clásicos" <Latex tex="|0\rangle" /> y <Latex tex="|1\rangle" /> son vectores muy simples:
                    </p>
                    <div className="flex flex-col md:flex-row justify-around items-center my-4">
                      <Latex tex="|0\rangle = \begin{pmatrix} 1 \\ 0 \end{pmatrix}" />
                      <span className="font-arimo my-2 md:my-0">(Estado "Apagado")</span>
                      <Latex tex="|1\rangle = \begin{pmatrix} 0 \\ 1 \end{pmatrix}" />
                      <span className="font-arimo my-2 md:my-0">(Estado "Encendido")</span>
                    </div>
                  </div>

                  {/* Analogía de la Receta de Schrödi */}
                  <Card className="bg-gradient-to-br from-quantum-dark-blue/20 to-quantum-dark-blue/10 border-quantum-dark-blue/40 shadow-md">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-quantum-dark-blue">
                          <img src="/mascota/schrodi-reading.png" alt="Schrödi" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <CardTitle className="font-staatliches text-quantum-dark-blue">Analogía de Schrödi</CardTitle>
                          <CardDescription className="text-quantum-dark-blue/70">¡Cocinando con Cuántica!</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="relative">
                      <div className="absolute -top-12 right-0 w-24 h-24 opacity-10">
                        <BookOpen className="w-full h-full text-quantum-dark-blue" />
                      </div>
                      <div className="bg-quantum-dark-blue/10 p-4 rounded-lg border-l-4 border-quantum-dark-blue">
                        <ul className="list-disc pl-5 space-y-2 font-arimo text-lg">
                          <li>El <strong>Vector</strong> (el qubit) son los <strong>ingredientes iniciales</strong>.</li>
                          <li>La <strong>Matriz</strong> (la compuerta) es la <strong>receta</strong>.</li>
                          <li>La <strong>Multiplicación</strong> es el <strong>proceso de cocinar</strong>.</li>
                          <li>El <strong>Resultado</strong> es el <strong>plato final</strong> (el nuevo estado del qubit).</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="prose prose-lg max-w-none font-arimo text-muted-foreground leading-relaxed pt-8">
                    <h3 className="text-2xl font-staatliches text-foreground">
                      El Corazón de la Transformación: Compuertas Cuánticas
                    </h3>
                    <p>
                      Aquí está la magia: <strong>Las Compuertas Cuánticas SON Matrices.</strong>
                    </p>
                    <p>
                      Cuando "aplicamos una compuerta" a un qubit, lo que realmente estamos haciendo es <strong>multiplicar la matriz</strong> de esa compuerta por el <strong>vector</strong> de estado del qubit.
                    </p>
                    <p>
                      <strong>Ejemplo: La Compuerta NOT (Pauli-X)</strong>
                      <br />
                      Esta compuerta hace un "flip" al qubit (convierte <Latex tex="|0\rangle" /> en <Latex tex="|1\rangle" /> y viceversa). Su matriz es:
                    </p>
                    <div className="text-center my-4">
                      <Latex tex="X = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}" display />
                    </div>
                    <p>
                      Veamos qué pasa si la aplicamos (multiplicamos) al estado <Latex tex="|0\rangle" />:
                    </p>
                    <div className="bg-gray-100 p-6 rounded-lg my-6 overflow-x-auto">
                      <Latex 
                        tex="X|0\rangle = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix} \begin{pmatrix} 1 \\ 0 \end{pmatrix} = \begin{pmatrix} (0 \cdot 1) + (1 \cdot 0) \\ (1 \cdot 1) + (0 \cdot 0) \end{pmatrix} = \begin{pmatrix} 0 \\ 1 \end{pmatrix}" 
                        display 
                      />
                    </div>
                    <p>
                      ¡El resultado es <Latex tex="\begin{pmatrix} 0 \\ 1 \end{pmatrix}" />, que es exactamente el vector del estado <Latex tex="|1\rangle" />!
                    </p>
                    <p className="font-bold text-lg">
                      ¡Acabamos de probar matemáticamente que la matriz <Latex tex="X" /> convierte <Latex tex="|0\rangle" /> en <Latex tex="|1\rangle" />!
                    </p>
                  </div>

                  {/* ====== PLAYGROUND INTERACTIVO ====== */}
                  <div className="mt-12">
                    <h3 className="text-2xl font-staatliches text-foreground mb-6">
                      Experimenta: Multiplicación Matriz-Vector
                    </h3>
                    <MatrixPlayground />
                  </div>

                </CardContent>
              </motion.div>
            </SectionCard>

          {/* sección 4: conexión final */}
          <SectionCard id="conexion-final">
            <motion.div {...fadeInAnimation}>
              <CardHeader>
                <CardTitle className="text-3xl md:text-5xl font-staatliches text-foreground mb-8 text-center">
                  De la Matemática al Qubit
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                
                <div className="prose prose-lg max-w-none font-arimo text-muted-foreground leading-relaxed text-center space-y-4">
                  <p className="text-2xl font-staatliches text-quantum-purple">
                    Los números complejos describen <strong>cómo se representan</strong> los estados cuánticos.
                  </p>
                  <p className="text-2xl font-staatliches text-quantum-dark-blue">
                    Las matrices describen <strong>cómo se transforman</strong> esos estados.
                  </p>
                  <p className="text-xl font-arimo">
                    Juntos, son el lenguaje de la lógica cuántica: el puente entre la matemática abstracta y el comportamiento físico de un qubit.
                  </p>
                </div>

                {/* Dato Cuántico de Schrödi */}
                {/* <Card className="bg-gradient-to-br from-quantum-lilac/20 to-quantum-lilac/10 border-quantum-lilac/40 shadow-md">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-quantum-lilac">
                        <img src="/mascota/schrodi-standing.png" alt="Schrödi" className="w-full h-full object-cover" />
                      </div>
                      <CardTitle className="font-staatliches text-quantum-lilac">
                        Dato Cuántico de Schrödi 🐾
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="absolute -top-12 right-0 w-24 h-24 opacity-10">
                      <Sparkles className="w-full h-full text-quantum-lilac" />
                    </div>
                    <div className="bg-quantum-lilac/10 p-4 rounded-lg border-l-4 border-quantum-lilac">
                      <p className="font-arimo text-lg leading-relaxed">
                        "¡Y así, con unos cuantos números y una pizca de imaginación, acabas de aprender el{' '}
                      <em>idioma</em> del universo cuántico!"
                      </p>
                    </div>
                  </CardContent>
                </Card> */}

                {/* --- Cierre y CTA al Módulo 4 --- */}
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
                      "¡Y así, con unos cuantos números y una pizca de imaginación, acabas de aprender el idioma del universo cuántico!"
                    </p>
                  </CardHeader>
                  <CardContent className="text-center space-y-6">
                    <p className="font-flatory text-2xl text-quantum-orange italic">
                      "¿Ves? No hacía falta ser Einstein para entenderlo."
                    </p>
                    <p className="font-staatliches text-3xl text-white">
                      Ahora que ya hablas el idioma de la lógica cuántica, ¡prepárate para conocer sus palabras mágicas: las compuertas cuánticas!
                    </p>
                    
                    <Link 
                      to="/aprendizaje/modulo4"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-quantum-orange text-white font-staatliches text-2xl rounded-lg shadow-lg hover:bg-quantum-orange/90 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-quantum-orange focus:ring-offset-2 focus:ring-offset-quantum-purple"
                    >
                      Continúa al Módulo 4: Compuertas y Circuitos Cuánticos
                      <ChevronRight className="w-7 h-7" />
                    </Link>
                  </CardContent>
                </Card>

              </CardContent>
            </motion.div>
          </SectionCard>

          </div>
        </section>
      </div>
    </div>
  );
}

export default Modulo3;

//SUB componentes 

// ------------ Contexto compartido para el plano complejo ------------
const ComplexContext = React.createContext<{
  z: Complex;
  setZ: (c: Complex) => void;
  setPhase: (theta: number) => void;
} | null>(null);

function ComplexPlane() {
  const [z, setZ] = useState<Complex>({ re: 0.8, im: 0.3 });
  const svgRef = useRef<SVGSVGElement | null>(null);

  const size = 320;
  const padding = 24;
  const axis = size / 2;
  const scale = (size - padding * 2) / 2; // mapa: [-1,1] -> lienzo

  // Calcular r y theta para el arco de fase
  const { r, theta } = useMemo(() => toPolar(z), [z]);

  // arrastre
  const onPointer = (e: React.PointerEvent<SVGCircleElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - axis) / scale;
    const y = -(e.clientY - rect.top - axis) / scale;
    // acotar a disco de radio 1.4 por estética
    const r = Math.hypot(x, y);
    const cap = 1.4;
    const k = r > cap ? cap / r : 1;
    setZ({ re: x * k, im: y * k });
  };

  const setPhase = (theta: number) => {
    const { r } = toPolar(z);
    setZ(fromPolar(r, theta));
  };

  return (
    <ComplexContext.Provider value={{ z, setZ, setPhase }}>
      <Card className="lg:col-span-1 bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="font-staatliches">Plano complejo</CardTitle>
          <CardDescription className="text-base">
            <span className="text-blue-600 font-semibold text-lg">Eje horizontal</span> = parte real • 
            <span className="text-purple-600 font-semibold ml-1 text-lg">Eje vertical</span> = parte imaginaria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <svg
            ref={svgRef}
            width={size}
            height={size}
            className="mx-auto block"
            style={{ touchAction: "none" }}
          >
            {/* fondo */}
            <defs>
              <radialGradient id="g" cx="50%" cy="50%">
                <stop offset="0%" stopColor="rgba(168,85,247,0.10)" />
                <stop offset="100%" stopColor="rgba(168,85,247,0.02)" />
              </radialGradient>
            </defs>
            <rect x={0} y={0} width={size} height={size} fill="url(#g)" />
            {/* ejes */}
            {/* Eje real (azul) */}
            <line 
              x1={padding} 
              y1={axis} 
              x2={size - padding} 
              y2={axis} 
              stroke="#3b82f6" 
              strokeWidth={2} 
              opacity={0.6}
            />
            <text x={size - padding - 10} y={axis - 8} fill="#3b82f6" fontSize="12" fontWeight="bold">Re</text>
            
            {/* Eje imaginario (morado) */}
            <line 
              x1={axis} 
              y1={padding} 
              x2={axis} 
              y2={size - padding} 
              stroke="#a855f7" 
              strokeWidth={2}
              opacity={0.6}
            />
            <text x={axis + 8} y={padding + 15} fill="#a855f7" fontSize="12" fontWeight="bold">Im</text>
            {/* círculo unitario */}
            <circle cx={axis} cy={axis} r={scale} fill="none" stroke="#e2e8f0" strokeDasharray="4 3" />

            {/* arco de fase (sutil) con tooltip */}
            {r > 0.1 && (
              <g>
                <path
                  d={`M ${axis + 30} ${axis} A 30 30 0 ${Math.abs(theta) > Math.PI ? 1 : 0} ${theta > 0 ? 0 : 1} ${axis + 30 * Math.cos(theta)} ${axis - 30 * Math.sin(theta)}`}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth={1.5}
                  strokeDasharray="3 2"
                  opacity={0.5}
                >
                  <title>🧭 Fase = dirección del vector ({(theta * 180 / Math.PI).toFixed(1)}°)</title>
                </path>
              </g>
            )}

            {/* vector */}
            <line
              x1={axis}
              y1={axis}
              x2={axis + z.re * scale}
              y2={axis - z.im * scale}
              stroke="#a855f7"
              strokeWidth={2}
            />
            {/* punto */}
            <circle
              cx={axis + z.re * scale}
              cy={axis - z.im * scale}
              r={8}
              fill="#f59e0b"
              className="cursor-grab active:cursor-grabbing"
              onPointerDown={onPointer}
              onPointerMove={(e) => e.buttons === 1 && onPointer(e)}
            />
          </svg>

          <ComplexControls />
          <CardHeader className="pb-2">
          <CardTitle className="font-staatliches">Lecturas cuánticas</CardTitle> 
          </CardHeader>
          <CardContent className="font-arimo text-sm space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-quantum-orange/10 p-3 rounded-lg border border-quantum-orange/30">
            <p className="text-xs text-quantum-orange font-semibold mb-1">Amplitud <Latex tex={`|z|=r`} /></p>
            <p><Latex tex={`|z|=${r.toFixed(3)}`} /></p>
            {/* <p className="text-lg font-mono text-foreground">{r.toFixed(3)}</p> */}
            <p className="text-xs text-muted-foreground mt-1">Es "qué tan fuerte" o "qué tan probable" es el estado.</p>
          </div>
          <div className="bg-quantum-dark-blue/10 p-3 rounded-lg border border-quantum-dark-blue/30">
            <p className="text-xs text-quantum-dark-blue font-semibold mb-1">Fase <Latex tex={`\\ \\theta`} /></p>
            <p><Latex tex={`\\ \\theta=${(theta * 180 / Math.PI).toFixed(1)}^\\circ`} /></p>
            <p className="text-xs text-muted-foreground mt-1">
              Es la dirección de tu vector. 
            </p>
            <p className="text-xs text-muted-foreground mt-1">En cuántica, esa dirección puede hacer que los estados se <em>refuercen</em> mutuamente o se <em>cancelen</em></p>
            <p className="text-xs text-muted-foreground mt-1">(a eso le llamamos <strong>interferencia cuántica</strong>).</p>

          </div>
        </div>
      </CardContent>
        </CardContent>
      </Card>
    </ComplexContext.Provider>
  );
}

function ComplexControls() {
  const ctx = React.useContext(ComplexContext)!;
  const { z, setZ, setPhase } = ctx;
  const { r, theta } = useMemo(() => toPolar(z), [z]);

  return (
    <div className="mt-4 space-y-3 font-arimo">
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-lg bg-slate-50 border">
          <div className="text-xs text-slate-500 mb-1">Número complejo</div>
          <p><Latex tex={`a = ${z.re.toFixed(3)}, b = ${z.im.toFixed(3)} \\; ⟹ \\; a+bi`} /></p>
        </div>
        <div className="p-3 rounded-lg bg-slate-50 border">
          <div className="text-xs text-slate-500 mb-1">Polar</div>
          <p><Latex tex={`r = ${r.toFixed(3)},  θ = ${(theta * 180 / Math.PI).toFixed(1)}°`} /></p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-quantum-purple to-purple-600 
          text-white hover:from-purple-600 hover:to-quantum-purple transition-all duration-300 shadow-md hover:shadow-lg transform"
          onClick={() => setZ(multiplyByI(z))}
        >
          <RotateCcw className="w-4 h-4" /> × i (giro 90°)
        </button>
        <div className="text-xs text-slate-500">Multiplicar por i rota el vector 90° en sentido antihorario.</div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-quantum-orange font-semibold">Control de Fase (<Latex tex="\\ \theta" />)</div>
          <div className="text-sm font-mono text-foreground">{(theta * 180 / Math.PI).toFixed(1)}°</div>
        </div>
        <input
          type="range"
          min={-Math.PI}
          max={Math.PI}
          step={0.01}
          value={theta}
          onChange={(e) => setPhase(Number(e.target.value))}
          className="w-full h-2 accent-quantum-orange cursor-pointer"
          style={{
            background: `linear-gradient(to right, #a855f7 0%, #f59e0b ${((theta + Math.PI) / (2 * Math.PI)) * 100}%, #e5e7eb ${((theta + Math.PI) / (2 * Math.PI)) * 100}%)`
          }}
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>-180°</span>
          <span>0°</span>
          <span>+180°</span>
        </div>
      </div>

      {/* <div className="text-sm text-slate-600">
        En un qubit <Latex tex={"\\left|\\psi\\right\\rangle=\\begin{pmatrix}\\alpha\\\\\\beta\\end{pmatrix}"} />, las
        amplitudes <Latex tex={"\\alpha,\\,\\beta\\in\\mathbb{C}"} /> tienen <em>fase</em>; esa fase determina cómo
        interfieren estados al combinarse.
      </div> */}
    </div>
  );
}



// ------------ Playground de matrices ------------
function MatrixPlayground() {
  const [M, setM] = useState<Mat2>(presets.PAULI_X.M);
  const [v, setV] = useState<Vec2>([1, 0]); // |0>
  const out = useMemo(() => matVec(M, v), [M, v]);

  const setCell = (r: 0 | 1, c: 0 | 1, value: number) =>
    setM((prev) => {
      const next = prev.map((row) => row.slice()) as Mat2;
      next[r][c] = value;
      return next;
    });

  const applyPreset = (p: keyof typeof presets) => setM(presets[p].M);

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      {/* Controles */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="font-staatliches">Multiplicación matriz-vector</CardTitle>
          <CardDescription>Trabajaremos con matrices 2×2 y vectores 2×1 (un qubit).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 font-arimo">
          <div className="flex flex-wrap gap-2">
            {(Object.keys(presets) as (keyof typeof presets)[]).map((key) => (
              <button
                key={key}
                onClick={() => applyPreset(key)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border"
                title={presets[key].note}
              >
                {presets[key].label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-[auto_auto_auto] gap-3 items-center">
            {/* Matriz M */}
            <div className="space-y-2">
              <div className="text-xs text-slate-500 mb-1">Matriz (2×2)</div>
              <div className="grid grid-cols-2 gap-2">
                {[0, 1].map((r) =>
                  [0, 1].map((c) => (
                    <input
                      key={`${r}${c}`}
                      type="number"
                      step="any"
                      value={M[r as 0 | 1][c as 0 | 1]}
                      onChange={(e) => setCell(r as 0 | 1, c as 0 | 1, Number(e.target.value))}
                      className="w-20 px-2 py-1 border rounded"
                    />
                  ))
                )}
              </div>
            </div>

            <div className="text-2xl font-staatliches">×</div>

            {/* Vector v */}
            <div className="space-y-2">
              <div className="text-xs text-slate-500 mb-1">Vector (2×1)</div>
              <div className="grid grid-cols-1 gap-2">
                {[0, 1].map((r) => (
                  <input
                    key={`v${r}`}
                    type="number"
                    step="any"
                    value={v[r as 0 | 1]}
                    onChange={(e) => {
                      const nv: Vec2 = [...v] as Vec2;
                      nv[r as 0 | 1] = Number(e.target.value);
                      setV(nv);
                    }}
                    className="w-20 px-2 py-1 border rounded"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="text-sm text-slate-600">
            <Latex tex={"\\text{Ejemplo: }\\; X\\,\\begin{pmatrix}1\\\\0\\end{pmatrix}=\\begin{pmatrix}0\\\\1\\end{pmatrix}"} />{" "}
            — la compuerta <strong>X</strong> (NOT) "da la vuelta" al qubit.
          </div>
        </CardContent>
      </Card>

      {/* Resultados + Visual */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="font-staatliches">Resultado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 font-arimo">
          <div className="rounded-lg border p-3 bg-slate-50">
            <div className="text-xs text-slate-500 mb-1">Cálculo</div>
            <div className="font-mono">
              <Latex
                tex={`\\begin{bmatrix}
                  ${fmt(M[0][0])} & ${fmt(M[0][1])} \\\\
                  ${fmt(M[1][0])} & ${fmt(M[1][1])}
                \\end{bmatrix}
                \\,
                \\begin{bmatrix}
                  ${fmt(v[0])} \\\\ ${fmt(v[1])}
                \\end{bmatrix}
                =
                \\begin{bmatrix}
                  ${fmt(out[0])} \\\\ ${fmt(out[1])}
                \\end{bmatrix}`}
                display
              />
            </div>
          </div>

          <MatrixToBloch out={out} />
          <div className="flex items-start gap-2 text-sm text-slate-600">
            <Info className="w-4 h-4 mt-0.5 text-quantum-purple" />
            <p>
              En un sistema físico, las compuertas reales son <em>unitarias</em> (conservan norma y probabilidad). Aquí
              puedes experimentar libremente para entender la <em>idea</em> de transformación lineal.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function fmt(x: number) {
  const s = x.toFixed(3);
  return s.replace(/^-0\.000$/, "0.000");
}

// Visual simple que mapea el vector (α,β) a un ángulo en el "círculo de Bloch" 2D (ilustrativo).
function MatrixToBloch({ out }: { out: Vec2 }) {
  const norm = Math.hypot(out[0], out[1]) || 1;
  const x = out[0] / norm;
  const y = out[1] / norm;

  const size = 180;
  const c = size / 2;
  const r = c - 8;

  const angle = Math.atan2(y, x);

  return (
    <div className="rounded-lg border p-4">
      <div className="text-xs text-slate-500 mb-2">Estado ilustrativo</div>
      <svg width={size} height={size} className="block">
        <circle cx={c} cy={c} r={r} fill="none" stroke="#e5e7eb" />
        <line x1={c - r} y1={c} x2={c + r} y2={c} stroke="#cbd5e1" />
        <line x1={c} y1={c - r} x2={c} y2={c + r} stroke="#cbd5e1" />
        <line x1={c} y1={c} x2={c + r * Math.cos(angle)} y2={c - r * Math.sin(angle)} stroke="#a855f7" strokeWidth={2} />
        <circle cx={c + r * Math.cos(angle)} cy={c - r * Math.sin(angle)} r={6} fill="#f59e0b" />
      </svg>
      <div className="text-sm mt-2 font-mono">ángulo ≈ {(angle * 180 / Math.PI).toFixed(1)}°</div>
    </div>
  );
}