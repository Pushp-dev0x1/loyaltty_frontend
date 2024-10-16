import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const paymentService = createApi({
  reducerPath: "payment",
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://143.110.252.166:5500/api/payment',
    prepareHeaders: (headers, { getState }) => {
      const reducers = getState();
      const token = reducers?.authReducer?.userToken;
      headers.set("authorization", `Bearer whsec_eytJKal0qKSbMXwUdcXWh6XSPZHQVn5w` );
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      sendPayment: builder.mutation({
        query: (cart) => {
          return {
            url: "/process",
            method: "POST",
            body: cart,
          };
        },
      }),
      verifyPayment: builder.query({
        query: (id) => {
          return {
            url: `verify/${id}`,
            method: "GET",
          };
        },
      }),
      placeCashOnDeliveryOrder: builder.mutation({
        query: (orderData) => {
          return {
            url: "/place-cod-order",
            method: "POST",
            body: orderData,
          };
        },
      }),

    };
  },
});
export const { useSendPaymentMutation, useVerifyPaymentQuery,usePlaceCashOnDeliveryOrderMutation } = paymentService;
export default paymentService;
