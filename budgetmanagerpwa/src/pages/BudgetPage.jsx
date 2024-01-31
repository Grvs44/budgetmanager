import React from 'react'
import { BudgetProvider } from '../context/budget'
import BudgetList from '../containers/BudgetList'
import { getBudgets } from '../api/budget'
import { useLoaderData } from 'react-router-dom'
import { useTitle } from '../context/global'

export default function BudgetPage() {
  const { list } = useLoaderData()
  const { setTitle } = useTitle()

  React.useEffect(() => {
    setTitle('Budgets')
  }, [])

  return (
    <BudgetProvider>
      <BudgetList list={list} />
    </BudgetProvider>
  )
}

export async function budgetPageLoader({ request }) {
  const params = new URL(request.url).searchParams
  params.delete('offset')
  const list = await getBudgets(params)
  return { list }
}
