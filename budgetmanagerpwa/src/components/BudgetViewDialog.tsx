import React from 'react'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import {
  useGetBudgetQuery,
  useGetBudgetTotalQuery,
  useGetUserQuery,
} from '../redux/apiSlice'
import type { Budget } from '../redux/types'
import { showUserDetails } from '../redux/utils'
import Dialog from './Dialog'
import TotalText from './TotalText'

export type BudgetViewDialogProps = {
  open: boolean
  onClose: () => void
  onEdit: ({ budget }: { budget: Budget }) => void
  budgetId?: number | null
  onDelete: () => void
}

export default function BudgetViewDialog(props: BudgetViewDialogProps) {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <ViewContent {...props} />
    </Dialog>
  )
}

function ViewContent(props: BudgetViewDialogProps) {
  const [showTotal, setShowTotal] = React.useState<boolean>(false)
  const { data, isLoading } = useGetBudgetQuery(props.budgetId, {
    skip: props.budgetId == null,
  })
  const user = useGetUserQuery(data?.modified_by, {
    skip: isLoading || data?.modified_by == null,
  })
  const total = useGetBudgetTotalQuery(props.budgetId, {
    skip: !showTotal || props.budgetId == null,
  })

  return (
    <>
      <DialogTitle>{data ? data.name : <Skeleton />}</DialogTitle>
      {isLoading || user.isLoading ? null : (
        <DialogContent>
          <Typography>{data?.description}</Typography>
          <Typography>{data?.active ? 'Active' : 'Inactive'}</Typography>
          <Typography>
            Last modified on {data?.last_modified} by{' '}
            {user.data ? showUserDetails(user.data) : <Skeleton />}
          </Typography>
          <TotalText
            data={total.data}
            isFetching={total.isFetching}
            show={showTotal}
            onShow={() => setShowTotal(true)}
          />
        </DialogContent>
      )}
      <DialogActions>
        <Button
          type="button"
          variant="contained"
          onClick={() => props.onDelete()}
          disabled={isLoading}
        >
          Delete
        </Button>
        <Button
          type="button"
          variant="contained"
          onClick={data ? () => props.onEdit({ budget: data }) : undefined}
          disabled={isLoading}
        >
          Edit
        </Button>
        <Button type="button" onClick={props.onClose}>
          Close
        </Button>
      </DialogActions>
    </>
  )
}
