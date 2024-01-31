import {
  createObject,
  deleteObject,
  fetchJson,
  getList,
  getObject,
  updateObject,
} from './api'

export async function getPayment(id: number) {
  return await getObject('payment', id)
}

export async function getPayments(params: Record<string, string>) {
  return await getList('payment', params)
}

export async function createPayment(data: object) {
  return await createObject('payment', data)
}

export async function updatePayment(id: number, data: object) {
  return await updateObject('payment', id, data)
}

export async function deletePayment(id: number) {
  return await deleteObject('payment', id)
}

export async function canEditPayment(id: number) {
  return await fetchJson(`payment/${id}/edit/`)
}
