import React from 'react'
import { Container } from '@mui/material'
import BudgetList from '../containers/BudgetList'
import { useTitle } from '../context/global'

export default function BudgetPage() {
  const { setTitle } = useTitle()

  React.useEffect(() => {
    setTitle('Budgets')
  }, [])

  return (
    <Container>
      <BudgetList />
    </Container>
  )
}
