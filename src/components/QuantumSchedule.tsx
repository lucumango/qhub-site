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
          time: '2:00 - 2:15 PM',
          title: 'Palabras de Inicio',
          speaker: 'CEDDITEC & QUANTUMHUB PERU'
        },
        {
          time: '2:15 - 2:30 PM',
          title: 'Palabras de Bienvenida',
          speaker: 'Congresista Diego Bazán Calderón',
          speakerTitle: 'Presidente de la Mesa de Jóvenes Parlamentarios del Perú'
        },
        {
          time: '2:30 - 3:20 PM',
          title: 'Sesión 0 (QC): Historia de la mecánica cuántica ',
          speaker: 'Mg. Bernabé Alonso Mejía Cordero',
          speakerTitle: 'Docente universitario y coordinador académico EPF -UNFV',
        },
        {
          time: '3:20 - 4:00 PM',
          title: 'Introducción a SPINQ Gemini Mini y SPINQ Triangulum y sus aplicaciones en educación e investigación',
          speaker: 'PhD. Aurelio Arbildo Lopez,  Mg. Juan Francisco Madrid Cisneros',
          speakerTitle: '',

        },
        {
          time: '4:00 - 4:20 PM',
          title: 'Networking',
          description: ''
        },
        {
          time: '4:20 - 5:40 PM',
          title: 'Sesión 1 (QC): Fundamentos de la Computación Cuántica',
          description: '',
          speaker: 'Ing. Diego Correa Núñez',
          speakerTitle: ''
        },
        {
          time: '5:40 - 6:30 PM',
          title: 'Conferencia: Frontier AI Firms - Microsoft & SoftwareOne',
          speaker: ''
        }
      ]
    },
    sabado: {
      date: 'Sábado, 20 de Diciembre',
      dayNumber: 2,
      events: [
        { 
          time: '9:30 - 10:00 AM', 
          title: 'Recepción y Palabras de Inicio',
          speaker: 'CEDDITEC & QUANTUMHUB PERU'
        },
        { 
          time: '10:00 - 10:50 AM', 
          title: 'Conferencia: Convergencia entre la Inteligencia Artificial y la Computación Cuántica',
          speaker: '',
          speakerTitle: ''
        },
        { 
          time: '10:50 AM - 12:20 PM', 
          title: 'Sesión 2 (QC): Circuitos cuánticos: donde la física se convierte en código',
          speaker: 'Mg. Hebert Diaz Moraga',
          speakerTitle: 'Estudiante de Maestría en Física Teórica, Pontificia Universidad Católica de Chile'
        }, 
        { 
          time: '12:20 - 12:45 PM', 
          title: 'Networking',
        },
        { 
          time: '1:45 - 2:45 PM', 
          title: 'Conferencia: Construyendo el Ecosistema Cuántico del Perú: Logros y Visión de QuantumHub Perú',
          speaker: '',
          speakerTitle: '',
          description: ''
        },
        { 
          time: '2:45 - 3:45 PM', 
          title: 'Presentación Académica: IA para la medición de carbono en el suelo',
          speaker: 'Mg. Pedro Gonzales Sánchez',
          speakerTitle: '',
          description: ''
        },
        { 
          time: '3:45 - 4:05 PM', 
          title: 'Networking',
          description: ''
        },
        { 
          time: '4:05 - 5:35 PM', 
          title: 'Sesión 3 (QC): Algoritmos cuánticos y el futuro del cómputo inteligente',
          speaker: 'Mg. Miguel Martinez',
          speakerTitle: '',
          description: ''
        },
        { 
          time: '5:35 - 6:30 PM', 
          title: 'Panel: Construyendo un Ecosistema Cuántico desde Cero',
          speaker: '',
          speakerTitle: '',
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
          title: 'Recepción y Palabras de Inicio',
          speaker: 'CEDDITEC & QUANTUMHUB PERU'
        },
        { 
          time: '10:00 - 10:50 AM', 
          title: 'Conferencia 3: Latinoamérica como semillero científico: educación, colaboración e innovación cuántica',
          speaker: ''
        },
        { 
          time: '10:50 - 11:50 AM', 
          title: 'Presentación académica: Algoritmos variacionales en química cuántica',
          description: '',
          speaker: ''
        },
        { 
          time: '11:50 AM - 12:50 PM', 
          title: 'Sesión 2 (IA): Arquitecturas Generativas y Agentes Inteligentes para la Innovación Empresarial',
          speaker: 'Ing. Eduardo Salvador Ñique',
          speakerTitle: ''
        },
        { 
          time: '2:00 - 2:40 PM', 
          title: 'Panel Quantum Hackathon LATAM',
          speaker: 'Kelvin Cahuana, Jose Quispe, Maria Pareja, Ariana Lopez, Mario Vilca, Paolo Flores',
          speakerTitle: 'Concursantes de Quantum Hackathon LATAM'
        },
        { 
          time: '2:40 - 3:20 PM', 
          title: 'Quantum Voice: El poder de creer en ti y en tu historia: de Perú a Tesla, IBM y Microsoft',
          speaker: 'Ing. Antonny Porlles',
          speakerTitle: 'Data & AI Solutions Engineer, Microsoft'
        },
        { 
          time: '3:20 - 3:50 PM', 
          title: 'Networking',
          description: ''
        },
        { 
          time: '3:50 - 5:45 PM', 
          title: 'Clausura y Graduación QC301: Nuevas Generaciones de Talento Cuántico',
          description: ''
        },
        { 
          time: '5:45 - 6:15 PM', 
          title: 'Brindis de honor y entrega de certificados a participantes',
          speaker: '',
        },
        { 
          time: '6:15 - 6:30 PM', 
          title: 'Agradecimiento y Palabras Finales',
          speaker: 'CEDDITEC & QUANTUMHUB PERU',
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
              <p className="text-quantum-purple/100">
                <span className="font-['Staatliches'] text-quantum-purple text-[1.05rem] font-medium mr-2">
                  {event.speaker}
                  {event.speakerTitle && (
                    <>
                      <ChevronRight className="inline-block w-5 h-5 ml-1 -mt-[0.25rem]" />
                      <span className="font-sans text-quantum-purple/100 text-[0.95rem] font-normal">
                        {event.speakerTitle}
                      </span>
                    </>
                  )}
                </span>
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