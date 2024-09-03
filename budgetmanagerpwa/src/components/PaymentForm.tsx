import React from 'react'
import {
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  TextField,
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import FormDialog from './FormDialog'
import DropDown from './DropDown'
import {
  useGetBudgetQuery,
  useGetBudgetsSearchQuery,
  useGetPayeeQuery,
  useGetPayeesSearchQuery,
} from '../redux/apiSlice'
import dayjs from 'dayjs'
import 'dayjs/locale/en-gb'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { EditablePayment } from '../redux/types'

dayjs.extend(customParseFormat)

export type PaymentFormProps = {
  payment: EditablePayment | null
  onClose: () => void
  onSubmit: (
    oldPayment: EditablePayment | null,
    newPayment: EditablePayment
  ) => void
  open: boolean
  title: string
}

export default function PaymentForm({
  payment,
  onClose,
  onSubmit,
  open,
  title,
}: PaymentFormProps) {
  if (payment == null)
    payment = { payee: null, amount: null, date: '', pending: false, notes: '' }
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
  const onFormSubmit = (formData: EditablePayment) => {
    if (payee == null) alert('Missing payee')
    else {
      formData.date = dayjs(formData.date, 'DD/MM/YYYY').format('YYYY-MM-DD')
      onSubmit(payment, { ...formData, payee: payee.id })
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
            disabled={false}
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
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="en-gb"
          >
            <DatePicker
              name="date"
              defaultValue={dayjs(payment.date)}
              label="Date"
            />
          </LocalizationProvider>
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
