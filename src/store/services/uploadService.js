// services/uploadService.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const uploadService = createApi({
  reducerPath: 'uploadService',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://64.227.154.213:5500', // Adjust the base URL to match your backend URL
    prepareHeaders: (headers, { getState }) => {
      const state = getState();
      const token = state?.auth?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: '/upload',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useUploadImageMutation } = uploadService;
export default uploadService;
