"use client"

import { useState, useEffect } from "react"
import { usePostIncriptionLevelsMutation } from "@/app/redux/services/levelsApi"
import Button from "@/common/button"
import Modal from "./modal/modal"
import FormContainer from "@/common/formContainer"
import FormContent from "@/common/formContent"
import FormGroup from "./formGroup"
import Input from "@/common/input"
import SaveIcon from "@mui/icons-material/Save"

//refactor component
const RegisterLevel = () => {
  const [createLevel] = usePostIncriptionLevelsMutation()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const [modalType, setModalType] = useState("success")
  const [wordCount, setWordCount] = useState(0)
  const [isDescriptionValid, setIsDescriptionValid] = useState(true)

  useEffect(() => {
    const words = description.trim() ? description.trim().split(/\s+/) : []
    setWordCount(words.length)
    setIsDescriptionValid(words.length <= 10)
  }, [description])

  const handleDescriptionChange = (e) => {
    const newText = e.target.value
    const words = newText.trim() ? newText.trim().split(/\s+/) : []

    if (words.length <= 10) {
      setDescription(newText)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name.trim()) {
      setModalType("error")
      setModalMessage("El nombre del nivel es requerido")
      setIsModalOpen(true)
      return
    }

    if (!isDescriptionValid) {
      setModalType("error")
      setModalMessage("La descripción no puede tener más de 10 palabras")
      setIsModalOpen(true)
      return
    }

    try {
      await createLevel({ name, description }).unwrap()
      setModalType("success")
      setModalMessage("Nivel creado exitosamente!")
      setIsModalOpen(true)
      setName("")
      setDescription("")
      setWordCount(0)
    } catch (error) {
      console.error("Error creating level:", error)
      setModalType("error")
      setModalMessage(error.data?.message || "Error al crear el nivel")
      setIsModalOpen(true)
    }
  }

  return (
    <FormContainer className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-8 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">Crear Nuevo Nivel</h2>

      <FormContent onSubmit={handleSubmit} className="space-y-6">
        <FormGroup
          label="Nombre del Nivel"
          error={modalType === "error" && !name.trim() ? modalMessage : ""}
          className="mb-6"
        >
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre del nivel"
            required
            className="w-full px-4 py-3 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </FormGroup>

        <FormGroup
          label={
            <div className="flex justify-between w-full">
              <span>Descripción</span>
              <span className={`text-sm ${wordCount > 10 ? "text-red-500 font-medium" : "text-gray-500"}`}>
                {wordCount}/10 palabras
              </span>
            </div>
          }
          error={!isDescriptionValid ? "Máximo 10 palabras permitidas" : ""}
          className="mb-6"
        >
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            rows={3}
            placeholder="Descripción breve del nivel (máx. 10 palabras)"
          />
        </FormGroup>

        <div className="flex justify-end pt-4 border-t">
          <Button
            type="submit"
            className="bg-[#0f2e5a] hover:bg-white border-[#0f2e5a] border-2 hover:text-[#0f2e5a] text-white px-6 py-3 rounded-md font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
            disabled={!isDescriptionValid || !name.trim()}
          > 
            <SaveIcon className="mr-2" fontSize="small" /> 
            Crear Nivel
          </Button>
        </div>
      </FormContent>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalType === "success" ? "Éxito" : "Error"}
        iconType={modalType}
        primaryButtonText="Aceptar"
        onPrimaryClick={() => setIsModalOpen(false)}
      >
        <p className="text-gray-700">{modalMessage}</p>
      </Modal>
    </FormContainer>
  )
}

export default RegisterLevel
