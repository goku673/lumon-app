"use client"
import { useState } from "react"

const CompetitorRegister = ({ onSubmit }) =>{
  const [formData, setFormData] = useState({
    apellidoPaterno: "",
    apellidoMaterno: "",
    nombres: "",
    email: "",
    cedula: "",
    fechaNacimiento: "",
    colegio: "",
    curso: "",
    departamento: "",
    provincia: "",
    area: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-xl md:text-2xl font-medium text-center mb-6">DATOS DEL COMPETIDOR</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Nombre del Competidor:</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                name="apellidoPaterno"
                placeholder="Apellido Paterno"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.apellidoPaterno}
                onChange={handleChange}
                required
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
                required
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
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 mb-2">Correo Electrónico:</label>
            <input
              type="email"
              name="email"
              placeholder="Ingrese un correo válido"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Cédula Identidad:</label>
            <input
              type="text"
              name="cedula"
              placeholder="Ingrese CI"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formData.cedula}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Fecha de nacimiento:</label>
            <input
              type="text"
              name="fechaNacimiento"
              placeholder="Ejemplo: 10/02/2024"
              pattern="\d{2}/\d{2}/\d{4}"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Colegio:</label>
          <input
            type="text"
            name="colegio"
            placeholder="Ingrese el Nombre de Su Colegio"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.colegio}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 mb-2">Curso:</label>
            <select
              name="curso"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formData.curso}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione el curso</option>
              <option value="1">1ro Secundaria</option>
              <option value="2">2do Secundaria</option>
              <option value="3">3ro Secundaria</option>
              <option value="4">4to Secundaria</option>
              <option value="5">5to Secundaria</option>
              <option value="6">6to Secundaria</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Departamento:</label>
            <select
              name="departamento"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formData.departamento}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione el departamento</option>
              <option value="LP">La Paz</option>
              <option value="CB">Cochabamba</option>
              <option value="SC">Santa Cruz</option>
              <option value="OR">Oruro</option>
              <option value="PT">Potosí</option>
              <option value="CH">Chuquisaca</option>
              <option value="TJ">Tarija</option>
              <option value="BE">Beni</option>
              <option value="PD">Pando</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Provincia:</label>
            <select
              name="provincia"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formData.provincia}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione su provincia</option>
              <option value="prov1">Provincia 1</option>
              <option value="prov2">Provincia 2</option>
              <option value="prov3">Provincia 3</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Área a la que se Inscribe:</label>
          <select
            name="area"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.area}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione el área deseado</option>
            <option value="matematica">Matemática</option>
            <option value="fisica">Física</option>
            <option value="quimica">Química</option>
            <option value="biologia">Biología</option>
            <option value="informatica">Informática</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-md flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          Continuar
        </button>
      </form>
    </div>
  )
}

export default CompetitorRegister;
