// Componente ModalContent que define el área de contenido del modal.
// Se usa `p-4` para aplicar un espacio uniforme alrededor del contenido.
export const ModalContent = ({ children, className = "" }) => {
    return <div className={`p-4 ${className}`}>{children}</div>
  }
  