import React from 'react'
import { getPayees } from '../api/payee'
import { useLoaderData } from 'react-router-dom'
import { useTitle } from '../context/global'
import PayeeList from '../containers/PayeeList'
import { PayeeProvider } from '../context/payee'

export default function PayeePage() {
  const { list } = useLoaderData()
  const { setTitle } = useTitle()

  React.useEffect(() => {
    setTitle('Payees')
  }, [])

  return (
    <PayeeProvider>
      <PayeeList list={list} />
    </PayeeProvider>
  )
}

export async function payeePageLoader({ request, params }) {
  const searchParams = new URL(request.url).searchParams
  if (params.budgetId) searchParams.set('budget', params.budgetId)
  const list = await getPayees(searchParams)
  return { list }
}
