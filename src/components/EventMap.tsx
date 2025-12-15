// src/components/EventMap.tsx
import React from 'react';

// ... existing imports ...

const EventMap: React.FC = () => {
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.973642551725!2d-77.03353188909298!3d-12.045334441825455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8b5c8c412ef%3A0x70ab6fed9a118eb8!2sPalacio%20Municipal%20de%20Lima!5e0!3m2!1ses-419!2spe!4v1765573866605!5m2!1ses-419!2spe";

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="container mx-auto px-3 sm:px-4">
        <h1 
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 font-['Staatliches']" 
          style={{ color: '#35022d' }}
        >
          UBICACIÓN DEL EVENTO
        </h1>

        <div className="max-w-4xl mx-auto p-3 sm:p-4 rounded-lg" style={{ backgroundColor: '#35022d' }}>
          <div className="relative w-full" style={{ paddingBottom: '56.25%', height: '0', overflow: 'hidden' }}>
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 0,
                minHeight: '400px'
              }}
              allowFullScreen={false}
              loading="lazy"
              className="rounded-lg"
            ></iframe>
          </div>
          <div className="mt-3 sm:mt-4 text-center">
            <p className="text-base sm:text-lg text-white font-medium">
              Municipalidad Metropolitana de Lima - Salón de los Espejos
            </p>
            <p className="text-gray-300 text-sm sm:text-base">Jr. De la Unión 300</p>
          </div>
        </div>
      </div>
    </section>
  );
};


export default EventMap;