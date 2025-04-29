"use client"

import { useState, useEffect } from "react"
import { usePostIncriptionGradesMutation } from "@/app/redux/services/gradesApi"
import Button from "@/common/button"
import Modal from "./modal/modal"
import FormContainer from "@/common/formContainer"
import FormContent from "@/common/formContent"
import FormGroup from "./formGroup"
import Input from "@/common/input"
import DescriptionIcon from "@mui/icons-material/Description"
import PaidIcon from "@mui/icons-material/Paid"
import SaveIcon from "@mui/icons-material/Save"


//refactor component
const RegisterGrade = () => {
  const [createGrade] = usePostIncriptionGradesMutation()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
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

    if (!name.trim() || !price) {
      setModalType("error")
      setModalMessage("Todos los campos requeridos deben ser llenados")
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
      await createGrade({ name, description, price: Number.parseFloat(price) }).unwrap()
      setModalType("success")
      setModalMessage("Grado creado exitosamente!")
      setIsModalOpen(true)
      setName("")
      setDescription("")
      setPrice("")
      setWordCount(0)
    } catch (error) {
      console.error("Error creating grade:", error)
      setModalType("error")
      setModalMessage(error.data?.message || "Error al crear el grado")
      setIsModalOpen(true)
    }
  }

  return (
    <FormContainer className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-8 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4 flex items-center">
        Crear Nuevo Grado
      </h2>

      <FormContent onSubmit={handleSubmit} className="space-y-6">
        <FormGroup
          label={
            <div className="flex items-center">
              <span>Nombre del Grado</span>
            </div>
          }
          error={modalType === "error" && !name.trim() ? modalMessage : ""}
          className="mb-6"
        >
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre del grado"
            required
            className="w-full px-4 py-3 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </FormGroup>

        <FormGroup
          label={
            <div className="flex justify-between w-full">
              <div className="flex items-center">
                <DescriptionIcon className="mr-2" fontSize="small" />
                <span>Descripción</span>
              </div>
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
            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all resize-none"
            rows={3}
            placeholder="Descripción breve del grado (máx. 10 palabras)"
          />
        </FormGroup>

        <FormGroup
          label={
            <div className="flex items-center">
              <PaidIcon className="mr-2" fontSize="small" />
              <span>Precio (Bs)</span>
            </div>
          }
          error={modalType === "error" && !price ? modalMessage : ""}
          className="mb-6"
        >
          <Input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Costo del grado"
            required
            className="w-full px-4 py-3 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </FormGroup>

        <div className="flex justify-end pt-4 border-t">
          <Button
            type="submit"
            className="bg-[#0f2e5a] hover:bg-white border-[#0f2e5a] border-2 hover:text-[#0f2e5a] text-white px-6 py-3 rounded-md font-medium transition-colors duration-200 shadow-sm hover:shadow-md flex items-center"
            disabled={!isDescriptionValid || !name.trim() || !price}
          >
            <SaveIcon className="mr-2" />
            Crear Grado
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

export default RegisterGrade
