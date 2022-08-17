import { ThemeProvider } from 'next-themes'
import UserProvider from '../context/userContext'
import TodosProvider from '../context/todosContext'
import Layout from '../components/layout'
import '../styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" enableSystem={false}>
      <UserProvider>
        <Layout>
          <TodosProvider>
            <Component {...pageProps} />
          </TodosProvider>
        </Layout>
      </UserProvider>
    </ThemeProvider>
  )
}
