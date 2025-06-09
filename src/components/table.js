"use client"

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
// Importa funciones esenciales de la librería react-table

// Componente funcional que recibe datos y columnas como props
const Table = ({
  data,
  columns,

}) => {

  // Inicializa la tabla con configuración básica: columnas, datos y modelos de filas
  const table = useReactTable({
    columns,
    // Definición de columnas
    data,
    // Datos de entrada
    getCoreRowModel: getCoreRowModel(), 
    // Modelo base de filas
    getSortedRowModel: getSortedRowModel(), 
    // Habilita ordenamiento
    getPaginationRowModel: getPaginationRowModel(),
    // Habilita paginación
  });


  return (
    <div className="overflow-x-auto rounded-lg overflow-y-auto">

      <table className="w-full border-collapse">

        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-[#4F81BD] text-white">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left text-sm font-medium border-r border-white last:border-r-0"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}

          <tr className="border-b border-gray-200"/>

        </thead>


        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              className={` bg-[#4F81BD] hover:bg-white  border-b border-gray-200`}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-4 py-3 text-sm text-gray-700 hover:text-[#73adf5] border-r border-gray-200 last:border-r-0"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );

};

// Exporta el componente para su uso en otras partes de la aplicación
export default Table;




