import { createSlice } from '@reduxjs/toolkit'

export const titleSlice = createSlice({
  name: 'title',
  initialState: {
    title: 'Budget Manager'
  },
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload
      document.title = action.payload
    },
  },
})

export const { setTitle } = titleSlice.actions

export default titleSlice.reducer
