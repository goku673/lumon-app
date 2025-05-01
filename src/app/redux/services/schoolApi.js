import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const schoolApi = createApi({
  reducerPath: 'schoolApi',
  baseQuery: fetchBaseQuery({
    baseUrl: NEXT_PUBLIC_BASE_URL + '/api',
  }),
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
