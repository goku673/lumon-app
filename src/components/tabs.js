"use client"
import { useState } from "react";
import { useSnackbar } from "notistack"; // Importar Notistack
import RegisterAreaComponent from "./areaRegister";
import Table from "./table";
import Button from "@/common/button";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useGetAreasQuery, useDeleteAreaMutation } from "@/app/redux/services/areaApi";

const Tabs = () => {
  const { enqueueSnackbar } = useSnackbar(); // Hook de Notistack
  const { data: areas, isLoading: isAreasLoading, isError: isAreasError, refetch } = useGetAreasQuery();
  const [deleteArea, { isLoading: isDeleting }] = useDeleteAreaMutation();
  const [activeTab, setActiveTab] = useState("register");

  const handleDeleteArea = async (id) => {
    try {
      // Llamar al método deleteArea con el id del área
      await deleteArea(id).unwrap();
      enqueueSnackbar(`Área con id ${id} eliminada exitosamente`, { variant: "success" }); // Notificación de éxito

      // Refrescar la lista de áreas
      refetch();
    } catch (error) {
      enqueueSnackbar("Error al eliminar el área", { variant: "error" }); // Notificación de error
      console.error("Error al eliminar el área:", error);
    }
  };

  const columns = [
    {
      accessorKey: "id",
      header: "Id Area",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "name",
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
      cell: (info) => {
        const costo = info.getValue();
        return <span className="text-gray-700">{costo}</span>;
      },
    },
    {
      accessorKey: "description",
      header: "Descripción",
      cell: (info) => {
        const estado = info.getValue();
        return <span className="text-gray-700">{estado}</span>;
      },
    },
    {
      id: "actions",
      header: "",
      cell: (info) => {
        const areaId = info.row.original.id; 
        return (
          <div className="flex space-x-2 justify-center">
            <Button className="p-1 mb-1 bg-green-500 text-white rounded hover:bg-green-600">
              <EditIcon />
            </Button>
            <Button
              onClick={() => handleDeleteArea(areaId)} 
              className="p-1 mb-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              <DeleteIcon />
            </Button>
          </div>
        );
      },
    },
  ];

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
      {activeTab === "register" ? (
        <RegisterAreaComponent />
      ) : (
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-lg font-bold text-center mb-4 text-white">Lista de Área(s) registradas</h1>
          {isAreasLoading ? (
            <p className="text-center text-gray-500">Cargando áreas...</p>
          ) : isAreasError ? (
            <p className="text-center text-red-500">Error al cargar las áreas</p>
          ) : (
            <Table columns={columns} data={areas} />
          )}
        </div>
      )}
    </div>
  );
};

export default Tabs;