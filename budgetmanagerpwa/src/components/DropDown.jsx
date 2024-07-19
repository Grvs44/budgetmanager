// From https://mui.com/material-ui/react-autocomplete
import React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import { useGetBudgetsSearchQuery } from '../redux/apiSlice'

export default function DropDown({
  defaultValue,
  label,
  name,
  required,
  disabled,
}) {
  const [open, setOpen] = React.useState(false)
  const [input, setInput] = React.useState('')
  const { data, isLoading } = useGetBudgetsSearchQuery(input, {
    skip: !open || input == '',
  })
  const loading = open && isLoading

  return (
    <Autocomplete
      filterOptions={(x) => x}
      defaultValue={defaultValue}
      label={label}
      name={name}
      required={required}
      disabled={disabled}
      id="asynchronous-demo"
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionKey={(option) => {
        console.log('key', option, option.id)
        return option.id
      }}
      getOptionLabel={(option) => {
        console.log('label', option, option.name)
        return option.name
      }}
      onChange={(event, value, reason) => console.log('value', value)}
      onInputChange={(event, value, reason) => setInput(value)}
      options={data ? data.results : []}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Asynchronous"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  )
}
