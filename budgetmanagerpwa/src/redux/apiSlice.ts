import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
import type {
  Budget,
  Entity,
  PageState,
  Payee,
  PayeeSearch,
  Payment,
  SubmitBudget,
  SubmitPayee,
  SubmitPayment,
  UpdateBudget,
  UpdatePayee,
  UpdatePayment,
  User,
  UserLogin,
} from './types'

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

// Adapted from https://stackoverflow.com/a/74844699
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    // prepareHeaders adapted from https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery#setting-default-headers-on-requests
    prepareHeaders(headers, api) {
      if (api.type == 'query') return
      const csrfToken = Cookies.get('csrftoken')
      if (csrfToken) headers.set('X-CSRFToken', csrfToken)
    },
  }),
  tagTypes: ['Budget', 'BudgetTotal', 'Payee', 'PayeeTotal', 'Payment', 'User'],
  endpoints: (builder) => ({
    // User
    getCurrentUser: builder.query<User | undefined, void>({
      query: () => 'user/me/',
      providesTags: (result) =>
        result ? [{ type: 'User', id: result.id }] : [],
      keepUnusedDataFor: 60000,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const query = await queryFulfilled
        if (query.data) {
          dispatch(
            apiSlice.util.upsertQueryData('getUser', query.data.id, query.data),
          )
        }
      },
    }),
    // login,logout adapted from Grvs44/Inclusive-Venues
    login: builder.mutation<void, UserLogin>({
      query: (body) => ({
        url: 'user/login/',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const query = await queryFulfilled
        dispatch(
          apiSlice.util.updateQueryData(
            'getCurrentUser',
            undefined,
            () => query.data,
          ),
        )
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'user/logout/',
        method: 'POST',
      }),
      invalidatesTags: [
        { type: 'Budget' },
        { type: 'BudgetTotal' },
        { type: 'Payee' },
        { type: 'PayeeTotal' },
        { type: 'Payment' },
        { type: 'User' },
      ],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
        dispatch(
          apiSlice.util.updateQueryData(
            'getCurrentUser',
            undefined,
            () => undefined,
          ),
        )
      },
    }),
    getUser: builder.query<User, any>({
      query: (id) => `user/${id}/`,
      keepUnusedDataFor: 60000,
    }),
    getTotal: builder.query<number, void>({
      query: () => 'total/',
    }),
    joinBudget: builder.mutation({
      query: (body) => ({
        url: 'join/',
        method: 'POST',
        body,
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
    getBudget: builder.query<Budget, number | null | undefined>({
      query: (id) => `budget/${id}/`,
      providesTags: (data, error, arg) => [{ type: 'Budget', id: data?.id }],
    }),
    getBudgetTotal: builder.query<string, number | null | undefined>({
      query: (id) => `budget/${id}/total/`,
      providesTags: (_r, _e, id) => [{ type: 'BudgetTotal', id: id || '' }],
    }),
    createBudget: builder.mutation<Budget, SubmitBudget>({
      query: (body) => ({
        url: 'budget/',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Budget', id: PARTIAL }],
    }),
    updateBudget: builder.mutation<Budget, UpdateBudget>({
      query: ({ id, ...body }) => ({
        url: `budget/${id}/`,
        method: 'PATCH',
        body,
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
              () => query.data,
            ),
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
            }),
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
      }),
      invalidatesTags: [{ type: 'Budget', id: PARTIAL }],
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
    getPayee: builder.query<Payee, number | null | undefined>({
      query: (id) => `payee/${id}/`,
      providesTags: (data, error, arg) => [{ type: 'Payee', id: data?.id }],
    }),
    getPayeeTotal: builder.query<string, number | null | undefined>({
      query: (id) => `payee/${id}/total/`,
      providesTags: (_r, _e, id) => [{ type: 'PayeeTotal', id: id || '' }],
    }),
    createPayee: builder.mutation<Payee, SubmitPayee>({
      query: (body) => ({
        url: 'payee/',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Payee', id: PARTIAL }],
    }),
    updatePayee: builder.mutation<Payee, UpdatePayee>({
      query: ({ id, ...body }) => ({
        url: `payee/${id}/`,
        method: 'PATCH',
        body,
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
                e.id == id ? query.data : e,
              )
              console.log('a2')
              console.log(draft.results)
            }),
          )
          console.log('dispatched 1/2')
          dispatch(
            apiSlice.util.updateQueryData('getPayee', id, () => query.data),
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
      }),
      invalidatesTags: [{ type: 'Payee', id: PARTIAL }],
    }),

    // Payments
    getPayments: builder.query<PageState<Payment>, number | undefined>({
      query: (page = 0) =>
        `payment/?offset=${page * 10}&limit=10&ordering=-date`,
      providesTags: [{ type: 'Payment', id: PARTIAL }],
      serializeQueryArgs,
      merge,
      forceRefetch,
      keepUnusedDataFor: 0,
    }),
    getPayment: builder.query<Payment, number | null>({
      query: (id) => `payment/${id}/`,
      providesTags: (data, error, arg) => [{ type: 'Payment', id: data?.id }],
    }),
    createPayment: builder.mutation<Payment, SubmitPayment>({
      query: (body) => ({
        url: 'payment/',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Payment', id: PARTIAL }],
    }),
    updatePayment: builder.mutation<Payment, UpdatePayment>({
      query: ({ id, ...body }) => ({
        url: `payment/${id}/`,
        method: 'PATCH',
        body,
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
              const item = draft.results.find((e: Entity) => e.id === id)
              if (item == undefined) return
              const i = draft.results.indexOf(item)
              console.log(i)
              draft.results[i] = query.data
              console.log('a2')
              console.log(draft.results)
            }),
          )
          console.log('dispatched 1/2')
          dispatch(
            apiSlice.util.updateQueryData(
              'getPayment',
              query.data.id,
              () => query.data,
            ),
          )
          console.log('dispatched 2/2')
        } catch {
          console.log('useUpdatePaymentMutation error')
        }
      },
    }),
    deletePayment: builder.mutation<any, Entity>({
      query: ({ id }) => ({
        url: `payment/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Payment', id: PARTIAL }],
    }),
  }),
})

export const {
  useGetCurrentUserQuery,
  useLoginMutation,
  useLogoutMutation,
  useGetUserQuery,
  useGetTotalQuery,
  useJoinBudgetMutation,
  useGetBudgetsQuery,
  useGetBudgetsSearchQuery,
  useGetBudgetQuery,
  useGetBudgetTotalQuery,
  useCreateBudgetMutation,
  useUpdateBudgetMutation,
  useDeleteBudgetMutation,
  useGetPayeesQuery,
  useGetPayeesSearchQuery,
  useGetPayeeQuery,
  useGetPayeeTotalQuery,
  useCreatePayeeMutation,
  useUpdatePayeeMutation,
  useDeletePayeeMutation,
  useGetPaymentsQuery,
  useGetPaymentQuery,
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = apiSlice
