// From https://mui.com/material-ui/react-autocomplete
import React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'

export default function DropDown({
  defaultValue,
  label,
  name,
  required,
  disabled,
  onChange,
  hook,
}) {
  const [open, setOpen] = React.useState(false)
  const [input, setInput] = React.useState('')
  const { data, isLoading } = hook(input, open)
  const loading = open && isLoading

  return (
    <Autocomplete
      filterOptions={(x) => x}
      defaultValue={defaultValue}
      label={label}
      name={name}
      required={required}
      disabled={disabled}
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionKey={(option) => option.id}
      getOptionLabel={(option) => option.name}
      onChange={(event, value, reason) => onChange(value)}
      onInputChange={(event, value, reason) => setInput(value)}
      options={data ? data.results : []}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
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
