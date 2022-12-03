import styles from "../styles/MiniNavbar.module.css"

import { Navbar, Container, Nav, Button } from "react-bootstrap"

import { ShoppingBag } from "./Icons"
import { useLanguage } from "../context/LanguageContext"

export default function MiniNavbar() {

    const {changeLanguage} = useLanguage()


    const tranlationHelper = (e, lan) => {
        e.preventDefault();
        changeLanguage(lan);
    }

    return (
        <Navbar className={styles.miniNavbar} collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <div className={styles.miniNavbarButtonDiv}>
                        <Button variant='primary' className={styles.miniNavbarButton} onClick={(e) => tranlationHelper(e, 'es')}>
                            {"ESPAÑOL".toLocaleUpperCase()}
                        </Button>
                        </div>

                        <div className={styles.miniNavbarButtonDiv}>
                        <Button variant='primary' className={styles.miniNavbarButton} onClick={(e) => tranlationHelper(e, 'en')}>
                             {"ENGLISH".toLocaleUpperCase()}
                        </Button>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}