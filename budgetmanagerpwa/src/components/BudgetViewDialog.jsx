import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Typography,
  Button,
} from '@mui/material'
import React from 'react'
import { useGetBudgetQuery } from '../redux/apiSlice'

export default function BudgetViewDialog({ open, onClose, onEdit, budgetId }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <ViewContent onClose={onClose} onEdit={onEdit} budgetId={budgetId} />
    </Dialog>
  )
}

function ViewContent({ onClose, onEdit, budgetId }) {
  const { data, isLoading } = useGetBudgetQuery(budgetId)
  let title, content
  if (isLoading) {
    title = 'Loading'
    content = null
  } else {
    title = data.name
    content = (
      <DialogContent>
        <Typography>{data.description}</Typography>
        <Typography>{data.active ? 'Active' : 'Inactive'}</Typography>
        <Typography>
          Last modified on {data.last_modified} by {data.modified_by}
        </Typography>
      </DialogContent>
    )
  }
  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      {content}
      <DialogActions>
        <Button type="button" onClick={onClose}>
          Close
        </Button>
        <Button
          type="button"
          variant="contained"
          onClick={onEdit}
          disabled={isLoading}
        >
          Edit
        </Button>
      </DialogActions>
    </>
  )
}
