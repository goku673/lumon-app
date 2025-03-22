"use client";
import React from "react";

const Inscription = () => {
  return (
    <div className="min-h-screen bg-primary-600 p-8">
      <h1 className="text-4xl text-white text-center mb-8">
        Inscripcion a las Olimpiadas
      </h1>

      {/* Competitor Data Section */}
      <div className="bg-white rounded-lg p-6 mb-8">
        <h2 className="text-xl text-center mb-6">DATOS DEL COMPETIDOR</h2>

        <div className="space-y-6">
          <div>
            <label className="block mb-2">Nombre del Competidor:</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Apellido Paterno"
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Apellido Materno"
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Nombre(s)"
                className="p-2 border rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2">Correo Electronico:</label>
              <input
                type="email"
                placeholder="Ingrese un correo valido"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Cedula Identidad:</label>
              <input
                type="text"
                placeholder="Ingrese CI"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Fecha de nacimiento:</label>
              <input
                type="text"
                placeholder="Ejemplo : 10/02/2024"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2">Colegio:</label>
            <input
              type="text"
              placeholder="Ingrese el Nombre de Su Colegio"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2">Curso:</label>
              <select className="w-full p-2 border rounded">
                <option>Seleccione el curso</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Departamento:</label>
              <select className="w-full p-2 border rounded">
                <option>Seleccione el departamento</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Provincia:</label>
              <select className="w-full p-2 border rounded">
                <option>Seleccione su provincia</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-2">Area a la que se Inscribe:</label>
            <select className="w-full p-2 border rounded">
              <option>Seleccione el area deseado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Teacher Data Section */}
      <div className="bg-white rounded-lg p-6 mb-8">
        <h2 className="text-xl text-center mb-6">
          DATOS DE PROFESOR/TUTOR (OPCIONAL)
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block mb-2">Nombre del Profesor o Tutor:</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Apellido Paterno"
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Apellido Materno"
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Nombre(s)"
                className="p-2 border rounded"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2">Correo electronico:</label>
            <input
              type="email"
              placeholder="Ingrese un correo valido"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-2">Celular:</label>
            <input
              type="tel"
              placeholder="Ingrese un numero valido"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-2">Comprobante de pago:</label>
            <div className="border border-gray-300 rounded p-4 bg-gray-50 text-center text-gray-400">
              Subir archivo
            </div>
          </div>
        </div>
      </div>

      <button className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6a1 1 0 10-2 0v5.586l-1.293-1.293z" />
        </svg>
        Guardar los datos de inscripcion
      </button>
    </div>
  );
};

export default Inscription;
