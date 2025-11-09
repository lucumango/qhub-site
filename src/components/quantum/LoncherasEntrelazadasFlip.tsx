import { useState } from 'react';
import { motion } from 'framer-motion';

const LoncherasEntrelazadasFlip = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="relative w-64 h-64 perspective-1000">
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.8 }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Frente */}
          <motion.div 
            className="absolute w-full h-full bg-gradient-to-br from-purple-400 to-blue-500 rounded-xl shadow-lg flex flex-col items-center justify-center p-6 text-white cursor-pointer"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <h3 className="text-xl font-bold mb-4">Lonchera A</h3>
            <p className="text-center">¿Qué contendrá la otra lonchera?</p>
            <p className="mt-4 text-sm opacity-80">Haz clic para revelar</p>
          </motion.div>

          {/* Reverso */}
          <motion.div 
            className="absolute w-full h-full bg-gradient-to-br from-orange-400 to-red-500 rounded-xl shadow-lg flex flex-col items-center justify-center p-6 text-white cursor-pointer"
            style={{ backfaceVisibility: 'hidden', rotateY: 180 }}
          >
            <h3 className="text-xl font-bold mb-4">Lonchera B</h3>
            <p className="text-center">¡Contiene el postre complementario!</p>
            <p className="mt-4 text-sm opacity-80">Haz clic para volver</p>
          </motion.div>
        </motion.div>
      </div>
      
      <p className="mt-6 text-center text-gray-600 max-w-md">
        Al igual que estas loncheras entrelazadas, las partículas cuánticas pueden estar conectadas de manera que el estado de una determine el estado de la otra, sin importar la distancia que las separe.
      </p>
    </div>
  );
};

export default LoncherasEntrelazadasFlip;