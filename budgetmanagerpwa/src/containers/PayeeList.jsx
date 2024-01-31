import React from 'react'
import { Button, Container } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { createPayee, getPayees } from '../api/payee'
import PayeeForm from '../components/PayeeForm'
import List from '../components/List'
import PayeeListItem from '../components/PayeeListItem'
import { PayeeContext } from '../context/payee'

export default function PayeeList({ list }) {
  const { resetItems, addItem } = React.useContext(PayeeContext)

  const [createOpen, setCreateOpen] = React.useState(false)

  React.useEffect(() => {
    resetItems(list)
  }, [list])

  const onCreateSubmit = async (data) => {
    const payee = await createPayee(data)
    console.log(payee)
    addItem(payee)
    return null
  }

  return (
    <Container>
      <Button onClick={() => setCreateOpen(true)}>
        <AddIcon /> New
      </Button>
      {list.count ? (
        <List
          Context={PayeeContext}
          onNextPage={getPayees}
          ItemComponent={PayeeListItem}
        />
      ) : (
        <p>No payees</p>
      )}
      <PayeeForm
        onClose={() => setCreateOpen(false)}
        onSubmit={onCreateSubmit}
        open={createOpen}
        title="Add payee"
      />
    </Container>
  )
}
