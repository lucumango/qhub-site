import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LaDobleRendijaCuantica = () => {
    const [isAutoShooting, setIsAutoShooting] = useState(false);
    const [impacts, setImpacts] = useState<number[]>([]);
    const maxImpacts = 200; // Aumentamos el número de impactos para mejor visualización

    // Función para simular el patrón de interferencia
    const simulateWaveImpact = () => {
        const maxRange = 80; // Aumentamos el rango para mejor visualización
        const rand = Math.random() * 2 - 1;
        // Creamos un patrón de interferencia más pronunciado
        return Math.sin(rand * Math.PI * 3) * maxRange * Math.cos(rand * Math.PI * 0.5);
    };

    // Efecto para el disparo automático
    useEffect(() => {
        if (!isAutoShooting) return;

        const interval = setInterval(() => {
            if (impacts.length >= maxImpacts) {
                setImpacts(prev => [...prev.slice(1), simulateWaveImpact()]);
            } else {
                setImpacts(prev => [...prev, simulateWaveImpact()]);
            }
        }, 50); // Aumentamos la velocidad de emisión

        return () => clearInterval(interval);
    }, [isAutoShooting, impacts.length]);

    const toggleAutoShooting = () => {
        setIsAutoShooting(!isAutoShooting);
    };

    const resetSimulation = () => {
        setImpacts([]);
    };

    return (
        <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border-2 border-gray-700 text-white">
            <h3 className="text-3xl font-staatliches text-yellow-400 mb-6 text-center">
                🌊 Experimento de la Doble Rendija 🌊
            </h3>

            <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
                <button
                    onClick={toggleAutoShooting}
                    className={`px-5 py-3 rounded-lg font-bold shadow-lg transition-all ${
                        isAutoShooting 
                            ? 'bg-red-600 hover:bg-red-700' 
                            : 'bg-green-600 hover:bg-green-700'
                    } text-white flex items-center justify-center`}
                >
                    {isAutoShooting ? '⏹️ Detener' : '▶️ Iniciar'}
                </button>
                <button
                    onClick={resetSimulation}
                    className="px-5 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-bold shadow-lg transition-all"
                >
                    🔄 Reiniciar
                </button>
            </div>

            {/* Visualización del Experimento */}
            <div className="relative h-[500px] bg-gray-900 border-2 border-gray-700 rounded-lg overflow-hidden">
                {/* Fuente de ondas */}
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                    <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg shadow-yellow-400/30">
                        <div className={`w-12 h-12 rounded-full ${
                            isAutoShooting ? 'bg-yellow-300' : 'bg-yellow-500'
                        } flex items-center justify-center`}>
                            <div className={`w-8 h-8 rounded-full ${
                                isAutoShooting ? 'bg-yellow-200' : 'bg-yellow-400'
                            } animate-pulse`}></div>
                        </div>
                    </div>
                </div>

                {/* Líneas de onda */}
                <div className="absolute inset-0">
                    {/* Línea de onda superior */}
                    <motion.div 
                        className="absolute top-1/4 w-full h-px bg-blue-400/30"
                        initial={{ x: '-100%' }}
                        animate={{ x: isAutoShooting ? '100%' : '-100%' }}
                        transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                    
                    {/* Línea de onda central */}
                    <motion.div 
                        className="absolute top-1/2 w-full h-px bg-blue-400/40"
                        initial={{ x: '-100%' }}
                        animate={{ x: isAutoShooting ? '100%' : '-100%' }}
                        transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                            delay: 0.2
                        }}
                    />
                    
                    {/* Línea de onda inferior */}
                    <motion.div 
                        className="absolute top-3/4 w-full h-px bg-blue-400/30"
                        initial={{ x: '-100%' }}
                        animate={{ x: isAutoShooting ? '100%' : '-100%' }}
                        transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                            delay: 0.4
                        }}
                    />
                </div>

                {/* Barrera con rendijas */}
                <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-gray-700 shadow-lg z-20" style={{ transform: 'translateX(-50%)' }}>
                    <div className="absolute w-12 bg-gray-900 h-20 -left-5 top-1/4 transform -translate-y-1/2 rounded-sm border border-gray-500" />
                    <div className="absolute w-12 bg-gray-900 h-20 -left-5 top-3/4 transform -translate-y-1/2 rounded-sm border border-gray-500" />
                </div>

                {/* Patrón de interferencia */}
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gray-800/50 border-l-2 border-gray-600 overflow-hidden">
                    <div className="relative h-full w-full">
                        <AnimatePresence>
                            {impacts.map((impact, index) => (
                                <motion.div
                                    key={`impact-${index}`}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute w-3 h-3 rounded-full bg-blue-400"
                                    style={{
                                        top: `${50 + (impact / 2)}%`,
                                        right: '5%',
                                        boxShadow: '0 0 10px 2px rgba(96, 165, 250, 0.7)'
                                    }}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Explicación */}
            <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
                <h4 className="text-xl font-staatliches text-yellow-300 mb-2">Patrón de Interferencia</h4>
                <p className="text-gray-200">
                    Observa cómo las ondas que pasan por ambas rendijas interfieren entre sí, creando un patrón característico de bandas claras y oscuras en la pantalla de detección.
                </p>
            </div>
        </div>
    );
};

export default LaDobleRendijaCuantica;