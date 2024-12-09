import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentCompany: null,
  loading: false,
  error: false,
}

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true
    },
    signInSuccess: (state, action) => {
      state.currentCompany = action.payload
      state.loading = false
      state.error = false
    },
    signInFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    updateCompanyStart: (state) => {
      state.loading = true
    },
    updateCompanySuccess: (state, action) => {
      state.currentCompany = action.payload
      state.loading = false
      state.error = false
    },
    updateCompanyFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    deleteCompanyStart: (state) => {
      state.loading = true
    },
    deleteCompanySuccess: (state, action) => {
      state.currentCompany = null
      state.loading = false
      state.error = false
    },
    deleteCompanyFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    signOut: (state) => {
      state.currentCompany = null
      state.loading = false
      state.error = false
    },
  },
})

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateCompanyStart,
  updateCompanySuccess,
  updateCompanyFailure,
  deleteCompanyStart,
  deleteCompanySuccess,
  deleteCompanyFailure,
  signOut,
} = companySlice.actions

export default companySlice.reducer
