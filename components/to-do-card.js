import { useState } from 'react'
import { doc, deleteDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useTodos } from '../context/todosContext'
import RadixTooltip from './radix-tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPencil,
  faTrash,
  faSpinner,
  faCheck,
  faX,
} from '@fortawesome/free-solid-svg-icons'

export default function TodoCard(props) {
  const { todos, setTodos } = useTodos()
  const [todo, setTodo] = useState(props.todo)
  const [isEditing, setIsEditing] = useState(false)
  const [editedTodo, setEditedTodo] = useState(todo.text)
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

  async function handleSaveEdit(event) {
    event.preventDefault()

    if (editedTodo !== todo.text) {
      const todoRef = doc(db, 'todos', todo.id)
      await updateDoc(todoRef, {
        text: editedTodo,
        lastUpdate: serverTimestamp(),
      })
      setTodo({ ...todo, text: editedTodo })
    }
    setIsEditing(false)
  }

  function discardEdit(event) {
    event.preventDefault()

    setIsEditing(false)
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
    <li className="group flex gap-3 items-center my-3 px-3 py-2 border border-slate-100 hover:bg-slate-700">
      {!isEditing && (
        <>
          <div className="flex-1 flex gap-3">
            <input
              type="checkbox"
              id={todo.id}
              className="peer"
              onChange={handleCheckboxChange}
              checked={todo.isCompleted}
            />
            <label
              htmlFor={todo.id}
              className="flex-1 py-2 peer-checked:line-through"
            >
              {todo.text}
            </label>
          </div>

          <div className="hidden group-hover:flex group-hover:gap-3">
            <button
              type="button"
              className="w-4"
              onClick={() => setIsEditing(true)}
            >
              <RadixTooltip content="Edit">
                <FontAwesomeIcon
                  icon={faPencil}
                  className="text-slate-100 hover:text-green-300"
                />
              </RadixTooltip>
            </button>
            <button type="button" className="w-4" onClick={handleDelete}>
              {isDeleting ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  className="text-red-500"
                />
              ) : (
                <RadixTooltip content="Delete">
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-slate-100 hover:text-red-500"
                  />
                </RadixTooltip>
              )}
            </button>
          </div>
        </>
      )}

      {isEditing && (
        <form className="flex-1 flex gap-3" onSubmit={handleSaveEdit}>
          <input
            type="text"
            className="flex-1 px-3 py-2 text-slate-900 outline-none"
            value={editedTodo}
            onChange={(event) => setEditedTodo(event.target.value)}
            required
          />

          <div className="flex gap-3">
            <button type="submit" className="w-4">
              <RadixTooltip content="Save">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-green-300 hover:text-lg"
                />
              </RadixTooltip>
            </button>
            <button type="button" className="w-4" onClick={discardEdit}>
              <RadixTooltip content="Discard">
                <FontAwesomeIcon
                  icon={faX}
                  className="text-red-500 hover:text-lg"
                />
              </RadixTooltip>
            </button>
          </div>
        </form>
      )}
    </li>
  )
}
