import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const registerApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: NEXT_PUBLIC_BASE_URL + '/api',
  }),

  endpoints: (builder) => ({

    postIncriptionGuardian: builder.mutation({
      query: (data) => ({
        url: '/guardians',
        method: 'POST',
        body: data,
      }),
    }),
    postIncriptionCompetitor: builder.mutation({
      query: (data) => ({
        url: '/competitors',
        method: 'POST',
        body: data,
      }),
    }),
    getCompetitors: builder.query({
      query: () => ({
        url: '/competitors',
        method: 'GET',
      }),
    }),

    getGrades: builder.query({
      query: () => ({
        url: '/grades',
        method: 'GET',
      }),
    }),
  })
});

export const {
  usePostIncriptionGuardianMutation,
  usePostIncriptionCompetitorMutation,
  useGetGradesQuery,
  useGetCompetitorsQuery,
} = registerApi;
