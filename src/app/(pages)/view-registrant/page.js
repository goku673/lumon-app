"use client"

import { useState } from "react"
import Input from "@/common/input"
import Button from "@/common/button"
import SearchIcon from "@mui/icons-material/Search"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import Table from "@/components/table"
import Modal from "@/components/modal/modal"
import { useGetCompetitorsQuery, useDeleteCompetitorMutation, useUpdateCompetitorMutation } from "@/app/redux/services/competitorsApi"
import { useGetSchoolsQuery } from "@/app/redux/services/schoolApi"
import { useGetGradesQuery } from "@/app/redux/services/register"
import { format } from "date-fns"
import Title from "@/common/title"
import Text from "@/common/text"
import TableExporter from "@/components/tableExporter"
import FormGroup from "@/components/formGroup"
import Selector from "@/components/selector"
import Select from "@/common/select"

//refactor code
const ViewRegistrant = () => {
  const { data: competitors = [], refetch } = useGetCompetitorsQuery()
  const { data: schools, isLoading: isSchoolsLoading, isError: isSchoolsError } = useGetSchoolsQuery()
  const { data: grades, isLoading: isGradesLoading, isError: isGradesError } = useGetGradesQuery()
  const [deleteCompetitor] = useDeleteCompetitorMutation()
  const [updateCompetitor] = useUpdateCompetitorMutation()
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(0)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' })
  const [editFormData, setEditFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    phone: "",
    curso: "",
    school_id: "",
    colegio: null
  })

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const filteredData = competitors
    .map((c) => ({
      id: c.id,
      name: `${c.name} ${c.last_name}`,
      email: c.email || "-",
      carnet: c.ci,
      birthday: c.birthday ? format(new Date(c.birthday), "dd/MM/yyyy") : "-",
      phone: c.phone || "-",
      curso: c.curso || "-",
      colegio: c.school?.name || "Sin colegio",
      school_id: c.school?.id || "",
      provincia: c.school?.province_id || "-",
      area: c.area_level_grades?.map((a) => a.name).join(", ") || "-",
      tutores: c.guardians?.map((g) => `${g.name} ${g.last_name} (${g.type})`).join(", ") || "Sin tutores",
      estado: "CONFIRMADO",
      fechaRegistro: c.created_at ? format(new Date(c.created_at), "dd/MM/yyyy HH:mm") : "-",
      original: {
        name: c.name || "",
        last_name: c.last_name || "",
        email: c.email || "",
        phone: c.phone || "",
        curso: c.curso || "",
        school_id: c.school?.id || "",
        school: c.school || null
      }
    }))
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.carnet.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.colegio.toLowerCase().includes(searchTerm.toLowerCase()),
    )

  const openDeleteModal = (id) => {
    setSelectedId(id)
    setIsDeleteModalOpen(true)
  }

  const openEditModal = (id) => {
    const competitor = filteredData.find(c => c.id === id)
    if (competitor) {
      setSelectedId(id)
      setEditFormData({
        name: competitor.original.name,
        last_name: competitor.original.last_name,
        email: competitor.original.email,
        phone: competitor.original.phone,
        curso: competitor.original.curso,
        school_id: competitor.original.school_id,
        colegio: competitor.original.school
      })
      setIsEditModalOpen(true)
    }
  }

  const confirmDelete = async () => {
    try {
      await deleteCompetitor(selectedId).unwrap()
      refetch()
      setIsDeleteModalOpen(false)
      showNotification("Competidor eliminado con éxito", "success")
    } catch (error) {
      console.error("Error al eliminar competidor:", error)
      showNotification("Error al eliminar el competidor", "error")
    }
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSchoolSelect = school => {
    setEditFormData(prev => ({
      ...prev,
      colegio: school,
      school_id: school.id
    }))
  }

  const handleSchoolRemove = () => {
    setEditFormData(prev => ({
      ...prev,
      colegio: null,
      school_id: ""
    }))
  }

  const confirmEdit = async () => {
    try {
      const dataToUpdate = {
        name: editFormData.name,
        last_name: editFormData.last_name,
        phone: editFormData.phone,
        curso: editFormData.curso,
        school_id: editFormData.school_id
      }
      
      await updateCompetitor({
        id: selectedId,
        data: dataToUpdate
      }).unwrap()
      refetch()
      setIsEditModalOpen(false)
      showNotification("Competidor actualizado con éxito", "success")
    } catch (error) {
      console.error("Error al actualizar competidor:", error)
      showNotification("Error al actualizar el competidor", "error")
    }
  }

  const transformDataForExport = (data) => {
    return data.map((item) => ({
      "ID": item.id,
      "Nombre y Apellido": item.name,
      "Email": item.email,
      "Carnet": item.carnet,
      "Fecha de Nacimiento": item.birthday,
      "Teléfono": item.phone,
      "Curso": item.curso,
      "Colegio": item.colegio,
      "Área": item.area,
      "Tutores": item.tutores,
      "Estado": item.estado,
      "Fecha de Registro": item.fechaRegistro,
    }))
  }

  const columns = [
    { accessorKey: "id", header: "#ID", cell: (info) => info.getValue() },
    { accessorKey: "name", header: "Nombre y apellido", cell: (info) => info.getValue() },
    { accessorKey: "email", header: "Email", cell: (info) => info.getValue() },
    { accessorKey: "carnet", header: "Carnet", cell: (info) => info.getValue() },
    { accessorKey: "birthday", header: "Fecha Nacimiento", cell: (info) => info.getValue() },
    { accessorKey: "phone", header: "Teléfono", cell: (info) => info.getValue() },
    { accessorKey: "curso", header: "Curso", cell: (info) => info.getValue() },
    { accessorKey: "colegio", header: "Colegio", cell: (info) => info.getValue() },
    { accessorKey: "area", header: "Área", cell: (info) => info.getValue() },
    {
      accessorKey: "fechaRegistro",
      header: "Fecha de Registro",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "estado",
      header: "Estado",
      cell: (info) => (
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
          {info.getValue()}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Acciones",
      cell: (info) => {
        const registrantId = info.row.original.id
        return (
          <div className="flex space-x-2 justify-center">
            <Button 
              onClick={() => openEditModal(registrantId)}
              className="p-1 mb-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <EditIcon fontSize="small" />
            </Button>
            <Button
              onClick={() => openDeleteModal(registrantId)}
              className="p-1 mb-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              <DeleteIcon fontSize="small" />
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <div className="min-h-screen">
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-md shadow-lg ${
          notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {notification.message}
        </div>
      )}

      <div className="container mx-auto py-8 px-4">
        <Title title="Alumnos Registrados" className="text-2xl font-bold mb-6 text-white text-center" />
        <div className="flex flex-col items-center mb-8 gap-4">
          <div className="relative w-full max-w-xl mx-auto">
            <Input
              type="text"
              placeholder="Buscar por nombre, carnet, email o colegio"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2  bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <SearchIcon className="text-gray-400" />
            </div>
          </div>
          
          {filteredData.length > 0 && (
            <TableExporter
              data={filteredData}
              transformData={transformDataForExport}
              fileName="alumnos_registrados"
              sheetName="Alumnos"
              buttonText="Exportar a Excel"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md flex items-center"
            />
          )}
        </div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <Table columns={columns} data={filteredData} />
        </div>

        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Confirmar Eliminación"
          iconType="warning"
          primaryButtonText="Eliminar"
          secondaryButtonText="Cancelar"
          onPrimaryClick={confirmDelete}
          onSecondaryClick={() => setIsDeleteModalOpen(false)}
        >
          <Text text="¿Está seguro que desea eliminar este registro? Esta acción no se puede deshacer." />
        </Modal>
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Editar Competidor"
          iconType="info"
          primaryButtonText="Guardar Cambios"
          secondaryButtonText="Cancelar"
          onPrimaryClick={confirmEdit}
          onSecondaryClick={() => setIsEditModalOpen(false)}
        >
          <div className="space-y-4">
            <FormGroup label="Nombre:">
              <Input
                name="name"
                value={editFormData.name}
                onChange={handleEditChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </FormGroup>
            
            <FormGroup label="Apellido:">
              <Input
                name="last_name"
                value={editFormData.last_name}
                onChange={handleEditChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </FormGroup>
            
            <FormGroup label="Email:">
              <Input
                name="email"
                value={editFormData.email}
                readOnly
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
              <Text text="El email no se puede modificar" className="text-xs text-gray-500 mt-1" />
            </FormGroup>
            
            <FormGroup label="Teléfono:">
              <Input
                name="phone"
                value={editFormData.phone}
                onChange={handleEditChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </FormGroup>
            
            <FormGroup label="Seleccione Colegio:">
              {isSchoolsLoading ? (
                <p>Cargando colegios...</p>
              ) : isSchoolsError ? (
                <p>Error al cargar colegios.</p>
              ) : (
                <Selector
                  items={schools}
                  selectedItems={editFormData.colegio ? [editFormData.colegio] : []}
                  onSelect={handleSchoolSelect}
                  onRemove={handleSchoolRemove}
                  isMultiSelect={false}
                  placeholder="Buscar colegio..."
                  labelKey="name"
                />
              )}
            </FormGroup>
            
            <FormGroup label="Curso:">
              <Select
                name="curso"
                options={
                  isGradesLoading 
                    ? [{ value: "", label: "Cargando cursos..." }] 
                    : isGradesError 
                        ? [{ value: "", label: "Error al cargar cursos" }] 
                        : grades?.map(g => ({ value: g.description, label: g.description })) || []
                }
                value={editFormData.curso}
                onChange={handleEditChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </FormGroup>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default ViewRegistrant
