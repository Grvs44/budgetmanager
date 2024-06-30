import React from 'react'
import { getPayees } from '../api/payee'
import { useLoaderData } from 'react-router-dom'
import { setTitle } from '../redux/titleSlice'
import PayeeList from '../containers/PayeeList'
import { PayeeProvider } from '../context/payee'
import { useDispatch } from 'react-redux'

export default function PayeePage() {
  const { list } = useLoaderData()
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(setTitle('Payees'))
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
