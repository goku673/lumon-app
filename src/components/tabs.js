"use client"
import { useState } from "react";
import RegisterAreaComponent from "./areaRegister";
import Table from "./table";
import Button from "@/common/button";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const data = [
    { id: 1, area: "Matemáticas", nivel: "Básico", grado: "Primaria", costo: 150, descripcion: "Área de matemáticas básica" },
    { id: 2, area: "Ciencias", nivel: "Avanzado", grado: "Secundaria", costo: 200, descripcion: "Área de ciencias naturales avanzada" },
    { id: 3, area: "Historia", nivel: "Intermedio", grado: "Secundaria", costo: 180, descripcion: "Área de historia y sociedad" },
    { id: 4, area: "Programación", nivel: "Avanzado", grado: "Universidad", costo: 250, descripcion: "Área de desarrollo de software" },
    { id: 5, area: "Idiomas", nivel: "Básico", grado: "Todos", costo: 100, descripcion: "Área de aprendizaje de idiomas" },
  ];

  const columns = [
    {
    accessorKey: "id",
    header: "Id Area",
    cell: (info) => info.getValue(),
    },
    {
    accessorKey: "area",
    header: "Área",
    cell: (info) => info.getValue(),
    },
    {
    accessorKey: "nivel",
    header: "Nivel/Categoria",
    cell: (info) => info.getValue(),
    },
    {
    accessorKey: "grado",
    header: "Grado Asociado",
    cell: (info) => info.getValue(),
    },
    {
    accessorKey: "costo",
    header: "Costo (Bs)",
    cell: (info) => info.getValue(),
    },
    {
    accessorKey: "descripcion",
    header: "Descripción",
    cell: (info) => {
        const estado = info.getValue()
        let textColor = "text-gray-700"
        return <span className={textColor}>{estado}</span>
    },
    },
    {
    id: "actions",
    header: "",
    cell: (info) => (
        <div className="flex space-x-2 justify-center">
        <Button className="p-1 mb-1 bg-green-500 text-white rounded hover:bg-green-600">
            <EditIcon />
        </Button>
        <Button className="p-1 mb-1 bg-red-500 text-white rounded hover:bg-red-600">
            <DeleteIcon />
        </Button>
        </div>
    ),
    },
]
const Tabs = () => {
  const [activeTab, setActiveTab] = useState("register");

  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-8">
      <div className="flex space-x-2 mb-4 w-full max-w-xl justify-center">
        <button
          className={`px-4 md:px-6 py-2 rounded-md text-white ${
            activeTab === "register"
              ? "bg-[#333333] border-2 border-[#00c8ff]"
              : "bg-[#555555] border-2 border-transparent hover:border-[#00c8ff]"
          } transition-all duration-200 md:whitespace-nowrap text-sm md:text-base`}
          onClick={() => setActiveTab("register")}
        >
          Registrar un área de competencia
        </button>

        <button
          className={`px-4 md:px-6 py-2 rounded-md text-white ${
            activeTab === "list"
              ? "bg-[#333333] border-2 border-[#00c8ff]"
              : "bg-[#555555] border-2 border-transparent hover:border-[#00c8ff]"
          } transition-all duration-200 md:whitespace-nowrap text-sm md:text-base`}
          onClick={() => setActiveTab("list")}
        >
          Ver lista de áreas registradas
        </button>
      </div>
      {activeTab === "register" 
      ? <RegisterAreaComponent /> 
      :
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-lg font-bold text-center mb-4 text-white">Lista de Área(s) registradas</h1>
        <Table columns={columns} data={data} />
     </div>}
    </div>
  );
};




export default Tabs;
