import React from 'react'
import { Form, useParams } from 'react-router-dom'
import { join } from '../api/join'

export default function JoinForm() {
  const params = useParams()
  return (
    <Form method="post">
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
    </Form>
  )
}

export async function joinFormAction({ request, params }) {
  const fd = await request.formData()
  const data = Object.fromEntries(fd)
  console.log(data)
  await join(data)
  return new Response(<p>Joined</p>)
}
