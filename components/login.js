import { useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../lib/firebase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        )
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
      }
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode)
      console.log(errorMessage)
    }
  }

  function handleChangeEmail(event) {
    setEmail(event.target.value)
  }

  function handleChangePassword(event) {
    setPassword(event.target.value)
  }

  return (
    <>
      <form
        className="flex-1 flex flex-col justify-center items-center gap-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center text-2xl font-bold select-none">
          {isLogin ? 'LOGIN' : 'REGISTER'}
        </h2>
        <input
          type="email"
          className="text-slate-900 px-3 py-2 outline-none w-full max-w-[30ch]"
          placeholder="Email"
          value={email}
          onChange={handleChangeEmail}
          required
        />
        <input
          type="password"
          className="text-slate-900 px-3 py-2 outline-none w-full max-w-[30ch]"
          placeholder="Password"
          value={password}
          onChange={handleChangePassword}
          required
        />
        <input
          type="submit"
          className="w-full max-w-[30ch] px-3 py-2 border border-slate-100 cursor-pointer duration-500 hover:bg-sky-900"
          value={isLogin ? 'Login' : 'Register'}
        />
        <p>
          {isLogin ? 'Not registered yet? ' : 'Already registered? '}
          <button
            type="button"
            className="text-orange-400 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </>
  )
}
