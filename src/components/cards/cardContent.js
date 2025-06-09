"use client";  // Indica que este componente se ejecutará en el cliente, útil en aplicaciones Next.js.

const CardContent = ({ className = "", children, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children} 
  </div> // Renderiza los elementos hijos dentro del CardContent
);

export default CardContent;
