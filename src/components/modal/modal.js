"use client"
import { ModalContainer } from "./modalContainer"
import { ModalHeader } from "./modalHeader"
import { ModalContent } from "./modalContent"
import { ModalFooter } from "./modalFooter"

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  iconType = "question",
  primaryButtonText = "Si",
  secondaryButtonText = "Cancelar",
  onPrimaryClick,
  onSecondaryClick,
  className = "",
  headerClassName = "",
  contentClassName = "",
  footerClassName = "",
}) => {
  if (!isOpen) return null

  const handlePrimaryClick = () => {
    if (onPrimaryClick) {
      onPrimaryClick()
    }
  }

  const handleSecondaryClick = () => {
    if (onSecondaryClick) {
      onSecondaryClick()
    }
    onClose()
  }
// Contenedor principal del modal, posicionando el contenido en el centro de la pantalla.
// Se usa `fixed inset-0 z-50 flex items-center justify-center` para asegurar que el modal
// se superponga correctamente sobre otros elementos y esté centrado.

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <ModalContainer className={className}>
        <ModalHeader title={title} iconType={iconType} onClose={onClose} className={headerClassName} />
        <ModalContent className={contentClassName}>{children}</ModalContent>
        <ModalFooter
          primaryButtonText={primaryButtonText}
          secondaryButtonText={secondaryButtonText}
          onPrimaryClick={handlePrimaryClick}
          onSecondaryClick={handleSecondaryClick}
          className={footerClassName}
        />   
      </ModalContainer>
    </div>
  )
}

export default Modal