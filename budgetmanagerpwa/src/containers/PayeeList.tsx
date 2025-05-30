import React from 'react'
import { Button, Container, List } from '@mui/material'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import PayeeForm from '../components/PayeeForm'
import PayeeListItem from '../components/PayeeListItem'
import {
  useCreatePayeeMutation,
  useGetPayeesQuery,
  useDeletePayeeMutation,
  useUpdatePayeeMutation,
} from '../redux/apiSlice'
import PayeeViewDialog from '../components/PayeeViewDialog'
import DeleteConfirmation from '../components/DeleteConfirmation'
import { Payee } from '../redux/types'

export default function PayeeList() {
  const [createOpen, setCreateOpen] = React.useState<boolean>(false)
  const [page, setPage] = React.useState<number>(0)
  const query = useGetPayeesQuery(page)
  const [createPayee] = useCreatePayeeMutation()
  const [updatePayee] = useUpdatePayeeMutation()
  const [viewOpen, setViewOpen] = React.useState<boolean>(false)
  const [viewPayee, setViewPayee] = React.useState<Payee | null>(null)
  const [editOpen, setEditOpen] = React.useState<boolean>(false)
  const [deleteOpen, setDeleteOpen] = React.useState<boolean>(false)
  const [editData, setEditData] = React.useState<Payee | null>(null)
  const [deletePayee] = useDeletePayeeMutation()

  if (query.isLoading) return <p>Loading...</p>
  const list = query.data

  const onEdit = (data) => {
    setViewOpen(false)
    setEditData(data)
    setEditOpen(true)
  }
  const onSubmit = async (oldPayee, payee) => {
    payee.id = oldPayee.id
    await updatePayee(payee).unwrap()
    setEditOpen(false)
    setViewPayee(payee.id)
    setViewOpen(true)
  }
  const onDeleteSubmit = async () => {
    setPage(0)
    await deletePayee({ id: viewPayee }).unwrap()
    setViewOpen(false)
    setViewPayee(null)
  }

  const onCreateSubmit = async (oldData, data) => {
    setPage(0)
    const payeeData = await createPayee(data).unwrap()
    setViewPayee(payeeData.id)
    setViewOpen(true)
  }

  const onItemClick = (id) => {
    setViewPayee(id)
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
            <PayeeListItem item={item} key={item.id} onClick={onItemClick} />
          ))}
        </List>
      ) : (
        <p>No payees</p>
      )}
      {list.next ? (
        <Button onClick={() => setPage(page + 1)}>Load more</Button>
      ) : null}
      <PayeeForm
        onClose={() => setCreateOpen(false)}
        onSubmit={onCreateSubmit}
        open={createOpen}
        title="Add payee"
      />
      <PayeeViewDialog
        open={viewOpen}
        onClose={() => {
          setViewOpen(false)
          setViewPayee(null)
        }}
        payeeId={viewPayee}
        onEdit={onEdit}
        onDelete={() => setDeleteOpen(true)}
      />
      <PayeeForm
        payee={editData}
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSubmit={onSubmit}
      />
      <DeleteConfirmation
        onClose={() => setDeleteOpen(false)}
        onSubmit={onDeleteSubmit}
        open={deleteOpen}
        title="Are you sure you want to delete this payee?"
      />
    </Container>
  )
}
