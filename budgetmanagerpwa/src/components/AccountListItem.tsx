import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import type { User } from '../redux/types'
import AccountDialog from './AccountDialog'

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
      <AccountDialog
        open={open}
        onClose={() => setOpen(false)}
        user={props.user}
      />
    </ListItem>
  )
}

export default AccountListItem
