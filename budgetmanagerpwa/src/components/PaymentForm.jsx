import React from 'react'
import {
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  TextField,
} from '@mui/material'
import FormDialog from './FormDialog'
import DropDown from './DropDown'
import {
  useGetBudgetQuery,
  useGetBudgetsSearchQuery,
  useGetPayeeQuery,
  useGetPayeesSearchQuery,
} from '../redux/apiSlice'

export default function PaymentForm({
  payment,
  onClose,
  onSubmit,
  open,
  title,
}) {
  if (payment == null) payment = {}
  const payeeQuery = useGetPayeeQuery(payment.payee, {
    skip: payment.payee == null,
  })
  const budgetQuery = useGetBudgetQuery(payeeQuery.data?.budget, {
    skip: payeeQuery.data == null,
  })
  const [payee, setPayee] = React.useState(
    payment.payee ? payment.payee : payeeQuery.data
  )
  const [budget, setBudget] = React.useState(budgetQuery.data)
  React.useEffect(() => setPayee(payeeQuery.data), [payeeQuery.isLoading])
  React.useEffect(() => setBudget(budgetQuery.data), [budgetQuery.data != null])
  const onFormSubmit = (formData) => {
    if (payee == null) alert('Missing payee')
    else {
      onSubmit({ payee: payee.id, ...formData })
      onClose()
    }
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
          <DropDown
            defaultValue={budgetQuery.data}
            label="Budget"
            name="budget"
            required
            onChange={setBudget}
            hook={(input, open) =>
              useGetBudgetsSearchQuery(input, { skip: !open })
            }
          />
        </ListItem>
        <ListItem>
          <DropDown
            defaultValue={payeeQuery.data}
            label="Payee"
            name="payee"
            required
            onChange={setPayee}
            disabled={budget == null}
            hook={(input, open) =>
              useGetPayeesSearchQuery(
                { name: input, budget },
                { skip: !open || budget == null }
              )
            }
          />
        </ListItem>
        <ListItem>
          <TextField
            name="amount"
            defaultValue={payment.amount}
            label="Amount"
            type="number"
            inputProps={{ step: '0.01' }}
            required
            autoComplete="false"
          />
        </ListItem>
        <ListItem>
          <TextField
            name="date"
            defaultValue={payment.date}
            label="Date"
            required
          />
        </ListItem>
        <ListItem>
          <TextField
            name="notes"
            defaultValue={payment.notes}
            label="Notes"
            multiline
          />
        </ListItem>
        <ListItem>
          <FormControlLabel
            control={
              <Checkbox name="pending" defaultChecked={payment.pending} />
            }
            label="Exclude from total"
          />
        </ListItem>
      </List>
    </FormDialog>
  )
}
