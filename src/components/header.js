import { useUser } from '../context/userContext'
import Logo from './logo'
import ThemeSelector from './theme-selector'

export default function Header() {
  const { user, signOutUser } = useUser()

  return (
    <header className="sticky w-full flex items-center justify-between px-6 py-8 text-[#F2F2F2] bg-[#0D0D0D]">
      <Logo />
      <div className="flex gap-5">
        <ThemeSelector />
        {user && (
          <button className="select-none" onClick={signOutUser}>
            Logout
          </button>
        )}
      </div>
    </header>
  )
}
