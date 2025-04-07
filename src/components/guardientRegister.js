"use client"
import { useState } from "react"

 const GuardianRegister = ({ onSubmit })  => {

  const [formData, setFormData] = useState({
    apellidoPaterno: "",
    apellidoMaterno: "",
    nombres: "",
    email: "",
    celular: "",
    comprobantePago: null,
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target

    if (name === "comprobantePago" && files && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-xl md:text-2xl font-medium text-center mb-6">
        DATOS DE PROFESOR/TUTOR (OPCIONAL)
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">
            Nombre del Profesor o Tutor:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                name="apellidoPaterno"
                placeholder="Apellido Paterno"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.apellidoPaterno}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="text"
                name="apellidoMaterno"
                placeholder="Apellido Materno"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.apellidoMaterno}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="text"
                name="nombres"
                placeholder="Nombre(s)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.nombres}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Correo electrónico:</label>
          <input
            type="email"
            name="email"
            placeholder="Ingrese un correo válido"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Celular:</label>
          <input
            type="tel"
            name="celular"
            placeholder="Ingrese un número válido"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.celular}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Comprobante de pago:</label>
          <div className="p-4 border border-dashed border-gray-300 rounded-md bg-gray-100 flex flex-col items-center">
            <label className="cursor-pointer bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md flex items-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Subir archivo
              <input
                type="file"
                name="comprobantePago"
                className="hidden"
                onChange={handleChange}
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </label>
            <p className="text-sm text-gray-500">
              Formatos aceptados: PDF, JPG, PNG
            </p>
            {formData.comprobantePago && (
              <p className="mt-2 text-sm text-green-600">
                Archivo seleccionado: {formData.comprobantePago.name}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-md flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Guardar los datos de inscripción
        </button>
      </form>
    </div>
  )
}

export default GuardianRegister;