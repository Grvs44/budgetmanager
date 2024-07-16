import React from 'react'
import PaymentList from '../containers/PaymentList'
import { setTitle } from '../redux/titleSlice'
import { useDispatch } from 'react-redux'
import { Container } from '@mui/material'

export default function PaymentPage() {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(setTitle('Payments'))
  }, [])

  return (
    <Container>
      <PaymentList />
    </Container>
  )
}
