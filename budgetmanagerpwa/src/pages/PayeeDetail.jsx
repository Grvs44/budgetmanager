import React from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { Box, Button, ButtonGroup, Container, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteConfirmation from '../components/DeleteConfirmation'
import {
  canEditPayee,
  deletePayee,
  getPayee,
  getPayeeTotal,
  updatePayee,
} from '../api/payee'
import PayeeForm from '../components/PayeeForm'
import DetailDrawer from '../components/DetailDrawer'

export default function BudgetDetail() {
  const [initialPayee, canEdit, total] = useLoaderData()
  const navigate = useNavigate()

  const [payee, setPayee] = React.useState(initialPayee)
  const [editOpen, setEditOpen] = React.useState(false)
  const [deleteOpen, setDeleteOpen] = React.useState(false)

  const onEditSubmit = async (data) => {
    const newPayee = await updatePayee(payee.id, data)
    console.log(newPayee)
    setPayee(newPayee)
  }
  const onDeleteSubmit = async () => {
    await deletePayee(payee.id)
    navigate(-1)
  }

  return (
    <DetailDrawer>
      <Container>
        <Typography>Total: {total}</Typography>
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
          <Typography>{payee.name}</Typography>
          <Typography>{payee.description}</Typography>
          <Typography>
            Budget: <Link to={`../../budget/${payee.budget}`}>budget name</Link>
          </Typography>
          <Typography>
            Last modified at {payee.last_modified} by {payee.modified_by}
          </Typography>
        </Box>
        <ButtonGroup>
          <Link to="budget">
            <Button>View budget</Button>
          </Link>
          <Link to="payment">
            <Button>View payments</Button>
          </Link>
        </ButtonGroup>
        <PayeeForm
          payee={payee}
          onClose={() => setEditOpen(false)}
          onSubmit={onEditSubmit}
          open={editOpen}
          title={`Edit ${payee.name}`}
        />
        <DeleteConfirmation
          onClose={() => setDeleteOpen(false)}
          onSubmit={onDeleteSubmit}
          open={deleteOpen}
          title="Are you sure you want to delete this payee?"
        />
      </Container>
    </DetailDrawer>
  )
}

export async function payeeDetailLoader({ params }) {
  const payee = await getPayee(params.id)
  const canEdit = await canEditPayee(params.id)
  const total = await getPayeeTotal(params.id)
  return [payee, canEdit, total]
}
