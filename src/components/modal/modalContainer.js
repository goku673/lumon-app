
// Componente ModalContainer que define la estructura principal del modal.
// Se usa `bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden` 
// para proporcionar estilos de fondo, bordes redondeados, sombra y tamaño controlado.

export const ModalContainer = ({ children, className = "" }) => {
    return <div className={`bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden ${className}`}>{children}</div>
  }
  