import {
  createObject,
  deleteObject,
  fetchJson,
  getList,
  getObject,
  updateObject,
} from './api'

export async function getPayee(id: number) {
  return await getObject('payee', id)
}

export async function getPayees(params: Record<string, string>) {
  return await getList('payee', params)
}

export async function createPayee(data: object) {
  return await createObject('payee', data)
}

export async function updatePayee(id: number, data: object) {
  return await updateObject('payee', id, data)
}

export async function deletePayee(id: number) {
  return await deleteObject('payee', id)
}

export async function getPayeeTotal(id: number) {
  return await fetchJson(`payee/${id}/total/`)
}

export async function canEditPayee(id: number) {
  return await fetchJson(`payee/${id}/edit/`)
}
