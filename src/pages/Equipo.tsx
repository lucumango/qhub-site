import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Linkedin, Instagram } from "lucide-react";
import QuantumParticles from "@/components/QuantumParticles";

interface TeamMember {
  id: number;
  name: string;
  image: string;
  bio: string;
  departments: string[];
  positions: Record<string, string>; // ✅ posiciones por departamento
  linkedin?: string;
  instagram?: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Freddy Herrera Cueva",
    image:
      "https://static.wixstatic.com/media/9552ba_f3dbc54381484acc86aca2089f93982c~mv2.jpeg",
    bio: `Físico y matemático peruano graduado de Amherst College (EE. UU.), especializándose en la intersección entre la fotónica, la información cuántica y la nanofabricación. Actualmente trabaja en el Center for Quantum Networks (CQN) de la Universidad de Maryland, donde diseña y modela arquitecturas fotónicas integradas para redes cuánticas escalables. Su etapa de formación incluyó pasantías de investigación en UC Santa Barbara y Northwestern University, explorando fuentes de luz cuántica ultrabrillante, óptica no lineal y comunicaciones cuánticas. Su trabajo recibió el Best Poster Award en la conferencia Quantum Noir 2024 de Harvard University.

En 2025 fundó QuantumHub Perú, un ecosistema cuántico nacional que articula programas de formación, desarrollo de productos edtech y proyectos de investigación sobre impacto macroeconómico de la tecnología cuántica, en alianza con instituciones como el Colegio de Ingenieros del Perú. Su objetivo es conectar talento joven con la frontera tecnológica global y acelerar la construcción de capacidades cuánticas en la región.`,
    linkedin: "https://linkedin.com/in/fredyhc2001",
    departments: ["Ejecutivo", "Académico"],
    positions: {
      Ejecutivo: "CEO & Co-Fundador",
      Académico: "Director General",
    },
  },
  {
    id: 2,
    name: "Adriana Alvarado León",
    image:
      "https://static.wixstatic.com/media/9552ba_f436e85ab35c468e8fe421c206f00932~mv2.jpg/v1/crop/x_4,y_60,w_798,h_816/fill/w_454,h_464,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/WhatsApp%20Image%202025-07-12%20at%2012_01_05_edited.jpg",
    bio: `Estudiante peruana apasionada por la computación cuántica y la educación STEM. Durante su etapa escolar representó al Perú en la Olimpiada Iberoamericana de Informática (OII) y en la Olimpiada Panamericana Femenina de Matemática (PAGMO). En 2022 cofundó SigMath, organización dedicada a mostrar el lado creativo de las matemáticas, la cual ha impactado a más de 800 estudiantes en Perú y Latinoamérica. En 2025 cofundó QuantumHub Perú, iniciativa que busca formar desde cero a jóvenes en ciencia cuántica y conectarlos con mentores académicos e industriales internacionales. Actualmente trabaja en QWorld, donde se desempeña como pasante de investigación de Sistemas Cuánticos Distribuidos y ha sido nominada al Top 50 del Global Student Prize en reconocimiento a su trayectoria y labor educativa.`,
    linkedin: "https://www.linkedin.com/in/adriana-alvarado-leon/",
    departments: ["Ejecutivo", "Relaciones Públicas","Investigación"],
    positions: {
      Ejecutivo: "Co-Fundadora",
      "Relaciones Públicas": "Directora",
      Investigación: "Research & Editorial Associate"
    },
  },
  {
    id: 3,
    name: "Vania Alexandra Pachas Acuña",
    image:
      "https://static.wixstatic.com/media/9552ba_68a9b4fc26c6412393cfc35c17e4a4aa~mv2.jpg/v1/fill/w_456,h_458,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/IMG_1957_edited_edited.jpg",
    bio: `Fundadora, instructora y diseñadora de programas educativos en programación, electrónica y robótica en Tech Para Mí, organización que promueve la educación STEM impactando a más de 170 estudiantes. Lidera Misión Tech, el primer campamento gratuito de robótica del Perú. Becaria de STEM Para Todas 2024 y del curso de Computación Cuántica de The Coding School & Google AI. Desarrolló el capstone "Optimizing Satellite Placement with QAOA", nominado a Mejor Comunicación Visual en el Graduation Showcase. Finalista global top 30 en el NGFP Young Voices Award 2024 y mentee en el REYES Mentorship Program de UC Berkeley.`,
    linkedin: "https://www.linkedin.com/in/vania-pachas/",
    departments: ["Ejecutivo", "Innovación"],
    positions: {
      Ejecutivo: "Co-Fundadora",
      Innovación: "Directora"
    },
  },
  {
    id: 5,
    name: "Claudia Zendejas-Morales",
    image:
      "/claudia.jpeg",
    bio: `Posee grados en física e ingeniería en computación, además de dos MicroMasters en Tecnologías Cuánticas por la Universidad de Purdue. Como desarrolladora certificada de Qiskit y Qiskit Advocate, colabora como mentora en proyectos de IBM Quantum. Ha sido instructora y TA en cursos de QWorld, incluyendo colaboraciones con la Universidad de Letonia, y coordinó el programa QClass23/24. Participó en programas prestigiosos, incluyendo el Quantum Computing Mentorship Program de QOSF y el Programa PSI Start en el Perimeter Institute; también fue TA en la asignatura de Computación Cuántica en la Facultad de Ingeniería de la UNAM. Actualmente, es cocoordinadora del departamento de QEducation de QWorld y estudia en el programa Quantum Information Science en la Universidad de Copenhagen. Sus principales intereses de investigación incluyen la Optimización Cuántica y el Quantum Machine Learning.`,
    linkedin: "https://www.linkedin.com/in/clauziuz/?originalSubdomain=mx",
    departments: ["Académico"],
    positions: {
      Académico: "Profesora Internacional Distinguida",
    },
  },
  {
    id: 6,
    name: "Adair Campos Uscanga",
    image:
      "/adair.jpeg",
    bio: `Físico teórico mexicano especializado en mecánica cuántica, con experiencia en investigación desde 2021. Sus intereses principales son la interacción luz-materia, el formalismo de espacio fase de la mecánica cuántica, computación cuántica y física de polaritones. Actualmente tiene una posición de doctorado en la Universidad Autónoma Metropolitana, Campus Iztapalapa, donde está estudiando potenciales aplicaciones de sistemas polaritónicos a tecnologías cuánticas. Fue uno de los responsables del curso de Computación Cuántica en la Facultad de Ingeniería de la Universidad Nacional Autónoma de México (UNAM) y ha participado como instructor en tres Escuelas de Cómputo Cuántico organizadas por el Centro de Computación Avanzada (CeCAv).`,
    linkedin: "https://www.linkedin.com/in/adaircampos/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    departments: ["Académico"],
    positions: {
      Académico: "Profesor Internacional Distinguido",
    },
  },
  {
    id: 10,
    name: "Daniella Vargas Saldaña",
    image: "/dani.png",
    bio: `Su primer encuentro con las computadoras fue cuando tenía 3 años, cuando intentó imprimir el GIF de un pececito numerosas veces. Desde entonces, ha tenido un interés profundo en la tecnología y en cómo las cosas funcionan. Esa curiosidad la llevó a estudiar Ciencias de la Computación.

En la universidad, fundó capítulos estudiantiles orientados a la investigación en computación, representó al Perú en competencias internacionales de programación en Brasil y Colombia, ubicándose en el top 1% de participantes; además compartió sus conocimientos como mentora y ponente.

Actualmente construye un mejor mundo de negocios en EY, una Big 4, en el área de Forensics & Integrity Services. Daniella viene con una experiencia laboral previa en El Comercio, donde fue científica de datos y desarrolladora, dando soporte a las investigaciones periodísticas.

Hoy, su principal interés es la IA aplicada y se está preparando para comenzar una pasantía de investigación en TU Delft, en Países Bajos.

Ella defiende que la tecnología debe ser abierta e inclusiva, y sostiene que áreas como la IA, cuántica y tecnologías verdes no deben estar limitadas a programas de posgrado, sino que deben empezar desde el colegio.`,
departments: ["Investigación", "Académico"],   
positions: { 
      Investigación: "Directora",
      Académico: "Profesora Distinguida",
    },
  },
  {
    id: 12,
    name: "Miguel Martínez",
    image: "/miguel.png",
    bio: `Con más de veinte años de experiencia en educación y labor humanitaria, ha desarrollado una destacada trayectoria como docente en ingeniería de sistemas y analítica de datos. Inició su carrera en la Cruz Roja Colombiana, donde formó y capacitó a voluntarios en unidades de respuesta ante emergencias y desastres en escenarios urbanos y rurales, hasta llegar a desempeñarse como Director de Salud y coordinar el componente sanitario del primer simulacro nacional de erupción volcánica en Colombia.

Posteriormente, orientó su carrera hacia la enseñanza de las STEM en los niveles básico, universitario y de posgrado. Es ingeniero de sistemas y especialista en analítica por la CUN, así como licenciado en educación básica con énfasis en matemáticas por la Universidad Santo Tomás, donde actualmente cursa la Maestría en Educación STEM para el desarrollo social. Sus proyectos de investigación han articulado saberes ancestrales con tecnologías de vanguardia, buscando democratizar el acceso a las ciencias. Entre sus logros académicos destacan el liderazgo de proyectos en Internet de las Cosas (IoT) aplicados al cambio climático, el desarrollo de un prototipo de alerta temprana sísmica con acelerómetros MEMS, y el diseño de modelos de didáctica matemática adaptados a la comunidad Nasa Yuwe. Asimismo, cuenta con certificaciones en computación cuántica otorgadas por IBM y QWorld.

Reconocido por su vocación de motivar a los estudiantes a superar sus dificultades, se caracteriza tanto por su rigor profesional como por su cercanía humana. En el ámbito personal, es un hombre de fe, apasionado por los viajes en moto, amante de los conejos y compañero de vida de su esposa, con quien comparte sus aventuras.`,
    linkedin: "https://www.linkedin.com/in/ui4054/",
    departments: ["Académico"],
    positions: {
      Académico: "Director Pedagógico",
    },
  },
  {
    id: 7,
    name: "Rocio Valentin Carhuancho",
    image:
      "https://static.wixstatic.com/media/9552ba_d0a5ab277f9c410391fb12a1890b9661~mv2.jpg",
    bio: `Química de formación por la Universidad Nacional Mayor de San Marcos, descubrió su pasión por la tecnología y se formó como desarrolladora de software en Laboratoria. Actualmente cursa una maestría en Tecnologías Cuánticas en Granada, España, donde realiza investigaciones sobre circuitos cuánticos y experimenta con supercomputadoras de alto rendimiento. Ha obtenido reconocimientos en el ámbito tecnológico, destacando el triunfo en dos hackatones de desarrollo web.`,
    linkedin:
      "https://www.linkedin.com/in/rocio-lizeth-valentin-carhuancho-59651a195/",
    departments: ["Académico", "Comunidad"],
    positions: {
      "Académico": "Profesora Distinguida",
      Comunidad : "Directora Técnica de Proyectos",
    },
  },
  {
    id: 8,
    name: "Osmar Vilchez",
    image:
      "https://static.wixstatic.com/media/9552ba_4b2b8acc8c32438692b859ae20d855e7~mv2.jpg",
bio:"Estudiante de Ciencias de la Computación en la Universidad de Ingeniería y Tecnología (UTEC). Es miembro activo de Modo Serio Academy, organización educativa acreditada por la SENAJU, donde contribuye activamente al fortalecimiento de la enseñanza. Ha participado en diversos concursos de matemáticas, disciplina por la que siente una profunda pasión. Asimismo, cuenta con experiencia en liderazgo y colaboración en iniciativas educativas y voluntariados sociales, mostrando un firme compromiso con el aprendizaje y el impacto comunitario.",
    linkedin: "https://www.linkedin.com/in/osmar-vilchez-51212a205/",
    departments: ["Comunidad"],
    positions: {
      Comunidad: "Diseñador Senior",
    },
  },
  
  
  {
    id: 11,
    name: "Alvaro Steven De Tomas Sanchez",
    image:
      "https://static.wixstatic.com/media/9552ba_8fbd2f4da30140368c59f4fb6cc4d753~mv2.jpeg",
    bio: `Estudiante de primer ciclo de Ciencias de la Computación en la Universidad Peruana de Ciencias Aplicadas (UPC), beneficiario de la beca Laureate Transforma 2025-2
Actualmente Director de Marketing en el departamento de Comunidad y Divulgación de QuantumHub Perú, organización dedicaba a educar a jóvenes peruanos en tecnologías cuánticas, principalmente la computación cuántica. Encargado de gestionar diversas publicaciones en nuestras cuentas de Instagram y LinkedIn junto al equipo.`,
    linkedin: "https://www.linkedin.com/in/alvaro-steven-de-tomas-sanchez-03a8b32b6/",
    departments: ["Comunidad"],
    positions: {
      Comunidad: "Director de Marketing",
    },
  },
  {
    id: 15,
    name: "Osmar Herrera Cueva",
    image:
      "/chibolo.jpeg",
    bio: `Estudiante de 4.º año de secundaria en el Colegio Trilce de Los Olivos. Articula su interés por la economía y las matemáticas con una curiosidad creciente por la computación cuántica. En el Departamento de Investigación de QuantumHub, es coautor de un estudio regional sobre quantum readiness en América Latina y realiza análisis cuantitativos de los estudiantes de nuestra cohorte (escolares de secundaria y universitarios) aplicando machine learning y métodos estadísticos. Su trabajo examina correlaciones fuertes sobre cómo la formación STEM, la motivación y el contexto familiar, socioeconómico y geográfico, se asocian con la comprensión de conceptos cuánticos y con su rendimiento académico a lo largo del curso, aportando una mirada económica a la interpretación de resultados y al diseño de métricas. Fuera del ámbito académico, disfruta del fútbol y el cine, y se interesa por la historia y geopolítica del Perú.`,
    departments: ["Investigación"],
    positions: {
      Investigación: "Research & Editorial Associate",
    },
  },
  {
    id: 16,
    name: "Manuel Cáceres Maldonado",
    image: "https://static.wixstatic.com/media/9552ba_30e02b10ca7549b29e1311a1a7491761~mv2.jpeg/v1/fill/w_456,h_458,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9552ba_30e02b10ca7549b29e1311a1a7491761~mv2.jpeg",

bio:"Bachiller en Ingeniería Industrial por la Universidad de Ciencias y Humanidades (UCH), actualmente se desempeña como practicante de procesos en la empresa logística Dinet. Dentro de sus principales logros académicos y profesionales destaca haber concluido su carrera universitaria en el décimo superior, la publicación de un artículo científico en una base de datos internacional, así como la obtención del primer lugar en el concurso “Creatón” de su universidad. Asimismo, fue seleccionado como uno de los representantes de la UCH en el CADE Universitario 2024, evento que reúne a jóvenes líderes de todo el país.",
    departments: ["Relaciones Públicas"],
    positions: {
      "Relaciones Públicas": "Director Logístico",
    },
    linkedin:"https://www.linkedin.com/in/manuelc%C3%A1ceresmaldonado/"
  },
  {
    id: 17,
     name: "Gabriela Granados",
    image: "https://static.wixstatic.com/media/9552ba_391bb2485b2e405782e9e2ebb9eb9578~mv2.jpg/v1/crop/x_95,y_137,w_1012,h_1127/fill/w_428,h_464,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Foto%20bachiller_edited.jpg",
    bio: `Psicóloga Organizacional por la Universidad Nacional Mayor de San Marcos. Actualmente lidera el área de Recursos Humanos dentro del equipo de Relaciones Públicas de QuantumHub, donde trabaja en potenciar el talento de los miembros de la organización en alianza con destacados profesionales e instituciones. Cuenta con una especialización en Gestión de Recursos Humanos en Centrum PUCP y con formación en Coaching en la Universidad ESAN, lo que respalda su desarrollo en liderazgo, gestión de equipos y acompañamiento profesional.`,
    linkedin: "https://www.linkedin.com/in/gabriela-fernanda-granados-santos/",
     departments: ["Relaciones Públicas"],
    positions: {
      "Relaciones Públicas": "Directora de RRHH",
    },
  },
  {
    id: 18,
     name: "Sebastián Villanueva",
image:"/sebas.jpeg",
bio:"Estudiante de Economía en la Universidad del Pacífico, con un enfoque en economía computacional. Es miembro de CodeUP, una organización universitaria que imparte asesorías de informática para alumnos de la facultad de Ingeniería. En QuantumHub, se desempeña como coordinador de eventos y está a cargo de la planificación del Quantum AI Summit, un evento diseñado para acercar la computación cuántica y la inteligencia artificial a estudiantes, profesionales e investigadores de diversas generaciones, con el objetivo de preparar a Latinoamérica para los desafíos del futuro tecnológico.", 
   linkedin: "linkedin.com/in/sebastian-villanueva-flores-43369a2a0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
     departments: ["Relaciones Públicas"],
    positions: {
      "Relaciones Públicas": "Coordinador de Eventos",
    },
  },
  {
    id: 19,
     name: "Ariana López",
image:"/ariana.jpeg",
bio:"Estudiante de cuarto año de Ciencias de la Computación en la Universidad Nacional de Ingeniería (UNI). Se desempeña como developer senior en el área de Innovación de QuantumHub y cuenta con certificaciones en QWorld Bronze y Nickel, que avalan su formación en computación cuántica.",
   linkedin: "https://www.linkedin.com/in/ariana-camila-lopez-julcarima-babb8a288/?originalSubdomain=pe",
     departments: ["Innovación"],
    positions: {
      Innovación : "Full-Stack Developer",
    },
  },
  {
    id: 20,
     name: "Dayana Gómez",
image:"/dayana.jpeg",
bio:"Estudiante de Ingeniería de Ciencias de la Computación. Actualmente, Dayana se desempeña como Desarrolladora Full-Stack en Quantum Hub Peru. En este rol, implementa una plataforma web interactiva enfocada en la democratización de la computación cuántica para el público general. Su trabajo abarca desde la conceptualización de módulos educativos interactivos y accesibles hasta la construcción de la infraestructura, buscando reducir la brecha de conocimiento e inspirar interés en las ciencias cuánticas. Su perfil técnico se complementa con diversas experiencias y formación, destacando su interés por la GenAI y la Computación Cuántica, conocimiento que aplica directamente en su rol. De hecho, ha completado el taller QBronze: Quantum Computing & Programming de QWorld, obteniendo experiencia práctica en conceptos fundamentales cuánticos. Adicionalmente, cuenta con experiencia sólida como Desarrolladora Backend, donde impulsó el desarrollo de servicios y APIs con Java y Spring Boot.",
linkedin: "https://www.linkedin.com/in/dayana-gomez-rd/",
     departments: ["Innovación"],
    positions: {
      Innovación : "Full-Stack Developer",
    },
  },
  {
    id: 21,
     name: "Camila Giulianna Gutiérrez Andrade",
image:"/camila.jpeg",
bio:"Estudiante de Derecho en la Universidad Jesuita Antonio Ruiz de Montoya, con experiencia en contrataciones públicas y en análisis de resoluciones en INDECOPI. Actualmente es directora de operaciones en Quantum Hub, la primera ONG en el Perú dedicada a la divulgación de la computación cuántica. Se desempeña como coordinadora senior en Students for Liberty, voluntaria activa en Make-A-Wish Perú y cofundadora de Helpy, una iniciativa social y animalista enfocada en la educación y la defensa de los más vulnerables.",
linkedin: "https://www.linkedin.com/in/camilagutierrezandrade/",
     departments: ["Comunidad"],
    positions: {
      Comunidad : "Directora de Operaciones",
    },
  },
  {
    id: 22,
     name: "Steffi Yurivilca",
image:"/steffi.jpeg",
bio:"Estudiante de Ingeniería de Sistemas. En QuantumHub se desempeña como columnista de Reciclados I en LinkedIn, donde contribuye con la creación y difusión de contenidos especializados. Su experiencia en ventas le ha permitido fortalecer habilidades en comunicación e investigación, que complementan su formación académica y potencian su rol en el proyecto.",
linkedin: "https://www.linkedin.com/in/steffi-yurivilca",
     departments: ["Comunidad"],
    positions: {
      Comunidad : "Columnista y Editora",
    },
  },
  {
    id: 23,
     name: "Gustavo Moreano",
image:"/gustavo.jpeg",
bio:"Estudiante del último ciclo de Física en la Universidad Nacional de Ingeniería (UNI). En QuantumHub participa en la ideación y revisión de publicaciones, asegurando la precisión científica y el cuidado del estilo editorial.",
linkedin: "https://www.linkedin.com/in/gustavo-moreano-303b54233/",
     departments: ["Comunidad"],
    positions: {
      Comunidad : "Director Técnico de Productos",
    },
  },
  {
    id: 24,
    name: "Escarle Sánchez",
    image: "https://static.wixstatic.com/media/9552ba_838ffaeec1984963bfa47649ac87bcb4~mv2.png/v1/fill/w_456,h_458,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Captura%20de%20pantalla%202025-07-12%20a%20la(s)%2023_36_51.png",
    bio: `Escarle Sánchez Luna es estudiante de Física en la Universidad Autónoma de Santo Domingo (República Dominicana).
    Desde pequeña, Escarle sintió una profunda curiosidad por entender el universo. Esa inquietud la llevó a participar en competencias científicas y a representar a la República Dominicana en olimpiadas como la Panamericana de Matemáticas, la Olimpíada Regional de Física y la competencia internacional Space Apps Challenge de la NASA. Fue en ese entorno de olimpiadas y desafíos tecnológicos donde descubrió la necesidad de compartir lo que ella misma había aprendido, reconociendo que muchos de sus logros habían sido posibles gracias a oportunidades que otros le brindaron.
    Esa convicción la impulsó a comenzar a formar a otros jóvenes desde muy temprana edad, fundando y liderando iniciativas que han capacitado a +1,000 estudiantes en América Latina. Una de ellas es A. Olimpics, una academia dedicada a entrenar estudiantes para olimpiadas nacionales e internacionales de ciencias y matemáticas, donde algunos de sus alumnos han obtenido medallas en la Olimpiada Centroamericana de Matemáticas. Otro de sus proyectos es LISTEM, una organización enfocada en capacitar a +500 jóvenes en habilidades tecnológicas y de liderazgo aplicadas a la resolución de problemas sociales.
    Escarle continúa su camino en la ciencia con especial interés en áreas como la física cuántica, la relatividad y la investigación fundamental.`,
    linkedin: "https://www.linkedin.com/in/escarle-luna-515454247/",
    departments: ["Comunidad"],
    positions: {
      Comunidad : "Diseñadora Senior",
    },
  },
  {
    id: 25,
    name: "Melody Jara Fermín",
image:"/melody.jpeg",
   bio:"Estudiante de primer ciclo de Ingeniería de Software en la Universidad Tecnológica del Perú. Se interesa profundamente por la tecnología, el liderazgo y la divulgación científica. Forma parte del equipo de QuantumHub como diseñadora junior, donde elabora publicaciones técnicas y divulgativas sobre computación cuántica. Participó en Misión Tech, el primer campamento de robótica gratuito del Perú, donde obtuvo el tercer puesto en el Bootcamp de Innovación, destacando por su creatividad y trabajo en equipo. Es integrante de Interact Huánuco, un club juvenil de Rotary International orientado al liderazgo y al servicio comunitario. Además, pertenece a Career UTP, un programa creado por LEAD UTP que impulsa el desarrollo profesional y tecnológico de los estudiantes. Ha liderado e impartido talleres virtuales y presenciales. Entre ellos destaca “Luz que Piensa”, en el que enseñó a construir una luz automática durante cuatro sesiones, y su participación como instructora en Tech para mí, contribuyendo activamente a la difusión tecnológica. Asimismo, fue docente del programa Astronautas de Código, donde enseñó programación a un grupo de escolares de manera presencial durante todo el mes de septiembre, preparándolos para participar en el concurso NASA Space Apps Challenge.",
   linkedin: "https://www.linkedin.com/in/melody-jara-fermin-030a02357/?originalSubdomain=pe",
    departments: ["Comunidad"],
    positions: {
      Comunidad : "Diseñadora Junior",
    },
  },
  {
    id: 26,
    name: "Mariana Siesniegas",
image:"/mariana.jpeg",
bio:"Estudiante de Ciencias de la Computación en la Universidad Nacional de Ingeniería (UNI), donde pertenece al tercio superior. Con interés en proyectos de programación y microelectrónica, aplicados a sistemas IoT y embebidos. Actualmente es Diseñadora Junior en QuantumHub, aprendiz en APU SPACE, seleccionada en la red de liderazgo latinoamericano LALA y alumni del Harvard Aspire Leaders Program, experiencias que fortalecieron su visión de impacto social y académico. Su interés en la computación cuántica se centra en su aplicación en el área aeroespacial, campo en el que busca contribuir a través de investigación y proyectos interdisciplinarios. Además, es voluntaria tutora, promoviendo el aprendizaje de otros estudiantes y participando activamente en iniciativas de divulgación científica y tecnológica.",
   linkedin: "https://www.linkedin.com/in/marianakrish?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    departments: ["Comunidad"],
    positions: {
      Comunidad : "Diseñadora Junior",
    },
  },
  {
    id: 27,
    name: "Dessiree Montenegro",
image:"/dessiree.jpeg",
bio:"Estudiante del Colegio Mayor Secundario Presidente del Perú, donde cursa el segundo año del Bachillerato Internacional. Aspira a seguir una doble especialización en Computer Science y Physics, motivada por su interés en unir la investigación científica con el desarrollo de nuevas tecnologías. Actualmente forma parte de QuantumHub Perú como Quantum Intern, habiendo obtenido el puntaje más alto en el examen de admisión al primer módulo del curso brindado por la organización. Allí continúa su formación en fundamentos y aplicaciones avanzadas de la computación cuántica, como parte de un grupo selecto de estudiantes que recibe mentoría especializada. Su interés por la investigación se refleja en su participación en otras iniciativas de investigación, como lo fue en el comité científico de INTINAUTA Space Foundation, donde fue logró ser autora de un paper expuesto en el Congreso Argentino de Tecnología Espacial (CATE) 2025 y coautora de un trabajo presentado en la Global Space Exploration Conference (GLEX) 2025. Además, ha asumido posiciones de liderazgo juvenil como cofundadora y gestora de Upcoming Generation, un equipo interdisciplinario de jóvenes peruanos que desarrolla proyectos tecnológicos con impacto social y educativo.",
   linkedin: "https://pe.linkedin.com/in/dessiree-anghely-montenegro-arrasco-4089352b6",
    departments: ["Quantum Interns"],
    positions: {
      "Quantum Interns" : "Pasante Junior",
    },
  },
  {
    id: 28,
    name: "Gabriel Manayay",
image:"/gabriel.jpeg",
bio:'Estudiante de segundo año de bachillerato internacional en el COAR Lima. Apasionado por la física y matemáticas en conjunto de las áreas relacionadas. De la misma manera, tiene un interés genuino por el cambio social mediante el liderazgo efectivo demostrado en su participación en diferentes organizaciones y el parlamento escolar 2025. Así mismo, cuenta con diversas participaciones en competencias STEM, como el IYMC, IPhR, SPF, entre otros. En Quantum Hub es un estudiante del módulo 2, "Fundamentos de computación cuántica", habiendo terminado satisfactoriamente el módulo 1, "Matemáticas y computación científica". Además desempeña el rol de Q-Intern, con grandes ideas para el desarrollo de la computación cuántica en Perú.',
   linkedin:"https://www.linkedin.com/in/gabriel-isaac-manayay-cadillo-418535389/",
    departments: ["Quantum Interns"],
    positions: {
      "Quantum Interns" : "Pasante Junior",
    },
  },
  {
    id: 29,
    name: "Jharold Álvarez",
image:"/jharold.jpeg",
bio:` Estudiante de secundaria, Q-Intern en Quantum Hub y aspirante a estudiar PhD en Astrofísica, con especialidad en análisis de datos, e Ingeniería Aeroespacial. 
En 2023, la insurgente fascinación e interés de estudiantes en las ciencias espaciales lo incentivó a cofundar el Departamento de Astronomía y Ciencias Espaciales del COAR Lima, del cuál es el líder. Representó al Perú en competiciones internacionales, como el Open World Astronomy Olympiad (OWAO) y Copernicus Olympiad: Physics and Astronomy. Es alguien apasionado, además, de la investigación y educación; en 2024 fue co-autor de dos conferences paper presentados en Argentina e India. 
Fuera de las ecuaciones, disfruta de la música instrumental y practicar escultura.`,
    departments: ["Quantum Interns"],
    positions: {
      "Quantum Interns" : "Pasante Junior",
    },
    linkedin: "http://www.linkedin.com/in/jharold-axel-alvarez-quichca-808534262"
  },
  {
    id: 30,
    name: "Diego Gamarra",
image:"/diego.jpeg",
bio:`Estudiante del bachillerato internacional en el Colegio Mayor Secundario Presidente del Perú - COAR Lima. Es una apasionado por las áreas STEM en especial por las ciencias y matemáticas, no obstante también tiene interés en ser un gran líder, por lo que pertenecío al parlamento escolar del congreso de la república en enero del 2025. Ha sido partícipe de ediciones de la ONEM llegando a ocupar los primeros puestos en etapas significativas, y obtuvo el primer puesto general en la 4ta edición de la Usil Math Challenge. Actualmente es delegado del departamento de física del club de ciencias de su colegio y cuenta con aptitudes en el manejo de herramienta de Autodesk para diseño, ingeniería y construcción. En Quantum Hub es una estudiante del curso "introducción a la computación cuántica", logró culminar satisfactoriamente el primer módulo y actualmente se encuentra en el módulo 2, así mismo, desempeña el rol de Q-Intern proyectándose a liderar futuros proyectos con la organización.`,
   linkedin: "https://www.linkedin.com/in/diego-fernando-gamarra-guerra-702ab8361/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    departments: ["Quantum Interns"],
    positions: {
      "Quantum Interns" : "Pasante Junior",
    },
  },
];

