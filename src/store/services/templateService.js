// services/templateService.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const templateService = createApi({
    reducerPath: 'templateService',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://64.227.154.213:5500/api/templates',
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
        getAllWhatsAppTemplates: builder.query({
            query: () => ({
                url: '/getall/whatsappTemplates',
                method: 'GET'
            })
        }),
        getAllSMSTemplates: builder.query({
            query: () => ({
                url: '/getall/smsTemplates',
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
    useGetTemplatesByRewardTypeQuery,
    useGetAllWhatsAppTemplatesQuery,
    useGetAllSMSTemplatesQuery
} = templateService;

export default templateService;
