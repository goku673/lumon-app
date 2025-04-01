"use client"

import { useState } from "react"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from "@/common/button";
import Input from "@/common/input";

export default function RegisterArea() {
  const [niveles, setNiveles] = useState([""]);
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);
  const [showGradoDropdown, setShowGradoDropdown] = useState(false);
  const [areas, setAreas] = useState([
    {
      id: 1,
      nombre: "Matemáticas",
      niveles: ["Básico", "Intermedio"],
      grado: "Primaria",
      descripcion: "Área de matemáticas básicas",
      costo: 150,
    },
    {
      id: 2,
      nombre: "Ciencias",
      niveles: ["Avanzado"],
      grado: "Secundaria",
      descripcion: "Área de ciencias naturales",
      costo: 200,
    },
  ]);

  const [formData, setFormData] = useState({
    nombre: "",
    grado: "",
    descripcion: "",
    costo: "",
  });

  const areaOptions = ["Matemáticas", "Ciencias", "Lenguaje", "Historia", "Arte"];
  const gradoOptions = ["Preescolar", "Primaria", "Secundaria", "Bachillerato", "Universidad"];

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

  const handleSubmit = () => {
    const newArea = {
      id: areas.length + 1,
      ...formData,
      niveles,
    };

    setAreas([...areas, newArea]);
    setFormData({
      nombre: "",
      grado: "",
      descripcion: "",
      costo: "",
    });
    setNiveles([""]);
  };

  const selectArea = (area) => {
    handleInputChange("nombre", area);
    setShowAreaDropdown(false);
  };

  const selectGrado = (grado) => {
    handleInputChange("grado", grado);
    setShowGradoDropdown(false);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-8">
      <div className="w-full max-w-2xl">
        <div className="text-center text-white font-bold py-2">
          REGISTRO DE ÁREA DE COMPETENCIA
        </div>
        <div className="bg-white rounded-md p-6 shadow-lg">
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Área</label>
            <div className="relative">
              <div
                className="border border-gray-300 rounded-md p-2 flex justify-between items-center cursor-pointer"
                onClick={() => setShowAreaDropdown(!showAreaDropdown)}
              >
                <span className="text-gray-500">{formData.nombre || "Seleccione el área"}</span>
                <ExpandMoreIcon className="h-4 w-4 text-gray-500" />
              </div>

              {showAreaDropdown && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg">
                  {areaOptions.map((area, index) => (
                    <div
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => selectArea(area)}
                    >
                      {area}
                    </div>
                  ))}
                </div>
              )}
            </div>
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
              <div className="relative">
                <div
                  className="border border-gray-300 rounded-md p-2 flex justify-between items-center cursor-pointer"
                  onClick={() => setShowGradoDropdown(!showGradoDropdown)}
                >
                  <span className="text-gray-500">{formData.grado || "Seleccione el grado"}</span>
                  <ExpandMoreIcon className="h-4 w-4 text-gray-500" />
                </div>

                {showGradoDropdown && (
                  <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg">
                    {gradoOptions.map((grado, index) => (
                      <div
                        key={index}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => selectGrado(grado)}
                      >
                        {grado}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Descripción del área</label>
            <Input
              type="text"
              className="border border-gray-300 rounded-md p-2 w-full mb-2"
              placeholder="Ingrese descripción"
              value={formData.descripcion}
              onChange={(e) => handleInputChange("descripcion", e.target.value)}
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

