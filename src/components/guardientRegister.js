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
import { inputFieldsGuardians } from "@/utils/inputFieldsGuardians";

const options = [
  { value: "", label: "Seleccione una opción" },
  { value: "Padre", label: "Padre" },
  { value: "Tutor", label: "Tutor" },
  { value: "Otro", label: "Otro" },
];

const GuardianRegister = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    apellidoPaterno: "",
    apellidoMaterno: "",
    nombres: "",
    email: "",
    celular: "",
    comprobantePago: null,
    tipo: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <FormContainer>
      <Title
        title="DATOS DE PROFESOR/TUTOR (OPCIONAL)"
        className="text-xl md:text-2xl font-medium mb-6"
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
                />
              ))}
            </div>
          </FormGroup>
        ))}

        <FormGroup label="Tipo de Tutor:">
          <Select
            className="w-full px-3 py-2 border"
            name="tipo"
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
  );
};

export default GuardianRegister;