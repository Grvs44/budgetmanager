import React from 'react'
import { Button, Container, List as MuiList, Typography } from '@mui/material'

export default function List({ Context, onNextPage, ItemComponent }) {
  const {items, updateItems} = React.useContext(Context)

  const onNextPageClick = async () => {
    const newItems = await onNextPage(items.nextPage)
    updateItems(newItems)
  }

  return (
    <Container>
      <Typography>
        Showing {items.results.length} of {items.count}
      </Typography>
      <MuiList>
        {items.results.map((item) => (
          <ItemComponent item={item} key={item.id} />
        ))}
      </MuiList>
      {items.nextPage ? <Button onClick={onNextPageClick}>Load more</Button> : null}
    </Container>
  )
}
