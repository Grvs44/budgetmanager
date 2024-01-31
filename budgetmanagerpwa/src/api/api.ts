import Cookies from 'js-cookie'
import { apiUrl, loginUrl } from '../settings'
import { redirect } from 'react-router-dom'

export async function fetchJson(url: string, options: object = {}) {
  const request = await fetch(apiUrl + url, options)
  if (request.ok) {
    if (request.status === 204) {
      return null
    } else {
      return await request.json()
    }
  } else if (request.status === 403) {
    throw loginRedirect()
  } else {
    let statusText
    try {
      const response = await request.json()
      const entries = []
      for (const entry of Object.entries(response)) {
        entries.push(`${entry[0]}: ${entry[1]}`)
      }
      statusText = entries.join('\n')
    } catch (SyntaxError) {
      statusText = 'Unknown error'
    }
    throw new Response('', { status: request.status, statusText })
  }
}

export async function sendJson(url: string, options: any) {
  options.headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'X-CSRFToken': Cookies.get('csrftoken'),
  }
  return await fetchJson(url, options)
}

export async function getFields(table: string) {
  const response = await fetchJson(`${table}/`, {
    method: 'options',
  })
  return response.actions.POST
}

export async function getObject(entity: string, id: number) {
  return await fetchJson(`${entity}/${id}/`)
}

export async function getList(entity: string, params: Record<string, string>) {
  const searchParams = new URLSearchParams(params)
  if (searchParams.size === 0) return await fetchJson(`${entity}/`)
  else return await fetchJson(`${entity}/?${searchParams}`)
}

export async function createObject(entity: string, data: object) {
  return await sendJson(`${entity}/`, {
    method: 'post',
    body: JSON.stringify(data),
  })
}

export async function updateObject(entity: string, id: number, data: object) {
  return await sendJson(`${entity}/${id}/`, {
    method: 'put',
    body: JSON.stringify(data),
  })
}

export async function deleteObject(entity: string, id: number) {
  return await sendJson(`${entity}/${id}/`, {
    method: 'delete',
  })
}

export function loginRedirect() {
  return redirect(loginUrl + location.pathname)
}
