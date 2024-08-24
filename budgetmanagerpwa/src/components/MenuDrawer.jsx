import React from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { Link } from 'react-router-dom'
import { ListItemIcon } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InstallPwaListItem from './InstallPwaListItem'

export default function MenuDrawer({ open, onClose, user }) {
  const linkTo = (...paths) => import.meta.env.BASE_URL.concat(...paths)

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List onClick={onClose}>
        <Link to={linkTo()}>
          <ListItem>
            <ListItemButton>
              <ListItemText>Home</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={linkTo('budget')}>
          <ListItem>
            <ListItemButton>
              <ListItemText>Budgets</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={linkTo('payee')}>
          <ListItem>
            <ListItemButton>
              <ListItemText>Payees</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={linkTo('payment')}>
          <ListItem>
            <ListItemButton>
              <ListItemText>Payments</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
        <InstallPwaListItem/>
        <ListItem>
          <ListItemButton>
          <ListItemIcon>
            <AccountCircleIcon/>
          </ListItemIcon>
          <ListItemText>{user.username}</ListItemText></ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  )
}
