import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Calendar, Award } from "lucide-react";
import QuantumParticles from "@/components/QuantumParticles";
import QuantumBits from "@/components/QuantumBits";
import QuantumWaves from "@/components/QuantumWaves";

const Home = () => {
  return (
    <div className="relative z-10">
           
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-quantum-hero overflow-hidden">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/722bc348-fb6d-4030-bb5f-2cf1c834e9d1.png')] bg-cover bg-center opacity-30" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 pb-20">
          <div className="animate-fade-in-up">
            <img 
              src="/logo.png" 
              alt="QuantumHub Logo" 
              className="w-32 h-32 mx-auto mb-8 animate-quantum-float"
            />
            
            <h1 className="text-5xl md:text-7xl font-staatliches text-white mb-6 leading-tight">
  Bienvenido al
  <span className="text-gradient-quantum-test block">
    Futuro Cuántico
  </span>
</h1>

            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto font-flatory leading-relaxed">
              El futuro no es determinista: es cuántico. <br></br>Aprende con nosotros sin colapsar tu intuición.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                asChild
                size="lg"
                className="bg-quantum-cta hover:bg-quantum-cta/90 text-quantum-cta-foreground font-bold px-8 py-4 text-lg hover-quantum"
              >
                <Link to="https://forms.gle/HpPLHeN9SMro19bA6">¡Inscríbete Ahora!</Link>
              </Button>
              
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="border-white text-quantum-dark-blue px-8 py-4 text-lg hover-quantum"
              >
                <Link to="/curso">Conoce el Curso</Link>
              </Button>
            </div>
          </div>
        </div>
       
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-quantum-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-staatliches text-foreground mb-6">
              ¿Por qué QuantumHub?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-flatory">
              Somos la primera escuela especializada en computación cuántica de Perú, 
              ofreciendo educación de vanguardia para estudiantes de secundaria y universidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Cursos Especializados",
                description: "4 módulos diseñados para diferentes niveles de conocimiento",
                color: "quantum-dark-blue"
              },
              {
                icon: Users,
                title: "Equipo Experto",
                description: "Profesores con experiencia en investigación cuántica",
                color: "quantum-purple"
              },
              {
                icon: Calendar,
                title: "Flexibilidad",
                description: "Clases virtuales \nMartes y Jueves | 6:00 - 8:00 pm \nSábados | 11:30 - 1:30 pm",
                color: "quantum-lilac"
              },
              {
                icon: Award,
                title: "Certificación",
                description: "Certificados reconocidos en el ámbito académico y profesional",
                color: "quantum-orange"
              }
            ].map((feature, index) => (
              <Card key={index} className="hover-quantum bg-gradient-quantum-card border-quantum-purple/20 group">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-${feature.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`w-8 h-8 text-${feature.color}`} />
                  </div>
                  <CardTitle className="font-staatliches text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center font-arimo whitespace-pre-line">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-quantum relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            {[
              { number: "4", label: "Módulos Especializados", description: "Desde fundamentos hasta aplicaciones avanzadas" },
              { number: "6", label: "Instructores Expertos", description: "Investigadores y profesionales del área" },
              { number: "1°", label: "Escuela cuántica en el Perú", description: "Somos pioneros en la educación" }
            ].map((stat, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="text-6xl font-staatliches text-quantum-orange mb-2 animate-quantum-pulse">
                  {stat.number}
                </div>
                <h3 className="text-2xl font-staatliches mb-2">{stat.label}</h3>
                <p className="text-gray-200 font-arimo">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

            <div className="relative">
  <QuantumParticles />
  
  {/* CTA Section */}
  <section className="py-20 relative">
    <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-md rounded-xl">
      <div className="animate-fade-in-up">
        <h2 className="text-4xl md:text-5xl font-staatliches text-foreground mb-6">
          ¿Listo para explorar el{" "}
          <span className="text-gradient-quantum">mundo cuántico?</span>
        </h2>
        <p className="text-xl text-muted-foreground mb-8 font-flatory max-w-2xl mx-auto">
          Únete a nuestra comunidad de estudiantes y descubre las infinitas posibilidades 
          de la computación cuántica.
        </p>
        <Button 
          asChild
          size="lg"
          className="bg-quantum-cta hover:bg-quantum-cta/90 text-quantum-cta-foreground font-bold px-12 py-6 text-xl hover-quantum"
        >
          <Link to="https://forms.gle/HpPLHeN9SMro19bA6">¡Inscríbete Ahora!</Link>
        </Button>
      </div>
    </div>
  </section>
</div>

      
      
    </div>
  );
};

export default Home;