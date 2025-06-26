import React from 'react'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useLoginMutation } from '../redux/apiSlice'
import type { UserLogin } from '../redux/types'

// Adapted from Grvs44/Inclusive-Venues
const LoginPage: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [login] = useLoginMutation()

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())
    if (data.username && data.password) {
      setLoading(true)
      const result = await login(data as UserLogin)
      setLoading(false)
      if (result.error) {
        alert('Error logging in')
      }
    } else {
      alert('Username and password are required')
    }
  }

  return (
    <Container>
      <Typography>Log in to Budget Manager</Typography>
      <form onSubmit={onSubmit}>
        <TextField
          name="username"
          label="Username"
          autoFocus
          required
          variant="standard"
          fullWidth
          margin="dense"
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          required
          variant="standard"
          fullWidth
          margin="dense"
        />
        <Button
          type="submit"
          variant="contained"
          loading={loading}
          loadingPosition="start"
        >
          Log in
        </Button>
      </form>
    </Container>
  )
}

export default LoginPage
