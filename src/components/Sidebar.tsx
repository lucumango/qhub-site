import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ sections, activeSection, setActiveSection, backLink }) {
  return (
    <aside className="hidden lg:flex w-72 bg-[#1c0f4a] text-white p-6 sticky top-0 h-screen flex-col justify-between">
      <div>
        <Link
          to={backLink || "/"}
          className="w-full mb-6 block text-center bg-white text-black rounded-lg py-2 font-semibold shadow hover:bg-gray-200 transition"
        >
          Regresar
        </Link>

        <h3 className="text-lg mb-4 font-staatliches">Progreso del módulo</h3>
        <div className="space-y-4">
          {sections.map((s, idx) => (
            <div
              key={s.id}
              className={`p-3 rounded-lg text-sm cursor-pointer transition ${
                activeSection === s.id
                  ? "bg-quantum-purple text-white"
                  : "bg-white/10 text-gray-300"
              }`}
              onClick={() =>
                document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span className="block font-semibold font-arimo">{s.title}</span>
              <span className="text-xs text-gray-300">
                {idx + 1} de {sections.length}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}