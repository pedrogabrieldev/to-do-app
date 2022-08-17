import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import * as Popover from '@radix-ui/react-popover'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon, faDesktop } from '@fortawesome/free-solid-svg-icons'

export default function ThemeSelector() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button aria-label="Select theme">
          <FontAwesomeIcon
            icon={theme === 'light' ? faSun : faMoon}
            className={`${
              theme === 'light' ? 'text-yellow-200' : 'text-sky-300'
            }`}
          />
        </button>
      </Popover.Trigger>

      <Popover.Content
        className="py-1 bg-[#262626] rounded-md border border-[#333333]"
        sideOffset={5}
      >
        <ul className="flex flex-col min-w-[160px] text-[#F2F2F2]">
          <Popover.Close>
            <li
              className={`flex items-center gap-3 px-2 py-1 cursor-pointer hover:bg-[#0D0D0D] ${
                theme === 'light' && 'text-yellow-200'
              }`}
              onClick={() => setTheme('light')}
            >
              <FontAwesomeIcon icon={faSun} />
              Light
            </li>
          </Popover.Close>
          <Popover.Close>
            <li
              className={`flex items-center gap-3 px-2 py-1 cursor-pointer hover:bg-[#0D0D0D] ${
                theme === 'dark' && 'text-sky-300'
              }`}
              onClick={() => setTheme('dark')}
            >
              <FontAwesomeIcon icon={faMoon} />
              Dark
            </li>
          </Popover.Close>
        </ul>
      </Popover.Content>
    </Popover.Root>
  )
}
