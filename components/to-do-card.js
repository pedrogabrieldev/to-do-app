import { useState } from 'react'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useTodos } from '../context/todosContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function TodoCard(props) {
  const { todos, setTodos } = useTodos()
  const [todo, setTodo] = useState(props.todo)
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleCheckboxChange() {
    const todoRef = doc(db, 'todos', todo.id)

    try {
      await updateDoc(todoRef, {
        isCompleted: !todo.isCompleted,
      })
      setTodo({ ...todo, isCompleted: !todo.isCompleted })
    } catch (error) {
      console.log(error)
    }
  }

  async function handleDelete() {
    setIsDeleting(true)

    try {
      await deleteDoc(doc(db, 'todos', props.todo.id))
      setTodos(todos.filter((_todo) => _todo.id !== todo.id))
    } catch (error) {
      console.log(error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <li className="group flex items-center my-3 px-3 py-2 border border-slate-100 hover:bg-slate-700">
      <div className="flex-1 flex gap-3">
        <input
          type="checkbox"
          id={todo.id}
          className="peer"
          onChange={handleCheckboxChange}
          checked={todo.isCompleted}
        />
        <label htmlFor={todo.id} className="flex-1 peer-checked:line-through">
          {props.todo.text}
        </label>
      </div>
      <div className="hidden gap-3 group-hover:flex">
        <button type="button" className="w-4">
          <FontAwesomeIcon
            icon={faPencil}
            className="text-green-300 peer hover:text-lg"
          />
        </button>
        <button type="button" className="w-4" onClick={handleDelete}>
          {isDeleting ? (
            <FontAwesomeIcon icon={faSpinner} spin className="text-red-500" />
          ) : (
            <FontAwesomeIcon
              icon={faTrash}
              className="text-red-500 hover:text-lg"
            />
          )}
        </button>
      </div>
    </li>
  )
}
