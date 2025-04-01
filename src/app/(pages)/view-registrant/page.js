"use client"
import { useState } from "react"
import Input from "@/common/input";
import Button from "@/common/button";
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Table from "@/components/table";

    const ViewRegistrant = () => {
        const [searchTerm, setSearchTerm] = useState("")
        const [page, setPage] = useState(0)
        const [currentFilter, setCurrentFilter] = useState("")

        const mockData = [
            {
            id: 1,
            name: "Juan Pablo Auaca Chambi",
            carnet: "15219329",
            colegio: "Colegio Domingo Savio",
            area: "Biologia",
            estado: "CONFIRMADO",
            },
            {
            id: 2,
            name: "Cristian Cueva",
            carnet: "14166626",
            colegio: "Colegio Mariknol",
            area: "Biologia",
            estado: "RECHAZADO",
            },
            {
            id: 3,
            name: "Juan Rene Martinez",
            carnet: "5424242",
            colegio: "Colegio Aleman",
            area: "Matematicas",
            estado: "PENDIENTE",
            },
            {
            id: 4,
            name: "Arnold Guery Rodriguez",
            carnet: "4242442",
            colegio: "Colegio German Busch",
            area: "Matematicas",
            estado: "CONFIRMADO",
            },
        ]


        const columns = [
            {
            accessorKey: "id",
            header: "#num",
            cell: (info) => info.getValue(),
            },
            {
            accessorKey: "name",
            header: "Nombre y apellido",
            cell: (info) => info.getValue(),
            },
            {
            accessorKey: "carnet",
            header: "Carnet",
            cell: (info) => info.getValue(),
            },
            {
            accessorKey: "colegio",
            header: "Colegio",
            cell: (info) => info.getValue(),
            },
            {
            accessorKey: "area",
            header: "Area",
            cell: (info) => info.getValue(),
            },
            {
            accessorKey: "estado",
            header: "Estado de Inscripcion",
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

        return (
            <div className="min-h-screen">
            <div className="container mx-auto py-8 px-4">
                <div className="flex justify-center mb-8">
                <div className="relative w-full max-w-2xl ">
                    <Input
                    type="text"
                    placeholder="Buscar postulante por nombre o carnet"
                    className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="absolute right-0 top-0 h-full px-4 flex items-center justify-center">
                    <SearchIcon />
                    </button>
                </div>
                </div>

                <Table
                data={mockData}
                columns={columns}
                page={page}
                totalPages={1}
                totalElements={mockData.length}
                />
            </div>
            </div>
        )
    }

    export default ViewRegistrant;
