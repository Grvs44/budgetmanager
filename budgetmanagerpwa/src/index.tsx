import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import theme from './theme'
import ErrorPage from './pages/ErrorPage'
import JoinForm, { joinFormAction } from './pages/JoinForm'
import { getCurrentUser } from './api/user'
import { rootPath } from './settings'
import Home, { homeLoader } from './pages/Home'
import { GlobalProvider } from './context/global'
import BudgetPage, { budgetPageLoader } from './pages/BudgetPage'
import PayeePage, { payeePageLoader } from './pages/PayeePage'
import PaymentPage, { paymentPageLoader } from './pages/PaymentPage'

const router = createBrowserRouter([
  {
    path: rootPath,
    element: <App />,
    errorElement: <ErrorPage />,
    loader: getCurrentUser,
    children: [
      {
        path: '',
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: 'budget',
        element: <BudgetPage />,
        loader: budgetPageLoader,
      },
      {
        path: 'payee',
        element: <PayeePage />,
        loader: payeePageLoader,
      },
      {
        path: 'payment',
        element: <PaymentPage />,
        loader: paymentPageLoader,
      },
      {
        path: 'budget/:budgetId/payee',
        element: <PayeePage />,
        loader: payeePageLoader,
      },
      {
        path: 'budget/:budgetId/payment',
        element: <PaymentPage />,
        loader: paymentPageLoader,
      },
      {
        path: 'payee/:payeeId/payment',
        element: <PaymentPage />,
        loader: paymentPageLoader,
      },
      {
        path: 'join',
        element: <JoinForm />,
        action: joinFormAction,
      },
      {
        path: 'join/:id',
        element: <JoinForm />,
        action: joinFormAction,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GlobalProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </GlobalProvider>
)
