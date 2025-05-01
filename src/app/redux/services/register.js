import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const registerApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: NEXT_PUBLIC_BASE_URL + '/api',
  }),

  endpoints: (builder) => ({
 
    

    getGrades: builder.query({
      query: () => ({
        url: '/grades',
        method: 'GET',
      }),
    }),
  })
});

export const {
  
  useGetGradesQuery,
 
} = registerApi;
