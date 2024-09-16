import Cookies from 'js-cookie'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  Budget,
  PageState,
  Entity,
  SubmitBudget,
  UpdateBudget,
  Payee,
  PayeeSearch,
  SubmitPayee,
  UpdatePayee,
} from './types'

const headers = { 'X-CSRFToken': Cookies.get('csrftoken') }
const PARTIAL = -1

const nullNumber = (value: string | null) => (value ? Number(value) : Infinity)

const getOffset = ({ next }: PageState<any>) =>
  next ? nullNumber(new URLSearchParams(next).get('offset')) : Infinity

const merge = <T>(currentCache: PageState<T>, responseData: PageState<T>) => {
  if (
    currentCache.count === responseData.count &&
    getOffset(currentCache) < getOffset(responseData)
  ) {
    currentCache.results.push(...responseData.results)
  } else {
    currentCache.results = responseData.results
  }
  currentCache.next = responseData.next
  currentCache.count = responseData.count
}

const serializeQueryArgs = ({ endpointName }: { endpointName: string }) => {
  return endpointName
}

const forceRefetch = <T>({
  currentArg,
  previousArg,
}: {
  currentArg: T
  previousArg: T
}) => currentArg !== previousArg

// From https://codesandbox.io/s/react-rtk-query-inifinite-scroll-8kj9bh
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.BASE_URL + import.meta.env.VITE_API_URL,
  }),
  tagTypes: ['Budget', 'Payee', 'Payment'],
  endpoints: (builder) => ({
    // User
    getCurrentUser: builder.query({
      query: () => 'user/me/',
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const query = await queryFulfilled
          dispatch(
            apiSlice.util.upsertQueryData('getUser', query.data.id, query.data)
          )
        } catch (e: any) {
          if (e.error.status === 403)
            location.replace(
              import.meta.env.VITE_LOGIN_URL + encodeURI(location.pathname)
            )
          else console.error(e)
        }
      },
    }),
    getUser: builder.query({
      query: (id) => `user/${id}/`,
      keepUnusedDataFor: 60000,
    }),
    getTotal: builder.query({
      query: () => 'total/',
    }),
    joinBudget: builder.mutation({
      query: (body) => ({
        url: 'join/',
        method: 'POST',
        body,
        headers,
      }),
    }),

    // Budgets
    getBudgets: builder.query<PageState<Budget>, number | undefined>({
      query: (page = 0) => `budget/?offset=${page * 10}&limit=10`,
      serializeQueryArgs,
      merge,
      forceRefetch,
      keepUnusedDataFor: 0,
      providesTags: [{ type: 'Budget', id: PARTIAL }],
    }),
    getBudgetsSearch: builder.query<string, string>({
      query: (name) =>
        'budget/?limit=10&ordering=-last_used&search=' + encodeURI(name),
    }),
    getBudget: builder.query<Budget, number|null|undefined>({
      query: (id) => `budget/${id}/`,
      providesTags: (data, error, arg) => [{ type: 'Budget', id: data?.id }],
    }),
    createBudget: builder.mutation<Budget, SubmitBudget>({
      query: (body) => ({
        url: 'budget/',
        method: 'POST',
        body,
        headers,
      }),
      invalidatesTags: [{ type: 'Budget', id: PARTIAL }],
    }),
    updateBudget: builder.mutation<Budget, UpdateBudget>({
      query: ({ id, ...body }) => ({
        url: `budget/${id}/`,
        method: 'PATCH',
        body,
        headers,
      }),
      async onQueryStarted({ id }: Entity, { dispatch, queryFulfilled }) {
        try {
          console.log('starting')
          const query = await queryFulfilled
          console.log('fulfilled')
          dispatch(
            apiSlice.util.updateQueryData(
              'getBudget',
              query.data.id,
              (draft) => query.data
            )
          )
          console.log('dispatched 1/2')
          dispatch(
            apiSlice.util.updateQueryData('getBudgets', undefined, (draft) => {
              const old = draft.results.find((e: Entity) => e.id === id)
              const upd = query.data
              if (old) {
                old.id = upd.id
                old.name = upd.name
                old.description = upd.description
                old.active = upd.active
              }
            })
          )
          console.log('dispatched 2/2')
        } catch {
          console.log('useUpdateBudgetMutation error')
        }
      },
    }),
    deleteBudget: builder.mutation<any, Entity>({
      query: ({ id }) => ({
        url: `budget/${id}/`,
        method: 'DELETE',
        headers,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Budget', id: PARTIAL },
      ],
    }),

    // Payees
    getPayees: builder.query<PageState<Payee>, number | undefined>({
      query: (page = 0) => `payee/?offset=${page * 10}&limit=10`,
      providesTags: [{ type: 'Payee', id: PARTIAL }],
      serializeQueryArgs,
      merge,
      forceRefetch,
      keepUnusedDataFor: 0,
    }),
    getPayeesSearch: builder.query<string, PayeeSearch>({
      query: ({ name, budget }) =>
        `payee/?limit=10&ordering=-last_used&budget=${
          budget.id
        }&search=${encodeURI(name)}`,
    }),
    getPayee: builder.query<Payee, number|null>({
      query: (id) => `payee/${id}/`,
      providesTags: (data, error, arg) => [{ type: 'Payee', id: data?.id }],
    }),
    createPayee: builder.mutation<Payee, SubmitPayee>({
      query: (body) => ({
        url: 'payee/',
        method: 'POST',
        body,
        headers,
      }),
      invalidatesTags: [{ type: 'Payee', id: PARTIAL }],
    }),
    updatePayee: builder.mutation<Payee, UpdatePayee>({
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
              draft.results = draft.results.map((e: Payee) =>
                e.id == id ? query.data : e
              )
              console.log('a2')
              console.log(draft.results)
            })
          )
          console.log('dispatched 1/2')
          dispatch(
            apiSlice.util.updateQueryData('getPayee', id, () => query.data)
          )
          console.log('dispatched 2/2')
        } catch {
          console.log('useUpdatePayeeMutation error')
        }
      },
    }),
    deletePayee: builder.mutation<any, Entity>({
      query: ({ id }) => ({
        url: `payee/${id}/`,
        method: 'DELETE',
        headers,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Payee', id: PARTIAL },
      ],
    }),

    // Payments
    getPayments: builder.query({
      query: (page = 0) =>
        `payment/?offset=${page * 10}&limit=10&ordering=-date`,
      providesTags: [{ type: 'Payment', id: PARTIAL }],
      serializeQueryArgs,
      merge,
      forceRefetch,
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
              const i = draft.results.indexOf((e: Entity) => e.id == id)
              console.log(draft.results.find((e: Entity) => e.id === id))
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
              draft[draft.indexOf((e: Entity) => e.id == id)] = query.data
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
        { type: 'Payment', id: PARTIAL },
      ],
    }),
  }),
})

export const {
  useGetCurrentUserQuery,
  useGetUserQuery,
  useGetTotalQuery,
  useJoinBudgetMutation,
  useGetBudgetsQuery,
  useGetBudgetsSearchQuery,
  useGetBudgetQuery,
  useCreateBudgetMutation,
  useUpdateBudgetMutation,
  useDeleteBudgetMutation,
  useGetPayeesQuery,
  useGetPayeesSearchQuery,
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
