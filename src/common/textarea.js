"use client"

import React from "react"
import DescriptionIcon from "@mui/icons-material/Description"

/**
 * Componente genérico de Textarea con contador de palabras
 * @param {Object} props - Propiedades del componente
 * @param {string} props.label - Etiqueta del textarea (opcional)
 * @param {number} props.wordCount - Número actual de palabras
 * @param {number} props.maxWords - Número máximo de palabras permitidas
 * @param {boolean} props.showWordCount - Indica si se debe mostrar el contador de palabras
 * @param {boolean} props.showIcon - Indica si se debe mostrar el ícono de descripción
 * @param {string} props.className - Clases adicionales para el textarea
 * @param {string} props.labelClassName - Clases adicionales para la etiqueta
 * @param {string} props.containerClassName - Clases adicionales para el contenedor
 * @returns {JSX.Element} - Componente de textarea
 */
const Textarea = ({
  label = "Descripción",
  wordCount,
  maxWords,
  showWordCount = true,
  showIcon = true,
  className = "",
  labelClassName = "",
  containerClassName = "",
  ...props
}) => {
  const isExceedingLimit = wordCount > maxWords;
  
  return (
    <div className={`w-full ${containerClassName}`}>
      {(label || (showWordCount && wordCount !== undefined && maxWords !== undefined)) && (
        <div className="flex justify-between w-full mb-2">
          {label && (
            <div className="flex items-center">
              {showIcon && <DescriptionIcon className="mr-2" fontSize="small" />}
              <span className={labelClassName}>{label}</span>
            </div>
          )}
          {showWordCount && wordCount !== undefined && maxWords !== undefined && (
            <span className={`text-sm ${isExceedingLimit ? "text-red-500 font-medium" : "text-gray-500"}`}>
              {wordCount}/{maxWords} palabras
            </span>
          )}
        </div>
      )}
      <textarea
        className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none ${
          isExceedingLimit ? "border-red-500" : ""
        } ${className}`}
        {...props}
      />
    </div>
  );
};

export default Textarea;