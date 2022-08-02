import { useState } from 'react'
import NewTodo from './new-to-do'
import ToDoList from './to-do-list'

export default function Dashboard() {
  const [todos, setTodos] = useState([])

  return (
    <>
      <NewTodo todos={todos} setTodos={setTodos} />
      <ToDoList todos={todos} setTodos={setTodos} />
    </>
  )
}
