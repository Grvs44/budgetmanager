import React from 'react'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import TitleBar from '../components/TitleBar'
import MenuDrawer from '../components/MenuDrawer'

export default function TopBar({ user, title }) {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <AppBar position="sticky">
        <TitleBar />
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
      <MenuDrawer
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        user={user}
      />
    </>
  )
}
