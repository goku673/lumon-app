"use client"

import React from "react"
import Input from "@/common/input"
import Select from "@/common/select"
import Textarea from "@/common/textarea"
import Selector from "./selector"
import CategoryIcon from "@mui/icons-material/Category"
import DescriptionIcon from "@mui/icons-material/Description"
import PaidIcon from "@mui/icons-material/Paid"

/**
 * Componente genérico para renderizar diferentes tipos de componentes de formulario
 * @param {Object} fieldConfig - Configuración del campo
 * @param {Object} formData - Datos del formulario
 * @param {Object} handlers - Manejadores de eventos
 * @param {Object} dataProviders - Proveedores de datos (opcional)
 * @returns {JSX.Element} - Componente renderizado
 */
const RenderComponent = ({ 
  fieldConfig, 
  formData, 
  handlers, 
  dataProviders = {},
  renderField
}) => {
 // renderField devuelve los datos necesarios para renderizar el componente adecuado
  const { component, props, wordCount, maxWords, message, items } = renderField(
    fieldConfig, 
    formData, 
    handlers, 
    dataProviders
  );
  // Renderizado condicional según el tipo de componente solicitad
  switch (component) {
    // Campo de texto (input) con íconos opcionales
    case "Input":
      return (
        <div className="flex items-center">
          {fieldConfig.icon === "CategoryIcon" && <CategoryIcon className="mr-2" fontSize="small" />}
          {fieldConfig.icon === "PaidIcon" && <PaidIcon className="mr-2" fontSize="small" />}
          <Input {...props} />
        </div>
      );
    // Área de texto (textarea) con contador de palabras y etiqueta  
    case "Textarea":
      return (
        <Textarea
          label="Descripción"
          wordCount={formData.wordCount}
          maxWords={maxWords}
          showWordCount={true}
          showIcon={true}
          {...props}
        />
      );
    // Menú desplegable  
    case "Select":
      return <Select {...props} />;
    // Selector personalizado (lista de opciones complejas, por ejemplo)  
    case "Selector":
      return <Selector {...props} />;
    // Estado de carga mientras se obtienen datos  
    case "Loading":
      return <p className="text-gray-500">{message || "Cargando..."}</p>;
    // Estado de error si hubo problemas al cargar datos  
    case "Error":
      return <p className="text-red-500">{message || "Error al cargar datos"}</p>;
    // Si el tipo no está definido, no se renderiza nada  
    default:
      return null;
  }
};

export default RenderComponent;