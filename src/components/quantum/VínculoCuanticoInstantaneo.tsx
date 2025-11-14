import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, SectionCard } from "@/components/ui/card";

// Estados de la moneda (Cara o Cruz)
const ESTADOS = {
  CARA: { id: 1, label: 'Cara', emoji: '😊', color: 'bg-amber-300' },
  CRUZ: { id: 0, label: 'Cruz', emoji: '⭕', color: 'bg-indigo-300' },
};

const VínculoCuanticoInstantaneo = () => {
  // Estado inicial: Ambas monedas en superposición
  const [estadoA, setEstadoA] = useState<number | null>(null);
  const [estadoB, setEstadoB] = useState<number | null>(null);
  const [entrelazadas, setEntrelazadas] = useState(false);
  const [girando, setGirando] = useState(false);

  const lanzarMoneda = () => {
    // Solo bloqueamos si ya está girando para evitar clicks múltiples
    if (girando) return;

    // Mientras gira podemos considerar que el sistema aún no está "colapsado"
    setEntrelazadas(false);
    setGirando(true);

    // Simular giro de las monedas
    setTimeout(() => {
      const resultado = Math.random() > 0.5 ? ESTADOS.CARA.id : ESTADOS.CRUZ.id;

      // Ambas monedas se actualizan al mismo tiempo con resultados opuestos
      setEstadoA(resultado);
      setEstadoB(
        resultado === ESTADOS.CARA.id ? ESTADOS.CRUZ.id : ESTADOS.CARA.id
      );

      setEntrelazadas(true);
      setGirando(false);
    }, 900);
  };

  // Determina los estados de las monedas
  const obtenerEstadoMoneda = (estado: number | null) => {
    if (estado === null) return { emoji: '🪙', color: 'bg-slate-200' };
    return estado === ESTADOS.CARA.id ? ESTADOS.CARA : ESTADOS.CRUZ;
  };

  const monedaA = obtenerEstadoMoneda(estadoA);
  const monedaB = obtenerEstadoMoneda(estadoB);

  return (
    <div>
      {/* Glow de fondo */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.25),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(236,72,153,0.25),_transparent_55%)]" />

      {/* Header */}
      <header className=" flex items-center">
        
          
        <h3 className="text-2xl font-staatliches text-foreground">
            Monedas cuánticas entrelazadas
        </h3>
       
        
      </header>

      {/* Zona principal */}
      <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-center">
        {/* Moneda A */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Moneda A
          </span>

          <motion.div
            onClick={lanzarMoneda}
            className={`flex h-24 w-24 cursor-pointer items-center justify-center rounded-full text-5xl shadow-[0_18px_35px_rgba(15,23,42,0.25)] ring-4 ring-white ${monedaA.color}`}
            animate={girando ? { rotateY: 360 } : { rotateY: 0, scale: 1 }}
            transition={
              girando
                ? { repeat: Infinity, duration: 0.6, ease: 'linear' }
                : { type: 'spring', stiffness: 260, damping: 18 }
            }
            whileHover={!girando ? { scale: 1.08 } : {}}
            title={
              estadoA === null
                ? 'Haz clic para lanzar las dos monedas'
                : 'Haz clic para volver a lanzar'
            }
          >
            {monedaA.emoji}
          </motion.div>

          <p className="text-sm font-semibold text-slate-800">
            {estadoA === null
              ? 'En superposición'
              : estadoA === ESTADOS.CARA.id
              ? 'Resultado: Cara'
              : 'Resultado: Cruz'}
          </p>
        </div>

        {/* Indicador central */}
        <div className="flex flex-col items-center gap-2 md:gap-3">
          <motion.div
            className="flex h-16 w-16 flex-col items-center justify-center rounded-full border border-purple-200 bg-purple-50/80 px-2 text-center text-xs font-medium text-purple-700 shadow-inner"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: entrelazadas ? [1, 1.06, 1] : 0.9,
              opacity: 1,
            }}
            transition={
              entrelazadas
                ? { repeat: Infinity, duration: 1.6, ease: 'easeInOut' }
                : { duration: 0.4 }
            }
          >
            
          </motion.div>

          <motion.div
            className="h-0.5 w-16 rounded-full bg-gradient-to-r from-purple-400/70 to-pink-400/70 md:h-20 md:w-0.5"
            initial={{ scale: 0 }}
            animate={{ scale: entrelazadas ? 1 : 0.7, opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Moneda B */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Moneda B
          </span>

          <motion.div
            onClick={lanzarMoneda}
            className={`flex h-24 w-24 cursor-pointer items-center justify-center rounded-full text-5xl shadow-[0_18px_35px_rgba(15,23,42,0.25)] ring-4 ring-white ${monedaB.color}`}
            animate={girando ? { rotateY: -360 } : { rotateY: 0, scale: 1 }}
            transition={
              girando
                ? { repeat: Infinity, duration: 0.6, ease: 'linear' }
                : { type: 'spring', stiffness: 260, damping: 18 }
            }
            whileHover={!girando ? { scale: 1.08 } : {}}
            title={
              estadoB === null
                ? 'Haz clic para lanzar las dos monedas'
                : 'Haz clic para volver a lanzar'
            }
          >
            {monedaB.emoji}
          </motion.div>

          <p className="text-sm font-semibold text-slate-800">
            {estadoB === null
              ? 'En superposición'
              : estadoB === ESTADOS.CARA.id
              ? 'Resultado: Cara'
              : 'Resultado: Cruz'}
          </p>
        </div>
      </div>

      {/* Mensaje inferior */}
      <div className="mt-8 space-y-10 font-arimo text-muted-foreground leading-relaxed">
        {!entrelazadas ? (
          <p className="text-center">
            Toca cualquiera de las monedas para colapsar el sistema cuántico.
          </p>
        ) : (
          <p className="text-center">
            <span className="font-semibold">
              Entrelazamiento:
            </span>{' '}
            si la moneda A es{' '}
            <span className="font-semibold">
              {estadoA === ESTADOS.CARA.id ? 'Cara' : 'Cruz'}
            </span>
            , la moneda B es automáticamente{' '}
            <span className="font-semibold">
              {estadoA === ESTADOS.CARA.id ? 'Cruz' : 'Cara'}
            </span>
            .
          </p>
        )}
      </div>
    </div>
  );
};

export default VínculoCuanticoInstantaneo;

