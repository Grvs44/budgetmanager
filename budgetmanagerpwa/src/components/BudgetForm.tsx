import React from 'react'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import TextField from '@mui/material/TextField'
import type { EditableBudget } from '../redux/types'
import FormDialog from './FormDialog'

const empty = { name: '', description: '', active: true }

export type BudgetFormProps = {
  budget?: EditableBudget | null
  onClose: () => void
  onSubmit: (oldBudget: EditableBudget | null, newBudget: any) => void
  open: boolean
  title?: string
}

export default function BudgetForm(props: BudgetFormProps) {
  const budget: EditableBudget = props.budget ? props.budget : empty
  const onFormSubmit = (formData: any) => {
    props.onSubmit(budget, formData)
    props.onClose()
  }
  return (
    <FormDialog
      open={props.open}
      onClose={props.onClose}
      onSubmit={onFormSubmit}
      title={props.title ? props.title : budget.name}
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
