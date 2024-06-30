import React from 'react'
import { Box } from '@mui/material'
import { Outlet, useLoaderData } from 'react-router-dom'
import TopBar from './components/TopBar'
import { useAccount } from './context/global'
import { useSelector } from 'react-redux'

export default function App() {
  const { setAccount } = useAccount()
  const user: any = useLoaderData()
  const { title } = useSelector((state: { title: any }) => state.title)

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
