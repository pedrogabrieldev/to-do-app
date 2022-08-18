import { useState } from 'react'
import { signInWithRedirect, GoogleAuthProvider } from 'firebase/auth'
import { auth, db } from '../lib/firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

export default function Login() {
  async function handleLoginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({
        prompt: 'select_account',
      })
      await signInWithRedirect(auth, provider)
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

  return (
    <>
      <div className="flex-1 flex flex-col justify-center items-center gap-2 w-full max-w-xs">
        <button
          type="button"
          className="w-full px-3 py-2 text-[#0D0D0D] bg-[#F2F2F2] border border-[#333333] shadow-lg rounded-md dark:border-none dark:shadow-none"
          onClick={handleLoginWithGoogle}
        >
          <FontAwesomeIcon icon={faGoogle} />
          <span className="ml-3">Login with Google</span>
        </button>
      </div>
    </>
  )
}
