import Cookies from 'js-cookie'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const headers = { 'X-CSRFToken': Cookies.get('csrftoken') }
const PARTIAL = -1
// From https://codesandbox.io/s/react-rtk-query-inifinite-scroll-8kj9bh
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/budgetmanager/api/' }),
  tagTypes: ['Budget', 'Payee', 'Payment'],
  endpoints: (builder) => ({
    // User
    getCurrentUser: builder.query({
      query: () => 'user/me/',
    }),
    getUser: builder.query({
      query: (id) => `user/${id}/`,
      keepUnusedDataFor: 60000,
    }),

    // Budgets
    getBudgets: builder.query({
      query: (page = 0) => `budget/?offset=${page * 10}&limit=10`,
      providesTags: (data, error, arg) =>
        data
          ? [
              ...data.results.map(({ id }) => ({ type: 'Budget', id })),
              { type: 'Budget', id: PARTIAL },
            ]
          : [{ type: 'Budget', id: PARTIAL }],
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      merge: (currentCache, newItems) => {
        currentCache.results.push(...newItems.results)
        currentCache.next = newItems.next
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      keepUnusedDataFor: 0,
    }),
    getBudget: builder.query({
      query: (id) => `budget/${id}/`,
      providesTags: ({ id }, error, arg) => [{ type: 'Budget', id }],
    }),
    createBudget: builder.mutation({
      query: (body) => ({
        url: 'budget/',
        method: 'POST',
        body,
        headers,
      }),
      invalidatesTags: [{ type: 'Budget', id: PARTIAL }],
    }),
    updateBudget: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `budget/${id}/`,
        method: 'PATCH',
        body,
        headers,
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          console.log('starting')
          const query = await queryFulfilled
          console.log(query.data)
          console.log('fulfilled')
          dispatch(
            apiSlice.util.updateQueryData('getBudgets', undefined, (draft) => {
              console.log('a1')
              console.log(draft)
              const i = draft.results.indexOf((e) => e.id == id)
              console.log(draft.results.find((e) => e.id === id))
              console.log(i)
              draft.results[i] = query.data
              console.log('a2')
              console.log(draft.results)
            })
          )
          console.log('dispatched 1/2')
          dispatch(
            apiSlice.util.updateQueryData('getBudget', undefined, (draft) => {
              console.log('b1')
              console.log(draft)
              draft[draft.indexOf((e) => e.id == id)] = query.data
              console.log('b2')
              console.log(draft)
            })
          )
          console.log('dispatched 2/2')
        } catch {
          console.log('useUpdateBudgetMutation error')
        }
      },
    }),
    deleteBudget: builder.mutation({
      query: ({ id }) => ({
        url: `budget/${id}/`,
        method: 'DELETE',
        headers,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Budget', id },
        { type: 'Budget', id: PARTIAL },
      ],
    }),

    // Payees
    getPayees: builder.query({
      query: (page = 0) => `budget/?offset=${page * 10}&limit=10`,
      providesTags: (data, error, arg) =>
        data
          ? [
              ...data.results.map(({ id }) => ({ type: 'Budget', id })),
              { type: 'Budget', id: PARTIAL },
            ]
          : [{ type: 'Budget', id: PARTIAL }],
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      merge: (currentCache, newItems) => {
        currentCache.results.push(...newItems.results)
        currentCache.next = newItems.next
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      keepUnusedDataFor: 0,
    }),
    getPayee: builder.query({
      query: (id) => `payee/${id}/`,
      providesTags: ({ id }, error, arg) => [{ type: 'Payee', id }],
    }),
    createPayee: builder.mutation({
      query: (body) => ({
        url: 'payee/',
        method: 'POST',
        body,
        headers,
      }),
      invalidatesTags: [{ type: 'Payee', id: PARTIAL }],
    }),
    updatePayee: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `payee/${id}/`,
        method: 'PATCH',
        body,
        headers,
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          console.log('starting')
          const query = await queryFulfilled
          console.log(query.data)
          console.log('fulfilled')
          dispatch(
            apiSlice.util.updateQueryData('getPayees', undefined, (draft) => {
              console.log('a1')
              console.log(draft)
              const i = draft.results.indexOf((e) => e.id == id)
              console.log(draft.results.find((e) => e.id === id))
              console.log(i)
              draft.results[i] = query.data
              console.log('a2')
              console.log(draft.results)
            })
          )
          console.log('dispatched 1/2')
          dispatch(
            apiSlice.util.updateQueryData('getPayee', undefined, (draft) => {
              console.log('b1')
              console.log(draft)
              draft[draft.indexOf((e) => e.id == id)] = query.data
              console.log('b2')
              console.log(draft)
            })
          )
          console.log('dispatched 2/2')
        } catch {
          console.log('useUpdatePayeeMutation error')
        }
      },
    }),
    deletePayee: builder.mutation({
      query: ({ id }) => ({
        url: `payee/${id}/`,
        method: 'DELETE',
        headers,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Payee', id },
        { type: 'Payee', id: PARTIAL },
      ],
    }),

    // Payments
    getPayments: builder.query({
      query: (page = 0) => `payment/?offset=${page * 10}&limit=10`,
      providesTags: (data, error, arg) =>
        data
          ? [
              ...data.results.map(({ id }) => ({ type: 'Payment', id })),
              { type: 'Payment', id: PARTIAL },
            ]
          : [{ type: 'Payment', id: PARTIAL }],
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      merge: (currentCache, newItems) => {
        currentCache.results.push(...newItems.results)
        currentCache.next = newItems.next
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      keepUnusedDataFor: 0,
    }),
    getPayment: builder.query({
      query: (id) => `payment/${id}/`,
      providesTags: ({ id }, error, arg) => [{ type: 'Payment', id }],
    }),
    createPayment: builder.mutation({
      query: (body) => ({
        url: 'payment/',
        method: 'POST',
        body,
        headers,
      }),
      invalidatesTags: [{ type: 'Payment', id: PARTIAL }],
    }),
    updatePayment: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `payment/${id}/`,
        method: 'PATCH',
        body,
        headers,
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          console.log('starting')
          const query = await queryFulfilled
          console.log(query.data)
          console.log('fulfilled')
          dispatch(
            apiSlice.util.updateQueryData('getPayments', undefined, (draft) => {
              console.log('a1')
              console.log(draft)
              const i = draft.results.indexOf((e) => e.id == id)
              console.log(draft.results.find((e) => e.id === id))
              console.log(i)
              draft.results[i] = query.data
              console.log('a2')
              console.log(draft.results)
            })
          )
          console.log('dispatched 1/2')
          dispatch(
            apiSlice.util.updateQueryData('getPayment', undefined, (draft) => {
              console.log('b1')
              console.log(draft)
              draft[draft.indexOf((e) => e.id == id)] = query.data
              console.log('b2')
              console.log(draft)
            })
          )
          console.log('dispatched 2/2')
        } catch {
          console.log('useUpdatePaymentMutation error')
        }
      },
    }),
    deletePayment: builder.mutation({
      query: ({ id }) => ({
        url: `payment/${id}/`,
        method: 'DELETE',
        headers,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Payment', id },
        { type: 'Payment', id: PARTIAL },
      ],
    }),
  }),
})

export const {
  useGetCurrentUserQuery,
  useGetUserQuery,
  useGetBudgetsQuery,
  useGetBudgetQuery,
  useCreateBudgetMutation,
  useUpdateBudgetMutation,
  useDeleteBudgetMutation,
  useGetPayeesQuery,
  useGetPayeeQuery,
  useCreatePayeeMutation,
  useUpdatePayeeMutation,
  useDeletePayeeMutation,
  useGetPaymentsQuery,
  useGetPaymentQuery,
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = apiSlice
