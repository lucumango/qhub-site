import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, AtSign } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Curso", href: "/curso" },
    { name: "Equipo", href: "/equipo" },
    { name: "Aprendizaje", href: "/aprendizaje" }
  ];

  const isActivePath = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="relative z-10 min-h-screen bg-background">

      {/* Navigation */}
      <nav className="bg-gradient-quantum-hero border-b border-quantum-purple/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="QuantumHub Peru Logo"
                className="w-10 h-10"
              />
              <span className="font-staatliches text-white text-xl">QuantumHub Peru</span>
          </Link>


            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors hover-quantum ${
                    isActivePath(item.href)
                      ? "text-quantum-orange border-b-2 border-quantum-orange"
                      : "text-white hover:text-quantum-orange"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              <Button 
                asChild
                className="font-['Staatliches'] text-base bg-gradient-to-r from-[#e258d4] to-[#e76745] hover:from-[#e258d4] hover:to-[#e76745]  text-white  w-full transition-all duration-300"
              >
                <Link to="/quantumaisummit" onClick={() => setIsMenuOpen(false)}>
                  QUANTUM AI SUMMIT
                </Link>
              </Button>
              
              <Button 
                asChild
                className="bg-quantum-cta hover:bg-quantum-cta/90 text-quantum-cta-foreground font-bold"
              >
                <Link to="/postulacion">¡Inscríbete!</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-quantum-orange transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-quantum-purple/20">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 text-base font-medium transition-colors ${
                      isActivePath(item.href)
                        ? "text-quantum-orange bg-quantum-purple/20"
                        : "text-white hover:text-quantum-orange hover:bg-quantum-purple/10"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="px-3 py-2">
                  <Button 
                    asChild
                    className="font-['Staatliches'] text-base bg-gradient-to-r from-[#e258d4] to-[#e76745] hover:from-[#e258d4] to-[#e76745] text-white  w-full transition-all duration-300"
                  >
                    <Link to="/quantumaisummit" onClick={() => setIsMenuOpen(false)}>
                      QUANTUM AI SUMMIT
                    </Link>
                  </Button>
                </div>
                <div className="px-3 py-2">
                  <Button 
                    asChild
                    className="bg-quantum-cta hover:bg-quantum-cta/90 text-quantum-cta-foreground font-bold w-full"
                  >
                    <Link to="/postulacion" onClick={() => setIsMenuOpen(false)}>
                      ¡Inscríbete!
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative">{children}</main>

      {/* Footer */}
      <footer className="bg-quantum-black text-white py-12">
  <div className="max-w-screen-xl mx-auto px-6" >
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 ">
      <div>
              <div className="flex items-center space-x-3 mb-4">
                                
<div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                  <Link to="/" className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
  <img src="/logo.png" alt="Logo QHub" className="w-full h-full object-contain" />
</Link>

                </div>
                <span className="font-staatliches text-xl">QuantumHub Peru</span>
              </div>
              <p className="text-gray-400 font-arimo">
                Escuela de Computación Cuántica dedicada a formar la próxima generación de científicos y tecnólogos cuánticos.
              </p>
            </div>
      <div>
              <h3 className="font-staatliches text-lg mb-4">Enlaces</h3>
              <ul className="space-y-2 font-arimo">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link 
                      to={item.href}
                      className="text-gray-400 hover:text-quantum-orange transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
      <div>
  <h3 className="font-staatliches text-lg mb-4">Contacto</h3>
  <ul className="space-y-2 font-arimo">
    <li className="flex items-center gap-2 text-gray-400 hover:text-quantum-orange transition-colors">
      <AtSign className="w-4 h-4" />
      <span>quantumhub.pe</span>
    </li>
    <li className="flex items-center gap-2 text-gray-400 hover:text-quantum-orange transition-colors">
      <Mail className="w-4 h-4" />
      <a href="mailto:contacto@qhubperu.org" className="hover:underline">
        contacto@qhubperu.org
      </a>
    </li>
    <li className="flex items-center gap-2 text-gray-400 hover:text-quantum-orange transition-colors">
      <MapPin className="w-4 h-4" />
      <span>Lima, Perú</span>
    </li>
  </ul>
</div>
    </div>

    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 font-arimo">
      <p>&copy; 2025 QuantumHub Peru. Todos los derechos reservados.</p>
    </div>
  </div>
</footer>

    </div>
    
  );
};

export default Layout;