import Head from 'next/head'
import { useUser } from '../context/userContext'
import Login from '../components/login'
import Dashboard from '../components/dashboard'

export default function Home() {
  const { loadingUser, user } = useUser()

  return (
    <>
      <Head>
        <title>To Do App</title>
      </Head>
      {loadingUser ? 'Loading...' : user ? <Dashboard /> : <Login />}
    </>
  )
}
