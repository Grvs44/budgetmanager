import React from 'react'
<<<<<<< HEAD:budgetmanagerpwa/src/components/FormDialog.tsx
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

export type FormDialogProps = {
  children: React.JSX.Element
  onClose: () => void
  onSubmit: (data: any) => void
  open: boolean
  title: string
}
=======
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import Dialog from './Dialog'
>>>>>>> origin/Grvs44/issue39:budgetmanagerpwa/src/components/FormDialog.jsx

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
