import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '../lib/firebase'

export class todosDAO {
  /**
   * Adds a todo to the 'todos' collection
   * @param {string} userId
   * @param {string} todoText
   * @returns
   */
  static async addTodo(userId, todoText) {
    try {
      const docRef = await addDoc(collection(db, 'todos'), {
        uid: userId,
        text: todoText,
        isCompleted: false,
        createdAt: serverTimestamp(),
        lastUpdate: null,
      })
      return docRef
    } catch (error) {
    } finally {
    }
  }

  /**
   * Finds and returns all todos given an user uid
   * Returns a list of todos
   * @param {string} userId - The uid of the user to search for its todos
   * @returns
   */
  static async getTodos(userId) {
    try {
      let todos = []
      const q = query(
        collection(db, 'todos'),
        where('uid', '==', userId),
        orderBy('createdAt', 'desc')
      )
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => todos.push({ id: doc.id, ...doc.data() }))
      return todos
    } catch (error) {
    } finally {
    }
  }

  /**
   * Edit a specific todo text given its id
   * @param {string} todoId
   * @param {string} newText
   */
  static async updateTodoText(todoId, newText) {
    const todoRef = doc(db, 'todos', todoId)
    await updateDoc(todoRef, {
      text: newText,
      lastUpdate: serverTimestamp(),
    })
  }

  /**
   * Edit a specific todo isCompleted given its id
   * @param {string} todoId
   * @param {boolean} isCompleted
   */
  static async updateTodoIsCompleted(todoId, isCompleted) {
    try {
      const todoRef = doc(db, 'todos', todoId)
      await updateDoc(todoRef, {
        isCompleted,
      })
    } catch (error) {
    } finally {
    }
  }

  /**
   * Delete a specific todo given its id
   * @param {string} todoId
   */
  static async deleteTodo(todoId) {
    try {
      await deleteDoc(doc(db, 'todos', todoId))
    } catch (error) {
    } finally {
    }
  }
}
