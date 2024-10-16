// services/templateService.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const templateService = createApi({
    reducerPath: 'templateService',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://143.110.252.166:5500/api/templates',
        prepareHeaders: (headers, { getState }) => {
            const state = getState();
            const token = state?.auth?.token;
            headers.set('authorization', token ? `Bearer ${token}` : '');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getAllActiveTemplates: builder.query({
            query: () => ({
                url: '/',
                method: 'GET'
            })
        }),
        getTemplateById: builder.query({
            query: (id) => ({
                url: `/${id}`,
                method: 'GET'
            })
        }),
        createTemplate: builder.mutation({
            query: (templateData) => ({
                url: '/',
                method: 'POST',
                body: templateData
            })
        }),
        updateTemplateStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/${id}/status`,
                method: 'PUT',
                body: { status }
            })
        }),
        getTemplatesByCategory: builder.query({
            query: (categoryId) => ({
                url: `/category/${categoryId}`,
                method: 'GET'
            })
        }),
        getTemplatesByRewardType: builder.query({
            query: (rewardtype) => ({
                url: `/rewardtype/${rewardtype}`,
                method: 'GET'
            })
        }),
    })
});

export const {
    useGetAllActiveTemplatesQuery,
    useGetTemplateByIdQuery,
    useCreateTemplateMutation,
    useUpdateTemplateStatusMutation,
    useGetTemplatesByCategoryQuery,
    useGetTemplatesByRewardTypeQuery
} = templateService;

export default templateService;
