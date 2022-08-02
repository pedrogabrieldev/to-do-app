import { useState } from 'react'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function TodoCard(props) {
  const [isDeleting, setIsDeleting] = useState(false)
  async function handleDelete() {
    setIsDeleting(true)

    try {
      await deleteDoc(doc(db, 'todos', props.todo.id))
      props.setTodos(props.todos.filter((todo) => todo.id !== props.todo.id))
    } catch (error) {
      console.log(error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <li className="flex items-center my-3 px-3 py-2 border border-slate-100">
      <div className="flex-1 flex gap-2">
        <input type="checkbox" />
        <p className="flex-1">{props.todo.text}</p>
      </div>
      <div className="flex gap-3">
        <button type="button" className="w-4">
          <FontAwesomeIcon icon={faPencil} className="text-green-300" />
        </button>
        <button type="button" className="w-4" onClick={handleDelete}>
          {isDeleting ? (
            <FontAwesomeIcon icon={faSpinner} spin className="text-red-500" />
          ) : (
            <FontAwesomeIcon icon={faTrash} className="text-red-500" />
          )}
        </button>
      </div>
    </li>
  )
}
