export type User = {
  id?: number
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

export type BudgetItem = {
  id: number
  name: string
  active: boolean
}

export type Budget = BudgetItem & {
  description: string
  user: number
  last_modified: string
  modified_by: number | null
}

export type EditableBudget = {
  id?: number
  name: string
  description: string
  active: boolean
}

export type SubmitBudget = {
  name?: string
  description?: string
  active?: boolean
}

export type UpdateBudget = Entity & SubmitBudget

export type PayeeItem = {
  id: number
  budget: number
  name: string
}

export type Payee = PayeeItem & {
  description: string
  user: number
  last_modified: string
  modified_by: number | null
}

export type PayeeSearch = {
  name: string
  budget: Entity
}

export type EditablePayee = {
  budget: number | null
  name: string
  description: string
}

export type SubmitPayee = Partial<EditablePayee> & {
  id?: number
}

export type UpdatePayee = Entity & SubmitPayee

export type PaymentItem = {
  id: number
  payee: number
  amount: number
  date: string
}

export type Payment = PaymentItem & {
  pending: boolean
  notes: string
  user: number
  last_modified: string
  modified_by: number | null
}

export type EditablePayment = {
  payee: number | null
  amount: number | null
  date: string | null
  pending: boolean
  notes: string
}

export type SubmitPayment = {
  payee?: number
  amount?: number
  date?: string
}

export interface PageState<T> {
  results: T[]
  count: number
  next: string
}
