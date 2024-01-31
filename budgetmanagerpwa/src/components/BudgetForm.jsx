import React from 'react'
import {
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  TextField,
} from '@mui/material'
import FormDialog from './FormDialog'

export default function BudgetForm({
  budget = { active: true },
  onClose,
  onSubmit,
  open,
  title,
}) {
  return (
    <FormDialog open={open} onClose={onClose} onSubmit={onSubmit} title={title}>
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
