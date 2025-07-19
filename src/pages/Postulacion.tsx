import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Calendar, 
  Users, 
  Award, 
  CheckCircle, 
  Clock, 
  MessageSquare,
  ChevronRight,
  HelpCircle
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import QuantumParticles from "@/components/QuantumParticles";

const Postulacion = () => {
  const timeline = [
    {
      phase: "Postulación",
      date: "15 Ene - 15 Feb 2025",
      description: "Envío de documentos y formulario de postulación",
      icon: FileText,
      status: "upcoming" as const
    },
    {
      phase: "Evaluación",
      date: "16 Feb - 28 Feb 2025",
      description: "Revisión de expedientes y evaluación académica",
      icon: Users,
      status: "upcoming" as const
    },
    {
      phase: "Entrevistas",
      date: "01 Mar - 15 Mar 2025",
      description: "Entrevistas virtuales con candidatos preseleccionados",
      icon: MessageSquare,
      status: "upcoming" as const
    },
    {
      phase: "Resultados",
      date: "20 Mar 2025",
      description: "Publicación de resultados y notificación a admitidos",
      icon: Award,
      status: "upcoming" as const
    }
  ];

  const requirements = [
    "Formulario de postulación completo",
    "Certificado de estudios (secundaria o universitario)",
    "Carta de motivación (máximo 500 palabras)",
    "Dos cartas de recomendación",
    "Documento de identidad",
    "Foto tamaño carnet"
  ];

  const collaborators = [
    {
      name: "IBM Quantum Network",
      logo: "https://logos-world.net/wp-content/uploads/2020/09/IBM-Logo.png",
      description: "Partner tecnológico oficial"
    },
    {
      name: "Universidad Nacional Mayor de San Marcos",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/3a/UNMSM_coatofarms_seal.svg",
      description: "Colaboración académica"
    },
    {
      name: "CONCYTEC",
      logo: "https://portal.concytec.gob.pe/images/stories/images2013/logo_concytec.png",
      description: "Apoyo institucional"
    },
    {
      name: "Qiskit Community",
      logo: "https://qiskit.org/images/qiskit-logo.png",
      description: "Comunidad técnica"
    }
  ];

  const faqs = [
    {
      question: "¿Cuánto cuesta el curso?",
      answer: "El costo varía según el módulo. Módulo 1: S/ 800, Módulos 2-4: S/ 1,200 cada uno. Ofrecemos becas parciales y totales para estudiantes destacados con recursos limitados."
    },
    {
      question: "¿Las clases son presenciales o virtuales?",
      answer: "Ofrecemos modalidad híbrida: clases presenciales 2 veces por semana en nuestro laboratorio y sesiones virtuales complementarias. Los estudiantes de provincias pueden optar por modalidad 100% virtual."
    },
    {
      question: "¿Necesito conocimientos previos de física cuántica?",
      answer: "Para el Módulo 1 no se requieren conocimientos previos. Para módulos superiores, cada uno tiene prerrequisitos específicos que se detallan en la sección del curso."
    },
    {
      question: "¿Qué certificación obtengo al completar el curso?",
      answer: "Al completar cada módulo recibes un certificado de QuantumHub Peru. Al completar los 4 módulos, obtienes el Certificado de Especialización en Computación Cuántica."
    },
    {
      question: "¿Hay límite de edad para postular?",
      answer: "No hay límite de edad. Estudiantes de secundaria pueden postular al Módulo 1, y estudiantes universitarios o profesionales pueden postular a partir del Módulo 2."
    },
    {
      question: "¿Ofrecen apoyo para conseguir trabajo después del curso?",
      answer: "Sí, tenemos una red de empresas aliadas y ofrecemos orientación profesional, así como conexiones con oportunidades de investigación y desarrollo en el área cuántica."
    }
  ];

  return (
    <div className="relative min-h-screen bg-background">
      <QuantumParticles />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-quantum-hero">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-staatliches text-white mb-6 animate-fade-in-up">
            Postulación
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto font-flatory animate-fade-in-up mb-8">
            Únete a la próxima generación de especialistas en computación cuántica. 
            Conoce todo sobre nuestro proceso de admisión.
          </p>
          <Button 
            asChild
            size="lg"
            className="bg-quantum-cta hover:bg-quantum-cta/90 text-quantum-cta-foreground font-bold px-8 py-4 text-lg hover-quantum animate-fade-in-up"
          >
            <Link to="#apply">¡Postular Ahora!</Link>
          </Button>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-staatliches text-foreground mb-6">
              Cronograma de Admisión 2025
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-flatory">
              Sigue estas fechas importantes para no perderte ninguna etapa del proceso de admisión.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {timeline.map((phase, index) => (
              <Card 
                key={index}
                className="hover-quantum bg-gradient-quantum-card border-quantum-purple/20 group relative animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-quantum-orange/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <phase.icon className="w-8 h-8 text-quantum-orange" />
                  </div>
                  <CardTitle className="font-staatliches text-xl text-foreground">
                    {phase.phase}
                  </CardTitle>
                  <Badge variant="outline" className="mx-auto">
                    {phase.date}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center font-arimo">
                    {phase.description}
                  </CardDescription>
                </CardContent>
                
                {/* Connector line */}
                {index < timeline.length - 1 && (
                  <div className="hidden lg:block absolute top-20 -right-4 w-8 h-0.5 bg-quantum-purple/30 z-10">
                    <ChevronRight className="absolute -top-2 right-0 w-4 h-4 text-quantum-purple/50" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-gradient-quantum-card/30 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-4xl font-staatliches text-foreground mb-6">
                Requisitos de Postulación
              </h2>
              <p className="text-lg text-muted-foreground font-flatory mb-8">
                Asegúrate de cumplir con todos los requisitos y tener la documentación necesaria antes de enviar tu postulación.
              </p>
              
              <ul className="space-y-4">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-quantum-orange mt-0.5 flex-shrink-0" />
                    <span className="font-arimo text-foreground">{requirement}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 p-6 bg-quantum-orange/10 rounded-lg border border-quantum-orange/30">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-quantum-orange mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-staatliches text-lg text-quantum-orange mb-2">
                      Fecha límite de postulación
                    </h4>
                    <p className="font-arimo text-muted-foreground">
                      15 de febrero de 2025 a las 11:59 PM (hora de Lima). 
                      No se aceptarán postulaciones tardías.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="hover-quantum bg-gradient-quantum border-quantum-purple/30 text-white" id="apply">
              <CardHeader className="text-center">
                <CardTitle className="font-staatliches text-3xl mb-4">
                  ¡Postula Ahora!
                </CardTitle>
                <CardDescription className="text-gray-200 font-flatory text-lg">
                  Completa tu postulación en línea y da el primer paso hacia tu futuro cuántico.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between py-2 border-b border-white/20">
                    <span className="font-arimo">Estudiantes de Secundaria</span>
                    <Badge className="bg-quantum-orange text-quantum-black">Módulo 1</Badge>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/20">
                    <span className="font-arimo">Estudiantes Universitarios</span>
                    <Badge className="bg-quantum-orange text-quantum-black">Módulos 2-4</Badge>
                  </div>
                </div>
                
                <Button 
                  size="lg"
                  className="bg-quantum-cta hover:bg-quantum-cta/90 text-quantum-cta-foreground font-bold w-full py-4 text-lg hover-quantum"
                >
                  Iniciar Postulación
                </Button>
                
                <p className="text-sm text-gray-300 mt-4 font-arimo">
                  El proceso de postulación toma aproximadamente 15-20 minutos
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-staatliches text-foreground mb-6">
              Preguntas Frecuentes
            </h2>
            <p className="text-xl text-muted-foreground font-flatory">
              Encuentra respuestas a las preguntas más comunes sobre nuestro programa y proceso de admisión.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4 animate-fade-in-up">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index}
                value={`item-${index}`}
                className="border border-quantum-purple/20 rounded-lg px-6 bg-gradient-quantum-card/30 hover:bg-gradient-quantum-card/50 transition-colors"
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center space-x-3 text-left">
                    <HelpCircle className="w-5 h-5 text-quantum-orange flex-shrink-0" />
                    <span className="font-staatliches text-lg text-foreground">
                      {faq.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <p className="font-arimo text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Collaborators Section */}
      <section className="py-20 bg-gradient-quantum-card/30 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-staatliches text-foreground mb-6">
              Nuestros Colaboradores
            </h2>
            <p className="text-xl text-muted-foreground font-flatory max-w-3xl mx-auto">
              Trabajamos con las mejores instituciones y empresas para ofrecer una educación de clase mundial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {collaborators.map((collaborator, index) => (
              <Card 
                key={index}
                className="hover-quantum bg-white border-quantum-purple/20 group text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                    <img 
                      src={collaborator.logo}
                      alt={collaborator.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <h3 className="font-staatliches text-lg text-foreground mb-2 group-hover:text-quantum-purple transition-colors">
                    {collaborator.name}
                  </h3>
                  <p className="font-arimo text-sm text-muted-foreground">
                    {collaborator.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-background relative z-10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-staatliches text-foreground mb-6">
              ¿Tienes más preguntas?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 font-flatory max-w-2xl mx-auto">
              Nuestro equipo está listo para ayudarte con cualquier duda sobre el proceso de admisión o nuestros programas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg"
                className="bg-quantum-cta hover:bg-quantum-cta/90 text-quantum-cta-foreground font-bold px-8 py-4 text-lg hover-quantum"
              >
                Contactar Admisiones
              </Button>
              
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="border-quantum-purple text-quantum-purple hover:bg-quantum-purple hover:text-white px-8 py-4 text-lg hover-quantum"
              >
                <Link to="/curso">Ver Detalles del Curso</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Postulacion;