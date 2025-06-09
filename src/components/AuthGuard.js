// Importaciones necesarias
import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Componente AuthGuard
 *
 * Este componente protege rutas que requieren autenticación.
 * Verifica la existencia de un token en el localStorage y redirige a la página de inicio de sesión
 * si el usuario no está autenticado.
 *
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos que estarán protegidos
 * @param {string} [props.tokenName="token"] - Nombre de la clave del token en el localStorage
 * @param {string} [props.redirectTo="/auth/signIn"] - Ruta a la que redirigir si no hay token
 * @returns {React.ReactNode} - Renderiza los hijos si hay token, de lo contrario redirige
 */
export default function AuthGuard({
  children,
  tokenName = "token",
  redirectTo = "/auth/signIn",
}) {
  const router = useRouter();

  // Efecto que se ejecuta al montar el componente y cuando cambian las dependencias
  useEffect(() => {
    // Verifica si estamos en el navegador (window está definido)
    // y busca el token en el localStorage
    const token =
      typeof window !== "undefined" ? localStorage.getItem(tokenName) : null;

    // Si no hay token, redirige a la página de inicio de sesión
    if (!token) {
      router.replace(redirectTo);
    }
  }, [router, tokenName, redirectTo]);

  // Renderiza los componentes hijos si existe el token, de lo contrario retorna null
  return children || null;
}
