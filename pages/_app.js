import UserProvider from '../context/userContext'
import TodosProvider from '../context/todosContext'
import Layout from '../components/layout'
import '../styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout>
        <TodosProvider>
          <Component {...pageProps} />
        </TodosProvider>
      </Layout>
    </UserProvider>
  )
}

export default MyApp
