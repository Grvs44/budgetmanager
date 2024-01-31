import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import { Button, Container } from '@mui/material'
import { createPayment, getPayments } from '../api/payment'
import PaymentForm from '../components/PaymentForm'
import List from '../components/List'
import PaymentListItem from '../components/PaymentListItem'
import { PaymentContext } from '../context/payment'

export default function PaymentList({list}) {
  const { resetItems, addItem } = React.useContext(PaymentContext)

  const [createOpen, setCreateOpen] = React.useState(false)

  React.useEffect(() => {
    resetItems(list)
  }, [list])

  const onCreateSubmit = async (data) => {
    const payment = await createPayment(data)
    console.log(payment)
    addItem(payment)
    return null
  }

  return (
    <Container>
      <Button onClick={() => setCreateOpen(true)}>
        <AddIcon /> New
      </Button>
      {list.count ? (
        <List
          Context={PaymentContext}
          onNextPage={getPayments}
          ItemComponent={PaymentListItem}
        />
      ) : (
        <p>No payments</p>
      )}
      <PaymentForm
        onClose={() => setCreateOpen(false)}
        onSubmit={onCreateSubmit}
        open={createOpen}
        title="Add payment"
      />
    </Container>
  )
}
