import React from 'react'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemButtonLink from './ListItemButtonLink'
import ListItemIcon from '@mui/material/ListItemIcon'
import SwipeableDrawer, {
  SwipeableDrawerProps,
} from '@mui/material/SwipeableDrawer'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import HomeIcon from '@mui/icons-material/Home'
import SavingsIcon from '@mui/icons-material/Savings'
import StoreIcon from '@mui/icons-material/Store'
import PaymentsIcon from '@mui/icons-material/Payments'
import InstallPwaListItem from './InstallPwaListItem'
import { User } from '../redux/types'
import { Link } from 'react-router-dom'

export type MenuDrawerProps = SwipeableDrawerProps & { user: User }

export default function MenuDrawer(props: MenuDrawerProps) {
  return (
    <SwipeableDrawer anchor="left" {...props}>
      <List onClick={props.onClose}>
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
        <Divider component="li" />
        <InstallPwaListItem />
        <ListItem>
          <ListItemButton
            component={Link}
            to={import.meta.env.VITE_PROFILE_URL}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText>{props.user.username}</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </SwipeableDrawer>
  )
}
