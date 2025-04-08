"use client"
import { useState } from "react";
import { useGetGradesQuery } from "@/app/redux/services/register";
import { useGetAreasQuery, useGetProvincesQuery } from "@/app/redux/services/areaApi";
import SaveIcon from "@mui/icons-material/Save";
import { ArrowBack } from "@mui/icons-material";
import Button from "@/common/button";
import Input from "@/common/input";
import Select from "@/common/select";

const CompetitorRegister = ({ onSubmit, onBack, initialData }) => {
  const { data: grades, isError: isGradesError, isLoading: isGradesLoading } = useGetGradesQuery();
  const { data: areas, isError: isAreasError, isLoading: isAreasLoading } = useGetAreasQuery();
  const { data: provinces, isError: isProvincesError, isLoading: isProvincesLoading } = useGetProvincesQuery();

  const [formData, setFormData] = useState({
    apellidoPaterno: "",
    apellidoMaterno: "",
    nombres: "",
    email: "",
    cedula: "",
    fechaNacimiento: "",
    colegio: "",
    curso: "",
    departamento: "",
    provincia: "",
    area: "",
    ...initialData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-xl md:text-2xl font-medium text-center mb-6">DATOS DEL COMPETIDOR</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Nombre del Competidor:</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="text"
              name="apellidoPaterno"
              placeholder="Apellido Paterno"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formData.apellidoPaterno}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="apellidoMaterno"
              placeholder="Apellido Materno"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formData.apellidoMaterno}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="nombres"
              placeholder="Nombre(s)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formData.nombres}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Input
            type="email"
            name="email"
            placeholder="Ingrese un correo válido"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="cedula"
            placeholder="Ingrese CI"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.cedula}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="fechaNacimiento"
            placeholder="Ejemplo: 10/02/2024"
            pattern="\d{2}/\d{2}/\d{4}"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <Input
            type="text"
            name="colegio"
            placeholder="Ingrese el Nombre de Su Colegio"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.colegio}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Select
            name="curso"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.curso}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione el curso</option>
            {isGradesLoading && <option>Cargando cursos...</option>}
            {isGradesError && <option>Error al cargar cursos</option>}
            {grades &&
              grades.map((grade) => (
                <option key={grade.id} value={grade.name}>
                  {grade.name}
                </option>
              ))}
          </Select>
          <Select
            name="departamento"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.departamento}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione el departamento</option>
            <option value="LP">La Paz</option>
            <option value="CB">Cochabamba</option>
            <option value="SC">Santa Cruz</option>
            <option value="OR">Oruro</option>
            <option value="PT">Potosí</option>
            <option value="CH">Chuquisaca</option>
            <option value="TJ">Tarija</option>
            <option value="BE">Beni</option>
            <option value="PD">Pando</option>
          </Select>
          <Select
            name="provincia"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.provincia}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione su provincia</option>
            {isProvincesLoading && <option>Cargando provincias...</option>}
            {isProvincesError && <option>Error al cargar provincias</option>}
            {provinces &&
              provinces.map((province) => (
                <option key={province.id} value={province.name}>
                  {province.name}
                </option>
              ))}
          </Select>
        </div>

        <div className="mb-6">
          <Select
            name="area"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.area}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione el área deseada</option>
            {isAreasLoading && <option>Cargando áreas...</option>}
            {isAreasError && <option>Error al cargar áreas</option>}
            {areas &&
              areas.map((area) => (
                <option key={area.id} value={area.name}>
                  {area.name}
                </option>
              ))}
          </Select>
        </div>

        <div className="flex justify-between">
          <Button
            type="button"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-md flex items-center justify-center"
            onClick={onBack}
          >
            <ArrowBack className="mr-2" />
            Volver
          </Button>
          <Button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-md flex items-center justify-center"
          >
            <SaveIcon className="mr-2" />
            Guardar los datos de inscripción
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CompetitorRegister;