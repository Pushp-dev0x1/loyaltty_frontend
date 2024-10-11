// services/campaignHistoryService.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const campaignHistoryService = createApi({
    reducerPath: 'campaignHistoryService',
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
        getAllCampaigns: builder.query({
            query: () => '/campaignhistory'
        }),
        getCampaignsByMerchantId: builder.query({
            query: (merchantId) => `/campaignhistory/${merchantId}`
        }),
        deleteCampaign: builder.mutation({
            query: (id) => ({
                url: `/campaignhistory/${id}`,
                method: 'DELETE'
            })
        }),
        updateCampaignStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/campaignhistory/${id}/status`,
                method: 'PATCH',
                body: { status }
            })
        }),
        getCampaignsWithStatusZeroByMerchant: builder.query({
            query: (merchantId) => `/draftcampaignhistory/${merchantId}`
        }),
        getCampaignById: builder.query({
            query: (id) => `/campaignhistorybyid/${id}`
        }) ,
        getCampaignByUrl: builder.query({
            query: (url) => `/campaigns/url/${url}`
        })
    })
});

export const {
    useGetAllCampaignsQuery,
    useGetCampaignsByMerchantIdQuery,
    useDeleteCampaignMutation,
    useUpdateCampaignStatusMutation,
    useGetCampaignsWithStatusZeroByMerchantQuery,
    useGetCampaignByIdQuery ,
    useGetCampaignByUrlQuery
} = campaignHistoryService;

export default campaignHistoryService;
