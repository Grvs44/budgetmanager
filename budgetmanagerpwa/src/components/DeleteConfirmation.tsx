import React from 'react'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from './Dialog'

export type DeleteConfirmationProps = {
  onClose: () => void
  onSubmit: () => void
  open: boolean
  title: string
}

const DeleteConfirmation = (props: DeleteConfirmationProps) => {
  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    props.onSubmit()
    props.onClose()
  }
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogActions>
        <form onSubmit={onFormSubmit}>
          <Button onClick={props.onClose} type="button">
            Cancel
          </Button>
          <Button type="submit">Delete</Button>
        </form>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteConfirmation
