import React from 'react'
import { Box, CircularProgress } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import TopBar from './containers/TopBar'
import LoginPage from './pages/LoginPage'
import { useGetCurrentUserQuery } from './redux/apiSlice'
import { setDeferredPrompt, setShow } from './redux/installSlice'
import { State } from './redux/types'

export default function App() {
  const dispatch = useDispatch()
  const user = useGetCurrentUserQuery()
  const { title } = useSelector((state: State) => state.title)

  React.useEffect(
    () =>
      window.addEventListener('beforeinstallprompt', (event: Event) => {
        event.preventDefault()
        dispatch(setShow(true))
        dispatch(setDeferredPrompt(event))
      }),
    [],
  )

  return user.isLoading ? (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <CircularProgress />
    </Box>
  ) : user.data ? (
    <div>
      <TopBar user={user.data} title={title} />
      <Box sx={{ my: 4 }}>
        <Outlet />
      </Box>
    </div>
  ) : (
    <LoginPage />
  )
}
