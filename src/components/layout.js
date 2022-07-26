import Header from './header'

export default function Layout({ children }) {
  return (
    <div className="flex flex-col items-center min-h-screen text-[#1A1A1A] dark:text-[#F2F2F2] bg-[#F2F2F2] dark:bg-[#1A1A1A]">
      <Header />
      <main className="w-full max-w-2xl flex-1 flex flex-col items-center px-6 py-4">
        {children}
      </main>
    </div>
  )
}
