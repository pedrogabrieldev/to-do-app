import { useEffect, useState } from 'react'
import UserProvider from '../context/userContext'
import TodosProvider from '../context/todosContext'
import Layout from '../components/layout'
import '../styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(null)

  useEffect(() => {
    if (localStorage.theme === 'light') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }, [])

  return (
    <UserProvider>
      <Layout theme={theme} setTheme={setTheme}>
        <TodosProvider>
          <Component {...pageProps} />
        </TodosProvider>
      </Layout>
    </UserProvider>
  )
}

export default MyApp
