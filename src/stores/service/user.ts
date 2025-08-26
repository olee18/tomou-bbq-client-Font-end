import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import environment from "../../environment/environment.ts";
import {GetCookie} from "../../utils/function/set_cookie.ts";

export const userAPI = createApi({
    reducerPath: "user",
    tagTypes: ["User", "Menu", "Category", "Order", "Bill"],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:9966/web/",
        prepareHeaders: (headers) => {
            const token = GetCookie(environment.VITE_WEB_HEADER_NAME);
            if (token) headers.set(environment.VITE_WEB_HEADER, `Bearer ${token}`);
            return headers;
        },
    }),

    endpoints: (builder) => ({
        createCustomer: builder.mutation({
            query: (body) => ({
                url: `auth/customer-create`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['User'],
        }),

        insertBills: builder.mutation({
            query: (body) => ({
                url: `/crete-bill-by-table`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Bill'],
        }),

        createOrder: builder.mutation({
            query: (body) => ({
                url: `auth/order-create`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Order'],
        }),

        getMenus: builder.query({
            query: (body) => ({
                url: `auth/menu-get`,
                method: 'POST',
                body,
            }),
            providesTags: ['Menu'],
        }),

        getCategorytype: builder.query({
            query: (body) => ({
                url: `auth/category-get`,
                method: 'POST',
                body,
            }),
            providesTags: ['Category'],
        }),

        getOrderHistory: builder.query({
            query: (body) => ({
                url: `auth/order-get-by-table-id`,
                method: 'POST',
                body,
            }),
            providesTags: ['Order'],
        }),

        getDataCustomrId: builder.query({
            query: (body) => ({
                url: `auth/customer-by-id`,
                method: 'POST',
                body,
            }),
            providesTags: ['User'],
        }),

        getBillByCustomrId: builder.query({
            query: (body) => ({
                url: `bills-customer-id`,
                method: 'POST',
                body,
            }),
            providesTags: ['Bill'],
        }),
    }),
});
export const {
     useCreateCustomerMutation,
    useGetMenusQuery,
    useCreateOrderMutation,
    useGetCategorytypeQuery,
    useGetOrderHistoryQuery,
    useGetDataCustomrIdQuery,
    useInsertBillsMutation,
    useGetBillByCustomrIdQuery,
} = userAPI;