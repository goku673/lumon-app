import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const competitorsApi = createApi({
  reducerPath: 'competitorsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${NEXT_PUBLIC_BASE_URL}/api`,
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Competitor'],
  endpoints: (builder) => ({
    getCompetitors: builder.query({
      query: () => ({
        url: 'competitors',
        method: 'GET',
      }),
      providesTags: (result = []) =>
        result.map((c) => ({ type: 'Competitor', id: c.id })),
    }),
    postInscriptionCompetitor: builder.mutation({
      query: (data) => ({
        url: 'competitors',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Competitor', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetCompetitorsQuery,
  usePostInscriptionCompetitorMutation,
} = competitorsApi;
