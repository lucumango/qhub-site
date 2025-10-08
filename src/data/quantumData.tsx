import React from "react";
import { Lightbulb, Zap, Atom, Cpu, Binary, Infinity, Sparkles, Scale } from "lucide-react";

interface DragItem {
  id: string;
  text: string;
  target: "classical" | "quantum";
  icon: React.ReactNode;
}

export const dragItems: DragItem[] = [
  {
    id: "bit",
    text: "Bit (0 o 1)",
    target: "classical",
    icon: <Binary className="w-5 h-5 text-quantum-dark-blue" />,
  },
  {
    id: "qubit",
    text: "Qubit",
    target: "quantum",
    icon: <Atom className="w-5 h-5 text-quantum-purple" />,
  },
  {
    id: "interruptor",
    text: "Interruptor de Luz",
    target: "classical",
    icon: <Lightbulb className="w-5 h-5 text-quantum-dark-blue" />,
  },
  {
    id: "superposicion",
    text: "Superposición",
    target: "quantum",
    icon: <Infinity className="w-5 h-5 text-quantum-purple" />,
  },
  {
    id: "exponencial",
    text: "Crecimiento Exponencial",
    target: "quantum",
    icon: <Sparkles className="w-5 h-5 text-quantum-purple" />,
  },
  {
    id: "lineal",
    text: "Crecimiento Lineal",
    target: "classical",
    icon: <Scale className="w-5 h-5 text-quantum-dark-blue" />,
  },
  {
    id: "cpu",
    text: "CPU de Escritorio",
    target: "classical",
    icon: <Cpu className="w-5 h-5 text-quantum-dark-blue" />,
  },
  {
    id: "teleportacion",
    text: "Teletransportación Cuántica",
    target: "quantum",
    icon: <Zap className="w-5 h-5 text-quantum-purple" />,
  },
];

export const aplicacionesCuanticas = [
  {
    title: "Descubrimiento de Medicamentos",
    description:
      "Simulación molecular precisa para desarrollar nuevos fármacos y tratamientos personalizados",
    color: "quantum-orange",
  },
  {
    title: "Inteligencia Artificial",
    description:
    "Algoritmos de aprendizaje automático exponencialmente más rápidos y eficientes",
    color: "quantum-purple",
  },
  {
    title: "Criptografía Cuántica",
    description:
      "Sistemas de seguridad absolutamente impenetrables y comunicaciones ultra-seguras",
    color: "quantum-dark-blue",
  },
  {
    title: "Optimización Financiera",
    description:
      "Modelos de riesgo y predicción de mercados con precisión sin precedentes",
    color: "quantum-lilac",
  },
];

export type TargetBox = "classical" | "quantum";
export type DragItemType = DragItem;