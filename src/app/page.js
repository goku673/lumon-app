'use client';

import { useState, useEffect } from "react";
import Footer from "../components/footer";
import ComunicadosCarousel from "@/components/comunicados/ComunicadosCarousel";
import ComunicadosService from "@/services/comunicadosService";
import VideoHelp from "@/components/ui/VideoHelp";

const Home = () => {
  const [comunicados, setComunicados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchComunicados = async () => {
      try {
        setLoading(true);
        const data = await ComunicadosService.getComunicados();
        setComunicados(data);
        setError(null);
      } catch (error) {
        console.error('Error al obtener comunicados:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchComunicados();
  }, []);

  return (
    <div className="min-h-screen">

      <VideoHelp 
        videoId="dQw4w9WgXcQ"
        title="Bienvenido a Olimpiadas San Simon"
        description="Este video te guiará a través de las principales funciones de nuestra plataforma para que puedas aprovecharla al máximo."
      />
      
      <div className="text-center text-white lg:text-left lg:ml-36 text-xl font-bold mb-4 mt-8">
        COMUNICADOS:
      </div>
      
      {loading ? (
        <div className="text-center text-white p-8">
          Cargando comunicados...
        </div>
      ) : error ? (
        <div className="text-center text-white p-8">
          Error al cargar comunicados: {error.message}
        </div>
      ) : (
        <ComunicadosCarousel comunicados={comunicados} />
      )}
      
      <div className="mt-25">
        <Footer />
      </div>
      
    </div>
  );
};

export default Home;
