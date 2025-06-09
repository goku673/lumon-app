
"use client"; // Indica que este componente está diseñado para ejecutarse en el lado
 const Card = ({ className = "", children, ...props }) => (
  <div className={`rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

export default Card; // Exporta el componente para que pueda ser utilizado en otros archivos.
