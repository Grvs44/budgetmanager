import React from 'react'
import AppBar from '@mui/material/AppBar'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { rootPath } from '../settings'

export default function TopBar({ user, title }) {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <List onClick={() => setOpen(false)}>
          <Link to={`/${rootPath}`}>
            <ListItem>
              <ListItemButton>
                <ListItemText>Home</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to={`/${rootPath}/budget`}>
            <ListItem>
              <ListItemButton>
                <ListItemText>Budgets</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to={`/${rootPath}/payee`}>
            <ListItem>
              <ListItemButton>
                <ListItemText>Payees</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to={`/${rootPath}/payment`}>
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
    </>
  )
}
