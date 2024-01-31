import {
  createObject,
  deleteObject,
  fetchJson,
  getList,
  getObject,
  updateObject,
} from './api'

export async function getBudget(id: number) {
  return await getObject('budget', id)
}

export async function getBudgets(params: Record<string, string>) {
  return await getList('budget', params)
}

export async function createBudget(data: object) {
  return await createObject('budget', data)
}

export async function updateBudget(id: number, data: object) {
  return await updateObject('budget', id, data)
}

export async function deleteBudget(id: number) {
  return await deleteObject('budget', id)
}

export async function getBudgetTotal(id: number) {
  return await fetchJson(`budget/${id}/total/`)
}

export async function canEditBudget(id: number) {
  return await fetchJson(`budget/${id}/edit/`)
}
