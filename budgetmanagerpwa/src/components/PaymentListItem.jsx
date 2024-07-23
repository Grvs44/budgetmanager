import React from 'react'
import { Box, ListItem, Typography } from '@mui/material'
import {
  useDeletePaymentMutation,
  useGetBudgetQuery,
  useGetPayeeQuery,
  useUpdatePaymentMutation,
} from '../redux/apiSlice'
import DeleteConfirmation from './DeleteConfirmation'

export default function PaymentListItem({ item }) {
  const [viewOpen, setViewOpen] = React.useState(false)
  const [editOpen, setEditOpen] = React.useState(false)
  const [deleteOpen, setDeleteOpen] = React.useState(false)
  const [editData, setEditData] = React.useState(null)

  const [updatePayment] = useUpdatePaymentMutation()
  const [deletePayment] = useDeletePaymentMutation()

  const payee = useGetPayeeQuery(item.payee)
  const budget = useGetBudgetQuery(payee?.data?.budget, {
    skip: payee.isLoading,
  })
  const payeeName = payee.isLoading ? '(loading)' : payee.data.name
  const budgetName =
    payee.isLoading || budget.isLoading ? 'Loading...' : budget.data.name

  const onEdit = () => {
    setEditData(data)
    setViewOpen(false)
    setEditOpen(true)
  }

  const onSubmit = (payment) => {
    payment.id = item.id
    updatePayment(payment)
    setEditOpen(false)
    setViewOpen(true)
  }

  const onDeleteSubmit = () => {
    deletePayment(item)
    setDeleteOpen(false)
  }

  return (
    <ListItem>
      <Box onClick={() => setViewOpen(true)}>
        <Typography>
          {Math.abs(item.amount)} {item.amount > 0 ? 'from' : 'to'} {payeeName}
        </Typography>
        <Typography>{item.date}</Typography>
        <Typography>{budgetName}</Typography>
      </Box>
      <DeleteConfirmation
        onClose={() => setDeleteOpen(false)}
        onSubmit={onDeleteSubmit}
        open={deleteOpen}
        title="Are you sure you want to delete this payment?"
      />
    </ListItem>
  )
}
