import React from 'react';
import { Latex } from '@/components/MathRenderer';

const ComplexPlaneGraph = () => {
  const realPart = 2; // 'a'
  const imagPart = 2; // 'b'
  
  const calcPos = (value) => ((value / 3) * 50);

  return (
    <div className="flex justify-center my-10">
      <div className="relative w-64 h-64">

        <div className="absolute w-full h-px bg-gray-700 top-1/2"></div>
        <div className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 translate-x-1 text-blue-700 font-semibold text-sm">
          Eje real
        </div>
        <div className="absolute h-full w-px bg-gray-700 left-1/2"></div>
        <div className="absolute bottom-[10px] left-[10px] text-blue-700 font-semibold text-sm">
          Eje imaginario
        </div>
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs">
          0
        </div>

        {[1, 2, 3].map(i => (
          <React.Fragment key={`x-${i}`}>
            {/* x posi */}
            <div className="absolute top-[calc(50%-3px)] w-px h-[6px] bg-gray-700" style={{ left: `calc(50% + ${calcPos(i)}%)` }}></div>
            <span className="absolute top-[calc(50%+5px)] text-xs" style={{ left: `calc(50% + ${calcPos(i)}% - 4px)` }}>{i}</span>
            {/* x nega */}
            <div className="absolute top-[calc(50%-3px)] w-px h-[6px] bg-gray-700" style={{ left: `calc(50% - ${calcPos(i)}%)` }}></div>
            <span className="absolute top-[calc(50%+5px)] text-xs" style={{ left: `calc(50% - ${calcPos(i)}% - 4px)` }}>-{i}</span>
          </React.Fragment>
        ))}

        {[1, 2, 3].map(i => (
          <React.Fragment key={`y-${i}`}>
            {/* y posi */}
            <div className="absolute left-[calc(50%-3px)] h-px w-[6px] bg-gray-700" style={{ top: `calc(50% - ${calcPos(i)}%)` }}></div>
            <span className="absolute left-[calc(50%-15px)] text-xs" style={{ top: `calc(50% - ${calcPos(i)}% - 7px)` }}>{i}</span>
            {/* y nega */}
            <div className="absolute left-[calc(50%-3px)] h-px w-[6px] bg-gray-700" style={{ top: `calc(50% + ${calcPos(i)}%)` }}></div>
            <span className="absolute left-[calc(50%-20px)] text-xs" style={{ top: `calc(50% + ${calcPos(i)}% - 7px)` }}>-{i}</span>
          </React.Fragment>
        ))}
        
        {/* z=a+ib */}
        <div 
          className="absolute w-2 h-2 bg-black rounded-full"
          style={{ 
            left: `calc(50% + ${calcPos(realPart)}% - 4px)`, 
            top: `calc(50% - ${calcPos(imagPart)}% - 4px)`
          }}
        ></div>
        
        <span 
          className="absolute text-base font-bold right-[-30px] top-[calc(50% - ${calcPos(imagPart)}% - 30px)]"
        >
          <Latex tex="z = a + bi" display />
        </span>
        
        <div 
          className="absolute w-px bg-gray-500 border-l border-dashed"
          style={{
            left: `calc(50% + ${calcPos(realPart)}% - 1px)`,
            top: `calc(50% - ${calcPos(imagPart)}% - 1px)`,
            height: `calc(${calcPos(imagPart)}% + 1px)`
          }}
        ></div>
        
        <div 
          className="absolute h-px bg-gray-500 border-t border-dashed"
          style={{
            left: `calc(50% - 1px)`,
            top: `calc(50% - ${calcPos(imagPart)}% - 1px)`,
            width: `calc(${calcPos(realPart)}% + 1px)`
          }}
        ></div>

        <span 
          className="absolute text-base font-bold text-black"
          style={{ 
            left: `calc(50% + ${calcPos(realPart)}% - 4px)`, 
            top: `calc(50% - ${calcPos(imagPart)}% + 100px)` 
          }}
        >
          a
        </span>
        
        <span 
          className="absolute left-[90px] text-base font-bold text-black"
          style={{ 
            top: `calc(50% - ${calcPos(imagPart)}% - 11px)`
          }}
        >
          b
        </span>

        <div 
          className="absolute origin-bottom-left bg-red-600 h-px transform"
          style={{
            left: '50%',
            top: '50%',
            width: '120px', 
            transform: 'rotate(-45deg)', 
            transformOrigin: '0 0'
          }}
        ></div>

      </div>
    </div>
  );
};

export default ComplexPlaneGraph;