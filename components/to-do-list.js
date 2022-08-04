import TodoCard from './to-do-card'
import { useTodos } from '../context/todosContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function TodoList() {
  const { todos, isLoadingTodos } = useTodos()

  return isLoadingTodos ? (
    <div className="flex-1 flex justify-center items-center">
      <FontAwesomeIcon icon={faSpinner} size="4x" spin />
    </div>
  ) : (
    <ul className="">
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}
