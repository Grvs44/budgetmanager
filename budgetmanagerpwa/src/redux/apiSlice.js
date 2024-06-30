import Cookies from 'js-cookie'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// From https://codesandbox.io/s/react-rtk-query-inifinite-scroll-8kj9bh
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/budgetmanager/api/' }),
  endpoints: (builder) => ({
    getBudgets: builder.query({
      query: (page = 0) => `budget/?offset=${page * 10}&limit=10`,
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
        headers:{'X-CSRFToken': Cookies.get('csrftoken'),}
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const query = await queryFulfilled
          dispatch(
            apiSlice.util.updateQueryData('getBudgets', undefined, (draft) => {
              draft.results.push(query.data)
            })
          )
        } catch {
          console.log('useCreateBudgetMutation error')
        }
      },
    }),
  }),
})

export const {
  useGetBudgetsQuery,
  useGetBudgetQuery,
  useCreateBudgetMutation,
} = apiSlice
