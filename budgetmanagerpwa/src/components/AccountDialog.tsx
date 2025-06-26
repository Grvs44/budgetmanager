import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'
import { useLogoutMutation } from '../redux/apiSlice'
import type { User } from '../redux/types'

export type AccountDialogProps = {
  open: boolean
  onClose: () => void
  user: User
}

// Adapted from Grvs44/Inclusive-Venues
const AccountDialog: React.FC<AccountDialogProps> = (props) => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [logout] = useLogoutMutation()

  const onLogout = async () => {
    setLoading(true)
    const result = await logout()
    setLoading(false)
    if (result.error) {
      alert('Error logging out')
    } else {
      props.onClose()
    }
  }

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Account</DialogTitle>
      <DialogContent>
        <Typography>Username: {props.user.username}</Typography>
        {props.user.first_name || props.user.last_name ? (
          <Typography>
            Name: {props.user.first_name} {props.user.last_name}
          </Typography>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button type="button" onClick={props.onClose}>
          Close
        </Button>
        <Button
          onClick={onLogout}
          type="submit"
          variant="contained"
          loading={loading}
          loadingPosition="start"
        >
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AccountDialog
