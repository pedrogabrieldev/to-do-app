import { signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { useUser } from '../context/userContext'

export default function Header() {
  const { user } = useUser()
  async function handleSignout() {
    await signOut(auth)
  }

  return (
    <header className="sticky w-full flex items-center justify-between px-6 py-8 bg-[#0D0D0D]">
      <h1 className="select-none font-black text-4xl">
        <span className="text-sky-300">to</span>
        <span className="text-indigo-500">do</span>
      </h1>
      {user && <button onClick={handleSignout}>Logout</button>}
    </header>
  )
}
