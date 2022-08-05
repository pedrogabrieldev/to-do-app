import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useUser } from '../context/userContext'
import { useTodos } from '../context/todosContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faPlus } from '@fortawesome/free-solid-svg-icons'

export default function NewTodo() {
  const { user } = useUser()
  const { todos, setTodos } = useTodos()
  const [todo, setTodo] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSaving(true)

    try {
      const docRef = await addDoc(collection(db, 'todos'), {
        uid: user.uid,
        text: todo,
        isCompleted: false,
        createdAt: serverTimestamp(),
        lastUpdate: null,
      })
      setTodos([{ id: docRef.id, text: todo, isCompleted: false }, ...todos])
      setTodo('')
    } catch (error) {
      console.log(error)
    } finally {
      setIsSaving(false)
    }
  }

  function handleChange(event) {
    setTodo(event.target.value)
  }

  return (
    <>
      <form className="flex" onSubmit={handleSubmit}>
        <input
          type="text"
          className="flex-1 min-w-0 px-3 py-2 outline-none text-slate-900"
          value={todo}
          onChange={handleChange}
          required
        />
        <button type="submit" className="w-12 bg-orange-400 text-slate-900">
          {isSaving ? (
            <FontAwesomeIcon icon={faSpinner} size="lg" spin />
          ) : (
            <FontAwesomeIcon icon={faPlus} size="lg" />
          )}
        </button>
      </form>
    </>
  )
}
