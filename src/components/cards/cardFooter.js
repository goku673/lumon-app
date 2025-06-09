"use client"; // Indica que este componente se ejecutará en el cliente, útil en aplicacion

const CardFooter = ({ className = "", children, ...props }) => (
  <div className={`flex items-center p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>// Renderiza los elementos hijos dentro del CardFooter.

);

export default CardFooter;