const departments = [
  "Todos",
  "Ejecutivo",
  "Académico",
  "Investigación",
  "Relaciones Públicas",
  "Innovación",
  "Comunidad",
  "Quantum Interns",
];

const Equipo = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("Todos");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // ✅ Filtro según departamento
  const filteredMembers =
    selectedDepartment === "Todos"
      ? teamMembers
      : teamMembers.filter((m) => m.departments.includes(selectedDepartment));

  return (
    <div className="relative min-h-screen bg-background">
      <QuantumParticles />

      {/* Hero */}
      <section className="relative py-20 bg-gradient-quantum-hero">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-staatliches text-white mb-6 animate-fade-in-up">
            Nuestro Equipo
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto font-flatory animate-fade-in-up">
            Conoce a los expertos que hacen posible la educación cuántica de
            vanguardia en QuantumHub Perú.
          </p>
        </div>
      </section>

      {/* Selector de departamento */}
      <section className="py-8 flex justify-center flex-wrap gap-3">
        {departments.map((dep) => (
          <Button
            key={dep}
            variant={selectedDepartment === dep ? "default" : "outline"}
            onClick={() => setSelectedDepartment(dep)}
            className={`rounded-full px-5 font-arimo transition-all duration-200 ${
              selectedDepartment === dep
                ? "bg-quantum-purple text-white shadow-lg"
                : "border-quantum-purple/40 text-foreground hover:bg-quantum-purple/10"
            }`}
          >
            {dep}
          </Button>
        ))}
      </section>

      {/* Grid */}
      <section className="pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredMembers.map((member, index) => {
              const positionsToShow =
                selectedDepartment === "Todos"
                  ? Object.entries(member.positions)
                  : [[selectedDepartment, member.positions[selectedDepartment]]];

              return (
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
                        <h3 className="font-staatliches text-lg mb-1">
                          {member.name}
                        </h3>
                        {positionsToShow.map(([dep, pos]) => (
                          <p key={dep} className="font-arimo text-sm text-gray-200">
                            {pos} ({dep})
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="p-6 text-center group-hover:bg-quantum-purple/5 transition-colors">
                      <h3 className="font-staatliches text-xl text-foreground mb-2 group-hover:text-quantum-purple transition-colors">
                        {member.name}
                      </h3>

                      {positionsToShow.map(([dep, pos]) => (
                        <p
                          key={dep}
                          className="font-arimo text-muted-foreground group-hover:text-quantum-purple/80 transition-colors"
                        >
                          {pos} • <span className="text-xs text-quantum-purple">{dep}</span>
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          {filteredMembers.length === 0 && (
            <p className="text-center text-muted-foreground mt-10 font-arimo">
              No hay miembros en este departamento todavía.
            </p>
          )}
        </div>
      </section>

      {/* Modal */}
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
                    {selectedMember.departments.map((dep) => (
                      <p
                        key={dep}
                        className="font-arimo text-quantum-purple font-medium"
                      >
                        {selectedMember.positions[dep]} ({dep})
                      </p>
                    ))}
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                <div>
                  <h4 className="font-staatliches text-lg text-foreground mb-3">
                    Biografía
                  </h4>
                  <p className="font-arimo text-muted-foreground leading-relaxed whitespace-pre-line">
                    {selectedMember.bio}
                  </p>
                </div>

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
