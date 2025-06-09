import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../baseQueryWithAuth";

//Definir baseQuery
//Definir baseQuery

//Definir api
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithAuth,

  //Definir endpoints
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: credentials,
      }),
    }),
    //Definir login
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    //Definir logout
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),

    //Definir getUser
    getUser: builder.query({
      query: () => "/user",
    }),
  }),
});
//Definir exportaciones
export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUserQuery,
} = authApi;
//Definir exportaciones
