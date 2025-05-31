// Help from https://github.com/mui/material-ui/issues/12759#issuecomment-1674377620
import React from 'react'
import { default as MuiDialog } from '@mui/material/Dialog'
import type { DialogProps } from '@mui/material/Dialog'

type OnClose = (
  event: {},
  reason: 'backdropClick' | 'escapeKeyDown' | 'backClick',
) => void

const Dialog = (props: DialogProps) => {
  const onDialogClose: OnClose = (event, reason) => {
    removeEventListener('popstate', listener)
    if (reason == 'backClick') reason = 'escapeKeyDown'
    props.onClose ? props.onClose(event, reason) : null
  }
  const listener = () => onDialogClose({}, 'backClick')
  React.useEffect(() => {
    if (props.open) {
      history.pushState({ open: true }, '')
      addEventListener('popstate', listener)
    } else if (history.state?.open) {
      history.back()
    }
  }, [props.open])
  return <MuiDialog onClose={onDialogClose} {...props} />
}

export default Dialog
