import React from 'react'
import { List, ListItem, TextField } from '@mui/material'
import FormDialog from './FormDialog'
import { useGetBudgetQuery, useGetBudgetsSearchQuery } from '../redux/apiSlice'
import DropDown from './DropDown'
import { EditablePayee, Nameable } from '../redux/types'

const empty: EditablePayee = { budget: null, name: '', description: '' }

export type PayeeFormProps = {
  payee: EditablePayee | null
  onClose: () => void
  onSubmit: (oldPayee: EditablePayee | null, newPayee: EditablePayee) => void
  open: boolean
  title: string
}

export default function PayeeForm(props: PayeeFormProps) {
  if (props.payee == null) props.payee = empty
  const budget = useGetBudgetQuery(props.payee.budget, {
    skip: props.payee.budget == null,
  })
  const [data, setData] = React.useState<Nameable | null | undefined>(
    props.payee.budget ? budget.data : null
  )

  React.useEffect(() => setData(budget.data), [budget.isLoading])

  const onFormSubmit = (formData: EditablePayee) => {
    if (data == null) alert('Missing budget')
    else {
      props.onSubmit(props.payee, { ...formData, budget: data.id })
      props.onClose()
    }
  }

  return (
    <FormDialog
      open={props.open}
      onClose={props.onClose}
      onSubmit={onFormSubmit}
      title={props.title ? props.title : props.payee.name}
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
            hook={(input: string, open: boolean) =>
              useGetBudgetsSearchQuery(input, { skip: !open })
            }
          />
        </ListItem>
        <ListItem>
          <TextField
            name="name"
            defaultValue={props.payee.name}
            label="Name"
            required
            autoComplete="false"
          />
        </ListItem>
        <ListItem>
          <TextField
            name="description"
            defaultValue={props.payee.description}
            label="Description"
            multiline
          />
        </ListItem>
      </List>
    </FormDialog>
  )
}
