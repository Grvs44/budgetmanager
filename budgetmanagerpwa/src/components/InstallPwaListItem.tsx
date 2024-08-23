// Adapted from https://github.com/sufst/wireless-telemetry-gui/blob/main/src/modules/navigation/InstallPwaListItem.tsx
import React from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InstallDesktopIcon from '@mui/icons-material/InstallDesktop'

const InstallPwaListItem = () => {
  console.log('render install')
  const [show, setShow] = React.useState(false)
  const [deferredPrompt, setDeferredPrompt] = React.useState<any>(null)

  const onClick = async () => {
    console.log('onclick')
    if (deferredPrompt !== null) {
      console.log('prompting')
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        console.log('accepted')
        setDeferredPrompt(null)
        setShow(false)
      }
    }
  }

  window.addEventListener('beforeinstallprompt', (event: Event) => {
    console.log('install event')
    event.preventDefault()
    setShow(true)
    setDeferredPrompt(event)
  })

  return (
    <ListItem sx={{ display: show ? 'inherit' : 'none' }}>
      <ListItemButton onClick={onClick}>
        <ListItemIcon>
          <InstallDesktopIcon />
        </ListItemIcon>
        <ListItemText>Install</ListItemText>
      </ListItemButton>
    </ListItem>
  )
}

export default InstallPwaListItem
