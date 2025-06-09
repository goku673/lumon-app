"use client";
import { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "@/common/button";
import Input from "@/common/input";
import Select from "@/common/select";
import FormGroup from "@/components/formGroup";
import FileUploader from "@/components/fileUploader";
import FormContainer from "@/common/formContainer";
import FormContent from "@/common/formContent";
import Title from "@/common/title";
import Text from "@/common/text";
import { useGetGuardiansQuery } from "@/app/redux/services/guardiansApi";
import { completeGuardianFields, renderField } from "@/utils/inputFieldsGuardians";
import Selector from "./selector";
import Modal from "./modal/modal";

const GuardianRegister = ({ onSubmit, initialData }) => {
  // Obtener tutores existentes desde el backend
  const { data: guardians = [] } = useGetGuardiansQuery();
   // Estado para mostrar el modal de advertencia si el formulario está incompleto
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Estado del formulario con valores iniciales (si se proporcionan)
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
  // Manejar cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value, files } = e.target;
   // Si es un archivo, guardar solo el primer archivo
    if (name === "comprobantePago" && files && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
// Agregar un tutor existente a la lista seleccionada
  const handleGuardianSelect = (guardian) => {
    setFormData((prev) => ({
      ...prev,
      selectedGuardians: [...prev.selectedGuardians, guardian],
    }));
  };
  // Remover un tutor previamente seleccionado
  const handleGuardianRemove = (guardian) => {
    setFormData((prev) => ({
      ...prev,
      selectedGuardians: prev.selectedGuardians.filter(
        (g) => g.id !== guardian.id
      ),
    }));
  };
  // Validar si el formulario tiene los datos necesarios para continuar
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
        // Si se seleccionaron tutores existentes, es válido
    if (selectedGuardians.length > 0) {
      return true;
    }
    // Validar si los campos obligatorios están completos
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
// Manejar envío del formulario
  const handleSubmit = e => {
    e.preventDefault();
    if (!isFormValid()) {
      setIsModalOpen(true);
      return;
    }
    onSubmit(formData);
  };
// Renderizar componentes dinámicamente según configuración de campos
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
    // Renderizar el componente correspondiente
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
