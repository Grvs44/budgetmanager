import React from 'react'
import { List, ListItem, TextField } from '@mui/material'
import FormDialog from './FormDialog'
import { useGetBudgetQuery, useGetBudgetsSearchQuery } from '../redux/apiSlice'
import DropDown from './DropDown'

const empty = { budget: null, name: '', description: '' }

export default function PayeeForm({ payee, onClose, onSubmit, open, title }) {
  if (payee == null) payee = empty
  const budget = useGetBudgetQuery(payee.budget, { skip: payee.budget == null })
  const [data, setData] = React.useState(
    payee.budget ? payee.budget : budget.data
  )

  React.useEffect(() => setData(budget.data), [budget.isLoading])

  const onFormSubmit = (formData) => {
    if (data == null) alert('Missing budget')
    else {
      onSubmit(payee, { budget: data.id, ...formData })
      onClose()
    }
  }

  return (
    <FormDialog
      open={open}
      onClose={onClose}
      onSubmit={onFormSubmit}
      title={title ? title : payee.name}
    >
      <List>
        <ListItem>
          <DropDown
            defaultValue={budget.data}
            label="Budget"
            name="budget"
            required
            disabled={budget.isLoading}
            onChange={setData}
            hook={(input, open) =>
              useGetBudgetsSearchQuery(input, { skip: !open })
            }
          />
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
