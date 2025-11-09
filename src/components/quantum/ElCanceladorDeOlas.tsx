import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react'; // Para el ícono de energía/magia

const ElCanceladorDeOlas = () => {
    // 0 = Constructiva (máximo error), 180 = Destructiva (máxima cancelación)
    const [desfase, setDesfase] = useState(0); 
    const [score, setScore] = useState(0);
    const targetDesfase = 180;
    
    // Rango de éxito: 170° a 190°
    const isCancelled = desfase >= 170 && desfase <= 190;

    // Calcula el factor de anulación: 1 en 0°/360°, 0 en 180°
    const factorAnulacion = Math.abs(Math.cos(desfase * Math.PI / 180));
    
    // Lógica para asignar puntos al acertar
    useEffect(() => {
        if (isCancelled && score === 0) {
            setScore(100);
        } else if (!isCancelled && score > 0) {
            setScore(0);
        }
    }, [isCancelled, score]);

    return (
        <div className="bg-white p-6 rounded-xl shadow-2xl border border-purple-200">
            <h3 className="text-3xl font-staatliches text-quantum-purple mb-4 text-center">
                🌊 El Cancelador de Olas Cuántico ⚔️
            </h3>
            
            {/* Contenedor de las Olas (Simulación) */}
            <div className="relative h-40 mb-8 flex items-center justify-center overflow-hidden">
                
                {/* 1. Onda Correcta (Verde - Reforzada) */}
                <motion.div
                    className="absolute inset-0 border-b-2 border-green-500 pointer-events-none"
                    style={{ top: '50%' }}
                    animate={{ 
                        scaleY: isCancelled ? 1.5 : 1, // Se amplifica al cancelar
                        opacity: isCancelled ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 text-center text-green-700 font-bold text-sm">SOLUCIÓN CORRECTA</div>
                </motion.div>

                {/* 2. Onda Incorrecta (Roja - Se anula con el desfase) */}
                <motion.svg width="100%" height="100%" viewBox="0 0 400 120" preserveAspectRatio="none">
                    {/* El factorAnulacion controla la opacidad y amplitud visual */}
                    <motion.path
                        d="M0 60 C 100 0, 300 120, 400 60"
                        stroke="#ef4444" // Rojo - Error
                        strokeWidth="4"
                        fill="transparent"
                        animate={{ 
                            opacity: factorAnulacion, // Desaparece en 180°
                            scaleY: factorAnulacion, // Se aplana en 180°
                        }}
                        style={{ originY: 0.5, y: 30 }} // Mueve la onda al centro visualmente
                        transition={{ duration: 0.1 }}
                    />
                </motion.svg>
                
                {/* Línea central para referencia (Horizontal) */}
                <div className="absolute inset-0 border-b border-gray-300 pointer-events-none" style={{ top: '50%' }} />

            </div>

            {/* Control Desfase */}
            <div className="text-center">
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                    Ajuste el Desfase de la Onda de Error: <span className="text-quantum-purple font-bold">{desfase}°</span>
                </label>
                <input
                    type="range"
                    min="0"
                    max="360"
                    step="1"
                    value={desfase}
                    onChange={(e) => setDesfase(Number(e.target.value))}
                    className="w-full h-2 bg-purple-100 rounded-lg appearance-none cursor-pointer accent-quantum-purple"
                />
            </div>
            
            {/* Feedback y Gamificación */}
            <AnimatePresence>
                {isCancelled && (
                    <motion.div
                        key="success"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="mt-6 p-4 rounded-lg font-bold bg-green-50 border-2 border-green-400 text-green-700"
                    >
                        <Zap className="inline w-5 h-5 mr-2" />
                        🎉 ¡CANCELACIÓN LOGRADA! 🎉 Has aplicado **Interferencia Destructiva** perfecta.
                        <p className="mt-1">Puntos Cuánticos Ganados: **{score}**</p>
                    </motion.div>
                )}
                {!isCancelled && (
                    <motion.p 
                        key="instruction"
                        className="mt-6 text-sm text-gray-500 text-center"
                    >
                        Mueva el control hasta encontrar la fase de **180°**, donde la Onda Roja (Error) se anula por completo.
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
};

// Exporta el componente para usarlo en tu Modulo2
export default ElCanceladorDeOlas;