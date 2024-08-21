// Help from https://github.com/mui/material-ui/issues/12759#issuecomment-1674377620
import React from 'react'
import { default as MuiDialog } from '@mui/material/Dialog'
import type { DialogProps } from '@mui/material/Dialog'

type OnClose =
  | ((
      event: {},
      reason: 'backdropClick' | 'escapeKeyDown' | 'backClick'
    ) => void)
  | undefined

const Dialog = (props: DialogProps) => {
  const onDialogClose: OnClose = (event, reason) => {
    removeEventListener('popstate', listener)
    if (reason == 'backClick') reason = 'escapeKeyDown'
    else history.back()
    props.onClose ? props.onClose(event, reason) : null
  }
  const listener = () => onDialogClose({}, 'backClick')
  React.useEffect(() => {
    if (props.open) {
      history.pushState('#', '')
      addEventListener('popstate', listener)
    }
  }, [props.open])
  return <MuiDialog onClose={onDialogClose} {...props} />
}

export default Dialog
