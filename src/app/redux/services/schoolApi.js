import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from '../baseQueryWithAuth';
const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const schoolApi = createApi({
  reducerPath: 'schoolApi',
  baseQuery: baseQueryWithAuth,

  tagTypes: ['Schools'],
  endpoints: (builder) => ({
    getSchools: builder.query({
      query: () => ({
        url: '/schools',
        method: 'GET',
      }),
      providesTags: ['Schools']
    }),
  })
});

export const {
    useGetSchoolsQuery
} = schoolApi;
