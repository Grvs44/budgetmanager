import React from 'react'
import {
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  TextField,
} from '@mui/material'
import FormDialog from './FormDialog'

const empty = { name: '', description: '', active: true }

export default function BudgetForm({ budget, onClose, onSubmit, open, title }) {
  if (budget == null) budget = empty
  const onFormSubmit = (formData) => {
    onSubmit(formData)
    onClose()
  }
  return (
    <FormDialog
      open={open}
      onClose={onClose}
      onSubmit={onFormSubmit}
      title={title}
    >
      <List>
        <ListItem>
          <TextField
            name="name"
            defaultValue={budget.name}
            label="Name"
            required
            autoComplete="false"
          />
        </ListItem>
        <ListItem>
          <TextField
            name="description"
            defaultValue={budget.description}
            label="Description"
            multiline
          />
        </ListItem>
        <ListItem>
          <FormControlLabel
            control={<Checkbox name="active" defaultChecked={budget.active} />}
            label="Active"
          />
        </ListItem>
      </List>
    </FormDialog>
  )
}
