import { useState, useEffect, createContext, useContext } from 'react'
import { useUser } from '../context/userContext'
import { todosDAO } from '../dao/todosDAO'

export const TodosContext = createContext()

export default function TodosProvider({ children }) {
  const { user } = useUser()
  const [todos, setTodos] = useState([])
  const [isLoadingTodos, setIsLoadingTodos] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        if (user) {
          const todosFromDb = await todosDAO.getTodos(user.uid)
          setTodos(todosFromDb)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoadingTodos(false)
      }
    })()
    return () => setTodos([])
  }, [user])

  return (
    <TodosContext.Provider value={{ todos, setTodos, isLoadingTodos }}>
      {children}
    </TodosContext.Provider>
  )
}

export const useTodos = () => useContext(TodosContext)
