import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../utils/API_CONFIG';

export const medicinedelAPI = createApi({
  reducerPath: 'medicinedelAPI',
  tagTypes: ['Items', 'Orders'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => '/items',
      providesTags: (result) => {
        return result
          ? [...result.map(({ id }) => ({ type: 'Items', id })), { type: 'Items', id: 'LIST' }]
          : [{ type: 'Items', id: 'LIST' }];
      },
    }),
    getItemById: builder.query({
      query: (itemId) => `items/${itemId}`,
    }),
    addItem: builder.mutation({
      query: (body) => ({
        url: 'items',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Items', id: 'LIST' }],
    }),
    updateItem: builder.mutation({
      query: (data) => {
        console.log(data);

        const { _id, ...body } = data;
        console.log(data);
        return {
          url: `items/${_id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: [{ type: 'Items', id: 'LIST' }],
    }),
    placeOrder: builder.mutation({
      query: (body) => ({
        url: 'orders',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
    }),
    getOrders: builder.query({
      query: () => '/orders',
      providesTags: (result) => {
        return result
          ? [...result.map(({ id }) => ({ type: 'Orders', id })), { type: 'Orders', id: 'LIST' }]
          : [{ type: 'Orders', id: 'LIST' }];
      },
    }),
  }),
});

export const {
  useGetItemsQuery,
  useGetItemByIdQuery,
  useUpdateItemMutation,
  useAddItemMutation,
  usePlaceOrderMutation,
  useGetOrdersQuery,
} = medicinedelAPI;
