import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Latex } from "@/components/MathRenderer";
import { Calculator, Binary } from "lucide-react";

const QuantumCircuit: React.FC = () => {
  return (
    <section
      className="mt-6 p-6 space-y-4"
    >
      
      <Card className="bg-gradient-to-br from-quantum-purple/20 to-quantum-purple/10 border-quantum-purple/40 shadow-2xl backdrop-blur-sm p-0">
                {/* Contenedor principal con Flexbox para el diseño lateral */}
                <div className="flex">
                  <div className="flex-grow p-8 md:p-12">
                      
                      {/* CardHeader */}
                      <div className="mb-4">
                          <CardTitle className="font-staatliches text-quantum-purple text-3xl">
                              ¡ TU PRIMER CIRCUITO CUÁNTICO !
                          </CardTitle>
                          <CardDescription className="font-arimo text-quantum-purple/80 text-lg">
                              Tu primera aventura construyendo circuitos cuánticos.
                          </CardDescription>
                      </div>

                        {/* CardContent */}
                        <div className="space-y-4">
                            <p className="font-arimo text-lg md:text-xl text-foreground leading-relaxed text-justify">
                                Estás a punto de construir tu primer circuito cuántico. Juega con las compuertas, prueba combinaciones y observa cómo los qubits reaccionan a cada movimiento.
                            </p>
            
                            
                        </div>
                    </div>
                    {/* Columna 1: La imagen de Schrödi */}
                    <div className="flex-shrink-0 max-w-[200px] overflow-hidden">
                      <img
                        src="/mascota/schrodi-profile.png"
                        loading="lazy"
                        alt="Schrödi"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="px-8 pb-9">
                  <iframe
                      title="QuantumHub Circuit"
                      src="/qjs/quantumhub.html"
                      style={{
                        width: "100%",
                        height: "770px",
                        border: "none",
                        display: "block",
                        backgroundColor: "none",
                        overflow: "hidden",
                      }}
                    />
                  </div>
                </Card>
      


    </section>
  );
};

export default QuantumCircuit;
