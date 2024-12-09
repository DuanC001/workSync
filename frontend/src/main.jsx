import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { store, persistor } from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import theme from '../src/theme/theme.js'
import { ThemeProvider } from  '@mui/material/styles'
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
             <App />
        </LocalizationProvider>
    </PersistGate>
  </Provider>
  </ThemeProvider>

  
)
