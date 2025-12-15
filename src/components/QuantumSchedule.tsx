import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, SectionCard } from "@/components/ui/card";
import { Lightbulb, Atom, ChevronRight } from "lucide-react";
type DayKey = 'viernes' | 'sabado' | 'domingo';

interface Event {
  time: string;
  title: string;
  description?: string;
  subtitle?: string;
  subtitleDesc?: string;
  speaker?: string;
  speakerTitle?: string;
}

interface DaySchedule {
  date: string;
  dayNumber: number;
  events: Event[];
}

type ScheduleData = {
  [key in DayKey]: DaySchedule;
};

const QuantumSchedule: React.FC<{ selectedDay?: DayKey; onDayChange?: (day: DayKey) => void }> = ({ 
  selectedDay: propSelectedDay, 
  onDayChange 
}) => {
  const [internalSelectedDay, setInternalSelectedDay] = useState<DayKey>('viernes');
  
  // Use prop if provided, otherwise use internal state
  const selectedDay = propSelectedDay !== undefined ? propSelectedDay : internalSelectedDay;
  
  const handleDayChange = (day: DayKey) => {
    if (onDayChange) {
      onDayChange(day);
    } else {
      setInternalSelectedDay(day);
    }
  };

  const scheduleData: ScheduleData = {
    viernes: {
      date: 'Viernes, 19 de Diciembre',
      dayNumber: 1,
      events: [
        {
          time: '1:00 - 2:00 PM',
          title: 'Recepción',
          description: '',
          
        },
        {
          time: '2:00 - 2:20 PM',
          title: 'Apertura del Evento',
          speaker: 'Ms. Miguel Martinez'
        },
        {
          time: '2:20 - 3:10 PM',
          title: 'Conferencia: Historia de la mecánica cuántica ',
          speaker: 'Dr. Bernabé Mejía',
        },
        {
          time: '3:10 - 4:00 PM',
          title: 'Conferencia: El futuro tecnológico del Perú en la era cuántica e inteligente',
          speaker: 'Mario Rodriguez',
          speakerTitle: 'Gerente General Microsoft Perú',
          description: ''
        },
        {
          time: '4:00 - 4:15 PM',
          title: 'Networking',
          description: ''
        },
        {
          time: '4:15 - 5:45 PM',
          title: 'Sesión 1 (QC): Fundamentos de la Computación Cuántica',
          description: '',
          speaker: 'Ing. Diego Correa',
        },
        {
          time: '5:45 - 6:30 PM',
          title: 'Panel: Experiencias de Jóvenes investigadores latinoamericanos',
          speaker: 'Freddy Herrera, Sebastián Rodriguez, Ricardo Mendizabal'
        }
      ]
    },
    sabado: {
      date: 'Sábado, 20 de Diciembre',
      dayNumber: 2,
      events: [
        { 
          time: '9:30 - 10:00 AM', 
          title: 'Recepción',
        },
        { 
          time: '10:00 - 11:00 AM', 
          title: 'Conferencia: Convergencia entre la Inteligencia Artificial y la Computación Cuántica',
          speaker: 'Narciso Lema',
          speakerTitle: 'Technical Community Leader en IBM Colombia, Perú, Ecuador, Venezuela, Bolivia'
        },
        { 
          time: '11:05 AM - 12:35 PM', 
          title: 'Sesión 2 (QC): Circuitos cuánticos: donde la física se convierte en código',
          speaker: 'Ms. Miguel Martinez',
        }, 
        { 
          time: '12:35 - 1:00 PM', 
          title: 'Networking',
        },
        { 
          time: '2:00 - 3:15 PM', 
          title: 'Sesión 1 (IA): Fronteras de la Inteligencia Artificial: multimodalidad, agentes y ética aumentada',
          speaker: 'Eduardo Ñique & Maribel Maza',
          speakerTitle: 'GenAI Engineer, NTT Data',
          description: ''
        },
        { 
          time: '3:15 - 4:00 PM', 
          title: 'Quantum Voice: El poder de creer en ti: de Perú a Tesla, IBM y Microsoft',
          speaker: 'Anthonny Porlles',
          speakerTitle: 'Data & AI Technical Specialist',
          description: ''
        },
        { 
          time: '4:00 - 4:20 PM', 
          title: 'Networking',
          description: ''
        },
        { 
          time: '4:20 - 5:50 PM', 
          title: 'Sesión 3 (QC): Algoritmos cuánticos y el futuro del cómputo inteligente',
          speaker: 'Lic. Sebastián Rodriguez',
          description: ''
        },
        { 
          time: '5:50 - 6:30 PM', 
          title: 'Sesión 2 (IA): IA aplicada a salud',
          speaker: 'PhD student Pedro Rodriguez',
          description: ''
        }
      ]
    },
    domingo: {
      date: 'Domingo, 21 de Diciembre',
      dayNumber: 3,
      events: [
        { 
          time: '9:30 - 10:00 AM', 
          title: 'Recepción',
          speaker: 'CEDDITEC & QUANTUMHUB PERU'
        },
        { 
          time: '10:00 - 11:00 AM', 
          title: 'Conferencia 3: Latinoamérica como semillero científico: educación, colaboración e innovación cuántica',
          speaker: 'Dr. César Vílchez, CIP Ex Secretario de Gobierno y Transformación Digital'
        },
        { 
          time: '11:05 - 12:35 AM', 
          title: 'Sesión (IA + QC): Quantum Machine Learning: cuando la IA aprende en el dominio cuántico',
          description: '',
          speaker: 'Lic. Sebastián Rodriguez'
        },
        { 
          time: '12:35 AM - 1:00 PM', 
          title: 'Networking',
        },
        { 
          time: '2:00 - 3:00 PM', 
          title: 'Panel Quantum Hackathon LATAM',
          speaker: 'Concursantes de Quantum Hackathon LATAM',
          description: ''
        },
        { 
          time: '3:00 - 3:45 PM', 
          title: 'Quantum Voice',
          speaker: 'Soleil Kamitto'
        },
        { 
          time: '3:45 - 4:15 PM', 
          title: 'Networking',
          description: ''
        },
        { 
          time: '4:15 - 5:00 PM', 
          title: 'Presentación de SpinQ',
          description: ''
        },
        { 
          time: '5:00 - 6:00 PM', 
          title: 'Panel Quantum Hub',
          speaker: 'Miembros de Quantum Hub',
        },
        
      ]
    }
  };

  const currentSchedule = scheduleData[selectedDay];

  return (
    <div className="w-full bg-transparent p-4 min-h-[700px]">
      {/* Day Tabs */}
      <div className="flex gap-2 mb-8 flex-wrap">
        <button
          onClick={() => handleDayChange('viernes')}
          className={`px-8 py-2 rounded-2xl font-bold transition-all duration-300 ${
            selectedDay === 'viernes'
            ? 'bg-[#bca0cc]/60 text-white shadow-[0_0_15px_3px_rgba(188,160,204,0.8)] border-2 border-[#bca0cc]'
            : 'bg-[#bca0cc]/30 text-[#bca0cc] hover:bg-[#bca0cc]/40 border-2 border-transparent'
          }`}
        >
          Viernes 19
        </button>
        <button
          onClick={() => handleDayChange('sabado')}
          className={`px-8 py-2 rounded-2xl font-bold transition-all duration-300 ${
            selectedDay === 'sabado'
              ? 'bg-[#bca0cc]/60 text-white shadow-[0_0_15px_3px_rgba(188,160,204,0.8)] border-2 border-[#bca0cc]'
              : 'bg-[#bca0cc]/30 text-[#bca0cc] hover:bg-[#bca0cc]/40 border-2 border-transparent'
          }`}
        >
          Sábado 20
        </button>
        <button
          onClick={() => handleDayChange('domingo')}
          className={`px-8 py-2 rounded-2xl font-bold transition-all duration-300 ${
            selectedDay === 'domingo'
              ? 'bg-[#bca0cc]/60 text-white shadow-[0_0_15px_3px_rgba(188,160,204,0.8)] border-2 border-[#bca0cc]'
              : 'bg-[#bca0cc]/30 text-[#bca0cc] hover:bg-[#bca0cc]/40 border-2 border-transparent'
          }`}
        >
          Domingo 21
        </button>
      </div>

      {/* Date Header */}
      <div className="mb-6">
        <h3 className="text-[#bca0cc] font-semibold text-lg">
          {currentSchedule.date}
        </h3>
      </div>
      
      {/* Events List */}
<div className="space-y-6">
  {currentSchedule.events.map((event, index) => (
    <Card key={index} className="bg-gradient-to-br from-quantum-purple/20 to-quantum-purple/10 border-quantum-purple/40 shadow-md">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <CardDescription className="text-quantum-purple/90 text-[1.10rem] flex items-center gap-2 mb-2">
              <Clock className="w-[1.125rem] h-[1.125rem]" />
              {event.time}
            </CardDescription>
            <CardTitle className="font-staatliches text-quantum-purple">
              {event.title}
            </CardTitle>
            {event.subtitle && (
              <p className="text-quantum-purple/80 mt-1">{event.subtitle}</p>
            )}
            {event.subtitleDesc && (
              <p className="text-quantum-purple/70 text-sm">{event.subtitleDesc}</p>
            )}
          </div>
        </div>
      </CardHeader>
      {(event.description || event.speaker) && (
        <CardContent className="relative">
          <div className="absolute -top-12 right-0 w-24 h-24 opacity-10">
            <Atom className="w-full h-full text-quantum-purple" />
          </div>
          <div className="bg-quantum-purple/10 p-4 rounded-lg border-l-4 border-quantum-purple">
            {event.description && (
              <p className="text-quantum-purple/90 mb-3">{event.description}</p>
            )}
            {event.speaker && (
              <p className="text-quantum-purple/90">
                <span className="font-['Staatliches'] text-quantum-purple text-[1.05rem] font-medium mr-2">
                  Ponente <ChevronRight className="inline-block w-5 h-5 ml-1 -mt-[0.25rem]" />
                </span>
                {event.speaker}
                {event.speakerTitle && `, ${event.speakerTitle}`}
              </p>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  ))}
</div>
      
    </div>
  );
};

export default QuantumSchedule;