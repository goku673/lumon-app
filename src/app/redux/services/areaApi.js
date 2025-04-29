import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const areaApi = createApi({
  reducerPath: 'areaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: NEXT_PUBLIC_BASE_URL + '/api',
  }),

  // change area_level_grades
  endpoints: (builder) => ({
    getAreas : builder.query({
      query: () => ({
        url: '/areas',
        method: 'GET',
      }),
    }),
    getProvinces: builder.query({
      query: () => ({
        url: '/provinces',
        method: 'GET',
      }),
    }),
    getDepartments: builder.query({
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
    getAreaLevelGrades: builder.query({
      query: () => ({
        url: '/areas_levels_grades',
        method: 'GET',
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
  useGetAreaLevelGradesQuery,
} = areaApi;
