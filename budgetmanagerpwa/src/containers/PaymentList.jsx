import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import { Button, Container, List, Typography } from '@mui/material'
import PaymentForm from '../components/PaymentForm'
import {
  useCreatePaymentMutation,
  useGetPaymentsQuery,
} from '../redux/apiSlice'
import PaymentListItem from '../components/PaymentListItem'

export default function PaymentList() {
  const [createOpen, setCreateOpen] = React.useState(false)
  const [page, setPage] = React.useState(0)
  const query = useGetPaymentsQuery(page)
  const [createPayment] = useCreatePaymentMutation()

  if (query.isLoading) return <p>Loading...</p>
  const list = query.data

  const onCreateSubmit = (data) => {
    createPayment(data)
    return null
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
            <PaymentListItem item={item} key={item.id} />
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
    </Container>
  )
}
