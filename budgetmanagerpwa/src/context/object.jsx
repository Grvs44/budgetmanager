import React from 'react'

export const ObjectProvider = ({ children, Context }) => {
  const initialState = {
    count: 0,
    nextPage: null,
    results: [],
    addedItems: 0,
  }

  const [items, setItems] = React.useState(initialState)

  const addItem = (newItem) => {
    setItems({
      ...items,
      count: items.count + 1,
      results: items.results.concat(newItem),
      addedItems: items.addedItems + 1,
    })
  }

  const clearItems = () => {
    setItems(initialState)
  }

  const resetItems = (newItems) => {
    setItems({
      count: newItems.count,
      nextPage: newItems.next,
      results: newItems.results,
      addedItems: 0,
    })
  }

  const updateItems = (newItems) => {
    setItems({
      count: newItems.count,
      nextPage: newItems.next,
      results: items.results
        .slice(0, items.results.length - items.addedItems)
        .concat(newItems.results),
      addedItems: 0,
    })
  }

  return (
    <Context.Provider
      value={{ items, setItems, addItem, clearItems, resetItems, updateItems }}
    >
      {children}
    </Context.Provider>
  )
}
