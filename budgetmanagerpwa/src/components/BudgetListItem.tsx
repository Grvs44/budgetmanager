import React from 'react'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import type { BudgetItem } from '../redux/types'

export type BudgetListItemProps = {
  item: BudgetItem
  onClick: (id: number) => void
}

export default function BudgetListItem({ item, onClick }: BudgetListItemProps) {
  return (
    <ListItem>
      <Box onClick={() => onClick(item.id)}>
        <Typography>{item.name}</Typography>
        {item.active ? (
          <Typography>active</Typography>
        ) : (
          <Typography>inactive</Typography>
        )}
      </Box>
    </ListItem>
  )
}
