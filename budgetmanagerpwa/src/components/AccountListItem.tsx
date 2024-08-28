import React from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Link as RouteLink } from 'react-router-dom'
import { User } from '../redux/types'

export type AccountListItemProps = { user: User }

const AccountListItem = (props: AccountListItemProps) => {
  const [open, setOpen] = React.useState<boolean>(false)
  return (
    <ListItem>
      <ListItemButton onClick={() => setOpen(true)}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText>{props.user.username}</ListItemText>
      </ListItemButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Account</DialogTitle>
        <DialogContent>
          <Typography>Username: {props.user.username}</Typography>
          {props.user.first_name || props.user.last_name ? (
            <Typography>
              Name: {props.user.first_name} {props.user.last_name}
            </Typography>
          ) : null}
          {import.meta.env.VITE_PROFILE_URL ? (
            <Link
              component={RouteLink}
              to={import.meta.env.VITE_PROFILE_URL}
              target="_blank"
              rel="noopener"
            >
              View profile <OpenInNewIcon fontSize="inherit" />
            </Link>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={() => setOpen(false)}>
            Close
          </Button>
          {import.meta.env.VITE_LOGOUT_URL ? (
            <form
              method="post"
              action={import.meta.env.VITE_LOGOUT_URL + location.pathname}
            >
              <Button type="submit" variant="contained">
                Logout
              </Button>
            </form>
          ) : null}
        </DialogActions>
      </Dialog>
    </ListItem>
  )
}

export default AccountListItem
