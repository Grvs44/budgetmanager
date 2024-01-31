import React from 'react'
import { Checkbox, FormControlLabel, List, ListItem, TextField } from '@mui/material'
import FormDialog from './FormDialog'

export default function PaymentForm({
  payment = {},
  onClose,
  onSubmit,
  open,
  title,
}) {
  return (
    <FormDialog open={open} onClose={onClose} onSubmit={onSubmit} title={title}>
      <List>
        <ListItem>
          <TextField defaultValue={payment.payee} label="Payee" name="payee" required />
        </ListItem>
        <ListItem>
          <TextField
            name="amount"
            defaultValue={payment.amount}
            label="Amount"
            required
            autoComplete="false"
          />
        </ListItem>
        <ListItem>
          <TextField name="date" defaultValue={payment.date} label="Date" required />
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
            control={<Checkbox name="pending" defaultChecked={payment.pending} />}
            label="Exclude from total"
          />
        </ListItem>
      </List>
    </FormDialog>
  )
}
