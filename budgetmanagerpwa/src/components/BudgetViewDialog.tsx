import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Typography,
  Button,
} from '@mui/material'
import React from 'react'
import { useGetBudgetQuery, useGetUserQuery } from '../redux/apiSlice'
import { showUserDetails } from '../redux/utils'
import { Budget } from '../redux/types'

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
  const { data, isLoading } = useGetBudgetQuery(props.budgetId, {
    skip: props.budgetId == null,
  })
  const user = useGetUserQuery(data?.modified_by, {
    skip: isLoading || data.modified_by == null,
  })
  let title, content
  if (isLoading || user.isLoading) {
    title = 'Loading'
    content = null
  } else {
    title = data.name
    content = (
      <DialogContent>
        <Typography>{data.description}</Typography>
        <Typography>{data.active ? 'Active' : 'Inactive'}</Typography>
        <Typography>
          Last modified on {data.last_modified} by {showUserDetails(user.data)}
        </Typography>
      </DialogContent>
    )
  }
  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      {content}
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
          onClick={() => props.onEdit({ budget: data })}
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
