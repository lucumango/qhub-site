import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Linkedin, Instagram, X } from "lucide-react";
import QuantumParticles from "@/components/QuantumParticles";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  bio: string;
  linkedin?: string;
  instagram?: string;
}

// Mock data - en una implementación real esto vendría de una API
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Freddy",
    position: "CEO & Co-Fundador | Director Académico",
    image: "https://static.wixstatic.com/media/9552ba_f3dbc54381484acc86aca2089f93982c~mv2.jpeg/v1/fill/w_456,h_458,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Headshot%20(Edited).jpeg",
    bio: `Freddy es físico y matemático por Amherst College (EE.UU.) y actualmente trabaja en el Center for Quantum Networks de la Universidad de Maryland, donde investiga fuentes de luz cuántica y plataformas ópticas para comunicaciones cuánticas. En 2024 participó en diversas conferencias internacionales en Austria, Argentina, y Estados Unidos, donde su trabajo fue reconocido con el Best Poster Award por la Universidad de Harvard. En 2025, la escasa representación hispanohablante que presenció en estos espacios lo impulsó a fundar QuantumHub, un proyecto pionero dirigido a formar la primera generación de estudiantes latinos que buscan iniciarse en las ciencia cuánticas.

    Fun fact: En plena pandemia, Freddy dejó su carrera de ingeniería en la UNI (Perú) para fundar ScienceTech, la primera academia gratuita online que llegó a miles de estudiantes sin escuela en varios países de América Latina. Desde entonces, ha hecho del inicio incierto su terreno natural: cruzar fronteras, empezar de nuevo, crear comunidad. También encuentra refugio en los cuentos de Borges y Cortázar, donde el tiempo y la realidad se doblan como la luz.`,
    linkedin: "https://linkedin.com/in/fredyhc2001",
  },

  {
    id: 2,
    name: "Vania",
    position: "Co-Fundadora | Directora de Diseño",
    image: "https://static.wixstatic.com/media/9552ba_68a9b4fc26c6412393cfc35c17e4a4aa~mv2.jpg/v1/fill/w_456,h_458,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/IMG_1957_edited_edited.jpg",
    bio: `Vania Alexandra Pachas Acuña. Fundadora, instructora y diseñadora de programas educativos en programación, electrónica y robótica en Tech Para Mí, organización que promueve la educación STEM impactando a más de 170 estudiantes. Lidera Misión Tech, el primer campamento gratuito de robótica del Perú. Becaria de STEM Para Todas 2024 y del curso de Computación Cuántica de The Coding School & Google AI. Desarrolló el capstone "Optimizing Satellite Placement with QAOA", nominado a Mejor Comunicación Visual en el Graduation Showcase. Finalista global top 30 en el NGFP Young Voices Award 2024 y mentee en el REYES Mentorship Program de UC Berkeley.`,
    linkedin: "https://linkedin.com/in/carlos-mendoza",
  },
  {
    id: 3,
    name: "Adriana",
    position: "Co-Fundadora | Directora de Alianzas",
    image: "https://static.wixstatic.com/media/9552ba_f436e85ab35c468e8fe421c206f00932~mv2.jpg/v1/crop/x_4,y_60,w_798,h_816/fill/w_454,h_464,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/WhatsApp%20Image%202025-07-12%20at%2012_01_05_edited.jpg",
    bio: `Adriana Alvarado es una estudiante peruana apasionada por la computación cuántica y la educación STEM. Representó al Perú en la Olimpiada Iberoamericana de Informática (OII) y la Olimpiada Panamericana Femenina de Matemática (PAGMO) en su etapa escolar. Asimismo, en 2022, cofundó SigMath, organización dedicada a mostrar el lado creativo de las matemáticas que ha llegado a 800+ estudiantes de Perú y Latinoamérica. En 2025, cofundó QuantumHub Perú con la visión de formar desde cero a jóvenes en ciencia cuántica, conectándolos con académicos internacionales. Actualmente, es intern en el proyecto de investigación Framework for Efficient Computing in Distributed Quantum Systems, y ha sido nominada al Top 50 del Global Student Prize por su trayectoria y labor educativa.
    Escribe y graba momentos que no quiere olvidar desde niña. Tiene un canal de YouTube privado donde guarda esos recuerdos como tesoros personales.`,
    linkedin: "https://linkedin.com/in/elena-rodriguez"
  },
  {
    id: 4,
    name: "Gabriela",
    position: "Directora de RRHH",
    image: "https://static.wixstatic.com/media/9552ba_391bb2485b2e405782e9e2ebb9eb9578~mv2.jpg/v1/crop/x_95,y_137,w_1012,h_1127/fill/w_428,h_464,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Foto%20bachiller_edited.jpg",
    bio: `Soy Psicóloga Organizacional, perteneciente al tercio superior de la Universidad Nacional Mayor de San Marcos. Actualmente, me encuentro cursando una especialización en la Escuela de Posgrado Centrum PUCP, además tengo certificados en metodología de la enseñanza y coaching. 
    Dentro de mi experiencia laboral, laboro en el área de Gestión del Talento Humano en empresas del rubro industrial, inmobiliario y educativo a nivel nacional y trasnacional. A lo largo de mi carrera, he sido reconocida por mis líderes por mi alto nivel de compromiso, proactividad y resultados sostenidos, destacando como talento de alto rendimiento dentro de los equipos en los que he participado. 
    Me considero una persona empática, asertiva, responsable y alegre, siempre dispuesta a apoyar, brindar ideas nuevas frente a cualquier situación que se presente. Desde muy pequeña siempre he mostrado interés por el cuidado de animales, es por ello que actualmente mi mascota Mora se ha convertido en una inspiración fundamental para mí.

    Fun fact: Visito al menos una o dos veces al mes a mi fisioterapeuta debido a que constantemente sufro alguna lesión o esguince, especialmente en mi tobillo.`,
  linkedin: "https://linkedin.com/in/miguel-santos",
  },
  {
    id: 12,
    name: "Miguel",
    position: "Director de Pedagogía",
    image: "/miguel.png",
    bio: `En los últimos años ha sido docente en ingeniería de sistemas y analítica de datos con más de veinte años de experiencia en educación y labor humanitaria. Inició su carrera en la Cruz Roja Colombiana, donde formó y capacitó a voluntarios en unidades de respuesta ante emergencias y desastres en escenarios urbanos y rurales, hasta alcanzar el cargo de Director de Salud y coordinar el componente sanitario del primer simulacro nacional de erupción volcánica en Colombia.

    Posteriormente, orientó su trayectoria hacia la enseñanza de las STEM en educación básica, universitaria y de posgrado. Obtuvo los títulos de pregrado como ingeniero de sistemas y especialista en analítica en la CUN, a su vez es  licenciado en educación básica con énfasis en matemáticas de la Universidad Santo Tomás donde cursa la Maestría en Educación STEM para el desarrollo social. Sus proyectos de grado han combinado saberes ancestrales con tecnologías de vanguardia para democratizar el acceso a las ciencias. Ha liderado proyectos académicos en Internet de las Cosas (IoT) enfocados en cambio climático, desarrolló un prototipo de alerta temprana sísmica con acelerómetros MEMS y diseñó modelos de didáctica matemática adaptados a la comunidad Nasa Yuwe. Cuenta además con certificaciones en computación cuántica otorgadas por IBM y QWorld.

    Con vocación por motivar a sus estudiantes a superar sus dificultades, se destaca tanto por su rigor profesional como por su cercanía humana. Es un hombre de fe, le encantan los conejos y es  aficionado a viajar en moto con su amada esposa.`,
    linkedin: "https://linkedin.com/in/roberto-vega",
  },

  {
    id: 10,
    name: "Daniella",
    position: "Directora de Investigación",
    image: "/xd.jpeg",
    bio: `Daniella Alexandra Crysti Vargas Saldaña es una estudiante de Ciencias de la Computación en la Universidad Peruana de Ciencias Aplicadas (UPC). Actualmente combina la ciencia de datos y la ingeniería de software como practicante preprofesional en el Laboratorio de Innovación de El Comercio, el diario más importante de su país. Pronto asumirá un nuevo reto como Data Analyst Intern en el área de Forensics & Data Integrity en EY.
    
    A lo largo de su trayectoria, ha representado a Perú en competencias internacionales de programación competitiva, logrando un lugar en el top 1% en la maratón femenina más grande de la región, organizada por la Sociedad Brasileña de Computación en São Paulo. Además, es fundadora del capítulo IEEE Computer Society UPC y ha sido ponente en iniciativas como IEEE Women in Engineering y ACM-Women, impulsando la participación femenina en tecnología.
    
    Más allá del código, disfruta de la ilustración, el yoga y hacer experimentos en la cocina. Como dato curioso, Daniella nació a los cinco meses de gestación, una historia que refuerza su carácter resiliente.`,
    linkedin: "https://linkedin.com/in/lonelynode",
  },
  {
    id: 9,
    name: "Manuel",
    position: "Director Logístico",
    image: "https://static.wixstatic.com/media/9552ba_30e02b10ca7549b29e1311a1a7491761~mv2.jpeg/v1/fill/w_456,h_458,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9552ba_30e02b10ca7549b29e1311a1a7491761~mv2.jpeg",
    bio: `¡Hola! Me llamo Manuel Francisco Cáceres Maldonado. Soy bachiller en Ingeniería Industrial de la Universidad de Ciencias y Humanidades, y actualmente me desempeño como practicante de procesos en la empresa logística Dinet. Entre mis logros puedo resaltar haber concluido mi carrera universitaria dentro del décimo superior, haber publicado un artículo científico en una base de datos internacional, haber ganado el consurso "Creatón" en mi universidad, y haber sido seleccionado como uno de los representantes de la UCH en el evento de jóvenes líderes CADE Universitario 2024. Las cosas que me llaman la atención son muy variadas y van desde tópicos como la cultura y la historia, hasta los autos y el automovilismo en toda su diversidad. Por último, mis hobbies definitivos son las caminatas de noche y las conversaciones largas y tendidas.`,
    linkedin: "https://linkedin.com/in/roberto-vega",
    instagram: "https://instagram.com/roberto.vega"
  },
  {
    id: 8,
    name: "Osmar",
    position: "Director de Marketing",
    image: "https://static.wixstatic.com/media/9552ba_4b2b8acc8c32438692b859ae20d855e7~mv2.jpg/v1/crop/x_0,y_137,w_1200,h_1205/fill/w_456,h_458,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/WhatsApp%20Image%202025-07-12%20at%2017_33_37_edited.jpg",
    bio: `Estudiante de Ciencias de la Computación en UTEC

    Logros personales, académicos, honores:
    Miembro activo de Modo Serio Academy, una organización educativa acreditada por la SENAJU.
    Participación en concursos de matemáticas y apasionado por su estudio.
                                                                                                                                                                                                                                      Experiencia liderando y colaborando en iniciativas educativas y voluntariados sociales.
                                                                                                                                                                                                                                      Participación destacada en la Semana del Espacio y en eventos tecnológicos
    Fun fact: Me gusta practicar downhill y jugar fútbol en mis tiempos libres. También disfruto resolver problemas matemáticos por diversión y crear proyectos tecnológicos con impacto social.`,
    linkedin: "https://linkedin.com/in/roberto-vega",
  },
  
  {
    id: 6,
    name: "Rocio",
    position: "Asesora Técnica de Productos",
    image: "https://static.wixstatic.com/media/9552ba_d0a5ab277f9c410391fb12a1890b9661~mv2.jpg/v1/fill/w_456,h_458,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/WhatsApp%20Image%202025-07-12%20at%2018_00_edited.jpg",
    bio: `Rocio Lizeth Valentin Carhuancho
    Química de formación por la Universidad Nacional Mayor de San Marcos, descubrió su pasión por la tecnología, en Laboratoria se formó como desarrolladora de software. Actualmente cursa una maestría en Tecnologías Cuánticas en Granada, España, donde investiga circuitos cuánticos y experimenta con supercomputadoras de alto rendimiento.

    Ha ganado dos hackatones de desarrollo web.
    Le gusta nadar y todo sobre la vida marina.`,
    linkedin: "https://linkedin.com/in/roberto-vega",
  },
  {
    id: 7,
    name: "Nicolas",
    position: "Analista de Productos",
    image: "https://static.wixstatic.com/media/9552ba_43b4cea37392421bad3e1d8a7b5f93de~mv2.png/v1/fill/w_456,h_458,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Captura%20de%20pantalla%202025-07-12%20a%20la(s)%2023_57_31.png",
    bio: `Líder de Marketing (AEPO) & Asistente de Selección (CONSORCIO CAROLINA)

      Logros:
      •⁠  ⁠⁠Especialidad en Community Manager.
      •⁠  ⁠⁠Especialista en Excel.
      •⁠  ⁠⁠Ingles Avanzado 4 (B2 First)
      •⁠  ⁠⁠Próximo a estudiar Marketing 

      Fun fact:
      •⁠  ⁠Me puedo quedar pensando en las musarañas por horas.
      •⁠  ⁠⁠Estoy empezando a disfrutar de la lectura de libros.
      •⁠  ⁠⁠Me gustan las películas y sobretodo en el cine.
      •⁠  ⁠⁠Me encanta mi soledad. No obstante, también disfruto pasar tiempo con las personas que aprecio y amo.
      `,
linkedin: "https://linkedin.com/in/roberto-vega",
  },
  {
    id: 5,
    name: "Escarle",
    position: "Asistenta de Diseño",
    image: "https://static.wixstatic.com/media/9552ba_838ffaeec1984963bfa47649ac87bcb4~mv2.png/v1/fill/w_456,h_458,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Captura%20de%20pantalla%202025-07-12%20a%20la(s)%2023_36_51.png",
    bio: `Escarle Sánchez Luna es estudiante de Física en la Universidad Autónoma de Santo Domingo (República Dominicana).
    Desde pequeña, Escarle sintió una profunda curiosidad por entender el universo. Esa inquietud la llevó a participar en competencias científicas y a representar a la República Dominicana en olimpiadas como la Panamericana de Matemáticas, la Olimpíada Regional de Física y la competencia internacional Space Apps Challenge de la NASA. Fue en ese entorno de olimpiadas y desafíos tecnológicos donde descubrió la necesidad de compartir lo que ella misma había aprendido, reconociendo que muchos de sus logros habían sido posibles gracias a oportunidades que otros le brindaron.
    Esa convicción la impulsó a comenzar a formar a otros jóvenes desde muy temprana edad, fundando y liderando iniciativas que han capacitado a +1,000 estudiantes en América Latina. Una de ellas es A. Olimpics, una academia dedicada a entrenar estudiantes para olimpiadas nacionales e internacionales de ciencias y matemáticas, donde algunos de sus alumnos han obtenido medallas en la Olimpiada Centroamericana de Matemáticas. Otro de sus proyectos es LISTEM, una organización enfocada en capacitar a +500 jóvenes en habilidades tecnológicas y de liderazgo aplicadas a la resolución de problemas sociales.
    Escarle continúa su camino en la ciencia con especial interés en áreas como la física cuántica, la relatividad y la investigación fundamental.`,
    linkedin: "https://linkedin.com/in/patricia-lima"
  },

  {
    id: 11,
    name: "Alvaro",
    position: "Asistente de Diseño",
    image: "https://static.wixstatic.com/media/9552ba_8fbd2f4da30140368c59f4fb6cc4d753~mv2.jpeg/v1/crop/x_0,y_79,w_1203,h_1209/fill/w_456,h_458,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/WhatsApp%20Image%202025-07-10%20at%2017_09_29.jpeg",
    bio: `Alvaro Steven De Tomas Sanchez
    •⁠  ⁠Estudiante de Ciencias de la Computación en la UPC
    •⁠  ⁠Quinto superior en secundaria y beneficiario de la beca Laureate Transforma 2025-2
    •⁠  ⁠Fun fact: Amante de la música indie, practico guitarra y canto. Además soy apasionado a las ciencias exactas, especialmente la física.`,
    linkedin: "https://linkedin.com/in/roberto-vega",
  }
];

