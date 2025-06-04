import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from '../baseQueryWithAuth';

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const registerApi = createApi({
  reducerPath: 'registerApi',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Grades'],

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
