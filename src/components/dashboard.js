import NewTodo from './new-to-do'
import ToDoList from './to-do-list'

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-10 w-full">
      <NewTodo />
      <ToDoList />
    </div>
  )
}
