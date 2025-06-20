"use client";

import Image from "next/image";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import Button from "@/common/button";
import Card from "@/components/cards/card";

const ComunicadoCard = ({ comunicado, className = "" }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const openImageModal = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  
  const titulo = comunicado.title || comunicado.titulo;
  const descripcion = comunicado.description || comunicado.descripcion;
  const imagen1 = comunicado.image1 || comunicado.imagen1;
  const imagen2 = comunicado.image2 || comunicado.imagen2;

  return (
    <>
      <Card className={`h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}>
        <div className="p-4">
          <h2 className="text-xl font-bold text-[#0f2e5a] mb-2">{titulo}</h2>
          <p className="text-gray-700 mb-4">{descripcion}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {imagen1 && (
              <div 
                className="h-48 relative rounded-lg overflow-hidden cursor-pointer"
                onClick={() => openImageModal(imagen1)}
              >
                <Image
                  src={imagen1}
                  alt={titulo || "Comunicado"}
                  fill
                  style={{ objectFit: "cover" }}
                  className="hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-transparent hover:bg-black hover:bg-opacity-20 flex items-center justify-center transition-all duration-300">
                  <span className="text-white opacity-0 hover:opacity-100 font-medium">Ver imagen</span>
                </div>
              </div>
            )}
            
            {imagen2 && (
              <div 
                className="h-48 relative rounded-lg overflow-hidden cursor-pointer"
                onClick={() => openImageModal(imagen2)}
              >
                <Image
                  src={imagen2}
                  alt={titulo || "Portada"}
                  fill
                  style={{ objectFit: "cover" }}
                  className="hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-transparent hover:bg-black hover:bg-opacity-20 flex items-center justify-center transition-all duration-300">
                  <span className="text-white opacity-0 hover:opacity-100 font-medium">Ver imagen</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full h-auto max-h-[90vh]">
            <Button 
              onClick={closeImageModal}
              className="absolute -top-12 right-0 bg-white text-[#0f2e5a] rounded-full p-2 shadow-lg hover:bg-gray-200"
              aria-label="Cerrar imagen"
            >
              <CloseIcon />
            </Button>
            
            <div className="relative w-full h-[80vh]">
              <Image
                src={selectedImage}
                alt="Imagen ampliada"
                fill
                style={{ objectFit: "contain" }}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ComunicadoCard;