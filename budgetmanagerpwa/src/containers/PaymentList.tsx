import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import { Button, Container, List, Typography } from '@mui/material'
import DeleteConfirmation from '../components/DeleteConfirmation'
import PaymentForm from '../components/PaymentForm'
import PaymentListItem from '../components/PaymentListItem'
import PaymentViewDialog from '../components/PaymentViewDialog'
import {
  useCreatePaymentMutation,
  useDeletePaymentMutation,
  useGetPaymentsQuery,
  useUpdatePaymentMutation,
} from '../redux/apiSlice'
import { Payment, type SubmitPayment } from '../redux/types'

export default function PaymentList() {
  const [createOpen, setCreateOpen] = React.useState<boolean>(false)
  const [page, setPage] = React.useState<number>(0)
  const query = useGetPaymentsQuery(page)
  const [createPayment] = useCreatePaymentMutation()
  const [viewOpen, setViewOpen] = React.useState<boolean>(false)
  const [viewData, setViewData] = React.useState<number | null>(null)
  const [editOpen, setEditOpen] = React.useState<boolean>(false)
  const [deleteOpen, setDeleteOpen] = React.useState<boolean>(false)
  const [editData, setEditData] = React.useState<Payment | null>(null)

  const [updatePayment] = useUpdatePaymentMutation()
  const [deletePayment] = useDeletePaymentMutation()

  const list = query.data
  if (query.isFetching || !list) return <p>Loading...</p>

  const onCreateSubmit = async (_: any, data: SubmitPayment) => {
    setPage(0)
    const paymentData = await createPayment(data).unwrap()
    setViewData(paymentData.id)
    setViewOpen(true)
  }

  const onEdit = (data: Payment) => {
    setEditData(data)
    setViewOpen(false)
    setEditOpen(true)
  }

  const onSubmit = async (
    oldPayment: SubmitPayment | null,
    payment: SubmitPayment,
  ) => {
    if (oldPayment == null || !oldPayment.id) {
      alert('Update payment error')
      return
    }
    await updatePayment({ id: oldPayment.id, ...payment }).unwrap()
    setEditOpen(false)
    setViewOpen(true)
  }

  const onDeleteSubmit = async () => {
    if (viewData == null) return
    setPage(0)
    await deletePayment({ id: viewData }).unwrap()
    setViewOpen(false)
    setViewData(null)
  }

  const onItemClick = (id: number) => {
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
