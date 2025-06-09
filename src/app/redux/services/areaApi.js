import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../baseQueryWithAuth";
const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
//Tipo de query
//query: para obtener datos
//mutation: para modificar datos

export const areaApi = createApi({
  //Definir reducerPath
  reducerPath: "areaApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Areas", "Provinces", "Departments"],

  //Definir endpoints
  endpoints: (builder) => ({
    getAreas: builder.query({
      query: () => ({
        url: "/areas",
        method: "GET",
      }),
      invalidatesTags: ["Areas"],
    }),
    getProvinces: builder.query({
      query: () => ({
        url: "/provinces",
        method: "GET",
      }),
      providesTags: ["Provinces"],
    }),
    getDepartments: builder.query({
      query: () => ({
        url: "/departments",
        method: "GET",
      }),
      providesTags: ["Departments"],
    }),
    postIncriptionArea: builder.mutation({
      query: (data) => ({
        url: "/areas",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Areas"],
    }),
    deleteArea: builder.mutation({
      query: (id) => ({
        url: `/areas/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Areas"],
    }),
  }),
});

//Exportar las queries y mutations
export const {
  useGetAreasQuery,
  useGetProvincesQuery,
  useGetDepartmentsQuery,
  usePostIncriptionAreaMutation,
  useDeleteAreaMutation,
} = areaApi;
