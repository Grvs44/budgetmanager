import React from 'react'
import { Box, CircularProgress } from '@mui/material'
import { Outlet } from 'react-router-dom'
import TopBar from './containers/TopBar'
import { useDispatch, useSelector } from 'react-redux'
import { useGetCurrentUserQuery } from './redux/apiSlice'
import { setDeferredPrompt, setShow } from './redux/installSlice'
import { State } from './redux/types'

export default function App() {
  const dispatch = useDispatch()
  const user = useGetCurrentUserQuery(null)
  const { title } = useSelector((state: State) => state.title)

  window.addEventListener('beforeinstallprompt', (event: Event) => {
    event.preventDefault()
    console.log('install event')
    dispatch(setShow(true))
    dispatch(setDeferredPrompt(event))
  })

  if (user.isLoading || user.data == null) {
    return (
      <Box sx={{ display: 'flex',justifyContent:'center',alignItems:'center' }}>
        <CircularProgress />
      </Box>
    )
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
