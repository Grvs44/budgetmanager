import Cookies from 'js-cookie'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const headers = { 'X-CSRFToken': Cookies.get('csrftoken') }
// From https://codesandbox.io/s/react-rtk-query-inifinite-scroll-8kj9bh
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/budgetmanager/api/' }),
  tagTypes: ['Budget'],
  endpoints: (builder) => ({
    getBudgets: builder.query({
      query: (page = 0) => `budget/?offset=${page * 10}&limit=10`,
      providesTags: ['Budget'],
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
    }),
    createBudget: builder.mutation({
      query: (body) => ({
        url: 'budget/',
        method: 'POST',
        body,
        headers,
      }),
      invalidatesTags: ['Budget'],
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
            apiSlice.util.updateQueryData('getBudget', undefined, (draft) => {
              draft.results.push(query.data)
              draft.results[draft.results.indexOf((e) => e.id == id)] =
                query.data
            })
          )
        } catch {
          console.log('useUpdateBudgetMutation error')
        }
      },
    }),
  }),
})

export const {
  useGetBudgetsQuery,
  useGetBudgetQuery,
  useCreateBudgetMutation,
  useUpdateBudgetMutation,
} = apiSlice
