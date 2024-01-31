import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'

export default function FormDialog({
  children,
  onClose,
  onSubmit,
  open,
  title,
}) {
  const onFormSubmit = async (event) => {
    console.log('submit')
    event.preventDefault()
    const formData = new FormData(event.target)
    await onSubmit(Object.fromEntries(formData.entries()))
    onClose()
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={onFormSubmit}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
