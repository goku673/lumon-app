"use client"; // Indica que este componente se ejecutará en el cliente, útil en aplicaciones Next.js.

const CardTitle = ({ className = "", children, ...props }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>// Indica que este componente se ejecutará en el cliente, útil en aplicaciones Next.js.

);

export default CardTitle;
