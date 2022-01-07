import "bootstrap/dist/css/bootstrap.css";
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from "../components/layout/Layout";
import { AuthContextProvider } from '../components/auth-context'
import {DataContextProvider} from '../components/data-context'

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <DataContextProvider>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </DataContextProvider>
    ) 
}

export default MyApp
