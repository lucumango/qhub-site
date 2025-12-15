// src/pages/QuantumAISummit.tsx
import React, { useState, useEffect } from 'react';
import EventPresentation from '../components/EventPresentation';
import EventRegistration from '@/components/EventRegistration';
import EventMap from '../components/EventMap';
import QuantumScheduleWithCircuit from '../components/QuantumScheduleWithCircuit';

const QuantumAISummit = () => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Lista todas las imágenes importantes que quieres precargar
    const imagesToPreload = [
      '/ruta/a/tu/imagen-principal.jpg', // Cambia esto por la ruta real de tu imagen
      // Añade más imágenes si es necesario
    ];

    let loadedImages = 0;
    const totalImages = imagesToPreload.length;

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
      
      img.onload = () => {
        loadedImages++;
        if (loadedImages === totalImages) {
          setFadeOut(true);
          setTimeout(() => setLoading(false), 500);
        }
      };

      img.onerror = () => {
        // Si una imagen falla, igual continúa
        loadedImages++;
        if (loadedImages === totalImages) {
          setFadeOut(true);
          setTimeout(() => setLoading(false), 500);
        }
      };
    });

    // Fallback: si tarda más de 5 segundos, muestra la página de todos modos
    const timeout = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 500);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      {loading && (
        // Change this line in the loading screen div
          <div 
            className={`fixed inset-0 flex items-center justify-center bg-[#35022d] z-50 transition-opacity duration-500 ${
              fadeOut ? 'opacity-0' : 'opacity-100'
            }`}
          >
          <div className="text-center">
            {/* Spinner con tema quantum */}
            <div className="relative w-24 h-24 mx-auto mb-6">
              {/* Outer ring - pink */}
              <div className="absolute inset-0 border-4 border-[#e258d4]/30 rounded-full"></div>
              {/* Spinning outer ring - solid pink */}
              <div className="absolute inset-0 border-4 border-t-[#e258d4] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              
              {/* Inner ring - orange */}
              <div className="absolute inset-2 border-4 border-[#e76745]/30 rounded-full"></div>
              {/* Spinning inner ring - solid orange */}
              <div 
                className="absolute inset-2 border-4 border-t-[#e76745] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" 
                style={{ animationDirection: 'reverse', animationDuration: '1s' }}
              ></div>
            </div>
            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#e258d4] to-[#e76745] bg-clip-text text-transparent">
              Quantum AI Summit
            </h2>
            
          </div>
        </div>
      )}

      {/* Main Content */}
      <div 
        className={`min-h-screen bg-gradient-to-b from-[#e258d4] to-[#e76745] text-white transition-opacity duration-500 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <main>
          <EventPresentation />
          <EventRegistration />
          <QuantumScheduleWithCircuit />
          <EventMap />
        </main>
      </div>
    </>
  );
};

export default QuantumAISummit;