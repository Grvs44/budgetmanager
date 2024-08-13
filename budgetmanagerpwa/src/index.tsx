import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import App from './App'
import theme from './theme'
import ErrorPage from './pages/ErrorPage'
import JoinForm from './pages/JoinForm'
import Home from './pages/Home'
import BudgetPage from './pages/BudgetPage'
import PayeePage from './pages/PayeePage'
import PaymentPage from './pages/PaymentPage'

const router = createBrowserRouter([
  {
    path: import.meta.env.BASE_URL,
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'budget',
        element: <BudgetPage />,
      },
      {
        path: 'payee',
        element: <PayeePage />,
      },
      {
        path: 'payment',
        element: <PaymentPage />,
      },
      {
        path: 'budget/:budgetId/payee',
        element: <PayeePage />,
      },
      {
        path: 'budget/:budgetId/payment',
        element: <PaymentPage />,
      },
      {
        path: 'payee/:payeeId/payment',
        element: <PaymentPage />,
      },
      {
        path: 'join',
        element: <JoinForm />,
      },
      {
        path: 'join/:id',
        element: <JoinForm />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
)
