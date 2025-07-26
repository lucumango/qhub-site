import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "Error 404: esta página aún no existe! dame un momento para arreglarlo jeje",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">¡Oops! Creo que te perdiste</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Volvamos a casa
        </a>
      </div>
    </div>
  );
};

export default NotFound;
