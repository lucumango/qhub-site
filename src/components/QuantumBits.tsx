import { useEffect, useState } from "react";

interface QuantumBit {
  id: number;
  x: number;
  y: number;
  state: '0' | '1' | '|0⟩' | '|1⟩' | '|+⟩' | '|-⟩';
  rotation: number;
  scale: number;
  opacity: number;
  speed: number;
}

const QuantumBits = () => {
  const [bits, setBits] = useState<QuantumBit[]>([]);

  useEffect(() => {
    const quantumStates = ['0', '1', '|0⟩', '|1⟩', '|+⟩', '|-⟩'] as const;
    
    const createBit = (id: number): QuantumBit => ({
      id,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      state: quantumStates[Math.floor(Math.random() * quantumStates.length)],
      rotation: Math.random() * 360,
      scale: Math.random() * 0.5 + 0.5,
      opacity: Math.random() * 0.3 + 0.1,
      speed: Math.random() * 1 + 0.2,
    });

    const initialBits = Array.from({ length: 25 }, (_, i) => createBit(i));
    setBits(initialBits);

    const animateBits = () => {
      setBits(prev => 
        prev.map(bit => ({
          ...bit,
          x: (bit.x + bit.speed) % window.innerWidth,
          y: bit.y + Math.sin(bit.x * 0.005) * 0.3,
          rotation: (bit.rotation + 0.5) % 360,
          opacity: 0.1 + Math.sin(Date.now() * 0.002 + bit.id) * 0.2,
          // Quantum superposition: occasionally change state
          state: Math.random() < 0.005 ? 
            ['0', '1', '|0⟩', '|1⟩', '|+⟩', '|-⟩'][Math.floor(Math.random() * 6)] as '0' | '1' | '|0⟩' | '|1⟩' | '|+⟩' | '|-⟩' : 
            bit.state
        }))
      );
    };

    const interval = setInterval(animateBits, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {bits.map((bit) => (
        <div
          key={bit.id}
          className="absolute font-mono text-quantum-lilac font-bold select-none animate-quantum-superposition"
          style={{
            left: `${bit.x}px`,
            top: `${bit.y}px`,
            transform: `rotate(${bit.rotation}deg) scale(${bit.scale})`,
            opacity: bit.opacity,
            fontSize: '14px',
            textShadow: '0 0 10px hsl(var(--quantum-lilac) / 0.5)',
          }}
        >
          {bit.state}
        </div>
      ))}
    </div>
  );
};

export default QuantumBits;