const Equipo = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <div className="relative min-h-screen bg-background">
      <QuantumParticles />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-quantum-hero">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-staatliches text-white mb-6 animate-fade-in-up">
            Nuestro Equipo
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto font-flatory animate-fade-in-up">
            Conoce a los expertos que hacen posible la educación cuántica de vanguardia en QuantumHub Peru.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card 
                key={member.id}
                className="hover-quantum cursor-pointer bg-gradient-quantum-card border-quantum-purple/20 group overflow-hidden"
                onClick={() => setSelectedMember(member)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-quantum-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                      <h3 className="font-staatliches text-lg mb-1">{member.name}</h3>
                      <p className="font-arimo text-sm text-gray-200">{member.position}</p>
                    </div>
                  </div>
                  
                  <div className="p-6 text-center group-hover:bg-quantum-purple/5 transition-colors">
                    <h3 className="font-staatliches text-xl text-foreground mb-2 group-hover:text-quantum-purple transition-colors">
                      {member.name}
                    </h3>
                    <p className="font-arimo text-muted-foreground group-hover:text-quantum-purple/80 transition-colors">
                      {member.position}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Member Detail Modal */}
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedMember && (
            <>
              <DialogHeader className="space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-20 h-20 rounded-full object-cover filter grayscale"
                  />
                  <div className="flex-1">
                    <DialogTitle className="font-staatliches text-2xl text-foreground">
                      {selectedMember.name}
                    </DialogTitle>
                    <p className="font-arimo text-quantum-purple font-medium">
                      {selectedMember.position}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedMember(null)}
                    className="hover:bg-quantum-purple/10"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                {/* Biography */}
                <div>
                  <h4 className="font-staatliches text-lg text-foreground mb-3">Biografía</h4>
                  <p className="font-arimo text-muted-foreground leading-relaxed whitespace-pre-line">
                    {selectedMember.bio}
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4 pt-4 border-t border-quantum-purple/20">
                  {selectedMember.linkedin && (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-quantum-purple/30 hover:bg-quantum-purple/10 hover:border-quantum-purple/50"
                    >
                      <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                  )}
                  {selectedMember.instagram && (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-quantum-purple/30 hover:bg-quantum-purple/10 hover:border-quantum-purple/50"
                    >
                      <a href={selectedMember.instagram} target="_blank" rel="noopener noreferrer">
                        <Instagram className="w-4 h-4 mr-2" />
                        Instagram
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Equipo;