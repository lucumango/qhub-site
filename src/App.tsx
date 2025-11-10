import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Equipo from "./pages/Equipo";
import Curso from "./pages/Curso";
import Noticias from "./pages/Noticias";
import Postulacion from "./pages/Postulacion";
import NotFound from "./pages/NotFound";
import SobreNosotros from "./pages/About";
import Aprendizaje from "./pages/Aprendizaje";
import React, { Suspense, lazy } from "react";
const queryClient = new QueryClient();

const Modulo1 = lazy(() => import("./pages/modulos/Modulo1"));
const Modulo2 = lazy(() => import("./pages/modulos/Modulo2"));
const Modulo3 = lazy(() => import("./pages/modulos/Modulo3"));
const Modulo4 = lazy(() => import("./pages/modulos/Modulo4"));


const routes = [
  { path: "/aprendizaje/modulo1", component: Modulo1 },
  { path: "/aprendizaje/modulo2", component: Modulo2 },
  { path: "/aprendizaje/modulo3", component: Modulo3 },
  { path: "/aprendizaje/modulo4", component: Modulo4 },
];

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
