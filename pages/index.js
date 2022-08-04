import Head from 'next/head'
import { useUser } from '../context/userContext'
import Login from '../components/login'
import Dashboard from '../components/dashboard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  const { loadingUser, user } = useUser()

  return (
    <>
      <Head>
        <title>To Do App</title>
      </Head>
      {loadingUser ? (
        <div className="flex-1 flex justify-center items-center">
          <FontAwesomeIcon icon={faSpinner} size="4x" spin />
        </div>
      ) : user ? (
        <Dashboard />
      ) : (
        <Login />
      )}
    </>
  )
}
