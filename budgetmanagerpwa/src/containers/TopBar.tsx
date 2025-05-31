import React from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MenuDrawer from '../components/MenuDrawer'
import TitleBar from '../components/TitleBar'
import type { User } from '../redux/types'

export type TopBarProps = {
  user: User
  title: string
}

export default function TopBar({ user, title }: TopBarProps) {
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
