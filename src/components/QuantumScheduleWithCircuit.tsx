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
    <div className="w-full min-h-screen  p-6" style={{ backgroundColor: '#35022d' }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col gap-2">
          <h1 className="text-center text-5xl font-bold mb-2 font-['Staatliches'] text-white mt-10">
            CRONOGRAMA DEL EVENTO
          </h1>
          {/* Top - Circuit */}
          <div className=" overflow-hidden ">
            <iframe
              ref={iframeRef}
              title="Quantum Circuit Schedule"
              src="/qjs/schedule-circuit.html"
              style={{
                width: "100%",
                height: "300px",
                border: "none",
                display: "block",
                backgroundColor: "transparent",
              }}
            />
          </div>

          {/* Bottom - Schedule */}
          <div className="bg-transparent">
            <QuantumSchedule selectedDay={selectedDay} onDayChange={setSelectedDay} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default QuantumScheduleWithCircuit;