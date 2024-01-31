import React from 'react'
import { Box } from '@mui/material'
import { Outlet, useLoaderData } from 'react-router-dom'
import TopBar from './components/TopBar'
import { useAccount, useTitle } from './context/global'

export default function App() {
  const {setAccount} = useAccount()
  const { title } = useTitle()
  const user: any = useLoaderData()

  React.useEffect(() => {
    setAccount(user)
  }, [])

  return (
    <div>
      <TopBar user={user} title={title} />
      <Box sx={{ my: 4 }}>
        <Outlet />
      </Box>
    </div>
  )
}
