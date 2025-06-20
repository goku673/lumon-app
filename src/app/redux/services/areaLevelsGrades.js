import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from '../baseQueryWithAuth';

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const areaLevelsGradesApi = createApi({
  reducerPath: 'areaLevelsGradesApi',
  baseQuery: baseQueryWithAuth,

  
   endpoints: (builder) => ({
    getAreaLevelsGrades : builder.query({
      query: () => ({
        url: '/areas_levels_grades',
        method: 'GET',
      }),
    }),
    postAreaLevelsGrades: builder.mutation({
      query: (data) => ({
        url: '/areas_levels_grades',
        method: 'POST',
        body: data,
      }),
    }),
    deleteAreaLevelsGrades: builder.mutation({
      query: (id) => ({
        url: `/areas_levels_grades/${id}`,
        method: 'DELETE',
      }),
    }), 
  })
});

export const {
    useGetAreaLevelsGradesQuery,
    usePostAreaLevelsGradesMutation,
    useDeleteAreaLevelsGradesMutation,
} = areaLevelsGradesApi;
