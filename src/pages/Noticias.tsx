import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import QuantumParticles from "@/components/QuantumParticles";

interface Article {
  id: number;
  title: string;
  description: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  featured?: boolean;
}

const articles: Article[] = [
  {
    id: 1,
    title: "QuantumHub Peru inaugura su primer laboratorio cuántico",
    description: "Conoce las nuevas instalaciones equipadas con simuladores cuánticos de última generación que permitirán a nuestros estudiantes experimentar directamente con tecnología cuántica.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    author: "Dr. Ana García",
    date: "15 Dic 2024",
    category: "Laboratorio",
    readTime: "5 min",
    featured: true
  },
  {
    id: 2,
    title: "Estudiantes de QuantumHub ganan competencia internacional",
    description: "Un equipo de estudiantes del Módulo 4 obtuvo el primer lugar en la Quantum Computing Challenge 2024, demostrando la excelencia de nuestro programa educativo.",
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=800&h=600&fit=crop",
    author: "Dr. Carlos Mendoza",
    date: "02 Dic 2024",
    category: "Logros",
    readTime: "3 min"
  },
  {
    id: 3,
    title: "Nueva alianza con IBM Quantum Network",
    description: "QuantumHub Peru se convierte en partner académico de IBM Quantum Network, brindando acceso a computadoras cuánticas reales a nuestros estudiantes.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop",
    author: "Dra. Elena Rodríguez",
    date: "28 Nov 2024",
    category: "Alianzas",
    readTime: "4 min"
  },
  {
    id: 4,
    title: "Webinar gratuito: Introducción a la Computación Cuántica",
    description: "Únete a nuestro webinar abierto donde exploraremos los conceptos básicos de la computación cuántica y sus aplicaciones futuras.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop",
    author: "Dr. Roberto Vega",
    date: "20 Nov 2024",
    category: "Eventos",
    readTime: "2 min"
  },
  {
    id: 5,
    title: "Investigación: Algoritmos cuánticos para optimización logística",
    description: "Nuestro equipo de investigación publica un paper sobre aplicaciones de algoritmos cuánticos en la optimización de rutas de transporte en Lima.",
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&h=600&fit=crop",
    author: "Dr. Miguel Santos",
    date: "12 Nov 2024",
    category: "Investigación",
    readTime: "6 min"
  },
  {
    id: 6,
    title: "Beca de estudios para estudiantes destacados",
    description: "Anunciamos el programa de becas QuantumHub 2025 para estudiantes de escasos recursos con excelencia académica.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
    author: "Dra. Patricia Lima",
    date: "05 Nov 2024",
    category: "Becas",
    readTime: "3 min"
  }
];

const Noticias = () => {
  const featuredArticle = articles.find(article => article.featured);
  const regularArticles = articles.filter(article => !article.featured);

  const getCategoryColor = (category: string) => {
    const colors = {
      "Laboratorio": "quantum-dark-blue",
      "Logros": "quantum-orange",
      "Alianzas": "quantum-purple",
      "Eventos": "quantum-lilac",
      "Investigación": "quantum-dark-blue",
      "Becas": "quantum-orange"
    };
    return colors[category as keyof typeof colors] || "quantum-purple";
  };

  return (
    <div className="relative min-h-screen bg-background">
      <QuantumParticles />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-quantum-hero">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-staatliches text-white mb-6 animate-fade-in-up">
            Noticias
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto font-flatory animate-fade-in-up">
            Mantente al día con las últimas novedades, investigaciones y logros de QuantumHub Peru.
          </p>
        </div>
      </section>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Featured Article */}
        {featuredArticle && (
          <div className="mb-16 animate-fade-in-up">
            <h2 className="text-3xl font-staatliches text-foreground mb-8">Artículo Destacado</h2>
            <Card className="overflow-hidden hover-quantum bg-gradient-quantum-card border-quantum-orange/30 group">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative overflow-hidden">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`bg-${getCategoryColor(featuredArticle.category)}/90 text-white`}>
                      {featuredArticle.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="font-staatliches text-2xl lg:text-3xl text-foreground group-hover:text-quantum-orange transition-colors">
                      {featuredArticle.title}
                    </CardTitle>
                    <CardDescription className="text-lg font-flatory mt-3">
                      {featuredArticle.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground font-arimo mb-6">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {featuredArticle.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {featuredArticle.date}
                      </div>
                      <span>{featuredArticle.readTime} de lectura</span>
                    </div>
                    
                    <Button 
                      asChild
                      className="bg-quantum-cta hover:bg-quantum-cta/90 text-quantum-cta-foreground font-bold group-hover:translate-x-1 transition-transform"
                    >
                      <Link to={`/noticias/${featuredArticle.id}`}>
                        Leer más
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Regular Articles Grid */}
        <div>
          <h2 className="text-3xl font-staatliches text-foreground mb-8">Todas las Noticias</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article, index) => (
              <Card 
                key={article.id}
                className="overflow-hidden hover-quantum bg-gradient-quantum-card border-quantum-purple/20 group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`bg-${getCategoryColor(article.category)}/90 text-white`}>
                      {article.category}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="font-staatliches text-lg text-foreground group-hover:text-quantum-purple transition-colors line-clamp-2">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="font-flatory text-sm line-clamp-3">
                    {article.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground font-arimo mb-4">
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      {article.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {article.date}
                    </div>
                  </div>
                  
                  <Button 
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full border-quantum-purple/30 hover:bg-quantum-purple/10 hover:border-quantum-purple/50 group-hover:translate-y-0 group-hover:shadow-lg transition-all"
                  >
                    <Link to={`/noticias/${article.id}`}>
                      Leer más
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Subscription */}
        <Card className="mt-16 bg-gradient-quantum text-white border-quantum-purple/30 animate-fade-in-up">
          <CardContent className="p-8 text-center">
            <h3 className="font-staatliches text-2xl mb-4">
              ¿No quieres perderte ninguna noticia?
            </h3>
            <p className="font-flatory text-gray-200 mb-6 max-w-2xl mx-auto">
              Suscríbete a nuestro newsletter y recibe las últimas actualizaciones sobre 
              investigación, eventos y oportunidades en computación cuántica.
            </p>
            <Button 
              size="lg"
              className="bg-quantum-cta hover:bg-quantum-cta/90 text-quantum-cta-foreground font-bold px-8 py-3 hover-quantum"
            >
              Suscribirse al Newsletter
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Noticias;