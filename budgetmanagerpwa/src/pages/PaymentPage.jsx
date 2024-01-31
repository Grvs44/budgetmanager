import React from "react";
import { getPayments } from "../api/payment";
import { useLoaderData } from 'react-router-dom'
import { PaymentProvider } from "../context/payment";
import PaymentList from "../containers/PaymentList";
import { useTitle } from '../context/global'

export default function PaymentPage() {
  const { list } = useLoaderData()
  const { setTitle } = useTitle()

  React.useEffect(() => {
    setTitle('Payments')
  }, [])

  return (
    <PaymentProvider>
      <PaymentList list={list} />
    </PaymentProvider>
  )
}

export async function paymentPageLoader({ request, params }) {
  const searchParams = new URL(request.url).searchParams
  if (params.budgetId) searchParams.set('budget', params.budgetId)
  else if (params.payeeId) searchParams.set('payee', params.payeeId)
  const list = await getPayments(searchParams)
  return { list }
}
