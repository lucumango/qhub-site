import { Latex } from '@/components/MathRenderer';
import React from 'react';

const PolarComplexPlane = () => {
  const a = 2; // Parte real
  const b = 2; // Parte imaginaria

  const realPart = a;
  const imagPart = b;
  
  const r = Math.sqrt(a * a + b * b); 
  
  const calcPos = (value) => ((value / 3) * 50);
  
  const scaleFactor = 256 / 6; 
  const vectorLength = r * scaleFactor; 

  // Cálculo del ángulo
  const angleRad = Math.atan2(b, a);
  const angleDegrees = angleRad * (180 / Math.PI); 

  const arcSize = 40; // px
  const arcRadius = arcSize / 2; // px

  return (
    <div className="flex justify-center my-10">
      <div className="relative w-64 h-64">
        <span 
          className="absolute text-base font-bold right-[-30px] top-[calc(50% - ${calcPos(imagPart)}% - 30px)]"
        >
          <Latex tex="z = r \cdot e^{i\theta}" display />
        </span>

         <div 
          className="absolute w-px bg-gray-500 border-l border-dashed"
          style={{
            left: `calc(50% + ${calcPos(realPart)}% - 1px)`,
            top: `calc(50% - ${calcPos(imagPart)}% - 1px)`,
            height: `calc(${calcPos(imagPart)}% + 1px)`
          }}
        ></div>
        
        <div className="absolute w-full h-px bg-gray-700 top-1/2"></div>
        <div className="absolute right-[-60px] top-1/2 transform -translate-y-1/2 text-blue-700 font-semibold text-sm">Eje real</div>
        
        <div className="absolute h-full w-px bg-gray-700 left-1/2"></div>
        <div className="absolute bottom-[10px] left-[10px] text-blue-700 font-semibold text-sm">
          Eje imaginario
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs">0</div>

        <div 
          className="absolute w-1 h-1 bg-black rounded-full"
          style={{ 
            left: `calc(50% + ${calcPos(a)}% - 2px)`,
            top: `calc(50% - ${calcPos(b)}% - 2px)`
          }}
        ></div>

        <div 
          className="absolute origin-bottom-left bg-red-600 h-px transform"
          style={{
            left: '50%',
            top: '50%',
            width: `${vectorLength}px`,
            transform: `rotate(${-angleDegrees}deg)`, 
            transformOrigin: '0 0'
          }}
        ></div>

        <svg 
          className="absolute"
          style={{
            left: `calc(50% - ${arcRadius}px)`,
            top: `calc(50% - ${arcRadius}px)`,
            width: `${arcSize}px`,
            height: `${arcSize}px`,
          }}
        >
          <path
            d={`M ${arcSize} ${arcRadius} A ${arcRadius} ${arcRadius} 0 0 0 ${arcRadius + arcRadius * Math.cos(angleRad)} ${arcRadius - arcRadius * Math.sin(angleRad)}`}
            fill="none"
            stroke="black"
            strokeWidth="1"
          />
        </svg>

        <span 
          className="absolute text-sm font-bold text-red-600"
          style={{ 
            left: `calc(50% + ${calcPos(a) / 2}% + 10px)`, 
            top: `calc(50% - ${calcPos(b) / 2}% - 15px)` 
          }}
        >
          r
        </span>
        
        <span 
          className="absolute text-sm font-bold"
          style={{
            left: `calc(50% + 25px)`,
            top: `calc(50% - 25px)` 
          }}
        >
          θ
        </span>

      </div>
    </div>
  );
};

export default PolarComplexPlane;