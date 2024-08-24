import React from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemButtonLink from './ListItemButtonLink'
import { ListItemIcon } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import HomeIcon from '@mui/icons-material/Home'
import SavingsIcon from '@mui/icons-material/Savings'
import StoreIcon from '@mui/icons-material/Store'
import PaymentsIcon from '@mui/icons-material/Payments'
import InstallPwaListItem from './InstallPwaListItem'

export default function MenuDrawer({ open, onClose, user }) {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List onClick={onClose}>
        <ListItem>
          <ListItemButtonLink to="">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItemButtonLink>
        </ListItem>
        <ListItem>
          <ListItemButtonLink to="budget">
            <ListItemIcon>
              <SavingsIcon />
            </ListItemIcon>
            <ListItemText>Budgets</ListItemText>
          </ListItemButtonLink>
        </ListItem>
        <ListItem>
          <ListItemButtonLink to="payee">
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText>Payees</ListItemText>
          </ListItemButtonLink>
        </ListItem>
        <ListItem>
          <ListItemButtonLink to="payment">
            <ListItemIcon>
              <PaymentsIcon />
            </ListItemIcon>
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
