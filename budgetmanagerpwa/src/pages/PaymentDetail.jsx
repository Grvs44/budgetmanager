import React from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { Box, Button, ButtonGroup, Container, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteConfirmation from '../components/DeleteConfirmation'
import {
  canEditPayment,
  deletePayment,
  getPayment,
  updatePayment,
} from '../api/payment'
import PaymentForm from '../components/PaymentForm'
import DetailDrawer from '../components/DetailDrawer'

export default function BudgetDetail() {
  const [initialPayment, canEdit] = useLoaderData()
  const navigate = useNavigate()

  const [payment, setPayment] = React.useState(initialPayment)
  const [editOpen, setEditOpen] = React.useState(false)
  const [deleteOpen, setDeleteOpen] = React.useState(false)

  const onEditSubmit = async (data) => {
    const newPayment = await updatePayment(payment.id, data)
    console.log(newPayment)
    setPayment(newPayment)
  }
  const onDeleteSubmit = async () => {
    await deletePayment(payment.id)
    navigate(-1)
  }

  return (
    <DetailDrawer>
      <Container>
        {canEdit ? (
          <ButtonGroup>
            <Button onClick={() => setEditOpen(true)}>
              <EditIcon /> Edit
            </Button>
            <Button onClick={() => setDeleteOpen(true)}>
              <DeleteIcon />
              Delete
            </Button>
          </ButtonGroup>
        ) : null}
        <Box>
          <Typography>
            Payee: <Link to={`../../payee/${payment.payee}`}>payee name</Link>
          </Typography>
          <Typography>{payment.amount}</Typography>
          <Typography>{payment.date}</Typography>
          <Typography>{payment.notes}</Typography>
          {payment.pending ? <Typography></Typography> : null}
          <Typography>
            Last modified at {payment.last_modified} by {payment.modified_by}
          </Typography>
        </Box>
        <ButtonGroup>
          <Link to="budget">
            <Button>View budget</Button>
          </Link>
          <Link to="payee">
            <Button>View payee</Button>
          </Link>
        </ButtonGroup>
        <PaymentForm
          payment={payment}
          onClose={() => setEditOpen(false)}
          onSubmit={onEditSubmit}
          open={editOpen}
          title={`Edit ${payment.name}`}
        />
        <DeleteConfirmation
          onClose={() => setDeleteOpen(false)}
          onSubmit={onDeleteSubmit}
          open={deleteOpen}
          title="Are you sure you want to delete this payment?"
        />
      </Container>
    </DetailDrawer>
  )
}

export async function paymentDetailLoader({ params }) {
  const payment = await getPayment(params.id)
  const canEdit = await canEditPayment(params.id)
  return [payment, canEdit]
}
