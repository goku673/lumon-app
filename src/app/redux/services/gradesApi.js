import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const gradesApi = createApi({
  reducerPath: 'gradesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: NEXT_PUBLIC_BASE_URL + '/api',
  }),
  tagTypes: ['Grades'],
  endpoints: (builder) => ({
    getGrades: builder.query({
      query: () => ({
        url: '/grades',
        method: 'GET',
      }),
      providesTags: ['Grades']
    }),
    postIncriptionGrades: builder.mutation({
      query: (data) => ({
        url: '/grades',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Grades']
    }),
  })
});

export const {
    useGetGradesQuery,
    usePostIncriptionGradesMutation,
} = gradesApi;
