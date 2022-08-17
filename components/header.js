import { signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { useUser } from '../context/userContext'
import Logo from './logo'
import ThemeSelector from './theme-selector'

export default function Header({ theme, setTheme }) {
  const { user } = useUser()

  async function handleSignout() {
    await signOut(auth)
  }

  return (
    <header className="sticky w-full flex items-center justify-between px-6 py-8 text-[#F2F2F2] bg-[#0D0D0D]">
      <Logo />
      <div className="flex gap-5">
        <ThemeSelector theme={theme} setTheme={setTheme} />
        {user && (
          <button className="select-none" onClick={handleSignout}>
            Logout
          </button>
        )}
      </div>
    </header>
  )
}
