import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const gradesApi = createApi({
  reducerPath: 'gradesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: NEXT_PUBLIC_BASE_URL + '/api',
  }),

  endpoints: (builder) => ({
    getGrades : builder.query({
      query: () => ({
        url: '/grades',
        method: 'GET',
      }),
    }),
    postIncriptionGrades: builder.mutation({
        query: (data) => ({
          url: '/grades',
          method: 'POST',
          body: data,
        }),
      }),
  })
});

export const {
    useGetGradesQuery,
    usePostIncriptionGradesMutation,
} = gradesApi;
