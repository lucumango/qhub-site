import { useEffect, useState } from "react";

const QuantumWaves = () => {
  const [waves, setWaves] = useState<number[]>([]);

  useEffect(() => {
    setWaves(Array.from({ length: 5 }, (_, i) => i));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--quantum-dark-blue))" stopOpacity="0.1" />
            <stop offset="50%" stopColor="hsl(var(--quantum-lilac))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--quantum-orange))" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {waves.map((waveIndex) => (
          <g key={waveIndex}>
            {/* Interference patterns */}
            <path
              d={`M 0 ${200 + waveIndex * 80} Q ${window.innerWidth / 4} ${150 + waveIndex * 80} ${window.innerWidth / 2} ${200 + waveIndex * 80} T ${window.innerWidth} ${200 + waveIndex * 80}`}
              stroke="url(#waveGradient)"
              strokeWidth="2"
              fill="none"
              opacity="0.4"
              className="animate-quantum-entanglement"
              style={{
                animationDelay: `${waveIndex * 0.5}s`,
                animationDuration: '4s'
              }}
            />
            
            {/* Quantum field ripples */}
            <circle
              cx={100 + waveIndex * 150}
              cy={300 + waveIndex * 50}
              r="30"
              stroke="hsl(var(--quantum-purple))"
              strokeWidth="1"
              fill="none"
              opacity="0.2"
              className="animate-quantum-pulse"
              style={{
                animationDelay: `${waveIndex * 0.8}s`,
                animationDuration: '3s'
              }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

export default QuantumWaves;