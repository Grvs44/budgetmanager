import Cookies from 'js-cookie'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const headers = { 'X-CSRFToken': Cookies.get('csrftoken') }
const PARTIAL = -1
// From https://codesandbox.io/s/react-rtk-query-inifinite-scroll-8kj9bh
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/budgetmanager/api/' }),
  tagTypes: ['Budget'],
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: ()=>'user/me/',
    }),
    getBudgets: builder.query({
      query: (page = 0) => `budget/?offset=${page * 10}&limit=10`,
      providesTags: (data, error, arg) =>
        data
          ? [
              ...data.results.map(({ id }) => ({ type: 'Posts', id })),
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
      query: (body) => ({
        url: `budget/${body.id}/`,
        method: 'PATCH',
        body,
        headers,
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const query = await queryFulfilled
          dispatch(
            apiSlice.util.updateQueryData('getBudgets', undefined, (draft) => {
              draft.results[draft.results.indexOf((e) => e.id == id)] =
                query.data
            })
          )
          dispatch(
            apiSlice.util.updateQueryData('getBudget', undefined, (draft) => {
              draft[draft.indexOf((e) => e.id == id)] = query.data
            })
          )
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
  }),
})

export const {
  useGetCurrentUserQuery,
  useGetBudgetsQuery,
  useGetBudgetQuery,
  useCreateBudgetMutation,
  useUpdateBudgetMutation,
  useDeleteBudgetMutation,
} = apiSlice
