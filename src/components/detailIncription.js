import DetailField from "./form/DetailField";
import NameFields from "./form/nameFields";
import { useState } from "react"
import { useSelector } from "react-redux";
const DetailInscription = () => {

const { guardian } = useSelector((state) => state.guardian);

    return (
      <div className="min-h-screen  p-4 md:p-8">
        <div className="max-w-[1000px] mx-auto">
          <h1 className="text-3xl font-bold text-white text-center mb-8">Detalle de Incripcion</h1>
  
          <div className="mb-8">
            <h2 className="text-xl font-medium text-white text-center mb-4">DATOS DEL COMPETIDOR</h2>
            <div className="bg-white rounded-lg p-6">
              <NameFields title="Nombre del Competidor:" lastName="Auca" middleName="Chambi" firstName="Juan Pablo" />
  
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <DetailField label="Correo Electronico :" value="chambijuanpablo@gmail.com" />
                <DetailField label="Cedula Identidad:" value="15219329" />
                <DetailField label="Fecha de nacimieto :" value="27/09/2000" />
              </div>
  
              <DetailField label="Colegio:" value="Unidad Educativa Simon Bolivar" />
  
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <DetailField label="Curso:" value="2P" />
                <DetailField label="Departamento:" value="Cochabamba" />
                <DetailField label="Provincia" value="Quillacollo" />
              </div>
  
              <DetailField label="Area a la que se Inscribe:" value="Biologia" />
            </div>
          </div>
  
          <div className="mb-8">
            <h2 className="text-xl font-medium text-white text-center mb-4">DATOS DE PROFESOR O TUTOR</h2>
            <div className="bg-white rounded-lg p-6">
              <NameFields
                title="Nombre del Profesor o Tutor:"
                lastName="Lucero"
                middleName="Lopez"
                firstName="Fernando"
              />
              <DetailField label="Correo electronico" value="Fernando123@gmail.com" />

              <DetailField label="Celular" value="77705666" />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-medium text-white text-center mb-4">INFORMACION DE INSCRIPCION</h2>
            <div className="bg-white rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <DetailField label="Fecha de inscripcion" value="14/03/25" />
                <DetailField label="Estado Inscripcion" value="Completa" />
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium">Comprobante de pago</label>
                  <button className="w-full px-3 py-2 bg-white border rounded-md text-left text-gray-500">
                    Ver Comprobante
                  </button>
                </div>
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <DetailField label="Numero Comprobante" value="0000000001" />
                <DetailField label="Nombre del Pagador" value="Fernand Lopez Lucero" />
                <DetailField label="Cod de Inscripcion" value="0000001" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default DetailInscription;