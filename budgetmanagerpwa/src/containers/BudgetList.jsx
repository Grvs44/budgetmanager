import React from 'react'
import { Button, Container, List, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import BudgetForm from '../components/BudgetForm'
import BudgetListItem from '../components/BudgetListItem'
import {
  useCreateBudgetMutation,
  useGetBudgetsQuery,
  useUpdateBudgetMutation,
} from '../redux/apiSlice'
import BudgetViewDialog from '../components/BudgetViewDialog'

export default function BudgetList() {
  const [page, setPage] = React.useState(0)
  const [createOpen, setCreateOpen] = React.useState(false)
  const [viewOpen, setViewOpen] = React.useState(false)
  const [viewBudget, setViewBudget] = React.useState(null)
  const [editOpen, setEditOpen] = React.useState(false)
  const [editBudget, setEditBudget] = React.useState(null)
  const [updateBudget] = useUpdateBudgetMutation()
  const query = useGetBudgetsQuery(page)
  const [createBudget] = useCreateBudgetMutation()

  if (query.isLoading) return <p>Loading...</p>
  const list = query.data

  const onEdit = ({ budget }) => {
    setViewOpen(false)
    setEditBudget(budget)
    setEditOpen(true)
  }

  const onSubmit = async (oldBudget, budget) => {
    budget.id = oldBudget.id
    budget.active = budget.active === 'on'
    await updateBudget(budget)
    setEditOpen(false)
    setViewBudget(budget.id)
    setViewOpen(true)
  }

  const onCreateSubmit = async (oldData, data) => {
    const budget = await createBudget(data)
    setViewBudget(budget.data.id)
    setViewOpen(true)
  }

  const onItemClick = (id) => {
    setViewBudget(id)
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
            <BudgetListItem item={item} key={item.id} onClick={onItemClick} />
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
      <BudgetViewDialog
        open={viewOpen}
        onClose={() => {
          setViewOpen(false)
          setViewBudget(null)
        }}
        budgetId={viewBudget}
        onEdit={onEdit}
      />
      <BudgetForm
        budget={editBudget}
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSubmit={onSubmit}
      />
    </Container>
  )
}
