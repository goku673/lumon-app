// Colección de componentes modulares para tarjetas y modales.
// Estos componentes están diseñados con Tailwind CSS para flexibilidad y reutilización.
// La estructura modular facilita el mantenimiento y mejora la legibilidad del código.

// Los componentes de tarjeta incluyen:
// - Card: Contenedor principal de la tarjeta con estilos generales.
// - CardHeader: Encabezado de la tarjeta, con disposición en columna.
// - CardTitle: Título estilizado dentro de la tarjeta.
// - CardDescription: Texto de descripción con formato ligero.
// - CardContent: Área de contenido de la tarjeta con espaciado adecuado.
// - CardFooter: Pie de tarjeta con alineación de elementos.

// Los componentes de modal incluyen:
// - ModalContainer: Contenedor principal del modal con bordes redondeados y sombra.
// - ModalHeader: Encabezado del modal con título y función de cierre.
// - ModalContent: Área central del modal con espaciado uniforme.
// - ModalFooter: Pie de modal con botones de acción primaria y secundaria.

"use client"

import Button from "@/common/button"


export const ModalFooter = ({
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
  className = "", 

}) => {
  return (
    <div className={`flex justify-end p-4 gap-3 ${className}`}>
      {secondaryButtonText && (
        <Button
          className="bg-[#0f2e5a] text-white border-none rounded px-4 py-2 font-medium cursor-pointer min-w-[100px]"
          onClick={onSecondaryClick}
        >

          {secondaryButtonText}

        </Button>
      )}
      {primaryButtonText && (
        <Button
          className="bg-white text-blue-900 border border-blue-900 rounded px-4 py-2 font-medium cursor-pointer min-w-[100px]"
          onClick={onPrimaryClick}
        >

          {primaryButtonText}

        </Button>

      )}

    </div>
    
  )
}


// Colección de componentes modulares para tarjetas y modales.
// Estos componentes están diseñados con Tailwind CSS para flexibilidad y reutilización.
// La estructura modular facilita el mantenimiento y mejora la legibilidad del código.

// Los componentes de tarjeta incluyen:
// - Card: Contenedor principal de la tarjeta con estilos generales.
// - CardHeader: Encabezado de la tarjeta, con disposición en columna.
// - CardTitle: Título estilizado dentro de la tarjeta.
// - CardDescription: Texto de descripción con formato ligero.
// - CardContent: Área de contenido de la tarjeta con espaciado adecuado.
// - CardFooter: Pie de tarjeta con alineación de elementos.

// Los componentes de modal incluyen:
// - ModalContainer: Contenedor principal del modal con bordes redondeados y sombra.
// - ModalHeader: Encabezado del modal con título y función de cierre.
// - ModalContent: Área central del modal con espaciado uniforme.
// - ModalFooter: Pie de modal con botones de acción primaria y secundaria.