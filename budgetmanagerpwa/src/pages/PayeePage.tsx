import React from 'react'
import { setTitle } from '../redux/titleSlice'
import PayeeList from '../containers/PayeeList'
import { useDispatch } from 'react-redux'
import { Container } from '@mui/material'

export default function PayeePage() {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(setTitle('Payees'))
  }, [])

  return (
    <Container>
      <PayeeList />
    </Container>
  )
}
