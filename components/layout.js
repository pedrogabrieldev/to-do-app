import Header from './header'

export default function Layout({ children }) {
  return (
    <div className="flex flex-col items-center min-h-screen bg-slate-900 text-slate-100">
      <Header />
      <main className="w-full max-w-3xl flex-1 flex flex-col items-stretch px-6 py-4">
        {children}
      </main>
    </div>
  )
}
