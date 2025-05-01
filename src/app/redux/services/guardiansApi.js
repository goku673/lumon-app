import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const guardiansApi = createApi({
  reducerPath: 'guardiansApi',
  baseQuery: fetchBaseQuery({
    baseUrl: NEXT_PUBLIC_BASE_URL + '/api',
  }),
  tagTypes: ['Guardians'],
  endpoints: (builder) => ({
    getGuardians: builder.query({
      query: () => ({
        url: '/guardians',
        method: 'GET',
      }),
      providesTags: ['Guardians']
    }),
    postIncriptionGuardian: builder.mutation({
      query: (data) => ({
        url: '/guardians',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Guardians']
    }),
  })
});

export const {
    usePostIncriptionGuardianMutation,
    useGetGuardiansQuery,
} = guardiansApi;
