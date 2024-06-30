import React from 'react'
import { Button, Container, List, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import BudgetForm from '../components/BudgetForm'
import BudgetListItem from '../components/BudgetListItem'
import { useGetBudgetsQuery } from '../redux/apiSlice'

export default function BudgetList() {
  const [createOpen, setCreateOpen] = React.useState(false)
  const [page, setPage] = React.useState(0)
  const query = useGetBudgetsQuery(page)

  if (query.isLoading) return <p>Loading...</p>
  const list = query.data

  const onCreateSubmit = async (data) => {
    /*const budget = await createBudget(data)
    console.log(budget)
    addItem(budget)*/
    return null
  }
  return list.count ? (
    <Container>
    <Button onClick={() => setCreateOpen(true)}>
      <AddIcon /> New
    </Button>
      <Typography>
        Showing {list.results.length} of {list.count}
      </Typography>
      <List>
        {list.results.map((item) => (
          <BudgetListItem item={item} key={item.id} />
        ))}
      </List>
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
  ) : (
    <p>No budgets</p>
  )
}
