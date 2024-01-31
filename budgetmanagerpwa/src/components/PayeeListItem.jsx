import React from 'react'
import { Box, ListItem, Typography } from '@mui/material'

export default function PayeeListItem({ item }) {
  return (
    <ListItem>
      <Box>
        <Typography>{item.name}</Typography>
        <Typography>{item.budget}</Typography>
        <Typography>{item.description}</Typography>
        <Typography>
          Last modified at {item.last_modified} by {item.modified_by}
        </Typography>
      </Box>
    </ListItem>
  )
}
