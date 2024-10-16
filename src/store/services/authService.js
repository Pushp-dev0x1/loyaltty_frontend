import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const authService = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://143.110.252.166:5500/api/',
        prepareHeaders: (headers, { getState }) => {
            const reducers = getState();
            const token = reducers?.authReducer?.token;
            headers.set('authorization', token ? `Bearer ${token}` : '');
            return headers;
        }
    }),
    endpoints: (builder) => {
       return {
           authLogin: builder.mutation({
               query: (loginData) => {
                   return {
                       url: 'login',
                       method: 'POST',
                       body: loginData
                   }
               }
           }),
           userRegister: builder.mutation({
            query: data => {
                return {
                    url: '/register',
                    method: 'POST',
                    body: data
                }
            }
           }),
           updateProfileimg: builder.mutation({
            query: (data) => ({
                url: '/updateprofileimg',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['auth']
        }),
           userLogin: builder.mutation({
            query: loginData => {
                return {
                    url: '/login',
                    method: 'POST',
                    body: loginData
                }
            }
           }),
           changePassword: builder.mutation({
            query: ({ oldPassword, newPassword,userId }) => ({
                url: '/change-password',
                method: 'PUT',
                body: { oldPassword, newPassword,userId }
            })
        }),
        getUserById: builder.query({
            query: (userId) => ({
                url: `/user/${userId}`,
                method: 'GET'
            }),
            providesTags: ['auth']
        }),
        updateProfile: builder.mutation({
            query: (body) => ({
                url: '/update-profile',
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ['auth']
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: '/getallusers',
                method: 'POST'
            })
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/user/${userId}`,
                method: 'DELETE'
            })
        }),
        getNearbyUsers: builder.query({
            query: ({ latitude, longitude }) => ({
                url: `/usersnearby`,
                method: 'POST',
                body: { latitude, longitude }
            })
        }),
        getNearbyUserPets: builder.query({
            query: ({ latitude, longitude,totalnum }) => ({
                url: `/usersnearby/pets`,
                method: 'POST',
                body: { latitude, longitude,totalnum }
            })
        }),
        searchUsersAndPets: builder.query({
            query: (name) => ({
              url: `/searchusers?name=${name}`,
              method: 'POST'
            })
          }),
          getPolicypages: builder.query({
            query: (name) => ({
              url: `/allpolicy-pages`,
              method: 'POST'
            })
          }),
        
       }
    }
});
export const {useAuthLoginMutation, useUserRegisterMutation,useUpdateProfileimgMutation, useUserLoginMutation,useUpdateProfileMutation,useGetUserByIdQuery,useChangePasswordMutation,useGetAllUsersQuery,useDeleteUserMutation,useGetNearbyUsersQuery,useGetNearbyUserPetsQuery,useSearchUsersAndPetsQuery,useGetPolicypagesQuery} = authService
export default authService