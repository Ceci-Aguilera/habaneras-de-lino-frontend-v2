import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from '../components/Layout'

import { CartProvider } from "../context/CartContext";
import { LanguageProvider } from "../context/LanguageContext";


function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <CartProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </LanguageProvider>
  )
}

export default MyApp;