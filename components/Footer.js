import styles from "../styles/Footer.module.css"
import { Row, Col } from "react-bootstrap"
import Link from "next/link"
import { FacebookIcon, InstagramIcon } from "../components/Icons"

export default function Footer() {
    return (
        <div className={styles.footerDiv}>

            <div className={styles.footerWrapperDiv}>

                <Row className={styles.footerRow}>
                    <Col xs={4} sm={4} md={4} lg={4} className={styles.footerCol}>
                        <h4 className={styles.footerTitle}>
                            Styles
                        </h4>

                        <div className={styles.footerLinkDiv}>
                            <Link href="#">
                                <a className={styles.footerLinkP}>
                                    All Categories
                                </a>
                            </Link>

                            <Link href="/categories-name/Guayaberas">
                                <a className={styles.footerLinkP}>
                                    Guayaberas
                                </a>
                            </Link>

                            <Link href="/categories-name/Guayamisas">
                                <a className={styles.footerLinkP}>
                                    Guayamisas
                                </a>
                            </Link>

                            <Link href="/categories-name/Camisas">
                                <a className={styles.footerLinkP}>
                                    Shirts
                                </a>
                            </Link>

                            <Link href="/categories-name/Pantalones">
                                <a className={styles.footerLinkP}>
                                    Pants
                                </a>
                            </Link>
                        </div>
                    </Col>

                    <Col xs={4} sm={4} md={4} lg={4} className={styles.footerCol}>
                        <h4 className={styles.footerTitle}>
                            Collections
                        </h4>

                        <div className={styles.footerLinkDiv}>
                            <Link href="#">
                                <a className={styles.footerLinkP}>
                                    All Collections
                                </a>
                            </Link>

                            <Link href="/collections-name/Luxury/2022">
                                <a className={styles.footerLinkP}>
                                    Luxury
                                </a>
                            </Link>

                            <Link href="/collections-name/Etnik/2022">
                                <a className={styles.footerLinkP}>
                                    Etnik
                                </a>
                            </Link>

                            <Link href="/collections-name/Cittadino/2022">
                                <a className={styles.footerLinkP}>
                                    Cittadino
                                </a>
                            </Link>

                            <Link href="/collections-name/Valladolid/2022">
                                <a className={styles.footerLinkP}>
                                    Valladolid
                                </a>
                            </Link>
                        </div>
                    </Col>

                    <Col xs={4} sm={4} md={4} lg={4} className={styles.footerCol}>
                        <h4 className={styles.footerTitle}>
                        About Us
                        </h4>

                        <div className={styles.footerLinkDiv}>
                            <Link href="#">
                                <a className={styles.footerLinkP}>
                                    Wholesales Policy
                                </a>
                            </Link>

                            <Link href="#">
                                <a className={styles.footerLinkP}>
                                    Shipping Info
                                </a>
                            </Link>

                            <Link href="#">
                                <a className={styles.footerLinkP}>
                                    Contact Us
                                </a>
                            </Link>

                            <div className={styles.footerSocialMediaDiv}>
                                <div className={styles.footerIconDiv}>
                                    <Link href="https://www.facebook.com/HabanerasDeLino/">
                                        <FacebookIcon height="30" width="30" fill="#444444" className={styles.footerIconLink} />
                                    </Link>
                                </div>

                                <div className={styles.footerIconDiv}>
                                    <Link href="https://www.instagram.com/habanerasdelino/">
                                        <InstagramIcon height="30" width="30" fill="#444444" className={styles.footerIconLink} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                <p className={styles.footerBrand}>
                    Copyright © 2022 Habaneras de Lino LLC
                </p>

            </div>

        </div>
    )
}