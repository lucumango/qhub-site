import React, { useLayoutEffect, useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  SectionCard,
} from "@/components/ui/card";
import { motion } from "framer-motion";

import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";
import { Link } from "react-router-dom";
import QuantumCircuit from "@/components/QuantumCircuit";
import QuantumPlayground from "@/components/QuantumPlayground";

const sections = [
  { id: "el-qubit", title: "El qubit" },
  { id: "esfera-bloch", title: "Esfera de Bloch" },
  { id: "notacion-vector", title: "Representación Vectorial" },
  { id: "notacion-ket", title: "Notación Dirac" },
  { id: "puertas-cuanticas", title: "Puertas Cuánticas" },
  { id: "circuito-cuantico", title: "Circuito Cuántico" },
  { id: "cierre", title: "Cierre del Módulo" },
];

export function Modulo4() {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
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
      {/* Sidebar */}
      <Sidebar
        sections={sections}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        backLink="/aprendizaje"
      />

      {/* Contenido principal */}
      <div className="flex-1">
        {/* HERO */}
        <div className="relative bg-background">
          <section className="relative py-20 bg-gradient-quantum-hero min-h-screen flex items-center justify-center">
            {/* Partículas moradas */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-purple-400 rounded-full"
                  initial={{
                    x:
                      Math.random() *
                      (typeof window !== "undefined" ? window.innerWidth : 1000),
                    y:
                      Math.random() *
                      (typeof window !== "undefined"
                        ? window.innerHeight
                        : 800),
                    opacity: 0,
                  }}
                  animate={{
                    y: [null, Math.random() * 800 - 400],
                    x: [null, Math.random() * 1000 - 500],
                    opacity: [0, 0.8, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: Math.random() * 8 + 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 5,
                  }}
                  style={{
                    filter: "blur(1px)",
                    boxShadow: "0 0 10px rgba(168, 85, 247, 0.6)",
                  }}
                />
              ))}

              {/* Partículas naranjas */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`orange-${i}`}
                  className="absolute w-1.5 h-1.5 bg-orange-400 rounded-full"
                  initial={{
                    x:
                      Math.random() *
                      (typeof window !== "undefined" ? window.innerWidth : 1000),
                    y:
                      Math.random() *
                      (typeof window !== "undefined"
                        ? window.innerHeight
                        : 800),
                    opacity: 0,
                  }}
                  animate={{
                    y: [null, Math.random() * 600 - 300],
                    x: [null, Math.random() * 800 - 400],
                    opacity: [0, 0.6, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 10 + 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 7,
                  }}
                  style={{
                    filter: "blur(0.5px)",
                    boxShadow: "0 0 8px rgba(251, 146, 60, 0.5)",
                  }}
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
                <strong className="text-quantum-orange">Módulo 4:</strong>{" "}
                Puertas y circuitos cuánticos
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto font-flatory leading-relaxed mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                El viaje final: de qubits y vectores, a puertas y circuitos que
                ejecutan algoritmos cuánticos reales.
              </motion.p>

              <motion.div
                className="relative max-w-4xl mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="grid md:grid-cols-[auto_1fr] gap-6 items-center">
                  {/* Schrödi */}
                  <motion.div
                    className="relative mx-auto md:mx-0"
                    animate={{ y: [0, -15, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-quantum-orange/40 to-quantum-purple/40 rounded-full blur-3xl scale-110 animate-pulse" />
                    <div className="relative">
                      <img
                        src="/mascota/schrodi-mod4.png"
                        loading="lazy"
                        alt="Schrödi, tu guía cuántico"
                        className="lg:h-80 object-contain drop-shadow-2xl relative z-10"
                      />
                    </div>
                  </motion.div>

                  {/* Globo de diálogo */}
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    <div
                      className="hidden md:block absolute left-[-10px] top-1/2 transform -translate-x-2 -translate-y-1/2 w-0 h-0 
                          border-t-[15px] border-t-transparent
                          border-r-[20px] border-r-white/10
                          border-b-[15px] border-b-transparent
                          backdrop-blur-xl"
                      style={{
                        filter: "drop-shadow(-2px 0 4px rgba(0,0,0,0.1))",
                      }}
                    />
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                      <p className="font-arimo italic text-lg md:text-xl text-white leading-relaxed">
                        ¡Llegaste al último módulo! 🎉
                        <br />
                        <span className="text-gray-300">
                          Ahora no solo entenderás qué es un qubit, sino cómo lo
                          movemos, lo giramos y lo hacemos trabajar dentro de
                          circuitos cuánticos reales.
                        </span>
                        <br />
                        <span className="text-quantum-orange font-bold mt-2 inline-block">
                          Es el final del camino… pero el inicio de programar
                          tu propio algoritmo cuántico.
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
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </div>
              </motion.div>
            </div>
          </section>
        </div>

        {/* CONTENIDO */}
        <section className="py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-24">
            {/* EL QUBIT */}
            <SectionCard id="el-qubit">
              <CardHeader className="p-0 mb-6">
                <h2 className="text-3xl md:text-5xl font-staatliches text-quantum-purple mb-4">
                  El qubit
                </h2>
                <CardDescription className="text-base md:text-lg text-muted-foreground">
                  La unidad básica de información cuántica: más que un número,
                  es un vector que mezcla posibilidades.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-8">
                {/* Schrödi */}
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src="/gato.png"
                    alt="Schrödi"
                    className="w-16 h-16 animate-float-slow"
                  />
                  <div className="bg-purple-100 text-lg text-purple-800 px-4 py-2 rounded-xl shadow">
                    Antes de aprender a programar una computadora cuántica…
                    primero tienes que conocer al protagonista de todo:{" "}
                    <strong>el qubit</strong>. 🧠⚛️
                  </div>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  En computación clásica, la unidad mínima de información es el{" "}
                  <strong>bit</strong>, que solo puede estar en dos estados:
                  <InlineMath math="0" /> o <InlineMath math="1" />. Un qubit
                  también tiene dos resultados posibles al medirlo, pero su
                  estado interno es mucho más rico: no es solo un número, sino
                  un <strong>vector</strong> en un espacio de dimensión 2, al
                  que llamamos <em>espacio de estados</em>.
                </p>

                <div className="bg-gray-50 border-l-4 border-quantum-purple px-6 py-4 rounded-lg shadow-sm">
                  <p className="text-lg text-gray-800 leading-relaxed">
                    El estado general de un qubit se escribe como:
                  </p>
                  <div className="mt-4 mb-2 text-lg">
                    <BlockMath math="|\psi\rangle = \begin{pmatrix}\alpha \\ \beta\end{pmatrix} = \alpha |0\rangle + \beta |1\rangle" />
                  </div>
                  <p className="text-lg text-gray-700">
                    Aquí, <InlineMath math="\alpha" /> y{" "}
                    <InlineMath math="\beta" /> son{" "}
                    <strong>amplitudes cuánticas</strong>. No son probabilidades
                    directamente, pero sus módulos al cuadrado sí lo son.
                  </p>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  Para que el estado sea físicamente válido, debe cumplir la
                  condición de <strong>normalización</strong>:
                </p>

                <div className="bg-gray-100 px-6 py-4 rounded-lg shadow-md text-center">
                  <BlockMath math="|\alpha|^2 + |\beta|^2 = 1" />
                  <p className="mt-2 text-lg text-gray-700">
                    Es decir: la probabilidad de obtener <InlineMath math="0" />{" "}
                    más la probabilidad de obtener <InlineMath math="1" /> debe
                    sumar siempre 1.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-xl p-6 shadow border border-gray-100">
                    <h3 className="text-2xl font-semibold text-quantum-purple mb-3">
                      Estados base: |0⟩ y |1⟩
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                      Toda la física del qubit se construye a partir de dos
                      estados muy simples, llamados{" "}
                      <strong>base computacional</strong>:
                    </p>
                    <div className="space-y-4">
                      <div>
                        <BlockMath math="|0\rangle = \begin{pmatrix}1 \\ 0 \end{pmatrix}" />
                        <p className="text-gray-700 text-lg mt-1">
                          Significa: probabilidad 100% de medir 0.
                        </p>
                      </div>
                      <div>
                        <BlockMath math="|1\rangle = \begin{pmatrix}0 \\ 1 \end{pmatrix}" />
                        <p className="text-gray-700 text-lg mt-1">
                          Significa: probabilidad 100% de medir 1.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow border border-gray-100">
                    <h3 className="text-2xl font-semibold text-quantum-orange mb-3">
                      Analogía: qubit como “voto”
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed mb-3">
                      Piensa en el vector del qubit como un{" "}
                      <strong>vector de votos</strong>:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-lg text-gray-700">
                      <li>La primera fila (α) vota por el resultado 0.</li>
                      <li>La segunda fila (β) vota por el resultado 1.</li>
                    </ul>
                    <p className="text-lg text-gray-700 leading-relaxed mt-4">
                      Por ejemplo, si:
                    </p>
                    <BlockMath math="|\psi\rangle = \begin{pmatrix}1 \\ 0\end{pmatrix}" />
                    <p className="text-lg text-gray-700 mt-2">
                      El qubit está “votando” 1 a favor de 0 y 0 a favor de 1.
                      Al medir, <strong>siempre</strong> obtendrás 0.
                    </p>
                  </div>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  La verdadera magia ocurre cuando{" "}
                  <InlineMath math="\alpha" /> y <InlineMath math="\beta" /> no
                  son 0 ni 1, sino valores intermedios (incluso complejos). En
                  ese caso decimos que el qubit está en una{" "}
                  <strong>superposición</strong> de |0⟩ y |1⟩. Es como si
                  estuviera “vibrando” entre ambas posibilidades hasta que lo
                  miras.
                </p>
              </CardContent>
            </SectionCard>

            {/* ESFERA DE BLOCH */}
            <SectionCard id="esfera-bloch">
              <CardHeader className="p-0 mb-6">
                <h2 className="text-3xl md:text-5xl font-staatliches text-quantum-purple mb-4">
                  Esfera de Bloch
                </h2>
                <CardDescription className="text-base md:text-lg text-muted-foreground">
                  Una forma geométrica de visualizar todos los estados posibles
                  de un qubit puro.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-8">
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src="/gato.png"
                    alt="Schrödi"
                    className="w-16 h-16 animate-float-slow"
                  />
                  <div className="bg-purple-100 text-lg text-purple-800 px-4 py-2 rounded-xl shadow ">
                    Mira esta esfera como el “globo terráqueo” del qubit.
                    Cambiar su estado es como mover un punto sobre su
                    superficie. 🌍⚛️
                  </div>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  Cualquier estado puro de un qubit se puede representar como
                  un punto en la superficie de una esfera de radio 1, llamada{" "}
                  <strong>Esfera de Bloch</strong>. Usamos dos ángulos,{" "}
                  <InlineMath math="\theta" /> y <InlineMath math="\phi" />, para
                  parametrizar el estado:
                </p>

                <div className="bg-gray-50 px-6 py-4 rounded-lg shadow-sm">
                  <BlockMath math="|\psi\rangle = \cos\left(\frac{\theta}{2}\right)|0\rangle + e^{i\phi} \sin\left(\frac{\theta}{2}\right)|1\rangle" />
                  <p className="text-lg text-gray-700 mt-3">
                    Aquí <InlineMath math="\theta \in [0,\pi]" /> y{" "}
                    <InlineMath math="\phi \in [0, 2\pi)" />. Diferentes valores
                    de estos ángulos mueven el punto por toda la superficie de
                    la esfera.
                  </p>
                </div>


                <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  Muchas puertas cuánticas pueden verse como{" "}
                  <strong>rotaciones</strong> de esta esfera. Por ejemplo, una
                  puerta Pauli-X actúa como una rotación de 180° alrededor del
                  eje X, intercambiando |0⟩ y |1⟩.
                </p>
              </CardContent>
            </SectionCard>

            {/* REPRESENTACIÓN VECTORIAL */}
            <SectionCard id="notacion-vector">
              <CardHeader className="p-0 mb-6">
                <h2 className="text-3xl md:text-5xl font-staatliches text-quantum-purple mb-4">
                  Representación vectorial
                </h2>
                <CardDescription className="text-base md:text-lg text-muted-foreground">
                  Cómo escribimos matemáticamente estados cuánticos usando
                  vectores y matrices.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-8">
                <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  Un qubit es el ejemplo más sencillo de{" "}
                  <strong>vector de estado</strong>. Para un qubit tenemos dos
                  posibles resultados al medir: 0 o 1. Por eso, usamos un vector
                  de dimensión 2:
                </p>

                <BlockMath math="|\psi\rangle = \begin{pmatrix} \alpha \\ \beta \end{pmatrix}" />

                <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  Para <strong>dos qubits</strong>, el número de resultados
                  posibles se duplica por cada qubit:
                </p>

                <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Con 2 qubits, hay 4 posibles resultados:
                  </p>
                  <ul className="list-disc list-inside text-lg text-gray-700 mt-2 space-y-1">
                    <li>|00⟩</li>
                    <li>|01⟩</li>
                    <li>|10⟩</li>
                    <li>|11⟩</li>
                  </ul>
                  <p className="mt-4 text-lg text-gray-700">
                    Un estado general de 2 qubits se escribe como:
                  </p>
                  <BlockMath math="|\psi\rangle = \begin{pmatrix} c_{00}\\ c_{01} \\ c_{10}\\ c_{11}\end{pmatrix}" />
                  <p className="mt-2 text-lg text-gray-700">
                    Donde cada componente es la amplitud asociada a cada uno de
                    los resultados |00⟩, |01⟩, |10⟩, |11⟩.
                  </p>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  En general, para <InlineMath math="n" /> qubits necesitamos un
                  vector de dimensión <InlineMath math="2^n" />. Esta
                  explosión exponencial es parte del poder (y el reto) de la
                  computación cuántica.
                </p>
              </CardContent>
            </SectionCard>

            {/* NOTACIÓN DIRAC */}
            <SectionCard id="notacion-ket">
              <CardHeader className="p-0 mb-6">
                <h2 className="text-3xl md:text-5xl font-staatliches text-quantum-purple mb-4">
                  Notación Dirac (kets)
                </h2>
                <CardDescription className="text-base md:text-lg text-muted-foreground">
                  Una forma compacta, elegante y estándar en física para
                  escribir estados cuánticos.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-8">
                <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  En vez de escribir estados como columnas largas, la física
                  cuántica usa la <strong>notación bra-ket</strong>, introducida
                  por Paul Dirac. En este módulo nos centraremos en los{" "}
                  <strong>kets</strong>, que representan estados de forma
                  compacta:
                </p>

                <div className="bg-gray-50 px-6 py-4 rounded-lg shadow-sm">
                  <p className="text-lg text-gray-800">
                    Escribimos el estado base “cero” como:
                  </p>
                  <BlockMath math="|0\rangle" />
                  <p className="text-lg text-gray-800 mt-2">
                    Y el estado base “uno” como:
                  </p>
                  <BlockMath math="|1\rangle" />
                </div>

                <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  El mismo qubit que antes escribíamos como vector columna:
                </p>

                <BlockMath math="|\psi\rangle = \begin{pmatrix}\alpha \\ \beta \end{pmatrix}" />

                <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  ahora lo escribimos como:
                </p>

                <BlockMath math="|\psi\rangle = \alpha |0\rangle + \beta |1\rangle" />

                <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  Esta notación se vuelve especialmente poderosa cuando
                  trabajamos con muchos qubits, porque en lugar de escribir un
                  vector de 8, 16 o 1024 componentes, podemos usar una
                  combinación de kets como:
                </p>

                <BlockMath math="|\psi\rangle = c_{00} |00\rangle + c_{01} |01\rangle + c_{10}|10\rangle + c_{11}|11\rangle" />

                <NotationQuiz />
              </CardContent>
            </SectionCard>

            {/* PUERTAS CUÁNTICAS */}
            <SectionCard id="puertas-cuanticas">
              <CardHeader className="p-0 mb-6">
                <h2 className="text-3xl md:text-5xl font-staatliches text-quantum-purple mb-4">
                  Puertas cuánticas
                </h2>
                <CardDescription className="text-base md:text-lg text-muted-foreground">
                  Cómo transformamos estados cuánticos: las puertas como
                  matrices que actúan sobre qubits.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-8">
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src="/gato.png"
                    alt="Schrödi"
                    className="w-16 h-16 animate-float-slow"
                  />
                  <div className="bg-purple-100 text-lg text-purple-800 px-4 py-2 rounded-xl shadow ">
                    Piensa en las puertas cuánticas como “efectos especiales”
                    que aplicamos a los qubits. Cada puerta es una matriz que
                    los hace rotar, voltear o entrelazarse. 🎬⚛️
                  </div>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  Matemáticamente, una puerta cuántica es una{" "}
                  <strong>matriz unitaria</strong> que transforma el vector de
                  estado de nuestros qubits. Aplicar una puerta es simplemente
                  hacer una multiplicación de matrices:
                </p>

                <BlockMath math="|\psi_{\text{nuevo}}\rangle = U |\psi_{\text{viejo}}\rangle" />

                <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  Por ejemplo, la puerta <strong>Pauli-X</strong> actúa como un
                  “NOT” cuántico: intercambia |0⟩ y |1⟩.
                </p>

                <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
                  <BlockMath math="X = \begin{pmatrix}0 & 1 \\ 1 & 0\end{pmatrix}" />
                  <p className="mt-3 text-lg text-gray-700">
                    Si la aplicamos a |0⟩:
                  </p>
                  <BlockMath math="X |0\rangle = \begin{pmatrix}0 & 1 \\ 1 & 0\end{pmatrix} \begin{pmatrix}1 \\ 0\end{pmatrix} = \begin{pmatrix}0 \\ 1\end{pmatrix} = |1\rangle" />
                  <p className="mt-2 text-lg text-gray-700">
                    Y si la aplicamos a |1⟩:
                  </p>
                  <BlockMath math="X |1\rangle = |0\rangle" />
                </div>

                <GatesShowcase />

                <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  A diferencia de lo que a veces dice la divulgación
                  sensacionalista, esto no es “magia aleatoria”. Es álgebra
                  lineal pura: vectores y matrices bien definidos.
                </p>
              </CardContent>
            </SectionCard>

            {/* CIRCUITO CUÁNTICO */}
            <SectionCard id="circuito-cuantico">
              <CardHeader className="p-0 mb-6">
                <h2 className="text-3xl md:text-5xl font-staatliches text-quantum-purple mb-4">
                  Circuito cuántico
                </h2>
                <CardDescription className="text-base md:text-lg text-muted-foreground">
                  Esquema que muestra qué operaciones cuánticas se aplican, a qué qubits, y en qué momento dentro del flujo del algoritmo.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-8">
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src="/gato.png"
                    alt="Schrödi"
                    className="w-16 h-16 animate-float-slow"
                  />
                  <div className="bg-purple-100 text-lg text-purple-800 px-4 py-2 rounded-xl shadow ">
                    Imagina una partitura musical, pero en vez de notas tienes
                    puertas cuánticas y en vez de cuerdas tienes qubits. 🎼⚛️
                  </div>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  Un <strong>circuito cuántico</strong> se representa como una
                  serie de líneas horizontales, una por cada qubit, sobre las que se colocan las puertas.
                  Estas puertas actúan en momentos específicos y, juntas, van construyendo el algoritmo.
                  El circuito se lee de <strong>izquierda a derecha</strong>, igual que una secuencia temporal.
                </p>

                

                
                

                
                <div> <QuantumPlayground/> </div>
              </CardContent>
            </SectionCard>

            {/* CIERRE */}
            <SectionCard id="cierre">
              <CardHeader className="p-0 mb-6">
                <h2 className="text-3xl md:text-5xl font-staatliches text-quantum-purple mb-4">
                  ¡Has completado el Módulo 4! 🎉
                </h2>
                <CardDescription className="text-base md:text-lg text-muted-foreground">
                  Qubits, vectores, kets, puertas y circuitos: ya tienes el
                  vocabulario básico para hablar el lenguaje de los algoritmos
                  cuánticos.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  Llegaste al final del recorrido teórico de este curso. Ya
                  conoces:
                </p>
                <ul className="list-disc list-inside text-lg text-gray-700 space-y-1">
                  <li>Qué es un qubit y cómo se describe matemáticamente.</li>
                  <li>
                    Cómo visualizar sus estados en la esfera de Bloch.
                  </li>
                  <li>
                    Cómo escribir estados con vectores y con notación Dirac.
                  </li>
                  <li>
                    Qué son las puertas cuánticas y cómo actúan como matrices.
                  </li>
                  <li>
                    Cómo se combinan en un circuito cuántico que se ejecuta en
                    el tiempo.
                  </li>
                </ul>

                <div className="flex items-start gap-4 mt-4">
                  <img
                    src="/gato.png"
                    alt="Schrödi"
                    className="w-16 h-16 animate-float-slow"
                  />
                  <div className="bg-quantum-purple/10 border border-quantum-purple/30 px-4 py-3 rounded-xl shadow text-lg text-gray-800">
                    Desde aquí, el siguiente paso es empezar a{" "}
                    <strong>programar</strong> circuitos de verdad en Qiskit,
                    Cirq o simuladores online.  
                    <br />
                    <span className="text-quantum-purple font-semibold">
                      Yo seguiré contigo si decides dar ese salto 😉
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    to="/aprendizaje"
                    className="px-6 py-3 rounded-full bg-quantum-purple text-white font-semibold shadow hover:shadow-lg transition-all"
                  >
                    Volver al mapa de aprendizaje
                  </Link>
            
                </div>
              </CardContent>
            </SectionCard>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Modulo4;

/* ============================
   COMPONENTES EXTRA
   ============================ */


function GatesShowcase() {
  const [activeGate, setActiveGate] = useState<"X" | "H" | "Z">("X");

  const gateInfo: Record<
    "X" | "H" | "Z",
    { name: string; matrix: string; efecto: string }
  > = {
    X: {
      name: "Pauli-X (NOT cuántico)",
      matrix: "\\begin{pmatrix}0 & 1 \\\\ 1 & 0\\end{pmatrix}",
      efecto: "Intercambia |0⟩ y |1⟩. Es parecido al NOT clásico.",
    },
    H: {
      name: "Hadamard (H)",
      matrix: "\\frac{1}{\\sqrt{2}} \\begin{pmatrix}1 & 1 \\\\ 1 & -1\\end{pmatrix}",
      efecto:
        "Lleva |0⟩ y |1⟩ a estados en superposición. Es clave para la interferencia.",
    },
    Z: {
      name: "Pauli-Z",
      matrix: "\\begin{pmatrix}1 & 0 \\\\ 0 & -1\\end{pmatrix}",
      efecto:
        "Cambia la fase de |1⟩ (le pone un signo -). No altera probabilidades, pero sí la interferencia.",
    },
  };

  return (
    <div className="space-y-6">
      <p className="text-lg text-gray-700 leading-relaxed">
        Haz clic en una puerta para ver su matriz y una explicación intuitiva.
      </p>
      <div className="flex gap-4 flex-wrap">
        {(["X", "H", "Z"] as const).map(g => (
          <button
            key={g}
            onClick={() => setActiveGate(g)}
            className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold border transition-all ${
              activeGate === g
                ? "bg-quantum-purple text-white border-quantum-purple shadow-lg scale-105"
                : "bg-white text-gray-800 border-gray-200 hover:shadow-md"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-2xl font-semibold text-quantum-purple mb-2">
          {gateInfo[activeGate].name}
        </h3>
        <div className="mb-3">
          <BlockMath math={gateInfo[activeGate].matrix} />
        </div>
        <p className="text-lg text-gray-700 leading-relaxed">
          {gateInfo[activeGate].efecto}
        </p>
      </div>
    </div>
  );
}

function NotationQuiz() {
  const [answer, setAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const correct = "|1⟩";

  const options = ["|0⟩", "|1⟩", "|00⟩", "|ψ⟩"];

  function check() {
    if (!answer) {
      setFeedback("Selecciona una opción primero 🙂.");
      return;
    }
    if (answer === correct) {
      setFeedback("✅ Correcto: el vector (0,1) corresponde al estado |1⟩.");
    } else {
      setFeedback(
        "❌ Aún no. Recuerda: el primer componente es la amplitud de |0⟩ y el segundo la de |1⟩. (0,1) significa 100% de probabilidad de medir 1."
      );
    }
  }

  return (
    <div className="mt-6 bg-gradient-to-r from-quantum-purple/5 to-quantum-orange/5 border border-quantum-purple/20 rounded-xl p-6 space-y-4">
      <h3 className="text-2xl font-semibold text-quantum-purple mb-2">
        Quiz rápido 🧠
      </h3>
      <p className="text-lg text-gray-700 leading-relaxed">
        Si el estado de un qubit es el vector:
      </p>
      <BlockMath math="|\psi\rangle = \begin{pmatrix}0 \\ 1\end{pmatrix}" />
      <p className="text-lg text-gray-700 leading-relaxed mt-2">
        ¿Cómo lo escribirías en notación ket?
      </p>

      <div className="flex flex-wrap gap-3 mt-2">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => setAnswer(opt)}
            className={`px-4 py-2 rounded-full border text-lg transition-all ${
              answer === opt
                ? "bg-quantum-purple text-white border-quantum-purple"
                : "bg-white text-gray-800 border-gray-200 hover:border-quantum-purple"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      <button
        onClick={check}
        className="mt-3 px-5 py-2 rounded-full bg-quantum-orange text-white font-semibold shadow hover:shadow-md transition-all"
      >
        Comprobar
      </button>

      {feedback && (
        <p className="mt-3 text-lg text-gray-800 leading-relaxed">{feedback}</p>
      )}
    </div>
  );
}

function CircuitDragAndDrop() {
  const [slots, setSlots] = useState<(string | null)[]>([null, null, null]);
  const [feedback, setFeedback] = useState<string | null>(null);

  const gates = [
    { id: "H", label: "H (superposición)" },
    { id: "CNOT", label: "CNOT (entrelaza)" },
    { id: "X", label: "X (NOT)" },
  ];

  const correctOrder = ["H", "CNOT", "X"];

  function handleDrop(
    index: number,
    event: React.DragEvent<HTMLDivElement>
  ) {
    event.preventDefault();
    const gateId = event.dataTransfer.getData("text/plain");
    if (!gateId) return;

    const newSlots = [...slots];
    newSlots[index] = gateId;
    setSlots(newSlots);
    setFeedback(null);
  }

  function handleDragStart(
    gateId: string,
    event: React.DragEvent<HTMLDivElement>
  ) {
    event.dataTransfer.setData("text/plain", gateId);
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function checkCircuit() {
    if (slots.some(s => s === null)) {
      setFeedback("Llena los tres pasos del circuito antes de comprobar 🙂.");
      return;
    }
    const isCorrect = slots.every((g, i) => g === correctOrder[i]);
    if (isCorrect) {
      setFeedback(
        "✅ Excelente: primero creas superposición con H, luego entrelazas con CNOT y finalmente aplicas X."
      );
    } else {
      setFeedback(
        "❌ Aún no. Pista: primero pon al qubit en superposición, luego entrelaza, y deja X para el final."
      );
    }
  }

  return (
    <div className="mt-6 bg-gradient-to-r from-quantum-purple/5 to-quantum-orange/5 border border-quantum-orange/30 rounded-xl p-6 space-y-6">
      <h3 className="text-2xl font-semibold text-quantum-purple mb-2">
        Arrastra las puertas para formar un mini circuito 🔌
      </h3>
      <p className="text-lg text-gray-700 leading-relaxed">
        Construye un circuito de 2 qubits donde:
      </p>
      <ul className="list-disc list-inside text-lg text-gray-700 space-y-1">
        <li>Primero pongas al qubit 0 en superposición.</li>
        <li>Luego entrelaces los dos qubits.</li>
        <li>Finalmente apliques un NOT a ambos.</li>
      </ul>

      <div className="flex flex-wrap gap-3">
        {gates.map(g => (
          <div
            key={g.id}
            draggable
            onDragStart={e => handleDragStart(g.id, e)}
            className="px-4 py-2 rounded-xl bg-white border border-gray-200 shadow-sm cursor-grab active:cursor-grabbing text-lg"
          >
            {g.label}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <p className="text-lg text-gray-700 mb-2">
          Orden temporal del circuito (de izquierda a derecha):
        </p>
        <div className="flex gap-4">
          {slots.map((slot, idx) => (
            <div
              key={idx}
              onDrop={e => handleDrop(idx, e)}
              onDragOver={handleDragOver}
              className="flex-1 h-20 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center bg-white text-lg text-gray-500"
            >
              {slot ? slot : `Paso t${idx + 1}`}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={checkCircuit}
        className="mt-3 px-5 py-2 rounded-full bg-quantum-orange text-white font-semibold shadow hover:shadow-md transition-all"
      >
        Comprobar circuito
      </button>

      {feedback && (
        <p className="mt-3 text-lg text-gray-800 leading-relaxed">{feedback}</p>
      )}
    </div>
  );
}
