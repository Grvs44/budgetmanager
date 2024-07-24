import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'
import React from 'react'
import {
  useGetBudgetQuery,
  useGetPayeeQuery,
  useGetPaymentQuery,
  useGetUserQuery,
} from '../redux/apiSlice'
import { showUserDetails } from '../redux/utils'

export default function PaymentViewDialog({
  open,
  onClose,
  onEdit,
  paymentId,
  onDelete,
}) {
  const payment = useGetPaymentQuery(paymentId, { skip: !open })
  const skip = !open || payment.isLoading
  const payee = useGetPayeeQuery(payment?.data?.payee, { skip })
  const budget = useGetBudgetQuery(payee?.data?.budget, {
    skip: skip || payee.isLoading,
  })
  const user = useGetUserQuery(payment?.data?.modified_by, {
    skip: skip || payment.data.modified_by == null,
  })
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {skip
          ? 'Loading'
          : `${Math.abs(payment?.data?.amount)} ${
              payment?.data?.amount > 0 ? 'from' : 'to'
            } ${payee?.data?.name}`}
      </DialogTitle>
      <DialogContent>
        <Typography>
          Budget: {budget?.data ? budget.data.name : 'loading'}
        </Typography>
        <Typography>
          Payee: {payee?.data ? payee.data.name : 'loading'}
        </Typography>
        <Typography>
          Amount: {skip ? 'loading' : payment.data.amount}
        </Typography>
        <Typography>Date: {skip ? 'loading' : payment.data.date}</Typography>
        {payment?.data?.pending ? <Typography>Pending</Typography> : null}
        <Typography>
          Last modified on {payment?.data?.last_modified} by{' '}
          {showUserDetails(user.data)}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          type="button"
          variant="contained"
          onClick={() => onDelete()}
          disabled={skip}
        >
          Delete
        </Button>
        <Button
          type="button"
          variant="contained"
          onClick={() => onEdit(payment.data)}
          disabled={skip}
        >
          Edit
        </Button>
        <Button type="button" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
