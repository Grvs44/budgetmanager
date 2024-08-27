import React from 'react'
import { Box, ListItem, Typography } from '@mui/material'

export default function BudgetListItem({ item, setViewOpen }) {
  return (
    <ListItem>
      <Box onClick={() => setViewOpen(item.id)}>
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
