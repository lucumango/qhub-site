// src/pages/QuantumAISummit.tsx
import React from 'react';
import EventPresentation from '../components/EventPresentation';
import EventRegistration from '@/components/EventRegistration';
import EventMap from '../components/EventMap';
import QuantumScheduleWithCircuit from '../components/Quantumschedulewithcircuit';

const QuantumAISummit = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-quantum-black to-quantum-dark-blue text-white">

      {/* Main Content */}
      <main>
        
        <EventPresentation />
        <EventRegistration  />
        <QuantumScheduleWithCircuit />
        <EventMap />
      </main>
    </div>
  );
};

export default QuantumAISummit;