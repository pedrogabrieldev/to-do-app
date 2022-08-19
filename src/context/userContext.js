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
    // Listen authenticated user
    const unsubscriber = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          // User is signed in.
          const { uid, displayName, email, photoURL } = user
          // You could also look for the user doc in your Firestore (if you have one):
          // const userDoc = await firebase.firestore().doc(`users/${uid}`).get()
          setUser({ uid, displayName, email, photoURL })
        } else setUser(null)
      } catch (error) {
        // Most probably a connection error. Handle appropriately.
      } finally {
        setIsLoadingUser(false)
      }
    })

    // Unsubscribe auth listener on unmount
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

// Custom hook that shorthands the context!
export const useUser = () => useContext(UserContext)
