import styles from "../styles/Navbar.module.css"

import { Navbar, Container, Nav } from "react-bootstrap"

import { ShoppingBag } from "./Icons"

export default function NextNavbar() {
    return (
        <Navbar className={styles.navbar} collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
                <Navbar.Brand href="/" className={styles.title}>Habaneras de Lino</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/cart"><ShoppingBag height="30" width="30" fill="black" /> Cart</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Dank memes
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}