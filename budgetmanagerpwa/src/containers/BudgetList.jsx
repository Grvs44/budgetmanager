import React from 'react'
import { Button, Container } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { createBudget, getBudgets } from '../api/budget'
import BudgetForm from '../components/BudgetForm'
import List from '../components/List'
import BudgetListItem from '../components/BudgetListItem'
import { BudgetContext } from '../context/budget'

export default function BudgetList({ list }) {
  const { resetItems, addItem } = React.useContext(BudgetContext)

  const [createOpen, setCreateOpen] = React.useState(false)

  React.useEffect(() => {
    resetItems(list)
  }, [list])

  const onCreateSubmit = async (data) => {
    const budget = await createBudget(data)
    console.log(budget)
    addItem(budget)
    return null
  }

  return (
    <Container>
      <Button onClick={() => setCreateOpen(true)}>
        <AddIcon /> New
      </Button>
      {list.count ? (
        <List
          Context={BudgetContext}
          onNextPage={getBudgets}
          ItemComponent={BudgetListItem}
        />
      ) : (
        <p>No budgets</p>
      )}
      <BudgetForm
        onClose={() => setCreateOpen(false)}
        onSubmit={onCreateSubmit}
        open={createOpen}
        title="Add budget"
      />
    </Container>
  )
}
