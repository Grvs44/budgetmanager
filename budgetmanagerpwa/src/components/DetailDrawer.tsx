import { Drawer } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function DetailDrawer({ children }) {
  const navigate = useNavigate()

  return (
    <Drawer anchor="bottom" open={true} onClose={() => navigate(-1)}>
      {children}
    </Drawer>
  )
}
