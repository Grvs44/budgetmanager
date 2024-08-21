import {
  DialogContent,
  DialogActions,
  DialogTitle,
  Typography,
  Button,
} from '@mui/material'
import React from 'react'
import {
  useGetBudgetQuery,
  useGetPayeeQuery,
  useGetUserQuery,
} from '../redux/apiSlice'
import { showUserDetails } from '../redux/utils'
import Dialog from './Dialog'

export default function PayeeViewDialog({ open, onClose, onEdit, payeeId, onDelete }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <ViewContent onClose={onClose} onEdit={onEdit} payeeId={payeeId} onDelete={onDelete} />
    </Dialog>
  )
}

function ViewContent({ onClose, onEdit, payeeId, onDelete }) {
  const payee = useGetPayeeQuery(payeeId)
  const budget = useGetBudgetQuery(payee.data?.budget, { skip: payee.isLoading })
  const user = useGetUserQuery(payee.data?.modified_by, {
    skip: payee.isLoading || payee.data.modified_by == null,
  })
  let title, content
  const isLoading = payee.isLoading || budget.isLoading || user.isLoading
  if (isLoading) {
    title = 'Loading'
    content = null
  } else {
    title = payee.data.name
    content = (
      <DialogContent>
        <Typography>Budget: {budget.data.name}</Typography>
        <Typography>{payee.data.description}</Typography>
        <Typography>
          Last modified on {payee.data.last_modified} by{' '}
          {showUserDetails(user.data)}
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
          onClick={() => onEdit(payee.data)}
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
