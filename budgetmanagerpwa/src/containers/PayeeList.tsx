import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import { Button, Container, List } from '@mui/material'
import Typography from '@mui/material/Typography'
import DeleteConfirmation from '../components/DeleteConfirmation'
import PayeeForm from '../components/PayeeForm'
import PayeeListItem from '../components/PayeeListItem'
import PayeeViewDialog from '../components/PayeeViewDialog'
import {
  useCreatePayeeMutation,
  useDeletePayeeMutation,
  useGetPayeesQuery,
  useUpdatePayeeMutation,
} from '../redux/apiSlice'
import type { Payee, SubmitPayee } from '../redux/types'

export default function PayeeList() {
  const [createOpen, setCreateOpen] = React.useState<boolean>(false)
  const [page, setPage] = React.useState<number>(0)
  const query = useGetPayeesQuery(page)
  const [createPayee] = useCreatePayeeMutation()
  const [updatePayee] = useUpdatePayeeMutation()
  const [viewOpen, setViewOpen] = React.useState<boolean>(false)
  const [viewPayee, setViewPayee] = React.useState<number | null>(null)
  const [editOpen, setEditOpen] = React.useState<boolean>(false)
  const [deleteOpen, setDeleteOpen] = React.useState<boolean>(false)
  const [editData, setEditData] = React.useState<Payee | null>(null)
  const [deletePayee] = useDeletePayeeMutation()

  const list = query.data
  if (query.isFetching || !list) return <p>Loading...</p>

  const onEdit = (data: Payee) => {
    setViewOpen(false)
    setEditData(data)
    setEditOpen(true)
  }
  const onSubmit = async (oldPayee: SubmitPayee | null, payee: SubmitPayee) => {
    if (oldPayee == null || !oldPayee.id) {
      alert('Update payee error')
      return
    }
    await updatePayee({ id: oldPayee.id, ...payee }).unwrap()
    setEditOpen(false)
    setViewPayee(oldPayee.id)
    setViewOpen(true)
  }
  const onDeleteSubmit = async () => {
    if (viewPayee == null) return
    setPage(0)
    await deletePayee({ id: viewPayee }).unwrap()
    setViewOpen(false)
    setViewPayee(null)
  }

  const onCreateSubmit = async (_: any, data: SubmitPayee) => {
    setPage(0)
    const payeeData = await createPayee(data).unwrap()
    setViewPayee(payeeData.id)
    setViewOpen(true)
  }

  const onItemClick = (id: number) => {
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
