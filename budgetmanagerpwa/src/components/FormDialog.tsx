import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'

export type FormDialogProps = {
  children: React.JSX.Element
  onClose: () => void
  onSubmit: (data: any) => void
  open: boolean
  title: string
}

export default function FormDialog({
  children,
  onClose,
  onSubmit,
  open,
  title,
}: FormDialogProps) {
  const onFormSubmit = (event: any) => {
    event.preventDefault()
    onSubmit(Object.fromEntries(new FormData(event.target).entries()))
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={onFormSubmit}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
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
