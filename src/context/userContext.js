import { useState, useEffect, createContext, useContext } from 'react'
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from 'firebase/auth'
import { auth } from '../lib/firebase'

export const UserContext = createContext()

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoadingUser, setIsLoadingUser] = useState(true) // Helpful, to update the UI accordingly.

  async function loginWithGithub() {
    try {
      const provider = new GithubAuthProvider()
      provider.setCustomParameters({
        prompt: 'select_account',
      })
      signInWithRedirect(auth, provider)
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.customData.email
      const credential = GithubAuthProvider.credentialFromError(error)
      console.log(errorCode)
      console.log(errorMessage)
      console.log(email)
      console.log(credential)
    }
  }

  async function loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({
        prompt: 'select_account',
      })
      signInWithRedirect(auth, provider)
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.customData.email
      const credential = GoogleAuthProvider.credentialFromError(error)
      console.log(errorCode)
      console.log(errorMessage)
      console.log(email)
      console.log(credential)
    }
  }

  async function signOutUser() {
    try {
      await signOut(auth)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const unsubscriber = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const { uid, displayName, email, photoURL } = user
          setUser({ uid, displayName, email, photoURL })
        } else setUser(null)
      } catch (error) {
      } finally {
        setIsLoadingUser(false)
      }
    })

    return () => unsubscriber()
  }, [])

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoadingUser,
        loginWithGithub,
        loginWithGoogle,
        signOutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
