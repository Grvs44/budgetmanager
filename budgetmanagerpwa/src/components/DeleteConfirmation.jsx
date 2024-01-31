import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'

export default function DeleteConfirmation({ onClose, onSubmit, open, title }) {
  const onFormSubmit = async event => {
    event.preventDefault()
    await onSubmit()
    onClose()
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <form onSubmit={onFormSubmit}>
          <Button onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit">Delete</Button>
        </form>
      </DialogActions>
    </Dialog>
  )
}
