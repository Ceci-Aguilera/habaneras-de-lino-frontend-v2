import styles from '../styles/Layout.module.css'
import NextNavbar from './Navbar'
import Footer from './Footer'
import MiniNavbar from './MiniNavbar'

export default function Layout({ children }) {
  return (
    <div className={styles.layoutDiv}>
      <MiniNavbar />
      <NextNavbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}