// services/templateCategoryService.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const templateCategoryService = createApi({
    reducerPath: 'templateCategoryService',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://64.227.154.213:5500/api/templateCategories',
        prepareHeaders: (headers, { getState }) => {
            const state = getState();
            const token = state?.auth?.token;
            headers.set('authorization', token ? `Bearer ${token}` : '');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (categoryData) => ({
                url: '/',
                method: 'POST',
                body: categoryData
            })
        }),
        getAllCategories: builder.query({
            query: () => ({
                url: '/',
                method: 'GET'
            })
        }),
        getCategoryById: builder.query({
            query: (id) => ({
                url: `/${id}`,
                method: 'GET'
            })
        }),
        updateCategory: builder.mutation({
            query: ({ id, categoryData }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: categoryData
            })
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            })
        })
    })
});

export const {
    useCreateCategoryMutation,
    useGetAllCategoriesQuery,
    useGetCategoryByIdQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
} = templateCategoryService;

export default templateCategoryService;
