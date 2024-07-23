import React from 'react'
import { Box, ListItem, Typography } from '@mui/material'

export default function PaymentListItem({ item }) {
  return (
    <ListItem>
      <Box>
        <Typography>{item.amount}</Typography>
        <Typography>{item.date}</Typography>
        <Typography>{item.payee}</Typography>
        <Typography>{item.budget}</Typography>
      </Box>
    </ListItem>
  )
}
