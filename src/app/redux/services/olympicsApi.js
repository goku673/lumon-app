import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from '../baseQueryWithAuth';

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const olympicsApi = createApi({
  reducerPath: 'olympicsApi',
  baseQuery: baseQueryWithAuth,

  
  tagTypes: ['Olympics'],
  endpoints: (builder) => ({
    getOlympics: builder.query({
      query: () => ({
        url: '/olympics',
        method: 'GET',
      }),
      providesTags: ['Olympics']
    }),
    postIncriptionOlympics: builder.mutation({
      query: (data) => ({
        url: '/olympics',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Olympics']
    }),
  })
});

export const {
    usePostIncriptionOlympicsMutation,
    useGetOlympicsQuery,
} = olympicsApi;
