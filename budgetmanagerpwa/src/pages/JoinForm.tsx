import React from 'react'
import { useParams } from 'react-router-dom'
import { useJoinBudgetMutation } from '../redux/apiSlice'

export default function JoinForm() {
  const params = useParams()
  const [joinBudget] = useJoinBudgetMutation()

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    try {
      await joinBudget(
        Object.fromEntries(new FormData(event.currentTarget).entries())
      ).unwrap()
      alert('Joined budget')
    } catch (error: any) {
      alert('Error joining budget: ' + error?.data?.detail)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <label>
        Join code
        <br />
        <input
          type="text"
          name="id"
          placeholder="Join code"
          defaultValue={params.id}
        />
        <br />
        <input type="submit" />
      </label>
    </form>
  )
}
