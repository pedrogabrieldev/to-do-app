import TodoCard from './to-do-card'
import { useTodos } from '../context/todosContext'

export default function TodoList() {
  const { todos, isLoadingTodos } = useTodos()

  return (
    <ul className="">
      {isLoadingTodos
        ? 'Loading'
        : todos.map((todo) => <TodoCard key={todo.id} todo={todo} />)}
    </ul>
  )
}
