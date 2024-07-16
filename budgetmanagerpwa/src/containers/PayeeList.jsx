import React from 'react'
import { Button, Container, List } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import PayeeForm from '../components/PayeeForm'
import PayeeListItem from '../components/PayeeListItem'
import { useCreatePayeeMutation, useGetPayeesQuery } from '../redux/apiSlice'

export default function PayeeList() {
  const [createOpen, setCreateOpen] = React.useState(false)
  const [page, setPage] = React.useState(0)
  const query = useGetPayeesQuery(page)
  const [createPayee] = useCreatePayeeMutation()

  if (query.isLoading) return <p>Loading...</p>
  const list = query.data

  const onCreateSubmit = (data) => {
    createPayee(data)
    return null
  }

  return (
    <Container>
      <Button onClick={() => setCreateOpen(true)}>
        <AddIcon /> New
      </Button>
      {list.count ? (
        <List>
          {list.results.map((item) => (
            <PayeeListItem item={item} key={item.id} />
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
    </Container>
  )
}
