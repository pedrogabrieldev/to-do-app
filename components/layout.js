import Header from './header'

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100">
      <Header />
      <main className="flex-1 flex px-6 py-4">{children}</main>
    </div>
  )
}
