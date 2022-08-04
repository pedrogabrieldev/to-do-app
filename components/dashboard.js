import TodosProvider from '../context/todosContext'
import NewTodo from './new-to-do'
import ToDoList from './to-do-list'

export default function Dashboard() {
  return (
    <TodosProvider>
      <NewTodo />
      <ToDoList />
    </TodosProvider>
  )
}
