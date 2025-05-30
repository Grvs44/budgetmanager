import React from 'react'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { useGetBudgetQuery } from '../redux/apiSlice'
import type { PayeeItem } from '../redux/types'

export type PayeeListItemProps = {
  item: PayeeItem
  onClick: (id: number) => void
}

export default function PayeeListItem({ item, onClick }: PayeeListItemProps) {
  const budget = useGetBudgetQuery(item.budget)

  return (
    <ListItem>
      <Box onClick={() => onClick(item.id)}>
        <Typography>{item.name}</Typography>
        <Typography>
          Budget: {budget.data ? budget.data.name : <Skeleton />}
        </Typography>
      </Box>
    </ListItem>
  )
}
