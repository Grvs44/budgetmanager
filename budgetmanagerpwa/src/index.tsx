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
import JoinForm, { joinFormAction } from './pages/JoinForm'
import { getCurrentUser } from './api/user'
import Home, { homeLoader } from './pages/Home'
import { GlobalProvider } from './context/global'
import BudgetPage from './pages/BudgetPage'
import PayeePage, { payeePageLoader } from './pages/PayeePage'
import PaymentPage, { paymentPageLoader } from './pages/PaymentPage'
import { rootPath } from './settings'

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
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </GlobalProvider>
)
