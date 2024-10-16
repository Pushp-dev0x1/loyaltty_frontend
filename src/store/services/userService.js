// services/userService.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userService = createApi({
  reducerPath: "userService",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://64.227.154.213:5500/api", // Base URL for your API
    prepareHeaders: (headers, { getState }) => {
      const state = getState();
      const token = state?.auth?.token;
      headers.set("authorization", token ? `Bearer ${token}` : "");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    getUsersByMerchant: builder.query({
      query: (merchantId) => ({
        url: `/users/merchant/${merchantId}`,
        method: "GET",
      }),
    }),
    createUser: builder.mutation({
      query: (userData) => ({
        url: "/users",
        method: "POST",
        body: userData,
      }),
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    }),
    uploadBulkUsers: builder.mutation({
      query: (file) => ({
        url: "/uploadBulkUsers",
        method: "POST",
        body: file,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUsersByMerchantQuery,
  useCreateUserMutation,
  useGetUserByIdQuery,
  useDeleteUserMutation,
  useUploadBulkUsersMutation,
} = userService;

export default userService;
