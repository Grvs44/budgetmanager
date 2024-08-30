import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import { Button, Container, List, Typography } from '@mui/material'
import PaymentForm from '../components/PaymentForm'
import {
  useCreatePaymentMutation,
  useDeletePaymentMutation,
  useGetPaymentsQuery,
  useUpdatePaymentMutation,
} from '../redux/apiSlice'
import PaymentListItem from '../components/PaymentListItem'
import DeleteConfirmation from '../components/DeleteConfirmation'
import PaymentViewDialog from '../components/PaymentViewDialog'

export default function PaymentList() {
  const [createOpen, setCreateOpen] = React.useState(false)
  const [page, setPage] = React.useState(0)
  const query = useGetPaymentsQuery(page)
  const [createPayment] = useCreatePaymentMutation()
  const [viewOpen, setViewOpen] = React.useState(false)
  const [viewData, setViewData] = React.useState(null)
  const [editOpen, setEditOpen] = React.useState(false)
  const [deleteOpen, setDeleteOpen] = React.useState(false)
  const [editData, setEditData] = React.useState(null)

  const [updatePayment] = useUpdatePaymentMutation()
  const [deletePayment] = useDeletePaymentMutation()

  if (query.isLoading) return <p>Loading...</p>
  const list = query.data

  const onCreateSubmit = async (oldData, data) => {
    setPage(0)
    const paymentData = await createPayment(data).unwrap()
    setViewData(paymentData.id)
    setViewOpen(true)
  }

  const onEdit = (data) => {
    setEditData(data)
    setViewOpen(false)
    setEditOpen(true)
  }

  const onSubmit = async (oldPayment, payment) => {
    payment.id = oldPayment.id
    await updatePayment(payment).unwrap()
    setEditOpen(false)
    setViewOpen(true)
  }

  const onDeleteSubmit = async () => {
    setPage(0)
    await deletePayment({ id: viewData }).unwrap()
    setViewOpen(false)
    setViewData(null)
  }

  const onItemClick = (id) => {
    setViewData(id)
    setViewOpen(true)
  }

  return (
    <Container>
      <Button onClick={() => setCreateOpen(true)}>
        <AddIcon /> New
      </Button>
      <Typography>
        Showing {list.results.length} of {list.count}
      </Typography>
      {list.count ? (
        <List>
          {list.results.map((item) => (
            <PaymentListItem item={item} key={item.id} onClick={onItemClick} />
          ))}
        </List>
      ) : (
        <p>No payments</p>
      )}
      {list.next ? (
        <Button onClick={() => setPage(page + 1)}>Load more</Button>
      ) : null}
      <PaymentForm
        onClose={() => setCreateOpen(false)}
        onSubmit={onCreateSubmit}
        open={createOpen}
        title="Add payment"
      />
      <PaymentViewDialog
        open={viewOpen}
        onClose={() => {
          setViewOpen(false)
          setViewData(null)
        }}
        paymentId={viewData}
        onEdit={onEdit}
        onDelete={() => setDeleteOpen(true)}
      />
      <PaymentForm
        open={editOpen}
        payment={editData}
        onClose={() => setEditOpen(false)}
        onSubmit={onSubmit}
        title="Edit payment"
      />
      <DeleteConfirmation
        onClose={() => setDeleteOpen(false)}
        onSubmit={onDeleteSubmit}
        open={deleteOpen}
        title="Are you sure you want to delete this payment?"
      />
    </Container>
  )
}
