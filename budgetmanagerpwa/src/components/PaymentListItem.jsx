import React from 'react'
import { Box, ListItem, Typography } from '@mui/material'

export default function PaymentListItem({ item }) {
  return (
    <ListItem>
      <Box>
        <Typography>
          {Math.abs(item.amount)} {item.amount > 0 ? 'from' : 'to'} {item.payee}
        </Typography>
        <Typography>{item.date}</Typography>
        <Typography>{item.budget}</Typography>
      </Box>
    </ListItem>
  )
}
