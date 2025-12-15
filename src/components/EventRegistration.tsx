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
    <section className="py-16" style={{ backgroundColor: '#35022d' }}>
      {/* Add the style tag for our animation */}
      <style>{styles}</style>
      
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl p-10 max-w-5xl mx-auto shadow-2xl">
          <div className="flex flex-col items-center gap-6">
            {/* Gato Image with floating animation */}
            <div className="text-center">
              <div className="floating">
                <img 
                  src="/mascota/gato.png" 
                  alt="Scrhordi" 
                  className="w-48 h-auto mx-auto"
                />
              </div>
              <h2 className="text-3xl font-bold text-[#35022d] font-['Staatliches'] mb-2 mt-4">
                ¡SCHRÖDI TE INVITA A PARTICIPAR!
              </h2>
              <p className="text-gray-700 mb-2">
                Explora el mundo de la computación cuántica y la inteligencia artificial en un encuentro abierto a la comunidad.
              </p>
              <p className="text-gray-600 text-sm mb-4">
                Descubre nuevas ideas, conoce a expertos y explora hacia dónde se dirige la tecnología.
              </p>
            </div>
            
            {/* Registration Button */}
            <a
              href={registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pulse w-full max-w-xs text-center border-2 border-[#490e49]  hover:bg-[#490e49] text-[#490e49] hover:text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 hover:shadow-lg"
            >
              ¡QUIERO ASISTIR!<Atom className="w-5 h-5 ml-2 inline mb-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventRegistration;