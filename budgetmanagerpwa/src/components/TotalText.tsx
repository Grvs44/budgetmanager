import React from 'react'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'

export type TotalTextProps = {
  data?: string
  isFetching: boolean
  show: boolean
  onShow: () => void
}

const TotalText: React.FC<TotalTextProps> = (props) => {
  return (
    <Typography>
      {'Total: '}
      {props.show ? (
        props.isFetching ? (
          <Skeleton />
        ) : (
          props.data
        )
      ) : (
        <Button onClick={props.onShow}>Show</Button>
      )}
    </Typography>
  )
}
export default TotalText
