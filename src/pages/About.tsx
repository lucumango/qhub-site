// src/pages/SobreNosotros.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import QuantumParticles from "@/components/QuantumParticles";

const SobreNosotros = () => {
  return (
    <div className="relative min-h-screen bg-background">
      <QuantumParticles />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-quantum-hero">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-staatliches text-white mb-6 animate-fade-in-up">
            Sobre Nosotros
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto font-flatory animate-fade-in-up">
            Impulsamos la educación cuántica inclusiva en Perú con una propuesta pedagógica innovadora, accesible y rigurosa.
          </p>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-20 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-gradient-quantum-card border-quantum-orange/30 hover-quantum animate-fade-in-up">
            <CardHeader>
              <CardTitle className="font-staatliches text-3xl text-quantum-orange">Misión</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-arimo text-muted-foreground text-lg">
                Formar a la primera generación de estudiantes peruanos en ciencia y tecnología cuánticas mediante una educación accesible, rigurosa y contextualizada en computación cuántica.

              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-quantum-card border-quantum-purple/30 hover-quantum animate-fade-in-up">
            <CardHeader>
              <CardTitle className="font-staatliches text-3xl text-quantum-purple">Visión</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-arimo text-muted-foreground text-lg">
                Convertir al Perú en un país pionero en educación cuántica temprana, integrando esta disciplina a la currícula escolar y universitaria, y sentando las bases de un ecosistema regional que impulse una hoja de ruta latinoamericana en tecnologías cuánticas.

              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tabla de valores o datos institucionales */}
      <section className="py-20 bg-gradient-quantum relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-staatliches text-white text-center mb-12">Nuestros Principios</h2>
          <div className="overflow-x-auto">
            <Table className="text-white border border-white/10">
              <TableHeader>
          <TableRow>
            <TableHead className="text-white">Enfoque</TableHead>
            <TableHead className="text-white">QuantumHub Perú</TableHead>
            <TableHead className="text-white">Otros programas actuales en América Latina</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-bold">Público objetivo</TableCell>
            <TableCell>Secundaria y pregrado temprano.</TableCell>
            <TableCell>Pregrado avanzado y posgrado.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-bold">Enfoque pedagógico</TableCell>
            <TableCell>Modular, accesible y progresivo, con acompañamiento educativo.</TableCell>
            <TableCell>Altamente técnico.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-bold">Experiencia educativa</TableCell>
            <TableCell>Curso estructurado de 4 meses con evaluación de ingreso y niveles personalizados.</TableCell>
            <TableCell>Coloquios o bootcamps independientes.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-bold">Comunidad y seguimiento</TableCell>
            <TableCell>Comunidad activa online, asesorías, mentores y seguimiento académico a lo largo del curso.</TableCell>
            <TableCell>Generalmente sin continuidad estructural.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-bold">Integración curricular</TableCell>
            <TableCell>En diálogo con facultades universitarias y colegios para generar articulación real.</TableCell>
            <TableCell>Enfocado en actividades extracurriculares.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-bold">Investigación e impacto</TableCell>
            <TableCell>Estudio y análisis de datos socioeconómicos, geográficos y académicos para detectar brechas y optimizar el acceso equitativo a la educación cuántica.</TableCell>
            <TableCell>Sin componente investigativo formal ni estudio del impacto educativo.</TableCell>
          </TableRow>
        </TableBody>
      </Table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SobreNosotros;
