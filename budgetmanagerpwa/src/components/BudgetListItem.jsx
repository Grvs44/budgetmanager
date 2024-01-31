import React from 'react'
import { Box, ListItem, Typography } from '@mui/material'

export default function BudgetListItem({ item }) {
  return (
    <ListItem>
      <Box>
        <Typography>{item.name}</Typography>
        {item.active ? (
          <Typography>active</Typography>
        ) : (
          <Typography>inactive</Typography>
        )}
        <Typography>{item.description}</Typography>
        <Typography>
          Last modified at {item.last_modified} by {item.modified_by}
        </Typography>
      </Box>
    </ListItem>
  )
}
