// src/components/EventRegistration.tsx
import React from 'react';
import { ArrowRight, Atom } from 'lucide-react';

// Add this CSS animation
const styles = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  .floating {
    animation: float 2s ease-in-out infinite;
  }
  .pulse {
    animation: pulse 2s infinite;
  }
`;

const EventRegistration: React.FC = () => {
  const registrationUrl = 'https://luma.com/y1vpuacq';

  return (
    <section className="py-8 md:py-16" style={{ backgroundColor: '#35022d' }}>
      <style>{styles}</style>
      
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl p-6 md:p-10 max-w-5xl mx-auto shadow-2xl">
          <div className="flex flex-col items-center gap-4 md:gap-6">
            {/* Gato Image with floating animation */}
            <div className="text-center w-full">
              <div className="floating w-32 h-32 md:w-48 md:h-auto mx-auto">
                <img 
                  src="/mascota/gato.png" 
                  alt="Scrhordi" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#35022d] font-['Staatliches'] mb-2 mt-4 px-2">
                ¡SCHRÖDI TE INVITA A PARTICIPAR!
              </h2>
              <p className="text-gray-700 text-sm md:text-base mb-2 px-2">
                Explora el mundo de la computación cuántica y la inteligencia artificial en un encuentro abierto a la comunidad.
              </p>
              <p className="text-gray-600 text-xs md:text-sm mb-4 px-2">
                Descubre nuevas ideas, conoce a expertos y explora hacia dónde se dirige la tecnología.
              </p>
            </div>
            
            {/* Registration Button */}
            <a
              href={registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pulse w-full max-w-xs text-center border-2 border-[#490e49] hover:bg-[#490e49] text-[#490e49] hover:text-white font-bold py-2 md:py-3 px-6 md:px-8 rounded-full text-base md:text-lg transition-all duration-300 hover:shadow-lg"
            >
              ¡QUIERO ASISTIR!
              <Atom className="w-4 h-4 md:w-5 md:h-5 ml-1.5 md:ml-2 inline" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
export default EventRegistration;