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

export type Budget = {
  id: number
  name: string
  description: string
  active: boolean
  user: number
  last_modified: string
  modified_by: number | null
}

export interface PageState<T> {
  results: T[]
  next: string
}
