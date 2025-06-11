"use client"; // Indica que este componente se renderiza del lado del cliente
// Importaciones necesarias de React, Next.js y componentes personalizados
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/common/button";
import Input from "@/common/input";
import Label from "@/common/label";
import FormContainer from "@/common/formContainer";
import FormContent from "@/common/formContent";
import Title from "@/common/title";
import Text from "@/common/text";
import { Person, Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { useRegisterMutation } from "@/app/redux/services/authApi";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/app/redux/slice/userSlice";
import Modal from "./modal/modal";


// Componente principal de registro de usuarios
const RegisterPage = () => {
  const router = useRouter();// Hook para redireccionamiento
  const [openModal, setOpenModal] = useState(false);// Estado para controlar el modal de éxito
  const dispatch = useDispatch();// Hook para acciones Redux
  const [register] = useRegisterMutation();// Hook para llamar a la mutación de registro
  // Estado local para los datos del formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    is_admin: false, // Campo adicional para indicar si es administrador
  });
  const [error, setError] = useState(""); // Estado para mostrar errores
  const [showSuccessModal, setShowSuccessModal] = useState(false); // No se usa, puede eliminarse
  const [showPassword, setShowPassword] = useState(false); // Mostrar/ocultar contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Mostrar/ocultar confirmación
  // Maneja cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  // Alterna visibilidad del campo de contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // Alterna visibilidad del campo de confirmación de contraseña
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // Validación básica de campos vacíos
    if (!formData.name || !formData.email || !formData.password || !formData.password_confirmation) {
      setError("Por favor complete todos los campos");
      return;
    }
    // Verifica si las contraseñas coinciden
    if (formData.password !== formData.password_confirmation) {
      setError("Las contraseñas no coinciden");
      return;
    }
    
    try {
     // Intenta registrar al usuario 
     const response = await register(formData).unwrap();
     setOpenModal(true);
      
      
    } catch (err) {
      // Captura errores de la API
      setError("Error al registrar usuario. Inténtelo de nuevo.");
    }
  };

 

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        <FormContainer className="p-8">
          <Title title="Crear Cuenta" className="mb-6" />
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <FormContent onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre Completo</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Person className="text-gray-400" />
                </div>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Tu nombre completo"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Correo Electrónico</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Email className="text-gray-400" />
                </div>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="correo@ejemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-gray-400" />
                </div>
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Tu contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="pl-10 pr-10"
                />
                <div 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? 
                    <VisibilityOff className="text-gray-400" /> : 
                    <Visibility className="text-gray-400" />
                  }
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-gray-400" />
                </div>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  id="password_confirmation"
                  name="password_confirmation"
                  placeholder="Confirma tu contraseña"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  required
                  className="pl-10 pr-10"
                />
                <div 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? 
                    <VisibilityOff className="text-gray-400" /> : 
                    <Visibility className="text-gray-400" />
                  }
                </div>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-[#0f2e5a] hover:bg-[#16488d] text-white py-2 rounded-md mt-2"
            >
              Registrarse
            </Button>
          </FormContent>
          
          <div className="mt-4 text-center">
            <Text 
              text="¿Ya tienes una cuenta?" 
              className="inline mr-2"
            />
            <a 
              href="/auth/signIn" 
              className="text-[#0f2e5a] hover:text-[#16488d]"
            >
              Inicia sesión aquí
            </a>
          </div>
        </FormContainer>
        <Modal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          title="Registro Exitoso"
          iconType="success"
          primaryButtonText="Aceptar"
          onPrimaryClick={() => {
            setOpenModal(false);
            router.push("/auth/signIn");
          }}
        />
      </div>
    </div>
  );
};

export default RegisterPage;