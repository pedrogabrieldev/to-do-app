import { signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { useUser } from '../context/userContext'

export default function Header() {
  const { loadingUser, user } = useUser()
  async function handleSignout() {
    await signOut(auth)
  }

  return (
    <header className="sticky w-full flex items-center justify-between px-6 py-4 border-b">
      <h1 className="text-3xl select-none">TO DO APP</h1>
      {user && <button onClick={handleSignout}>Logout</button>}
    </header>
  )
}
