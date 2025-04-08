import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const areaApi = createApi({
  reducerPath: 'areaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: NEXT_PUBLIC_BASE_URL + '/api',
  }),

  endpoints: (builder) => ({
    getAreas : builder.query({
      query: () => ({
        url: '/areas',
        method: 'GET',
      }),
    }),
    getProvinces : builder.query({
      query: () => ({
        url: '/provinces',
        method: 'GET',
      }),
    }),
    getDepartments : builder.query({
      query: () => ({
        url: '/departments',
        method: 'GET',
      }),
    }),
    postArea : builder.mutation({
      query: (data) => ({
        url: '/areas',
        method: 'POST',
        body: data,
      }),
    }),
    deleteArea : builder.mutation({
      query: (id) => ({
        url: `/areas/${id}`,
        method: 'DELETE',
      }),
    }),
  })
});

export const {
  useGetAreasQuery,
  useGetProvincesQuery,
  useGetDepartmentsQuery,
  usePostAreaMutation,
  useDeleteAreaMutation,
} = areaApi;
