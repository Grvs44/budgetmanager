import React from 'react'
import { Box, ListItem, Typography } from '@mui/material'
import { useGetBudgetQuery, useGetPayeeQuery } from '../redux/apiSlice'
import { getPaymentTitle } from '../redux/utils'
import { PaymentItem } from '../redux/types'

export type PaymentListItemProps = {
  item: PaymentItem
  onClick: (id: number) => void
}

export default function PaymentListItem({
  item,
  onClick,
}: PaymentListItemProps) {
  const payee = useGetPayeeQuery(item.payee)
  const budget = useGetBudgetQuery(payee?.data?.budget, {
    skip: payee.isLoading,
  })
  const budgetName =
    payee.isLoading || budget.isLoading ? 'Loading...' : budget.data.name
  const title = getPaymentTitle(
    item,
    payee.isLoading ? { name: '(loading)' } : payee.data
  )

  return (
    <ListItem>
      <Box onClick={() => onClick(item.id)}>
        <Typography>{title}</Typography>
        <Typography>{item.date}</Typography>
        <Typography>{budgetName}</Typography>
      </Box>
    </ListItem>
  )
}
