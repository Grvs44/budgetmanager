import { Box, Typography } from '@mui/material'
import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { getTotal } from '../api/user'
import { useAccount } from '../context/global'
import { setTitle } from '../redux/titleSlice'
import { useDispatch } from 'react-redux'

export default function Home() {
  const { total } = useLoaderData()
  const { account } = useAccount()
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(setTitle('Budget Manager'))
  }, [])

  return (
    <Box>
      <Typography variant="h4" component="h1">
        Welcome, {account.first_name ? account.first_name : account.username}
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
