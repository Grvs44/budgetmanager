import { createSlice } from '@reduxjs/toolkit'
import { InstallState } from './types'

const initialState: InstallState = {
  show: false,
  deferredPrompt: null,
}

export const installSlice = createSlice({
  name: 'install',
  initialState,
  reducers: {
    setShow(state, action) {
      console.log('setShow: ' + action.payload)
      state.show = action.payload
    },
    setDeferredPrompt(state, action) {
      console.log('setDP: ' + action.payload)
      state.deferredPrompt = action.payload
    },
  },
})

export const { setShow, setDeferredPrompt } = installSlice.actions
export default installSlice.reducer
