import { Box, Typography } from '@mui/material'
import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { getTotal } from '../api/user'
import { setTitle } from '../redux/titleSlice'
import { useDispatch } from 'react-redux'
import { useGetCurrentUserQuery } from '../redux/apiSlice'

export default function Home() {
  const { total } = useLoaderData()
  const { data: user, isLoading } = useGetCurrentUserQuery(null)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(setTitle('Budget Manager'))
  }, [])

  return (
    <Box>
      <Typography variant="h4" component="h1">
        {isLoading
          ? 'Welcome'
          : 'Welcome, ' + (user.first_name ? user.first_name : user.username)}
      </Typography>
      <Typography variant="h5" component="h2">
        Total: {total}
      </Typography>
    </Box>
  )
}

export async function homeLoader() {
  const total = await getTotal()
  return { total }
}
