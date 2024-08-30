import React from 'react'
import { Box, ListItem, Typography } from '@mui/material'
import { useGetBudgetQuery } from '../redux/apiSlice'

export default function PayeeListItem({ item, onClick }) {
  const budget = useGetBudgetQuery(item.budget)
  const budgetName = budget.isLoading ? 'loading...' : budget.data.name
  return (
    <ListItem>
      <Box onClick={() => onClick(item.id)}>
        <Typography>{item.name}</Typography>
        <Typography>Budget: {budgetName}</Typography>
        <Typography>{item.description}</Typography>
      </Box>
    </ListItem>
  )
}
