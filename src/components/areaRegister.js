"use client"
import { useState } from "react";
import Button from "@/common/button";
import Input from "@/common/input";
import { useGetAreasQuery, usePostAreaMutation } from "@/app/redux/services/areaApi";
import { useSnackbar } from "notistack";

export default function RegisterArea() {
  const [niveles, setNiveles] = useState([""]);
  const [formData, setFormData] = useState({
    name: "",
    grado: "",
    description: "",
    costo: "",
  });

  const { enqueueSnackbar } = useSnackbar();
  const { data: areas, isLoading: isAreasLoading, isError: isAreasError, refetch } = useGetAreasQuery();
  const [postArea, { isLoading: isPostAreaLoading, }] = usePostAreaMutation();
  const handleAddNivel = () => setNiveles([...niveles, ""]);

  const handleNivelChange = (index, value) => {
    const newNiveles = [...niveles];
    newNiveles[index] = value;
    setNiveles(newNiveles);
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      
      const payload = {
        name: formData.name,
        description: formData.description || null, 
        date: formData.date || new Date().toISOString().split("T")[0],
      };
      enqueueSnackbar("Creando área, por favor espere...", { variant: "info" });
      await postArea(payload).unwrap();
      enqueueSnackbar("Área registrada exitosamente", { variant: "success" });

      
      refetch();

     
      setFormData({
        name: "",
        grado: "",
        description: "",
        costo: "",
      });
      setNiveles([""]);
    } catch (error) {
      enqueueSnackbar("Error al registrar el área", { variant: "error" });
      console.error("Error al registrar el área:", error);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-8">
      
      <div className="w-full max-w-2xl mb-6">
        <h2 className="text-center text-white font-bold mb-4">Áreas Registradas</h2>
        {isAreasLoading ? (
          <p className="text-center text-gray-500">Cargando áreas...</p>
        ) : isAreasError ? (
          <p className="text-center text-red-500">Error al cargar las áreas</p>
        ) : (
          <ul className="bg-white rounded-md p-4 shadow-lg">
            {areas.map((area, index) => (
              <li key={index} className="text-gray-700 mb-2">
                {area.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="w-full max-w-2xl">
        <div className="text-center text-white font-bold py-2">
          REGISTRO DE ÁREA DE COMPETENCIA
        </div>
        <div className="bg-white rounded-md p-6 shadow-lg">
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Agregar Área</label>
            <Input
              type="text"
              className="border border-gray-300 rounded-md p-2 w-full mb-2"
              placeholder="Ingrese el nombre del área"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-1">Nivel/Categoría</label>
              {niveles.map((nivel, index) => (
                <Input
                  key={index}
                  type="text"
                  className="border border-gray-300 rounded-md p-2 w-full mb-2"
                  placeholder="Ingrese nivel/categoría"
                  value={nivel}
                  onChange={(e) => handleNivelChange(index, e.target.value)}
                />
              ))}
              <Button
                className="w-full bg-[#4a7eb5] hover:bg-[#3a6ea5] text-white py-2 rounded-md border-2 border-transparent hover:border-[#00c8ff] transition-all duration-200"
                onClick={handleAddNivel}
              >
                Agregar otro Nivel/Categoría
              </Button>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Grado asociado</label>
              <Input
                type="text"
                className="border border-gray-300 rounded-md p-2 w-full mb-2"
                placeholder="Ingrese el grado asociado"
                value={formData.grado}
                onChange={(e) => handleInputChange("grado", e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Descripción del área</label>
            <Input
              type="text"
              className="border border-gray-300 rounded-md p-2 w-full mb-2"
              placeholder="Ingrese descripción"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Costo de inscripción (BS)</label>
            <Input
              type="text"
              className="border border-gray-300 rounded-md p-2 w-full mb-2"
              placeholder="Ingrese un monto"
              value={formData.costo}
              onChange={(e) => handleInputChange("costo", e.target.value)}
            />
          </div>
          <Button
            className="w-full bg-[#333333] hover:bg-[#222222] text-white py-2 rounded-md border-2 border-transparent hover:border-[#00c8ff] transition-all duration-200"
            onClick={handleSubmit}
          >
            Registrar Área
          </Button>
        </div>
      </div>
    </div>
  );
}