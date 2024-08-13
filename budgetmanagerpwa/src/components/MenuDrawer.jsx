import React from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { Link } from 'react-router-dom'
import { rootPath } from '../settings'
export default function MenuDrawer({ open, onClose, user }) {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List onClick={onClose}>
        <Link to={rootPath}>
          <ListItem>
            <ListItemButton>
              <ListItemText>Home</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={`${rootPath}budget`}>
          <ListItem>
            <ListItemButton>
              <ListItemText>Budgets</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={`${rootPath}payee`}>
          <ListItem>
            <ListItemButton>
              <ListItemText>Payees</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={`${rootPath}payment`}>
          <ListItem>
            <ListItemButton>
              <ListItemText>Payments</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
        <ListItem>
          <ListItemText>{user.username}</ListItemText>
        </ListItem>
      </List>
    </Drawer>
  )
}
