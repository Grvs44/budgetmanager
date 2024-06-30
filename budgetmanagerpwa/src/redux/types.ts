export type Budget = {
  id: number
  name: string
  description: string
  active: boolean
  user: number
  last_modified: string
  modified_by: number | null
}

export type BudgetState = {
  budgets: Budget[]
}
