import { useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
} from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'
import { auth, db } from '../lib/firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  async function handleLoginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({
        prompt: 'select_account',
      })
      const result = await signInWithRedirect(auth, provider)
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.customData.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
      console.log(errorCode)
      console.log(errorMessage)
      console.log(email)
      console.log(credential)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsLoading(true)

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password)
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )

        await addDoc(collection(db, 'users'), {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        })
      }
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode)
      console.log(errorMessage)
    } finally {
      setIsLoading(false)
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
        className="flex-1 flex flex-col justify-center items-center gap-2 w-full max-w-xs"
        onSubmit={handleSubmit}
      >
        <button
          type="button"
          className="w-full px-3 py-2 text-[#0D0D0D] bg-[#F2F2F2] rounded-md"
          onClick={handleLoginWithGoogle}
        >
          <FontAwesomeIcon icon={faGoogle} />
          <span className="ml-3">Login with Google</span>
        </button>
        <span className="my-3">or</span>
        <input
          type="email"
          className="text-[#F2F2F2] px-3 py-2 outline-none border border-[#333333] rounded-md w-full bg-[#262626]"
          placeholder="Email"
          value={email}
          onChange={handleChangeEmail}
          required
        />
        <input
          type="password"
          className="text-[#F2F2F2] px-3 py-2 outline-none border border-[#333333] rounded-md w-full bg-[#262626]"
          placeholder="Password"
          value={password}
          onChange={handleChangePassword}
          required
        />
        <button
          type="submit"
          className="w-full my-2 px-3 py-2 bg-indigo-500 text-[#F2F2F2] text-xl rounded-md cursor-pointer duration-500 hover:bg-indigo-600"
        >
          {isLoading ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : isLogin ? (
            'Login'
          ) : (
            'Register'
          )}
        </button>
        <p>
          {isLogin ? 'Not registered yet? ' : 'Already registered? '}
          <button
            type="button"
            className="text-sky-300 font-medium rounded-md hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </>
  )
}
