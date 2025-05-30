import React from 'react'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { useGetBudgetQuery, useGetPayeeQuery } from '../redux/apiSlice'
import type { PaymentItem } from '../redux/types'
import { getPaymentTitle } from '../redux/utils'

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

  return (
    <ListItem>
      <Box onClick={() => onClick(item.id)}>
        <Typography>
          {payee.data ? getPaymentTitle(item, payee.data) : <Skeleton />}
        </Typography>
        <Typography>{item.date}</Typography>
        <Typography>
          {budget.data && !payee.isFetching ? budget.data.name : <Skeleton />}
        </Typography>
      </Box>
    </ListItem>
  )
}
