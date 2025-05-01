"use client"

import { useState, useEffect } from "react"
import { usePostIncriptionAreaMutation } from "@/app/redux/services/areaApi"
import Button from "@/common/button"
import Modal from "./modal/modal"
import FormContainer from "@/common/formContainer"
import FormContent from "@/common/formContent"
import FormGroup from "./formGroup"
import SaveIcon from "@mui/icons-material/Save"
import { areaFields, renderField } from "@/utils/inputFieldsArea"
import RenderComponent from "./RenderComponent"
import * as XLSX from 'xlsx';
import { useExcelProcessor } from "@/app/services/exel/ExcelProcessor"
import BatchProcessingUI from "@/app/services/exel/BatchProcessingUI"

const RegisterArea = () => {
  const [createArea] = usePostIncriptionAreaMutation()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    wordCount: 0
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const [modalType, setModalType] = useState("success")
  const [isDescriptionValid, setIsDescriptionValid] = useState(true)
  const templateHeaders = ["name", "description"];
  const templateExample = ["Matemáticas", "Área de matemáticas y lógica"];

  const excelProcessor = useExcelProcessor({
    processRecord: async (record) => {
      if (!record.name) {
        throw new Error("Datos incompletos en el registro");
      }
      
      const response = await createArea({
        name: record.name,
        description: record.description || ""
      }).unwrap();
      
      return response;
    },
    onProgress: (progress) => {
      //console.log(`Procesando: ${progress.current}/${progress.total}`);
    },
    onComplete: (result) => {
      //console.log(`Procesamiento completado: ${result.success} exitosos, ${result.failed} fallidos`);
    },
    onError: (error) => {
      console.error("Error en el procesamiento:", error);
    }
  });

  useEffect(() => {
    const words = formData.description.trim() ? formData.description.trim().split(/\s+/) : []
    setFormData(prev => ({ ...prev, wordCount: words.length }))
    setIsDescriptionValid(words.length <= 10)
  }, [formData.description])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleDescriptionChange = (e) => {
    const newText = e.target.value
    const words = newText.trim() ? newText.trim().split(/\s+/) : []

    if (words.length <= 10) {
      setFormData(prev => ({ ...prev, description: newText }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      setModalType("error")
      setModalMessage("El nombre del área es requerido")
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
      await createArea({ name: formData.name, description: formData.description }).unwrap()
      setModalType("success")
      setModalMessage("Área creada exitosamente!")
      setIsModalOpen(true)
      setFormData({
        name: "",
        description: "",
        wordCount: 0
      })
    } catch (error) {
      console.error("Error creating area:", error)
      setModalType("error")
      setModalMessage(error.data?.message || "Error al crear el área")
      setIsModalOpen(true)
    }
  }
  const handleProcessRecords = (records) => {
    excelProcessor.processRecords(records);
  };

  const renderComponent = (fieldConfig) => {
    const handlers = {
      handleChange,
      handleDescriptionChange
    };
    const dataProviders = {};
    
    return (
      <RenderComponent
        fieldConfig={fieldConfig}
        formData={formData}
        handlers={handlers}
        dataProviders={dataProviders}
        renderField={renderField}
      />
    );
  };

  return (
    <FormContainer className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-8 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4 flex items-center">
        Crear Nueva Área
      </h2>
      <BatchProcessingUI
        title="Carga Masiva por Excel"
        onProcessRecords={handleProcessRecords}
        onExportResults={() => excelProcessor.exportResults("resultados_areas")}
        templateHeaders={templateHeaders}
        templateExample={templateExample}
        processor={excelProcessor}
        className="mb-8"
      />

      <h3 className="text-lg font-semibold mb-4 text-gray-700">Registro Manual</h3>
      <FormContent onSubmit={handleSubmit} className="space-y-6">
        {areaFields.map((group, index) => (
          <FormGroup 
            key={index} 
            label={group.groupLabel}
            error={
              (modalType === "error" && !formData.name.trim()) || 
              (!isDescriptionValid) ? 
              modalMessage : ""
            }
            className="mb-6"
          >
            <div className={group.layout || ""}>
              {group.fields.map((field, fieldIndex) => (
                <div key={`${field.name}-${fieldIndex}`}>
                  {renderComponent(field)}
                </div>
              ))}
            </div>
          </FormGroup>
        ))}

        <div className="flex justify-end pt-4 border-t">
          <Button
            type="submit"
            className="bg-[#0f2e5a] hover:bg-white border-[#0f2e5a] border-2 hover:text-[#0f2e5a] text-white px-6 py-3 rounded-md font-medium transition-colors duration-200 shadow-sm hover:shadow-md flex items-center"
            disabled={!isDescriptionValid || !formData.name.trim()}
          >
            <SaveIcon className="mr-2" />
            Crear Área
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
        
        {(excelProcessor.successList.length > 0 || excelProcessor.failedList.length > 0) && (
          <div className="mt-4">
            {excelProcessor.successList.length > 0 && (
              <div className="mb-2">
                <p className="font-bold text-green-500">Registros exitosos ({excelProcessor.successList.length}):</p>
                <ul className="max-h-40 overflow-y-auto">
                  {excelProcessor.successList.map((item, index) => (
                    <li key={`success-${index}`} className="text-sm">
                      Área: {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {excelProcessor.failedList.length > 0 && (
              <div>
                <p className="font-bold text-red-500">Registros fallidos ({excelProcessor.failedList.length}):</p>
                <ul className="max-h-40 overflow-y-auto">
                  {excelProcessor.failedList.map((item, index) => (
                    <li key={`failed-${index}`} className="text-sm">
                      Área: {item.name} - Error: {item.error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </Modal>
    </FormContainer>
  )
}

export default RegisterArea
