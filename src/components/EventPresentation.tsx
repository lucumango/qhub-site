// src/components/EventPresentation.tsx
import React from 'react';

const EventPresentation: React.FC = () => {
  return (
    <div style={{ 
      backgroundColor: '#620068',
       // Hace que el contenedor se ajuste al contenido
      lineHeight: 0,
      display: 'flex', 
      width: '100%',
      height: '100%',
      overflow: 'hidden'// Elimina el espacio fantasma debajo de la imagen
    }}>
      <img
        src="/quantumaisummit/2.svg"
        alt="Quantum AI Summit"
        className="w-full h-auto" // La imagen mantiene su relación de aspecto
      />
    </div>
  );
};

export default EventPresentation;