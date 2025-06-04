'use client';

import { useState, useEffect } from "react";
import Footer from "../components/footer";
import ComunicadosCarousel from "@/components/comunicados/ComunicadosCarousel";
import VideoHelp from "@/components/ui/VideoHelp";
import { useGetAnnouncementsQuery } from "@/app/redux/services/anuncementsApi";
import AuthGuard from "@/components/AuthGuard";
import { useGetUserQuery } from "@/app/redux/services/authApi";

const Home = () => {
  const { data: comunicados = [], isLoading, error } = useGetAnnouncementsQuery();
  console.log("Comunicados:", comunicados);
  const { data: user, isLoading: isLoadingUser } = useGetUserQuery(null, {
    skip: !localStorage.getItem('token'),
  });
  
 
  

  return (
    <AuthGuard>
    <div className="min-h-screen">
      <VideoHelp 
        videoId="dQw4w9WgXcQ"
        title={`Bienvenido ${user?.name || "Usuario"} a las Olimpiadas de San Simon`}
        description="Este video te guiará a través de las principales funciones de nuestra plataforma para que puedas aprovecharla al máximo."
      />
      
      <div className="text-center text-white lg:text-left lg:ml-36 text-xl font-bold mb-4 mt-8">
        COMUNICADOS:
      </div>
      
      {isLoading ? (
        <div className="text-center text-white p-8">
          Cargando comunicados...
        </div>
      ) : error ? (
        <div className="text-center text-white p-8">
          Error al cargar comunicados: {error.message || "Error desconocido"}
        </div>
      ) : (
        <ComunicadosCarousel comunicados={comunicados} isLoading={isLoading} />
      )}
      
      <div className="mt-25">
        <Footer />
      </div>
    </div>
    </AuthGuard>
  );
};

export default Home;
