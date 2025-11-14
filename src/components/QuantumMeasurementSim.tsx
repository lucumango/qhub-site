import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

const QuantumMeasurementSim = () => {
  const controls = useAnimation();
  const [collapsed, setCollapsed] = useState(false);

  const collapse = async () => {
    setCollapsed(true);
    await controls.start({
      x: 0, y: 0, scale: 0.5, opacity: 0.9,
      transition: { duration: 0.7, ease: "easeInOut" },
    });
  };

  const release = async () => {
    setCollapsed(false);
    await controls.start(i => ({
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200,
      scale: 1,
      opacity: 1,
      transition: { duration: 1.2, ease: "easeOut" },
    }));
  };



  return (
    <div className="flex flex-col items-center border border-orange-200 bg-gradient-to-br from-[#1A114F] via-[#3B187F] to-[#7E22CE] text-white rounded-xl p-8 shadow-md">
      <h2 className="text-3xl font-staatliches text-yellow-300 mb-3">
        Colapsa la superposición
      </h2>
      <p className=" text-lg text-white mb-6 max-w-md text-center">
        Las burbujas representan un qubit en superposición.  
        <strong> Haz clic o manten presionado</strong> para medirlo y observar cómo el sistema se concentra en un solo estado.
      </p>

      <div
        className="relative w-[300px] h-[300px] bg-gradient-to-br from-purple-100 to-orange-50 rounded-full overflow-hidden shadow-inner flex items-center justify-center"
        onMouseDown={collapse}
        onMouseUp={release}
        onTouchStart={collapse}
        onTouchEnd={release}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            animate={controls}
            className="absolute w-4 h-4 bg-quantum-orange rounded-full shadow-md " 
            initial={{
              x: (Math.random() - 0.5) * 200,
              y: (Math.random() - 0.5) * 200,
              opacity: 1,
            }}
          />
        ))}
      </div>

      <p className="text-sm text-gray-200 mt-4">
        {collapsed ? "El sistema colapsó a un solo estado." : "Superposición activa..."}
      </p>
    </div>
  );
};
export default QuantumMeasurementSim;