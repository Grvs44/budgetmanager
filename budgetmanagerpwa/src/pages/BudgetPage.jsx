import React from 'react'
import { Container } from '@mui/material'
import BudgetList from '../containers/BudgetList'
import { setTitle } from '../redux/titleSlice'
import { useDispatch } from 'react-redux'

export default function BudgetPage() {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(setTitle('Budgets'))
  }, [])

  return (
    <Container>
      <BudgetList />
    </Container>
  )
}
