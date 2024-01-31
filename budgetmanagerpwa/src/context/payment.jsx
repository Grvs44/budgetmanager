import React from "react";
import { PayeeProvider } from "./payee";
import { ObjectProvider } from "./object";

export const PaymentContext = React.createContext()

export const PaymentProvider = ({children}) => {
  return (
    <PayeeProvider>
      <ObjectProvider Context={PaymentContext}>
        {children}
      </ObjectProvider>
    </PayeeProvider>
  )
}
