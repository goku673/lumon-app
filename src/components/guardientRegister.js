"use client";
import { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close"; // Ícono para la "X"
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
import { inputFieldsGuardians } from "@/utils/inputFieldsGuardians";
import Selector from "./selector";
import Modal from "./modal/modal";

const options = [
  { value: "", label: "Seleccione una opción" },
  { value: "Padre", label: "Padre" },
  { value: "Tutor", label: "Tutor" },
  { value: "Otro", label: "Otro" },
];

const GuardianRegister = ({ onSubmit, initialData }) => {
  const { data: guardians = [] } = useGetGuardiansQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    apellidoPaterno: "",
    apellidoMaterno: "",
    nombres: "",
    email: "",
    celular: "",
    comprobantePago: null,
    tipo: "",
    selectedGuardians: [],
    ...initialData,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

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

  const isFormValid = () => {
    const {
      apellidoPaterno,
      apellidoMaterno,
      nombres,
      email,
      celular,
      comprobantePago,
      tipo,
      selectedGuardians,
    } = formData;
    const manualFilled =
      apellidoPaterno &&
      apellidoMaterno &&
      nombres &&
      email &&
      celular &&
      comprobantePago &&
      tipo;
    const hasSelection = selectedGuardians.length > 0;

    return manualFilled || hasSelection;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!isFormValid()) {
      setIsModalOpen(true);
      return;
    }
    console.log("Form data:", formData);
    onSubmit(formData);
  };

  return (
    <> 
    <FormContainer>
      <Title
        title="DATOS DE PROFESOR/TUTOR (OPCIONAL)"
        className="text-xl md:text-2xl font-medium mb-6"
      />

      <div className="mb-6">
        <FormGroup label="Buscar y seleccionar Tutores:">
          <Selector
            items={guardians}
            selectedItems={formData.selectedGuardians}
            onSelect={handleGuardianSelect}
            onRemove={handleGuardianRemove}
            isMultiSelect={true}
            placeholder="Buscar tutor..."
            labelKey="name"
          />
        </FormGroup>
      </div>
      <Text
        text="Si no encuentras el tutor puedes registrarlo"
        className="text-lg font-medium mb-2"
      />
      <FormContent onSubmit={handleSubmit}>
        {inputFieldsGuardians.map((group, index) => (
          <FormGroup key={index} label={group.groupLabel}>
            <div className={group.layout || ""}>
              {group.fields.map((field) => (
                <Input
                  key={field.name}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              ))}
            </div>
          </FormGroup>
        ))}
        <FormGroup label="Tipo de Tutor:">
          <Select
            name="tipo"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.tipo}
            onChange={handleChange}
            options={options}
          />
        </FormGroup>
        <FormGroup label="Comprobante de pago:">
          <FileUploader
            name="comprobantePago"
            onChange={handleChange}
            accept=".pdf,.jpg,.jpeg,.png"
            label="Subir archivo"
          />
          {formData.comprobantePago && (
            <p className="mt-2 text-sm text-green-600">
              Archivo seleccionado: {formData.comprobantePago.name}
            </p>
          )}
        </FormGroup>
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
        <p>Por favor, registre sus datos antes de continuar.</p>
      </Modal>
    </>
    
  );
};

export default GuardianRegister;
