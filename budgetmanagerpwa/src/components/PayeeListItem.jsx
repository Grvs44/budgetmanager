import React from 'react'
import { Box, ListItem, Typography } from '@mui/material'
import {
  useDeletePayeeMutation,
  useGetBudgetQuery,
  useUpdatePayeeMutation,
} from '../redux/apiSlice'
import PayeeViewDialog from './PayeeViewDialog'
import PayeeForm from './PayeeForm'
import DeleteConfirmation from './DeleteConfirmation'

export default function PayeeListItem({ item }) {
  const [updatePayee] = useUpdatePayeeMutation()
  const [viewOpen, setViewOpen] = React.useState(false)
  const [editOpen, setEditOpen] = React.useState(false)
  const [deleteOpen, setDeleteOpen] = React.useState(false)
  const [editData, setEditData] = React.useState(null)
  const [deletePayee] = useDeletePayeeMutation()
  const budget = useGetBudgetQuery(item.budget)
  const budgetName = budget.isLoading ? 'loading...' : budget.data.name
  const onEdit = (data) => {
    setViewOpen(false)
    setEditData(data)
    setEditOpen(true)
  }
  const onSubmit = (payee) => {
    payee.id = item.id
    updatePayee(payee)
    setEditOpen(false)
    setViewOpen(true)
  }
  const onDeleteSubmit = () => {
    deletePayee(item)
    setViewOpen(false)
  }
  return (
    <ListItem>
      <Box onClick={() => setViewOpen(true)}>
        <Typography>{item.name}</Typography>
        <Typography>Budget: {budgetName}</Typography>
        <Typography>{item.description}</Typography>
      </Box>
      <PayeeViewDialog
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        payeeId={item.id}
        onEdit={onEdit}
        onDelete={() => setDeleteOpen(true)}
      />
      <PayeeForm
        payee={editData}
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title={item.name}
        onSubmit={onSubmit}
      />
      <DeleteConfirmation
        onClose={() => setDeleteOpen(false)}
        onSubmit={onDeleteSubmit}
        open={deleteOpen}
        title="Are you sure you want to delete this payee?"
      />
    </ListItem>
  )
}
