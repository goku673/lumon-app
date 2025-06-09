"use client";

import { useState } from "react"; // Hook para manejar el estado local

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";// Icono para el botón

import Button from "@/common/button";// Botón personalizado

import Input from "@/common/input";// Input personalizado

import Select from "@/common/select";// Select personalizado

import FormGroup from "@/components/formGroup";// Agrupador de campos del formulario

import FileUploader from "@/components/fileUploader";// Componente para subir archivos

import FormContainer from "@/common/formContainer"; // Contenedor del formulario

import FormContent from "@/common/formContent";// Contenido del formulario

import Title from "@/common/title";// Título del formulario

import Text from "@/common/text"; // Texto auxiliar

import { useGetGuardiansQuery } from "@/app/redux/services/guardiansApi";
import { completeGuardianFields, renderField } from "@/utils/inputFieldsGuardians";
import Selector from "./selector";
import Modal from "./modal/modal";


// Componente principal para registrar un tutor
const GuardianRegister = ({ onSubmit, initialData }) => {
    // Obtener tutores existentes desde el store
  const { data: guardians = [] } = useGetGuardiansQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);


  
  // Estado del formulario con datos iniciales
  const [formData, setFormData] = useState({
    apellidoPaterno: "",
    apellidoMaterno: "",
    nombres: "",
    email: "",
    celular: "",
    ci: "",
    comprobantePago: null,
    tipo: "",
    selectedGuardians: [],
    ...initialData,
  });

  // Manejo del cambio en los inputs

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    
    // Si es un archivo, se guarda como File
    if (name === "comprobantePago" && files && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {

      // Si no, simplemente se guarda el valor
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };


  // Selección de tutor existente
  const handleGuardianSelect = (guardian) => {
    setFormData((prev) => ({
      ...prev,
      selectedGuardians: [...prev.selectedGuardians, guardian],
    }));
  };


  const handleGuardianRemove = (guardian) => {
    setFormData((prev) => ({
      ...prev,
      selectedGuardians: prev.selectedGuardians.filter(
        (g) => g.id !== guardian.id
      ),
    }));
  };



  // Validación del formulario
  const isFormValid = () => {
    const {
      apellidoPaterno,
      apellidoMaterno,
      nombres,
      email,
      celular,
      ci,
      comprobantePago,
      tipo,
      selectedGuardians,
    } = formData;
    

       // Si hay tutores seleccionados, es válido
    if (selectedGuardians.length > 0) {
      return true;
    }

    
    // Validación manual si no se seleccionaron tutores 

    const manualFilled =
      apellidoPaterno &&
      apellidoMaterno &&
      nombres &&
      email &&
      celular &&
      ci &&
      comprobantePago &&
      tipo;
      

    return manualFilled;
  };


  const handleSubmit = e => {
    e.preventDefault();
    if (!isFormValid()) {
      setIsModalOpen(true);
      return;
    }
    onSubmit(formData);
  };


  const renderComponent = (fieldConfig) => {
    const { component, props } = renderField(
      fieldConfig, 
      formData, 
      handleChange, 
      { 
        handleGuardianSelect, 
        handleGuardianRemove 
      }
    );
    


    switch (component) {
      case "Selector":
        return <Selector {...props} items={guardians} />;
      case "Select":
        return <Select {...props} />;
      case "FileUploader":
        return (
          <>
            <FileUploader {...props} />
            {formData[fieldConfig.name] && (
              <p className="mt-2 text-sm text-green-600">
                Archivo seleccionado: {formData[fieldConfig.name].name}
              </p>
            )}
          </>
        );
      case "Input":
        return <Input {...props} />;
      default:
        return null;
    }
  };



  return (
    <> 
    <FormContainer>
      <Title
        title="DATOS DE PROFESOR/TUTOR (OPCIONAL)"
        className="text-xl md:text-2xl font-medium mb-6"
      />
      

      {formData.selectedGuardians.length > 0 ? (
        <div className="mb-4">
          <Text
            text="Has seleccionado tutores existentes. Puedes continuar o registrar un nuevo tutor."
            className="text-green-600 font-medium"
          />
        </div>
      ) : (
        <Text
          text="Si no encuentras el tutor puedes registrarlo"
          className="text-lg font-medium mb-2"
        />
      )}
      


      <FormContent onSubmit={handleSubmit}>
        {completeGuardianFields.map((group, index) => (
          <FormGroup key={index} label={group.groupLabel}>
            <div className={group.layout || ""}>
              {group.fields.map((field, fieldIndex) => (
                <div key={`${field.name || field.type}-${fieldIndex}`}>
                  {renderComponent(field)}
                </div>
              ))}
            </div>
          </FormGroup>
        ))}
        

        <Button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-md flex items-center justify-center"
        >
          <ArrowForwardIcon className="mr-2" />
          Continuar
        </Button>
      </FormContent>
      </FormContainer>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Datos Incompletos"
        primaryButtonText="Entendido"
        secondaryButtonText="Cancelar"
        onPrimaryClick={() => setIsModalOpen(false)}
        onSecondaryClick={() => setIsModalOpen(false)}
      >
        <p>Por favor, seleccione tutores existentes o registre un nuevo tutor antes de continuar.</p>
      </Modal>
    </>
  );
};




export default GuardianRegister;














