export type User = {
  first_name: string
  last_name: string
  username: string
}

export type Settings = {
  currency: string
}

export type Title = {
  title: string
}

export type InstallState = {
  show: boolean
  deferredPrompt: any
}

export type State = {
  install: InstallState
  settings: Settings
  title: Title
}

export interface Entity {
  id: number
}

export interface Nameable extends Entity {
  name: string
}

export type Budget = {
  id: number
  name: string
  description: string
  active: boolean
  user: number
  last_modified: string
  modified_by: number | null
}

export type Payee = {
  id:number
  budget:number
  name: string
  description: string
  user:number
  last_modified: string
  modified_by: number | null
}

export type EditablePayee = {
  budget:number|null
  name: string
  description: string
}

export interface PageState<T> {
  results: T[]
  count: number
  next: string
}
