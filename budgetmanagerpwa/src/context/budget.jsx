import React from 'react'
import { ObjectProvider } from './object'

export const BudgetContext = React.createContext()

export const BudgetProvider = ({ children }) => {
  return (
    <ObjectProvider Context={BudgetContext}>
      {children}
    </ObjectProvider>
  )
}
