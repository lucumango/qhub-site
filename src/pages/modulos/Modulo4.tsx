import React, { useLayoutEffect, useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, SectionCard } from "@/components/ui/card";

const sections = [
    { id: "introduccion", title: "Introducción" },
    { id: "complex-numbers", title: "Números Complejos" },
    { id: "matrices", title: "Matrices" },
  ];

export function Modulo4() {
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

      <div className="flex-1">
        <div className="relative bg-background">
          <section 
            className="relative bg-gradient-quantum-hero h-[45vh] flex items-center justify-center"
            id="intro-header">
              <div className="max-w-4xl mx-auto text-center z-10 p-6 md:p-12"> 
              <h1 className="text-5xl md:text-6xl font-staatliches text-white">
                Módulo 3: Lógica Cuántica
              </h1> 
              <p className="text-lg text-white/90 max-w-3xl mx-auto">
                Explora los fundamentos matemáticos de la computación cuántica, incluyendo números complejos y matrices.
              </p>
              </div>
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-quantum-purple to-transparent pointer-events-none"></div>
          </section>
        </div>

        <section className="py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-24">

          <SectionCard id="introduccion">
            <CardHeader>
              <CardTitle>Introducción</CardTitle>
              <CardDescription>
                Conceptos básicos de números complejos y matrices en computación cuántica.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                En este módulo, exploraremos los fundamentos matemáticos que sustentan la computación cuántica, centrándonos en números complejos y matrices. Estos conceptos son esenciales para entender cómo funcionan los qubits y las operaciones cuánticas.
              </p>
            </CardContent>
          </SectionCard>

          <SectionCard id="complex-numbers">
            <CardHeader>
              <CardTitle>Números Complejos</CardTitle>
              <CardDescription>
                Introducción a los números complejos y su representación.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Los números complejos son fundamentales en la mecánica cuántica. Un número complejo se representa como a + bi, donde "a" es la parte real, "b" es la parte imaginaria, e "i" es la unidad imaginaria con la propiedad de que i² = -1. En computación cuántica, los estados de los qubits se describen utilizando números complejos.
              </p>
            </CardContent>
          </SectionCard>

          <SectionCard id="matrices">
            <CardHeader>
              <CardTitle>Matrices</CardTitle>
              <CardDescription>
                Uso de matrices para representar operaciones cuánticas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Las matrices son herramientas matemáticas que nos permiten representar y manipular estados cuánticos y operaciones. En computación cuántica, las puertas lógicas que operan sobre qubits se representan mediante matrices unitarias. Por ejemplo, la puerta Hadamard, que crea superposiciones, se representa con una matriz específica que transforma el estado de un qubit.
              </p>
            </CardContent>
          </SectionCard>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Modulo4;
