import React, { useState, useEffect } from 'react';
import QuantumSchedule from './QuantumSchedule';

type DayKey = 'viernes' | 'sabado' | 'domingo';

const QuantumScheduleWithCircuit: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<DayKey>('viernes');
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Listen for messages from the iframe
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'daySelected') {
        const dayMap: { [key: number]: DayKey } = {
          1: 'viernes',
          2: 'sabado',
          3: 'domingo'
        };
        const day = dayMap[event.data.day];
        if (day) {
          setSelectedDay(day);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Send message to iframe when selectedDay changes
  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const dayMap: { [key in DayKey]: number } = {
        'viernes': 1,
        'sabado': 2,
        'domingo': 3
      };
      iframeRef.current.contentWindow.postMessage({
        type: 'updateSelectedDay',
        day: dayMap[selectedDay]
      }, '*');
    }
  }, [selectedDay]);

  return (
    <div className="w-full p-3 sm:p-4" style={{ backgroundColor: '#35022d' }}> {/* Reduced padding */}
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col gap-1"> {/* Reduced gap */}
          <h1 className="text-center text-3xl  font-bold font-['Staatliches'] text-white"> {/* Reduced margins */}
            CRONOGRAMA DEL EVENTO
          </h1>
          {/* Top - Circuit */}
          <div className="w-full 
            h-[200px]      // Móvil (default)
            xs:h-[260px]   // ~400px-639px
            sm:h-[280px]   // 640px-767px
            md:h-[300px]   // 768px-1023px
            lg:h-[300px]   // 1024px-1279px
            xl:h-[300px]   // 1280px-1535px
            2xl:h-[300px]  // 1536px+
            overflow-hidden"
          >
            <iframe
              ref={iframeRef}
              title="Quantum Circuit Schedule"
              src="/qjs/schedule-circuit.html"
              className="w-full min-h-[280px]"
              style={{
                backgroundColor: "transparent",
              }}
            />
          </div>
        </div>
        {/* Bottom - Schedule */}
        <div className="bg-transparent "> {/* Removed margin top */}
          <QuantumSchedule selectedDay={selectedDay} onDayChange={setSelectedDay} />
        </div>
      </div>
    </div>
  );
}
export default QuantumScheduleWithCircuit;