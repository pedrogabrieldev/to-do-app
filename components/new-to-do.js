import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useUser } from '../context/userContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function NewTodo({ todos, setTodos }) {
  const { user } = useUser()

  const [todo, setTodo] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSaving(true)

    try {
      const docRef = await addDoc(collection(db, 'todos'), {
        uid: user.uid,
        text: todo,
        createdAt: serverTimestamp(),
      })
      setTodos([{ id: docRef.id, text: todo }, ...todos])
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
          className="flex-1 px-3 py-2 outline-none text-slate-900"
          value={todo}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-12 px-3 py-2 bg-orange-400 text-slate-900"
        >
          {isSaving ? <FontAwesomeIcon icon={faSpinner} spin /> : '+'}
        </button>
      </form>
    </>
  )
}
