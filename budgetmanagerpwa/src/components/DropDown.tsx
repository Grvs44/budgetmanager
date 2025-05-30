// From https://mui.com/material-ui/react-autocomplete
import React from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import type { Nameable } from '../redux/types'

export type DropDownProps = {
  defaultValue?: Nameable | null
  label: string
  name: string
  required?: boolean
  disabled?: boolean
  onChange: (value: Nameable | null) => void
  hook: (input: string, open: boolean) => any
}

export default function DropDown(props: DropDownProps) {
  const [open, setOpen] = React.useState<boolean>(false)
  const [input, setInput] = React.useState<string>('')
  const { data, isLoading } = props.hook(input, open)
  const loading = open && isLoading

  return (
    <Autocomplete
      filterOptions={(x) => x}
      defaultValue={props.defaultValue}
      disabled={props.disabled}
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
      onChange={(event, value, reason) => props.onChange(value)}
      onInputChange={(event, value, reason) => setInput(value)}
      options={data ? data.results : []}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
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
