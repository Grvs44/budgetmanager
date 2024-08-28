import React from 'react'
import { Box, ListItem, Typography } from '@mui/material'

export default function BudgetListItem({ item, onClick }) {
  return (
    <ListItem>
      <Box onClick={() => onClick(item.id)}>
        <Typography>{item.name}</Typography>
        {item.active ? (
          <Typography>active</Typography>
        ) : (
          <Typography>inactive</Typography>
        )}
        <Typography>{item.description}</Typography>
      </Box>
    </ListItem>
  )
}
