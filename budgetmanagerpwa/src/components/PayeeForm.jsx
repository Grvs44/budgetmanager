import React from 'react'
import { List, ListItem, TextField } from '@mui/material'
import FormDialog from './FormDialog'

export default function PayeeForm({
  payee = {},
  onClose,
  onSubmit,
  open,
  title,
}) {
  return (
    <FormDialog open={open} onClose={onClose} onSubmit={onSubmit} title={title}>
      <List>
        <ListItem>
          <TextField defaultValue={payee.budget} label="Budget" name="budget" required />
        </ListItem>
        <ListItem>
          <TextField
            name="name"
            defaultValue={payee.name}
            label="Name"
            required
            autoComplete="false"
          />
        </ListItem>
        <ListItem>
          <TextField
            name="description"
            defaultValue={payee.description}
            label="Description"
            multiline
          />
        </ListItem>
      </List>
    </FormDialog>
  )
}
