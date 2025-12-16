import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, SectionCard } from "@/components/ui/card";
import { Lightbulb, Atom, ChevronRight } from "lucide-react";
type DayKey = 'viernes' | 'sabado' | 'domingo';

interface Organization {
  name: string;
  speakers?: string;
  speakerTitles?: string;
}

interface Event {
  time: string;
  title: string;
  description?: string;
  subtitle?: string;
  subtitleDesc?: string;
  speaker?: string;
  speakerTitle?: string;
  organizations?: Organization[];
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
          title: 'Recepción y Palabras de Inicio',
          organizations: [
            {
              name: "QUANTUMHUB PERU",
              speakers: "Lic. Freddy Herrera Cueva",
              speakerTitles: "CEO de QuantumHub Perú"
            },
            {
              name: "CEDDITEC",
              speakers: "Dr. Ing. Aurelio Arbildo López"
            }
          ]
        },
        {
          time: '2:00 - 2:20 PM',
          title: 'Palabras de Bienvenida',
          speaker: 'Congresista Diego Bazán Calderón',
          speakerTitle: 'Presidente de la Mesa de Jóvenes Parlamentarios del Perú'
        },
        {
          time: '2:20 - 3:10 PM',
          title: 'Sesión 0 (QC): Historia de la mecánica cuántica ',
          speaker: 'Mg. Bernabé Alonso Mejía Cordero',
          speakerTitle: 'Docente universitario y coordinador académico EPF - UNFV',
        },
        {
          time: '3:10 - 3:50 PM',
          title: 'Conferencia: Frontier AI Firms - Microsoft & SoftwareOne',
          speaker: 'Ing. Marvin Ortega',
          speakerTitle: 'Business Development Executive (BDE) - SoftwareONE'
        },
        {
          time: '3:50 - 4:10 PM',
          title: 'Networking',
          description: ''
        },
        {
          time: '4:10 - 5:30 PM',
          title: 'Sesión 1 (QC): Fundamentos de la Computación Cuántica',
          description: '',
          speaker: 'Ing. Diego Correa Núñez',
          speakerTitle: 'Ingeniero mecatrónico con experiencia en desarrollo de software y actual explorador de tecnologías cuánticas.'
        },
        {
          time: '5:30 - 6:15 PM',
          title: 'Introducción a SPINQ Gemini Mini y SPINQ Triangulum y sus aplicaciones en educación e investigación',
          organizations: [
            {
              name: "Inducontrol",
              speakers: "PhD. Aurelio Arbildo Lopez,  Mg. Juan Francisco Madrid Cisneros",
              speakerTitles: "Gerente General - Sociedad Inducontrol Ingeniería SAC;  Gestor de Proyectos - Sociedad Inducontrol Ingeniería SAC"
            },
          ]
        },
      ]
    },
    sabado: {
      date: 'Sábado, 20 de Diciembre',
      dayNumber: 2,
      events: [
        { 
          time: '9:30 - 10:00 AM', 
          title: 'Recepción y Palabras de Inicio',
          organizations: [
            {
              name: "QUANTUMHUB PERU",
              speakers: "Adriana Alvarado León",
              speakerTitles: " Organizadora del Quantum AI Summit Perú 2025 & Fundadora de QuantumHub Perú"
            },
            {
              name: "CEDDITEC",
              speakers: "Dr. Ing. Juan F. Madrid"
            }
          ]
        },
        { 
          time: '10:00 - 10:50 AM', 
          title: 'Presentación académica: Curiosity over hype: Modelling motivation language to understand early outcomes in a selective quantum track',
          speaker: 'Bs. Daniella Vargas',
          speakerTitle: 'Forense digital | Ingeniera en IA y Machine Learning'
        },
        { 
          time: '10:50 AM - 12:20 PM', 
          title: 'Sesión 2 (QC): Circuitos cuánticos: donde la física se convierte en código',
          speaker: 'Mg. Hebert Diaz Moraga',
          speakerTitle: 'Estudiante de Maestría en Física Teórica - Pontificia Universidad Católica de Chile'
        }, 
        { 
          time: '12:20 - 12:45 PM', 
          title: 'Networking',
        },
        { 
          time: '1:45 - 2:45 PM', 
          title: 'Conferencia: Construyendo el Ecosistema Cuántico del Perú: Logros y Visión de QuantumHub Perú',
          speaker: 'Lic. Freddy Herrera',
          speakerTitle: 'CEO de QuantumHub Perú',
          description: ''
        },
        { 
          time: '2:45 - 3:45 PM', 
          title: 'Presentación Académica: IA para la medición de carbono en el suelo',
          speaker: 'Mg. Pedro Gonzales Sánchez',
          speakerTitle: 'Docente RENACYT y Estudiante Doctorado UNICAMP Brasil',
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
          speakerTitle: 'Analista de Datos freelance',
          description: ''
        },
        { 
          time: '5:35 - 6:30 PM', 
          title: 'Panel: Construyendo un Ecosistema Cuántico desde Cero',
          speaker: 'QuantumHub Perú',
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
          organizations: [
            {
              name: "QUANTUMHUB PERU",
              speakers: "Sebastián Villanueva Flores",
              speakerTitles: " Organizador del Quantum AI Summit Perú 2025"
            },
            {
              name: "CEDDITEC",
              speakers: "Dr. Ing. Juan F. Madrid"
            }
          ]
        },
        { 
          time: '10:00 - 10:50 AM', 
          title: 'Conferencia 3: Latinoamérica como semillero científico: educación, colaboración e innovación cuántica',
          speaker: 'PhD. Cesar Vílchez Inga',
          speakerTitle: 'Jefe del Equipo Técnico del Proyecto Mejoramiento del Sistema de Inversion Pública del MEF'
        },
        { 
          time: '10:50 - 11:50 AM', 
          title: 'Presentación académica: Algoritmos variacionales en química cuántica',
          speaker: 'Mg. Hebert Diaz Moraga',
          speakerTitle: 'Estudiante de Maestría en Física Teórica - Pontificia Universidad Católica de Chile'
        },
        { 
          time: '11:50 AM - 12:50 PM', 
          title: 'Sesión 2 (IA): Arquitecturas Generativas y Agentes Inteligentes para la Innovación Empresarial',
          speaker: 'Ing. Eduardo Salvador Ñique',
          speakerTitle: 'Generative AI Engineer | Quantum Computing Researcher'
        },
        { 
          time: '2:00 - 2:40 PM', 
          title: 'Panel Quantum Hackathon LATAM',
          organizations: [
          {
            name: "MENTOR DE LA QUANTUM HACKATHON LATAM",
            speakers: "Sebastián Rodríguez Falcón",
            speakerTitles: "Quantum Computing Researcher & Developer"
          },
          {
            name: "CONCURSANTES DE LA QUANTUM HACKATHON LATAM",
            speakers: "José Quispe Cabello, Ariana Lopez Julcarima, Maria Pareja Abarca, Kelvin Cahuana Condori, Paolo Flores Cóngora, Mario Vilca Zamora",
            speakerTitles: "Software Engineer - UNMSM; Computer Science Student - UNI; System Engineer Student - UCSM; Computer Science Student - UTEC; Software Engineer Student - UNMSM; Electronic Engineer Student - UNMSM"
          },
        ]
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
          speaker: 'QuantumHub Peru',
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
          organizations: [
            {
              name: "QUANTUMHUB PERU",
              speakers: "Lic. Freddy Herrera Cueva, Adriana Alvarado León, Sebastián Villanueva Flores",
              speakerTitles: "CEO de QuantumHub Perú; Organizadora del Quantum AI Summit Perú 2025 & Fundadora de QuantumHub Perú; Organizador del Quantum AI Summit Perú 2025"
            },
            {
              name: "CEDDITEC",
              speakers: "Dr. Ing. Aurelio Arbildo López",
              speakerTitles: "Director Ejecutivo"
            }
          ]
        },
        
      ]
    }
  };

  const currentSchedule = scheduleData[selectedDay];

  return (
    <div className="w-full bg-transparent p-4 min-h-[700px]">
      {/* Day Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center sm:justify-start">
  {['viernes', 'sabado', 'domingo'].map((day) => (
    <button
      key={day}
      onClick={() => handleDayChange(day as DayKey)}
      className={`
        px-3 sm:px-4 md:px-7 py-2
        rounded-2xl font-bold 
        transition-all duration-300 
        text-sm sm:text-base
        w-auto max-w-[120px] sm:max-w-none
        ${selectedDay === day
          ? 'bg-[#bca0cc]/60 text-white shadow-[0_0_15px_3px_rgba(188,160,204,0.8)] border-2 border-[#bca0cc]'
          : 'bg-[#bca0cc]/30 text-[#bca0cc] hover:bg-[#bca0cc]/40 border-2 border-transparent'
        }`}
    >
      {day === 'viernes' && 'Viernes 19'}
      {day === 'sabado' && 'Sábado 20'}
      {day === 'domingo' && 'Domingo 21'}
    </button>
  ))}
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
      {(event.description || event.speaker || event.organizations) && (
        <CardContent className="relative">
          <div className="absolute -top-12 right-0 w-24 h-24 opacity-10">
            <Atom className="w-full h-full text-quantum-purple" />
          </div>
          <div className="bg-quantum-purple/10 p-4 rounded-lg border-l-4 border-quantum-purple">
            {event.description && (
              <p className="text-quantum-purple/90 mb-3">{event.description}</p>
            )}
            {/* Para múltiples organizaciones o oradores sin organización */}
{(event.organizations || event.speaker) && (
  <div className="space-y-3">
    {/* Mostrar organizaciones si existen */}
    {event.organizations?.map((org, orgIndex) => (
      <div key={orgIndex} className="space-y-1">
        <div className="font-['Staatliches'] text-quantum-purple text-[1rem] tracking-wide">
          {org.name}
        </div>
        {org.speakers && (
          <div className="ml-4 space-y-1">
            {org.speakers.split(',').map((speaker, speakerIndex) => {
              const speakerName = speaker.trim();
              const speakerTitle = org.speakerTitles?.split(';')[speakerIndex]?.trim() || '';
              
              return (
                <div key={speakerIndex} className="flex items-start">
                  <div className="font-['Staatliches'] text-quantum-purple/80 text-[1.05rem] font-medium">
                    {speakerName}
                  </div>
                  {speakerTitle && (
                    <div className="flex items-center ml-2">
                      <ChevronRight className="inline-block w-5 h-5 text-quantum-purple/80 flex-shrink-0" />
                      <span className="font-sans text-quantum-purple/100 text-[0.95rem] font-normal ml-1">
                        {speakerTitle}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    ))}

    {/* Mostrar oradores sin organización si existen */}
    {!event.organizations && event.speaker && (
      <div className="space-y-1">
        {event.speaker.split(',').map((speaker, index) => {
          const speakerName = speaker.trim();
          const speakerTitle = event.speakerTitle?.split(',').map(s => s.trim())[index] || '';
          
          return (
            <div key={index} className="flex items-start">
              <div className="font-['Staatliches'] text-quantum-purple text-[1.05rem] font-medium">
                {speakerName}
              </div>
              {speakerTitle && (
                <div className="flex items-center ml-2">
                  <ChevronRight className="inline-block w-5 h-5 text-quantum-purple/80 flex-shrink-0" />
                  <span className="font-sans text-quantum-purple/100 text-[0.95rem] font-normal ml-1">
                    {speakerTitle}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    )}
  </div>
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