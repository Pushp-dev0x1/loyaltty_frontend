// services/campaignService.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const campaignService = createApi({
    reducerPath: 'campaignService',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://64.227.154.213:5500/api', // Base URL for your API
        prepareHeaders: (headers, { getState }) => {
            const state = getState();
            const token = state?.auth?.token;
            headers.set('authorization', token ? `Bearer ${token}` : '');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        createCampaign: builder.mutation({
            query: (campaignData) => ({
                url: '/campaigns',
                method: 'POST',
                body: campaignData
            })
        }),
        updateCampaign: builder.mutation({
            query: (campaignData) => ({
                url: '/update/campaigns',
                method: 'PUT',
                body: campaignData
            })
        }),
        finalizeCampaign: builder.mutation({
            query: (campaignData) => ({
                url: '/finalize/campaigns',
                method: 'PUT',
                body: campaignData
            })
        })
    })
});

export const {
    useCreateCampaignMutation,
    useUpdateCampaignMutation,
    useFinalizeCampaignMutation
} = campaignService;

export default campaignService;
