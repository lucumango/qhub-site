import { motion } from 'framer-motion';

const EsferasEntrelazadas = () => {
  return (
    <div className="relative w-full h-48 flex items-center justify-center">
      {/* Línea de conexión */}
      <div className="absolute w-full h-1 bg-gradient-to-r from-purple-400 to-blue-400" />
      
      {/* Partícula 1 */}
      <motion.div
        className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg z-10"
        animate={{
          x: [-60, 60, -60],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Partícula 2 */}
      <motion.div
        className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500 shadow-lg z-10"
        animate={{
          x: [60, -60, 60],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Efecto de conexión */}
      <motion.div 
        className="absolute w-1 h-1 bg-white rounded-full opacity-0"
        animate={{
          scale: [1, 40, 1],
          opacity: [0.5, 0, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1,
        }}
      />
    </div>
  );
};

export default EsferasEntrelazadas;