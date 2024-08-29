import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Typography,
  Button,
} from '@mui/material'
import React from 'react'
import { useGetBudgetQuery, useGetUserQuery } from '../redux/apiSlice'
import { showUserDetails } from '../redux/utils'

export default function BudgetViewDialog({
  open,
  onClose,
  onEdit,
  budgetId,
  onDelete,
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <ViewContent
        onClose={onClose}
        onEdit={onEdit}
        budgetId={budgetId}
        onDelete={onDelete}
      />
    </Dialog>
  )
}

function ViewContent({ onClose, onEdit, budgetId, onDelete }) {
  const { data, isLoading } = useGetBudgetQuery(budgetId, {
    skip: budgetId == null,
  })
  const user = useGetUserQuery(data?.modified_by, {
    skip: isLoading || data.modified_by == null,
  })
  let title, content
  if (isLoading || user.isLoading) {
    title = 'Loading'
    content = null
  } else {
    title = data.name
    content = (
      <DialogContent>
        <Typography>{data.description}</Typography>
        <Typography>{data.active ? 'Active' : 'Inactive'}</Typography>
        <Typography>
          Last modified on {data.last_modified} by {showUserDetails(user.data)}
        </Typography>
      </DialogContent>
    )
  }
  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      {content}
      <DialogActions>
        <Button
          type="button"
          variant="contained"
          onClick={() => onDelete()}
          disabled={isLoading}
        >
          Delete
        </Button>
        <Button
          type="button"
          variant="contained"
          onClick={() => onEdit({ budget: data })}
          disabled={isLoading}
        >
          Edit
        </Button>
        <Button type="button" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </>
  )
}
