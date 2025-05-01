"use client"

import { useState } from "react"
import Input from "@/common/input"
import Button from "@/common/button"
import SearchIcon from "@mui/icons-material/Search"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import DownloadIcon from "@mui/icons-material/Download"
import Table from "@/components/table"
import Modal from "@/components/modal/modal"
import { useGetCompetitorsQuery } from "@/app/redux/services/competitorsApi"
import { format } from "date-fns"
import Title from "@/common/title"
import Text from "@/common/text"
import * as XLSX from "xlsx"

const ViewRegistrant = () => {
  const { data: competitors = [] } = useGetCompetitorsQuery()
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

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
      provincia: c.school?.province_id || "-",
      area: c.area_level_grades?.map((a) => a.name).join(", ") || "-",
      tutores: c.guardians?.map((g) => `${g.name} ${g.last_name} (${g.type})`).join(", ") || "Sin tutores",
      estado: "CONFIRMADO", // esto por ahora lo dejo hardcod, hasta que confirmemos el pago
      fechaRegistro: c.created_at ? format(new Date(c.created_at), "dd/MM/yyyy HH:mm") : "-",
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
    setIsModalOpen(true)
  }

  const confirmDelete = () => {
    setIsModalOpen(false)
  }

  // Función para exportar datos a Excel
  const exportToExcel = () => {
    // Preparar los datos para exportar
    const dataToExport = filteredData.map((item) => ({
      ID: item.id,
      "Nombre y Apellido": item.name,
      Email: item.email,
      Carnet: item.carnet,
      "Fecha de Nacimiento": item.birthday,
      Teléfono: item.phone,
      Curso: item.curso,
      Colegio: item.colegio,
      Área: item.area,
      Tutores: item.tutores,
      Estado: item.estado,
      "Fecha de Registro": item.fechaRegistro,
    }))

    // Crear una hoja de trabajo
    const worksheet = XLSX.utils.json_to_sheet(dataToExport)

    // Crear un libro de trabajo
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Competidores")

    // Generar el archivo Excel
    const date = new Date()
    const fileName = `competidores_${format(date, "yyyy-MM-dd_HH-mm")}.xlsx`
    XLSX.writeFile(workbook, fileName)
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
            <Button className="p-1 mb-1 bg-green-500 text-white rounded hover:bg-green-600">
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
      <div className="container mx-auto py-8 px-4">
        <Title title="Alumnos Registrados" className="text-2xl font-bold mb-6 text-white text-center" />

        {/* Search and Export section - Centered search input */}
        <div className="flex flex-col items-center mb-8 gap-4">
          <div className="relative w-full max-w-xl mx-auto">
            <Input
              type="text"
              placeholder="Buscar por nombre, carnet, email o colegio"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2  bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="absolute right-3 top-0 h-full flex items-center justify-center">
              <SearchIcon />
            </button>
          </div>

          <Button
            onClick={exportToExcel}
            className="bg-[#00A86B] hover:bg-[#008f5b] text-white font-bold py-2 px-4 rounded-md flex items-center"
          >
            <DownloadIcon className="mr-2" />
            Exportar a Excel
          </Button>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg">
          <Table
            data={filteredData}
            columns={columns}
            page={page}
            totalPages={1}
            totalElements={filteredData.length}
            className="w-full"
            headerClassName="bg-[#1e4b8f] text-white"
            rowClassName="border-b hover:bg-gray-50"
          />
        </div>

        <div className="mt-4 text-center text-sm text-gray-300">Total de registros: {filteredData.length}</div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirmar eliminación"
        iconType="warning"
        primaryButtonText="Eliminar"
        secondaryButtonText="Cancelar"
        onPrimaryClick={confirmDelete}
        onSecondaryClick={() => setIsModalOpen(false)}
      >
        <Text text="¿Estás seguro de que deseas eliminar este registro?" className="text-lg mb-4" />
      </Modal>
    </div>
  )
}

export default ViewRegistrant
