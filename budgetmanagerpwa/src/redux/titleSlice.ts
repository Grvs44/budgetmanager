import { createSlice } from '@reduxjs/toolkit'
import { Title } from './types'

const initialState: Title = {
  title: 'Budget Manager',
}

export const titleSlice = createSlice({
  name: 'title',
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload
      document.title = action.payload
    },
  },
})

export const { setTitle } = titleSlice.actions

export default titleSlice.reducer
