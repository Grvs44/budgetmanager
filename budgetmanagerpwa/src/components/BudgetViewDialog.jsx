import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Typography,
  Button,
} from '@mui/material'
import React from 'react'

export default function BudgetViewDialog({ open, onClose, onEdit, budget }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{budget.name}</DialogTitle>
      <DialogContent>
        <Typography>{budget.description}</Typography>
        <Typography>{budget.active ? 'Active' : 'Inactive'}</Typography>
        <Typography>
          Last modified on {budget.last_modified} by {budget.modified_by}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button type="button" onClick={onClose}>
          Close
        </Button>
        <Button type="button" variant="contained" onClick={onEdit}>
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  )
}
