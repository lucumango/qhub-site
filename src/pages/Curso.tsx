import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, BookOpen, Target, ChevronRight } from "lucide-react";
import QuantumParticles from "@/components/QuantumParticles";

const Curso = () => {
  const modules = [
    {
      id: 1,
      title: "Módulo 1: Fundamentos Cuánticos",
      target: "Estudiantes de Secundaria",
      duration: "8 semanas",
      difficulty: "Principiante",
      description: "Introducción a los conceptos básicos de la mecánica cuántica y computación cuántica.",
      topics: [
        "¿Qué es la computación cuántica?",
        "Conceptos básicos: superposición y entrelazamiento",
        "Diferencias con la computación clásica",
        "Aplicaciones en la vida cotidiana",
        "Ejercicios prácticos con simuladores"
      ],
      prerequisites: "Conocimientos básicos de matemáticas de secundaria",
      color: "quantum-dark-blue"
    },
    {
      id: 2,
      title: "Módulo 2: Matemáticas Cuánticas",
      target: "Estudiantes Universitarios",
      duration: "10 semanas",
      difficulty: "Intermedio",
      description: "Fundamentos matemáticos necesarios para entender la computación cuántica.",
      topics: [
        "Álgebra lineal avanzada",
        "Espacios de Hilbert",
        "Operadores y matrices unitarias",
        "Notación de Dirac",
        "Probabilidades cuánticas"
      ],
      prerequisites: "Cálculo diferencial e integral, álgebra lineal básica",
      color: "quantum-purple"
    },
    {
      id: 3,
      title: "Módulo 3: Algoritmos Cuánticos",
      target: "Estudiantes Universitarios",
      duration: "12 semanas",
      difficulty: "Avanzado",
      description: "Estudio detallado de los principales algoritmos cuánticos y sus aplicaciones.",
      topics: [
        "Algoritmo de Shor",
        "Algoritmo de Grover",
        "Algoritmo de simulación cuántica",
        "Quantum Machine Learning",
        "Implementación práctica"
      ],
      prerequisites: "Módulo 2 completado, programación básica",
      color: "quantum-lilac"
    },
    {
      id: 4,
      title: "Módulo 4: Aplicaciones Industriales",
      target: "Estudiantes Universitarios",
      duration: "14 semanas",
      difficulty: "Experto",
      description: "Aplicaciones prácticas de la computación cuántica en diferentes industrias.",
      topics: [
        "Criptografía cuántica",
        "Optimización cuántica",
        "Química cuántica computacional",
        "Inteligencia artificial cuántica",
        "Proyecto final de investigación"
      ],
      prerequisites: "Módulo 3 completado, experiencia en programación",
      color: "quantum-orange"
    }
  ];

  const benefits = [
    {
      icon: BookOpen,
      title: "Contenido Actualizado",
      description: "Currículo diseñado con las últimas investigaciones en computación cuántica"
    },
    {
      icon: Users,
      title: "Grupos Reducidos",
      description: "Máximo 20 estudiantes por módulo para atención personalizada"
    },
    {
      icon: Target,
      title: "Enfoque Práctico",
      description: "Laboratorios virtuales y proyectos reales con tecnología cuántica"
    },
    {
      icon: Clock,
      title: "Horarios Flexibles",
      description: "Clases presenciales y virtuales adaptadas a tu horario"
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
            Nuestro Curso
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto font-flatory animate-fade-in-up mb-8">
            Un programa educativo completo diseñado para llevarte desde los fundamentos básicos 
            hasta las aplicaciones más avanzadas de la computación cuántica.
          </p>
          <Button 
            asChild
            size="lg"
            className="bg-quantum-cta hover:bg-quantum-cta/90 text-quantum-cta-foreground font-bold px-8 py-4 text-lg hover-quantum animate-fade-in-up"
          >
            <Link to="/postulacion">¡Inscríbete Ahora!</Link>
          </Button>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-staatliches text-foreground mb-6">
              Estructura del Programa
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-flatory">
              Nuestro programa está dividido en 4 módulos especializados, diseñados para diferentes 
              niveles de conocimiento y experiencia académica.
            </p>
          </div>

          {/* Target Audience Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-gradient-quantum-card border-quantum-dark-blue/30 hover-quantum">
              <CardHeader>
                <CardTitle className="font-staatliches text-2xl text-quantum-dark-blue flex items-center">
                  <Users className="w-6 h-6 mr-3" />
                  Estudiantes de Secundaria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-arimo text-muted-foreground mb-4">
                  Pueden postular únicamente al <strong>Módulo 1</strong>, diseñado específicamente 
                  para introducir los conceptos fundamentales de manera accesible.
                </p>
                <Badge variant="outline" className="border-quantum-dark-blue text-quantum-dark-blue">
                  Solo Módulo 1
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-gradient-quantum-card border-quantum-purple/30 hover-quantum">
              <CardHeader>
                <CardTitle className="font-staatliches text-2xl text-quantum-purple flex items-center">
                  <Users className="w-6 h-6 mr-3" />
                  Estudiantes Universitarios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-arimo text-muted-foreground mb-4">
                  Pueden postular a partir del <strong>Módulo 2</strong>, con la opción de avanzar 
                  hasta el Módulo 4 según su nivel de conocimiento.
                </p>
                <Badge variant="outline" className="border-quantum-purple text-quantum-purple">
                  Módulos 2, 3 y 4
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Modules Grid */}
          <div className="space-y-8">
            {modules.map((module, index) => (
              <Card 
                key={module.id}
                className={`hover-quantum bg-gradient-quantum-card border-${module.color}/30 overflow-hidden animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex">
                  <div className={`w-2 bg-${module.color}`}></div>
                  <div className="flex-1">
                    <CardHeader>
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="font-staatliches text-2xl text-foreground mb-2">
                            {module.title}
                          </CardTitle>
                          <CardDescription className="text-lg font-flatory">
                            {module.description}
                          </CardDescription>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge className={`bg-${module.color}/10 text-${module.color} border-${module.color}/30`}>
                            {module.target}
                          </Badge>
                          <Badge variant="outline">
                            {module.duration}
                          </Badge>
                          <Badge variant="outline">
                            {module.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-staatliches text-lg text-foreground mb-3">
                            Temas a cubrir:
                          </h4>
                          <ul className="space-y-2 font-arimo text-muted-foreground">
                            {module.topics.map((topic, topicIndex) => (
                              <li key={topicIndex} className="flex items-start">
                                <ChevronRight className="w-4 h-4 mt-0.5 mr-2 text-quantum-orange flex-shrink-0" />
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-staatliches text-lg text-foreground mb-3">
                            Prerrequisitos:
                          </h4>
                          <p className="font-arimo text-muted-foreground">
                            {module.prerequisites}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-quantum relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-staatliches text-white mb-6">
              ¿Por qué elegir nuestro curso?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="text-center text-white animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-quantum-orange/20 rounded-full flex items-center justify-center">
                  <benefit.icon className="w-8 h-8 text-quantum-orange" />
                </div>
                <h3 className="font-staatliches text-xl mb-3">{benefit.title}</h3>
                <p className="font-arimo text-gray-200">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background relative z-10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-staatliches text-foreground mb-6">
              ¿Listo para comenzar tu{" "}
              <span className="text-gradient-quantum">aventura cuántica?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 font-flatory max-w-2xl mx-auto">
              Inscríbete ahora y forma parte de la próxima generación de expertos en computación cuántica.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                asChild
                size="lg"
                className="bg-quantum-cta hover:bg-quantum-cta/90 text-quantum-cta-foreground font-bold px-12 py-6 text-xl hover-quantum"
              >
                <Link to="/postulacion">¡Inscríbete Ahora!</Link>
              </Button>
              
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="border-quantum-purple text-quantum-purple hover:bg-quantum-purple hover:text-white px-8 py-6 text-lg hover-quantum"
              >
                <Link to="/equipo">Conoce a nuestro equipo</Link>
              </Button>

              <Button
    asChild
    variant="outline"
    size="lg"
    className="border-quantum-orange text-quantum-orange hover:bg-quantum-orange hover:text-black px-8 py-6 text-lg hover-quantum"
  >
    <a 
      href="https://drive.google.com/file/d/1eJqaIuTRpVZmG7OEB2ptMqNksSybF977/view?usp=sharing" // ✅ Cambia esto por tu enlace real
      target="_blank"
      rel="noopener noreferrer"
    >
      Descargar Brochure
    </a>
  </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Curso;