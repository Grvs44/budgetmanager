import React from 'react'
import { Button, Container, List, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import BudgetForm from '../components/BudgetForm'
import BudgetListItem from '../components/BudgetListItem'
import { useCreateBudgetMutation, useGetBudgetsQuery } from '../redux/apiSlice'

export default function BudgetList() {
  const [createOpen, setCreateOpen] = React.useState(false)
  const [page, setPage] = React.useState(0)
  const query = useGetBudgetsQuery(page)
  const [createBudget] = useCreateBudgetMutation()
  console.log(page)

  if (query.isLoading) return <p>Loading...</p>
  const list = query.data

  const onCreateSubmit = async (data) => {
    createBudget(data)
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
            <BudgetListItem item={item} key={item.id} />
          ))}
        </List>
      ) : (
        <p>No budgets</p>
      )}
      {list.next ? (
        <Button onClick={() => setPage(page + 1)}>Load more</Button>
      ) : null}
      <BudgetForm
        onClose={() => setCreateOpen(false)}
        onSubmit={onCreateSubmit}
        open={createOpen}
        title="Add budget"
      />
    </Container>
  )
}
