import React from 'react'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from './Dialog'

export default function DeleteConfirmation({ onClose, onSubmit, open, title }) {
  const onFormSubmit = event => {
    event.preventDefault()
    onSubmit()
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
