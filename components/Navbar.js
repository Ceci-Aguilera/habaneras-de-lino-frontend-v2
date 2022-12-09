import styles from "../styles/Navbar.module.css"

import { Navbar, Container, Nav, Dropdown, NavDropdown, } from "react-bootstrap"

import { ShoppingBag } from "./Icons"

import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'

export default function NextNavbar() {

    const { cart } = useCart();
    const { translate } = useLanguage();

    return (
        <Navbar className={styles.navbar} collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
                <Navbar.Brand href="/" className={styles.title}>Habaneras de Lino</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown
                            title={translate('word', 'women', 'full')}
                            className={styles.navbar_navdropdown}
                            menuVariant="dark"
                            active={true}
                        >
                            <NavDropdown.Item href="#">
                                Soon in Stock
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown
                            title={translate('word', 'men', 'full')}
                            className={styles.navbar_navdropdown}
                            menuVariant="light"
                            active={true}
                        >
                            <NavDropdown.Item href="/enzo-men">
                                All
                            </NavDropdown.Item>

                            <NavDropdown
                                title={'Collections'}
                                className={styles.navbar_inner_navdropdown}
                                menuVariant="light"
                                drop="end"
                                active={true}
                            >
                                <NavDropdown.Item href="/collections-name/Luxury/2022">
                                    Luxury
                                </NavDropdown.Item>

                                <NavDropdown.Item href="/collections-name/Luxury/2022">
                                    Etnik
                                </NavDropdown.Item>

                                <NavDropdown.Item href="/collections-name/Cittadino/2022">
                                    Cittadino
                                </NavDropdown.Item>

                                <NavDropdown.Item href="/collections-name/Valladolid/2022">
                                    Valladolid
                                </NavDropdown.Item>
                            </NavDropdown>


                            <NavDropdown.Item href="/categories-name/Guayaberas">
                                Guayaberas
                            </NavDropdown.Item>

                            <NavDropdown.Item href="/categories-name/Guayamisas">
                                Guayamisas
                            </NavDropdown.Item>

                            <NavDropdown.Item href="/categories-name/Camisas">
                                Shirts
                            </NavDropdown.Item>

                            <NavDropdown.Item href="/categories-name/Pantalones">
                                Pants
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/cart"><ShoppingBag height="30" width="30" fill="black" /> <span className={styles.cart_count}>
                            {(cart == null || cart.product_variations == null) ? "+" : cart.product_variations.length}
                        </span>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}