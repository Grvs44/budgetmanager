import { createSlice } from '@reduxjs/toolkit'
import { Settings } from './types'

const defaultSettings: Settings = {
  currency: '',
}

const getInitialState: () => Settings = () => {
  const settings = localStorage.getItem(import.meta.env.VITE_STORAGE_KEY)
  return settings ? JSON.parse(settings) : defaultSettings
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: getInitialState(),
  reducers: {
    saveSettings: (state, action) => {
      localStorage.setItem(
        import.meta.env.VITE_STORAGE_KEY,
        JSON.stringify(action.payload)
      )
      return action.payload
    },
  },
})

export const { saveSettings } = settingsSlice.actions
export default settingsSlice.reducer
