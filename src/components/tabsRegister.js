"use client"
import { useState, useEffect } from "react";
import RegisterAreaLevelGradeComponent from "./areaLevelGradeRegister";
import Table from "./table";
import Button from "@/common/button";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useGetAreasQuery, useDeleteAreaMutation } from "@/app/redux/services/areaApi";
import { useGetLevelsQuery } from "@/app/redux/services/levelsApi";
import { useGetGradesQuery } from "@/app/redux/services/register";
import Modal from "./modal/modal";
import RegisterArea from "./areaRegister";
import RegisterGrade from "./gradeRegister";
import RegisterLevel from "./levelRegister";
import { TabsContent } from "./tabs/tabsContent"
import { TabsList } from "./tabs/tabsList"
import { TabsTrigger } from "./tabs/tabsTrigger"
import { Tabs } from "./tabs/tabs"


const TabsRegister = () => {
  const { data: areas, isLoading: isAreasLoading, isError: isAreasError,  refetch: refetchAreas, } = useGetAreasQuery();
  const { refetch: refetchLevels } = useGetLevelsQuery();
  const { refetch: refetchGrades } = useGetGradesQuery();
  const [deleteArea] = useDeleteAreaMutation();
  const [activeTab, setActiveTab] = useState("registerArea");
  const [modal, setModal] = useState({ open: false, title: '', type: 'info', message: '' });

  const handleDeleteArea = async (id) => {
    try {
      await deleteArea(id).unwrap();
      setModal({ open: true, title: 'Éxito', type: 'success', message: `Área con id ${id} eliminada exitosamente` });
      refetch();
    } catch (error) {
      console.error("Error al eliminar el área:", error);
      setModal({ open: true, title: 'Error', type: 'error', message: 'Error al eliminar el área' });
    }
  };

  useEffect(() => {
    if (["registerArea", "registerGrade", "registerLevel", "registerAreaLevelGrade"].includes(activeTab)) {
      refetchAreas();
      refetchLevels();
      refetchGrades();
    }
  }, [activeTab, refetchAreas, refetchLevels, refetchGrades]);

  const closeModal = () => setModal(prev => ({ ...prev, open: false }));

  const columns = [
    { accessorKey: "id", header: "Id Área", cell: info => info.getValue() },
    { accessorKey: "name", header: "Área", cell: info => info.getValue() },
    { accessorKey: "nivel", header: "Nivel/Categoría", cell: info => info.getValue() },
    { accessorKey: "grado", header: "Grado Asociado", cell: info => info.getValue() },
    { accessorKey: "costo", header: "Costo (Bs)", cell: info => info.getValue() },
    { accessorKey: "description", header: "Descripción", cell: info => info.getValue() },
    {
      id: "actions",
      header: "Acciones",
      cell: info => {
        const areaId = info.row.original.id;
        return (
          <div className="flex space-x-2 justify-center">
            <Button className="p-1 bg-green-500 text-white rounded hover:bg-green-600">
              <EditIcon />
            </Button>
            <Button onClick={() => handleDeleteArea(areaId)} className="p-1 bg-red-500 text-white rounded hover:bg-red-600">
              <DeleteIcon />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="w-full flex justify-center">
          <TabsList className="mb-4 max-w-4xl w-full justify-center">
            <TabsTrigger value="registerArea">Registrar Área</TabsTrigger>
            <TabsTrigger value="registerGrade">Registrar Grado</TabsTrigger>
            <TabsTrigger value="registerLevel">Registrar Level</TabsTrigger>
            <TabsTrigger value="registerAreaLevelGrade">Registrar Área–Nivel–Grado</TabsTrigger>
            <TabsTrigger value="list">Ver Lista de Áreas</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="registerArea" className="w-full">
          <RegisterArea />
        </TabsContent>

        <TabsContent value="registerGrade" className="w-full">
          <RegisterGrade />
        </TabsContent>

        <TabsContent value="registerLevel" className="w-full">
          <RegisterLevel />
        </TabsContent>

        <TabsContent value="registerAreaLevelGrade" className="w-full">
          <RegisterAreaLevelGradeComponent />
        </TabsContent>

        <TabsContent value="list" className="w-full">
          <div className="w-full overflow-x-auto px-4 py-8 flex justify-center">
            <div className="w-full max-w-7xl">
              <h1 className="text-lg font-bold text-center mb-4 text-white">
                Lista de Área(s) Registradas
              </h1>
              {isAreasLoading ? (
                <p className="text-center text-gray-500">Cargando áreas...</p>
              ) : isAreasError ? (
                <p className="text-center text-red-500">Error al cargar las áreas</p>
              ) : (
                <Table columns={columns} data={areas} />
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Modal
        isOpen={modal.open}
        onClose={closeModal}
        title={modal.title}
        iconType={modal.type}
        primaryButtonText="Aceptar"
        onPrimaryClick={closeModal}
      >
        <p className="text-gray-700">{modal.message}</p>
      </Modal>
    </div>
  );
};

export default TabsRegister;

    
