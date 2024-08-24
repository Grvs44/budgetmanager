import React from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemButtonLink from './ListItemButtonLink'
import { ListItemIcon } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import InstallPwaListItem from './InstallPwaListItem'

export default function MenuDrawer({ open, onClose, user }) {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List onClick={onClose}>
        <ListItem>
          <ListItemButtonLink to="">
            <ListItemText>Home</ListItemText>
          </ListItemButtonLink>
        </ListItem>
        <ListItem>
          <ListItemButtonLink to="budget">
            <ListItemText>Budgets</ListItemText>
          </ListItemButtonLink>
        </ListItem>
        <ListItem>
          <ListItemButtonLink to="payee">
            <ListItemText>Payees</ListItemText>
          </ListItemButtonLink>
        </ListItem>
        <ListItem>
          <ListItemButtonLink to="payment">
            <ListItemText>Payments</ListItemText>
          </ListItemButtonLink>
        </ListItem>
        <InstallPwaListItem />
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText>{user.username}</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  )
}
