"use client";// Indica que este componente se ejecutará en el cliente, útil en aplicaciones Next.js.


const CardHeader = ({ className = "", children, ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>// Renderiza los elementos hijos dentro del CardHeader.

);

export default CardHeader;
