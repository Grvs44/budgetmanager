// Adapted from https://github.com/sufst/wireless-telemetry-gui/blob/main/src/modules/navigation/InstallPwaListItem.tsx
import React from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InstallDesktopIcon from '@mui/icons-material/InstallDesktop'
import { useDispatch, useSelector } from 'react-redux'
import { InstallState } from '../redux/types'
import { setDeferredPrompt, setShow } from '../redux/installSlice'

const InstallPwaListItem = () => {
  const dispatch = useDispatch()
  const { show, deferredPrompt } = useSelector(
    (state: { install: InstallState }) => state.install
  )

  const onClick = async () => {
    if (deferredPrompt !== null) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        dispatch(setDeferredPrompt(null))
        dispatch(setShow(false))
      }
    }
  }

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
