'use client';
import RegisterOlympic from '@/components/registerOlympic';
import AuthGuard from '@/components/AuthGuard';
//pagina para el registro de olimpiadas
//codificacion
//estrcuturad de datos
//amigo
const RegisterOlympicPage = () => {
  return (
    <AuthGuard>
      <RegisterOlympic />
    </AuthGuard>
  );
};

export default RegisterOlympicPage;

