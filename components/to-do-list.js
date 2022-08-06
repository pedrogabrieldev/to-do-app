import { useTodos } from '../context/todosContext'
import TodoCard from './to-do-card'

export default function TodoList() {
  const { todos } = useTodos()

  return (
    <>
      <ul className="flex flex-col gap-2">
        {todos.map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </ul>
    </>
  )
}
