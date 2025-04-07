import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const registerApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: NEXT_PUBLIC_BASE_URL + ''
  }),

  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (signUp) => ({
        url: '/signUp',
        method: 'POST',
        body: signUp,
      }),
    }),
    logIn: builder.mutation({
      query: (credentials) => ({
        method: "POST",
        url: "/logIn",
        body: credentials,
      }),
    }),
    getUser : builder.query({
      query: () => ({
        url: `/todos/`,
        method: 'GET',
      }),
    }),
  })
});

export const {
  useSignUpMutation, 
  useLogInMutation,
  useGetUserQuery,
} = registerApi;
