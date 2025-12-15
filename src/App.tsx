import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
// import ScrollToTop from "./components/ScrollToTop"; // 👈 import

import Home from "./pages/Home";
import Equipo from "./pages/Equipo";
import Curso from "./pages/Curso";
import Noticias from "./pages/Noticias";
import Postulacion from "./pages/Postulacion";
import NotFound from "./pages/NotFound";
import SobreNosotros from "./pages/About";
import Aprendizaje from "./pages/Aprendizaje";
import React, { Suspense, lazy } from "react";
import Modulo4 from "./pages/modulos/Modulo4";
import QuantumAISummit from "./pages/QuantumAISummit";

const queryClient = new QueryClient();

const Modulo1 = lazy(() => import("./pages/modulos/Modulo1"));
const Modulo2 = lazy(() => import("./pages/modulos/Modulo2"));
const Modulo3 = lazy(() => import("./pages/modulos/Modulo3"));

const routes = [
  { path: "/aprendizaje/modulo1", component: Modulo1 },
  { path: "/aprendizaje/modulo2", component: Modulo2 },
  { path: "/aprendizaje/modulo3", component: Modulo3 },
  { path: "/aprendizaje/modulo4", component: Modulo4 },
  { path: "/quantumaisummit", component: QuantumAISummit }
];

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* 👇 Esto asegura scroll al inicio en cada ruta */}
        {/* <ScrollToTop /> */}

        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/equipo" element={<Equipo />} />
            <Route path="/curso" element={<Curso />} />
            <Route path="/nosotros" element={<SobreNosotros />} />
            {/* <Route path="/noticias" element={<Noticias />} /> */}
            <Route path="/postulacion" element={<Postulacion />} />
            <Route path="/aprendizaje" element={<Aprendizaje />} />

            {routes.map(({ path, component: Component }) => (
              <Route
                key={path}
                path={path}
                element={
                  <Suspense fallback={<div>Cargando...</div>}>
                    <Component />
                  </Suspense>
                }
              />
            ))}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
