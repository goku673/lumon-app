"use client"
import { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Button from "@/common/button";
import Input from "@/common/input";
import Select from "@/common/select";

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
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-xl md:text-2xl font-medium text-center mb-6">
        DATOS DE PROFESOR/TUTOR (OPCIONAL)
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">
            Nombre del Profesor o Tutor:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="text"
              name="apellidoPaterno"
              placeholder="Apellido Paterno"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formData.apellidoPaterno}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="apellidoMaterno"
              placeholder="Apellido Materno"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formData.apellidoMaterno}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="nombres"
              placeholder="Nombre(s)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formData.nombres}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Correo electrónico:</label>
          <Input
            type="email"
            name="email"
            placeholder="Ingrese un correo válido"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Celular:</label>
          <Input
            type="tel"
            name="celular"
            placeholder="Ingrese un número válido"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.celular}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Tipo de Tutor:</label>
          <Select
            name="tipo"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.tipo}
            onChange={handleChange}
          >
            <option value="">Seleccione una opción</option>
            <option value="Padre">Padre</option>
            <option value="Tutor">Tutor</option>
            <option value="Otro">Otro</option>
          </Select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Comprobante de pago:</label>
          <div className="p-4 border border-dashed border-gray-300 rounded-md bg-gray-100 flex flex-col items-center">
            <label className="cursor-pointer bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md flex items-center mb-2">
              <UploadFileIcon className="mr-2" />
              Subir archivo
              <input
                type="file"
                name="comprobantePago"
                className="hidden"
                onChange={handleChange}
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </label>
            <p className="text-sm text-gray-500">Formatos aceptados: PDF, JPG, PNG</p>
            {formData.comprobantePago && (
              <p className="mt-2 text-sm text-green-600">
                Archivo seleccionado: {formData.comprobantePago.name}
              </p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-md flex items-center justify-center"
        >
          <ArrowForwardIcon className="mr-2" />
          Continuar
        </Button>
      </form>
    </div>
  );
};

export default GuardianRegister;