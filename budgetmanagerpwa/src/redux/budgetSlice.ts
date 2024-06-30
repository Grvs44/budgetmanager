import { createSlice } from '@reduxjs/toolkit'
import { BudgetState } from './types'

const initialState: BudgetState = {
  budgets: [],
}

export const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    addBudgets: (state, action) => {
      state.budgets = state.budgets.concat(action.payload)
    },
    clearBudgets: (state) => {
      state.budgets = []
    },
    replaceBudgets: (state, action) => {
      state.budgets = action.payload
    },
  },
})

export const { addBudgets, clearBudgets, replaceBudgets } = budgetSlice.actions

export default budgetSlice.reducer
