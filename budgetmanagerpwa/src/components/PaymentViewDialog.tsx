import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
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
}: PaymmentViewDialogProps) {
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
          {user.data ? showUserDetails(user.data) : <Skeleton />}
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
