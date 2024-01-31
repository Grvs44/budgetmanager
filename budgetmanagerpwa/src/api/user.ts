import { fetchJson, getObject } from './api'

export async function getUser(id: number) {
  return await getObject('user', id)
}

export async function getCurrentUser() {
  return await fetchJson('user/me/')
}

export async function getTotal() {
  return await fetchJson('total/')
}
