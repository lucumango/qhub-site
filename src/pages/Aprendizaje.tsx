import { Link } from "react-router-dom";

const modules = [
  { path: "/aprendizaje/modulo1", label: "Módulo 1" },
  { path: "/aprendizaje/modulo2", label: "Módulo 2" },
  { path: "/aprendizaje/modulo3", label: "Módulo 3" },
];

const Aprendizaje = () => {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Aprendizaje</h1>
      <div className="flex flex-col gap-6">
        {modules.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className="px-6 py-4 bg-quantum-purple text-white rounded-lg shadow hover:bg-quantum-orange transition-colors text-center font-semibold"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Aprendizaje;
