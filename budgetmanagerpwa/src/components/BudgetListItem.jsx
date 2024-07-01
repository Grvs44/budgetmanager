import React from 'react'
import { Box, ListItem, Typography } from '@mui/material'
import BudgetViewDialog from './BudgetViewDialog'
import BudgetForm from './BudgetForm'
import { useUpdateBudgetMutation } from '../redux/apiSlice'

export default function BudgetListItem({ item }) {
  const [updateBudget] = useUpdateBudgetMutation()
  const [viewOpen, setViewOpen] = React.useState(false)
  const [editOpen, setEditOpen] = React.useState(false)
  const onEdit = () => {
    setViewOpen(false)
    setEditOpen(true)
  }
  const onSubmit = (budget) => {
    budget.id = item.id
    budget.active = budget.active === 'on'
    updateBudget(budget)
    setEditOpen(false)
    setViewOpen(true)
  }
  return (
    <ListItem>
      <Box onClick={() => setViewOpen(true)}>
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
      <BudgetViewDialog
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        budget={item}
        onEdit={onEdit}
      />
      <BudgetForm
        item={item}
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title={item.name}
        onSubmit={onSubmit}
      />
    </ListItem>
  )
}
