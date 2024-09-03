import React from 'react'
import { Box, ListItem, Typography } from '@mui/material'
import { useGetBudgetQuery } from '../redux/apiSlice'
import { PayeeItem } from '../redux/types'

export type PayeeListItemProps = {
  item: PayeeItem
  onClick: (id: number) => void
}

export default function PayeeListItem({ item, onClick }: PayeeListItemProps) {
  const budget = useGetBudgetQuery(item.budget)
  const budgetName = budget.isLoading ? 'loading...' : budget.data.name
  return (
    <ListItem>
      <Box onClick={() => onClick(item.id)}>
        <Typography>{item.name}</Typography>
        <Typography>Budget: {budgetName}</Typography>
      </Box>
    </ListItem>
  )
}
