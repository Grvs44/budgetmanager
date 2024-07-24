import { createSlice } from '@reduxjs/toolkit'
import { Settings } from './types'
import { storageKey } from '../settings'

const defaultSettings: Settings = {
  currency: '',
}

const getInitialState: () => Settings = () => {
  const settings = localStorage.getItem(storageKey)
  return settings ? JSON.parse(settings) : defaultSettings
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: getInitialState(),
  reducers: {
    saveSettings: (state, action) => {
      localStorage.setItem(storageKey, JSON.stringify(action.payload))
      return action.payload
    },
  },
})

export const { saveSettings } = settingsSlice.actions
export default settingsSlice.reducer
