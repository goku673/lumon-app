"use client";

const CardDescription = ({ className = "", children, ...props }) => (
  <p className={`text-sm text-gray-500 ${className}`} {...props}>
    {children}
  </p>// Renderiza el contenido dentro del CardDescription.
);

export default CardDescription;
