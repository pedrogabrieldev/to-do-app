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
  const [isSavingEdit, setIsSavingEdit] = useState(false)
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

  async function saveEdit(event) {
    event.preventDefault()

    try {
      if (editedTodo !== todo.text) {
        setIsSavingEdit(true)
        const todoRef = doc(db, 'todos', todo.id)
        await updateDoc(todoRef, {
          text: editedTodo,
          lastUpdate: serverTimestamp(),
        })
        setTodo({ ...todo, text: editedTodo })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsSavingEdit(false)
      setIsEditing(false)
    }
  }

  function discardEdit(event) {
    event.preventDefault()

    setIsEditing(false)
  }

  async function deleteTodo() {
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
            <RadixTooltip content="Edit">
              <button
                type="button"
                className="w-4"
                onClick={() => setIsEditing(true)}
              >
                <FontAwesomeIcon
                  icon={faPencil}
                  className="text-slate-100 hover:text-green-300"
                />
              </button>
            </RadixTooltip>
            <RadixTooltip content={isDeleting ? 'Deleting' : 'Delete'}>
              <button type="button" className="w-4" onClick={deleteTodo}>
                {isDeleting ? (
                  <FontAwesomeIcon
                    icon={faSpinner}
                    spin
                    className="text-red-500"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-slate-100 hover:text-red-500"
                  />
                )}
              </button>
            </RadixTooltip>
          </div>
        </>
      )}

      {isEditing && (
        <form className="flex-1 flex gap-3" onSubmit={saveEdit}>
          <input
            type="text"
            className="flex-1 px-3 py-2 text-slate-900 outline-none"
            value={editedTodo}
            onChange={(event) => setEditedTodo(event.target.value)}
            required
          />

          <div className="flex gap-3">
            <RadixTooltip content="Save">
              <button type="submit" className="w-4">
                {isSavingEdit ? (
                  <FontAwesomeIcon
                    icon={faSpinner}
                    spin
                    className="text-green-300"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-green-300 hover:text-lg"
                  />
                )}
              </button>
            </RadixTooltip>
            <RadixTooltip content="Discard">
              <button type="button" className="w-4" onClick={discardEdit}>
                <FontAwesomeIcon
                  icon={faX}
                  className="text-red-500 hover:text-lg"
                />
              </button>
            </RadixTooltip>
          </div>
        </form>
      )}
    </li>
  )
}
