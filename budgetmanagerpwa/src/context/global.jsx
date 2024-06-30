// From https://stackoverflow.com/a/65705439/18309216
import React from 'react'

const AccountContext = React.createContext()
export const useAccount = () => React.useContext(AccountContext)

export const GlobalProvider = ({ children }) => {
  const [account, setAccount] = React.useState({
    first_name: '',
    last_name: '',
    username: '',
  })

  return (
    <AccountContext.Provider value={{ account, setAccount }}>
        {children}
    </AccountContext.Provider>
  )
}
