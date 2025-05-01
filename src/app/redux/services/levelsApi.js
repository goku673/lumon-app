import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const levelsApi = createApi({
  reducerPath: 'levelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: NEXT_PUBLIC_BASE_URL + '/api',
  }),
  tagTypes: ['Levels'],
  endpoints: (builder) => ({
    getLevels: builder.query({
      query: () => ({
        url: '/levels',
        method: 'GET',
      }),
      providesTags: ['Levels']
    }),
    postIncriptionLevels: builder.mutation({
      query: (data) => ({
        url: '/levels',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Levels']
    }),
  })
});

export const {
    useGetLevelsQuery,
    usePostIncriptionLevelsMutation,
} = levelsApi;
