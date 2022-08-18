import { useState, useEffect, createContext, useContext } from 'react'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useUser } from '../context/userContext'

export const TodosContext = createContext()

export default function TodosProvider({ children }) {
  const { user } = useUser()
  const [todos, setTodos] = useState([])
  const [isLoadingTodos, setIsLoadingTodos] = useState(true)

  async function fetchTodos(user) {
    try {
      const todosFromDb = []
      const q = query(
        collection(db, 'todos'),
        where('uid', '==', user.uid),
        orderBy('createdAt', 'desc')
      )

      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        todosFromDb.push({ id: doc.id, ...doc.data() })
      })
      setTodos(todosFromDb)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoadingTodos(false)
    }
  }

  useEffect(() => {
    if (user) {
      ;(async () => await fetchTodos(user))()
      return () => setTodos([])
    } else setIsLoadingTodos(false)
  }, [user])

  return (
    <TodosContext.Provider value={{ todos, setTodos, isLoadingTodos }}>
      {children}
    </TodosContext.Provider>
  )
}

export const useTodos = () => useContext(TodosContext)
