import { useEffect } from 'react'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useUser } from '../context/userContext'
import TodoCard from './to-do-card'

export default function TodoList({ todos, setTodos }) {
  const { user } = useUser()

  useEffect(() => {
    async function fetchTodos() {
      const todosFromDb = []
      const q = query(
        collection(db, 'todos'),
        where('uid', '==', user.uid),
        orderBy('createdAt', 'desc')
      )

      try {
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          todosFromDb.push({ id: doc.id, text: doc.data().text })
        })
        setTodos(todosFromDb)
      } catch (error) {
        console.log(error)
      }
    }

    fetchTodos()
  }, [setTodos, user.uid])
  return (
    <ul className="">
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
      ))}
    </ul>
  )
}
