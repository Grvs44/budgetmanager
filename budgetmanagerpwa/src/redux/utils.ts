import { User } from './types'

export const showUserDetails = (user: User | null) =>
  user
    ? user.first_name
      ? user.last_name
        ? user.first_name + ' ' + user.last_name
        : user.first_name
      : user.username
    : 'Administrator'

export const getPaymentTitle = (
  payment: { amount: number },
  payee: { name: string }
) =>
  `${Math.abs(payment.amount)} ${payment.amount > 0 ? 'from' : 'to'} ${
    payee.name
  }`
