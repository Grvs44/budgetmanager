import React from 'react'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import TopBar from './components/TopBar'
import { useSelector } from 'react-redux'
import { useGetCurrentUserQuery } from './redux/apiSlice'

export default function App() {
  const user = useGetCurrentUserQuery(null)
  const { title } = useSelector((state: { title: any }) => state.title)

  if (user.isLoading) {
    return <p>Loading...</p>
  } else {
    return (
      <div>
        <TopBar user={user.data} title={title} />
        <Box sx={{ my: 4 }}>
          <Outlet />
        </Box>
      </div>
    )
  }
}
