import { createObject } from './api'

export async function join(data: { id: string }) {
  return await createObject('join', data)
}
