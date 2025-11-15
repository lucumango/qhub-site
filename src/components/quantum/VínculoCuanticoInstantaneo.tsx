import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, SectionCard } from "@/components/ui/card";
import QubitMascot from "@/components/QubitMascot";

// Estados de la moneda (Cara o Cruz)
const ESTADOS = {
  CARA: { 
    id: 1, 
    label: 'Cara', 
    emoji: '⭕', 
    color: 'bg-amber-300',
    imagen: '/img/cara.jpg'  // Asegúrate de tener esta imagen en tu carpeta public/img/
  },
  CRUZ: { 
    id: 0, 
    label: 'Cruz', 
    emoji: '❌', 
    color: 'bg-indigo-300',
    imagen: '/img/sello.jpg'  // Asegúrate de tener esta imagen en tu carpeta public/img/
  },
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
    if (estado === null) return { 
      emoji: '🪙', 
      color: 'bg-slate-200', 
      imagen: '/img/moneda.jpg',
      label: 'Girando'
    };
    return estado === ESTADOS.CARA.id ? ESTADOS.CARA : ESTADOS.CRUZ;
  };

  const monedaA = obtenerEstadoMoneda(estadoA);
  const monedaB = obtenerEstadoMoneda(estadoB);

  return (
    <div className="mt-18">
      {/* Glow de fondo */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.25),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(236,72,153,0.25),_transparent_55%)]" />

      {/* Header */}
      <header className=" flex items-center">
        
          
        <h3 className="text-3xl font-staatliches mb-4 text-left">
            Monedas cuánticas entrelazadas
        </h3>
      </header>
        <p className="text-xl text-justify font-arimo text-muted-foreground leading-relaxed">
          Estas monedas están unidas por el vínculo cuántico, sus destinos son opuestos. 
          Solo al medir una, el estado de la otra se define al instante.
        </p>
       
        
      

      {/* Zona principal */}
      <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-start">
        {/* Moneda A */}
        <div className="flex flex-col items-center gap-3 mt-7">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Moneda A
          </span>

          <motion.div
            onClick={lanzarMoneda}
            className="cursor-pointer"
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
            {monedaA.imagen ? (
              <img 
                src={monedaA.imagen} 
                alt={monedaA.label || 'Moneda'}
                className="w-24 h-24 object-contain"
              />
            ) : (
              <span className="text-4xl">{monedaA.emoji}</span>
            )}
          </motion.div>

          <p className="text-sm font-semibold text-slate-800">
            {estadoA === null
              ? 'En superposición'
              : estadoA === ESTADOS.CARA.id
              ? 'Resultado: Cara'
              : 'Resultado: Cruz'}
          </p>
        </div>

        {/* QubitMascot en el centro */}
        <div className="flex items-center justify-center mt-16">
          <QubitMascot className="w-20 h-20" />
        </div>

        {/* Moneda B */}
        <div className="flex flex-col items-center gap-3 mt-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Moneda B
          </span>

          <motion.div
            onClick={lanzarMoneda}
            className="cursor-pointer"
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
            {monedaB.imagen ? (
              <img 
                src={monedaB.imagen} 
                alt={monedaB.label || 'Moneda'}
                className="w-24 h-24 object-contain"
              />
            ) : (
              <span className="text-4xl">{monedaB.emoji}</span>
            )}
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

