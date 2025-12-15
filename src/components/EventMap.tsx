// src/components/EventMap.tsx
import React from 'react';

const EventMap: React.FC = () => {
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.973642551725!2d-77.03353188909298!3d-12.045334441825455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8b5c8c412ef%3A0x70ab6fed9a118eb8!2sPalacio%20Municipal%20de%20Lima!5e0!3m2!1ses-419!2spe!4v1765573866605!5m2!1ses-419!2spe";

  return (
  <section className="py-12 bg-white">
    <div className="container mx-auto px-4">
      <h1 
        className="text-4xl font-bold text-center mb-8 font-['Staatliches']" 
        style={{ color: '#35022d' }}
      >
        UBICACIÓN DEL EVENTO
      </h1>

      <div className="max-w-4xl mx-auto p-4 rounded-lg" style={{ backgroundColor: '#35022d' }}>
        <div className="aspect-w-16 aspect-h-9 w-full">
          <iframe
            src={mapUrl}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            className="rounded-lg"
          ></iframe>
        </div>
        <div className="mt-4 text-center">
          <p className="text-lg">Municipalidad Metropolitana de Lima - Salón de los Espejos</p>
          <p className="text-gray-600">Jr. De la Unión 300</p>
        </div>
      </div>
    </div>
  </section>
);
};

export default EventMap;