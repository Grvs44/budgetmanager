import React from 'react'
import { BudgetProvider } from './budget'
import { ObjectProvider } from './object'

export const PayeeContext = React.createContext()

export const PayeeProvider = ({ children }) => {
  return (
    <BudgetProvider>
      <ObjectProvider Context={PayeeContext}>
        {children}
      </ObjectProvider>
    </BudgetProvider>
  )
}
