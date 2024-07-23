import React from 'react'
import { useParams } from 'react-router-dom'
import { join } from '../api/join'
import { useJoinBudgetMutation } from '../redux/apiSlice'

export default function JoinForm() {
  const params = useParams()
  const [joinBudget] = useJoinBudgetMutation()

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      await joinBudget(
        Object.fromEntries(new FormData(event.target).entries())
      ).unwrap()
      alert('Joined budget')
    } catch (error) {
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
