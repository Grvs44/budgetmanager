import { User } from './types'

export const showUserDetails = (user: User | null) =>
  user
    ? user.first_name
      ? user.last_name
        ? user.first_name + ' ' + user.last_name
        : user.first_name
      : user.username
    : 'Administrator'
