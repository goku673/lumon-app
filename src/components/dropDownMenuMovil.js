import React from "react";
// Componente DropDownMenuMovil
// Este componente representa un menú desplegable móvil, que acepta contenido como hijos (children),
// un estado de visibilidad del menú (isMenuOpen) y clases CSS personalizadas (className).
// Componente de menú desplegable para móviles
// Props:
// - children: contenido interno que se renderiza dentro del menú
// - isMenuOpen: indica si el menú está abierto (booleano)
// - className: clases CSS adicionales para estilizar el contenedor
const DropDownMenuMovil = ({ children, isMenuOpen, className }) => {
  // Contenedor principal con fondo blanco y clases personalizadas
  return (
    <div className={`bg-white ${className}`}>
      <div className="space-y-1 p-4">
        {children}
      </div>
      <div
        className="border-t border-gray-200 pt-2 pb-4 px-4"
        style={{
          opacity: isMenuOpen ? 1 : 0,
          transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.5s ease',
          transitionDelay: '500ms',
        }}
      >
      </div>
    </div>
  );
};

export default DropDownMenuMovil;