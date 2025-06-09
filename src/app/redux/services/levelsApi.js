// Importaciones necesarias de Redux Toolkit Query
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Importación de la configuración base de consulta que incluye autenticación
import { baseQueryWithAuth } from "../baseQueryWithAuth";

/**
 * API Slice para el manejo de niveles (levels) en la aplicación.
 * Utiliza Redux Toolkit Query para manejar el estado de las peticiones HTTP.
 */
export const levelsApi = createApi({
  // Ruta única para este slice en el store de Redux
  reducerPath: "levelsApi",
  // Configuración base para todas las peticiones (incluye autenticación)
  baseQuery: baseQueryWithAuth,

  // Tags para el manejo de cache y actualizaciones automáticas
  tagTypes: ["Levels"],

  // Endpoints de la API
  endpoints: (builder) => ({
    // Consulta para obtener todos los niveles
    getLevels: builder.query({
      query: () => ({
        url: "/levels",
        method: "GET",
      }),
      // Este endpoint proporciona datos que pueden ser etiquetados como 'Levels'
      providesTags: ["Levels"],
    }),

    // Mutación para crear un nuevo nivel
    postIncriptionLevels: builder.mutation({
      query: (data) => ({
        url: "/levels",
        method: "POST",
        body: data, // Datos del nivel a crear
      }),
      // Invalida la caché de 'Levels' para forzar la actualización
      invalidatesTags: ["Levels"],
    }),
  }), // Fin de endpoints
});

// Exportación de los hooks generados automáticamente por createApi
export const {
  useGetLevelsQuery, // Hook para obtener niveles
  usePostIncriptionLevelsMutation, // Hook para crear niveles
} = levelsApi;
