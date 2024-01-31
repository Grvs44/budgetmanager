// From https://stackoverflow.com/a/65705439/18309216
import React from 'react'

const TitleContext = React.createContext()
export const useTitle = () => React.useContext(TitleContext)

const AccountContext = React.createContext()
export const useAccount = () => React.useContext(AccountContext)

export const GlobalProvider = ({ children }) => {
  const [title, setTitle] = React.useState('Budget Manager')
  document.title = title

  const [account, setAccount] = React.useState({
    first_name: '',
    last_name: '',
    username: '',
  })

  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      <TitleContext.Provider value={{ title, setTitle }}>
        {children}
      </TitleContext.Provider>
    </AccountContext.Provider>
  )
}
