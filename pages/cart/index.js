import { useEffect, useState } from "react";
import styles from "../../styles/Cart.module.css";
import { Row, Col, Card, Button, Form } from 'react-bootstrap'
import Head from 'next/head'
import * as commonConstants from '../../logic/common-constants'
import Link from "next/link";


import { useCart } from "../../context/CartContext";
import { useLanguage } from "../../context/LanguageContext";

const Cart = () => {

    const { cart, deleteProduct } = useCart()
    const {translate } = useLanguage()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (cart !== null && cart !== undefined) {
            setLoading(false)
        }
    }, [cart])

    const onDeleteProduct = async (e, product_id) => {
        e.preventDefault();
        await deleteProduct(product_id, true)
    }

    return (loading) ? <div>No Items in the Cart</div> : (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div className={styles.cart_div}>

                    <div className={styles.cart_title_div}>
                        <Row className={styles.cart_title_row}>
                            <Col xs={3} sm={3} md={3} lg={3} className={styles.cart_title_col}></Col>
                            <Col xs={6} sm={6} md={6} lg={6} className={styles.cart_title_col}>
                                <div className={styles.cart_title_col_div}>
                                    <h1 className={styles.cart_title}>{translate('word', 'cart', 'partial')}</h1>
                                </div>
                            </Col>
                            <Col xs={3} sm={3} md={3} lg={3} className={styles.cart_title_col}>
                                <div className={styles.cart_checkout_col_div}>
                                    <Link href='/checkout'>
                                        <Button variant="dark" size='lg' className={styles.checkout_button}>
                                            {translate('word', 'checkout', 'partial')}
                                        </Button>
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <div className={styles.cart_prods_div}>

                        {cart.product_variations?
                            cart.product_variations.map((product, prodIdx) => {
                            return (

                                <div key={prodIdx} className={styles.cart_item_div}>
                                    <Row className={styles.cart_item_row}>
                                        <Col xs={12} sm={12} md={6} lg={6} className={styles.cart_item_img_col}>
                                            <div className={styles.cart_item_img_div}>
                                                <img src={product.product.primary_image.image}
                                                    alt="Cart Product"
                                                    className={styles.cart_item_img} />
                                            </div>
                                        </Col>
                                        <Col xs={12} sm={12} md={6} lg={6} className={styles.cart_item_description_col}>
                                            <div className={styles.cart_item_description_div}>
                                                <div className={styles.cart_item_title_div}>
                                                    <h4 className={styles.cart_item_title}>
                                                        {product.product.name}
                                                    </h4>
                                                </div>

                                                <div className={styles.cart_item_info_div}>
                                                    <p className={styles.cart_item_info}>
                                                        <span className={styles.cart_item_info_name}>{translate('word', 'size', 'partial')}:</span> {product.size}
                                                    </p>

                                                    {product.sleeve ?
                                                        <p className={styles.cart_item_info}>
                                                            <span className={styles.cart_item_info_name}>{translate('word', 'sleeve', 'partial')}:</span> {product.sleeve}
                                                        </p>

                                                        : <div></div>
                                                    }

                                                    <div className={styles.cart_item_color_div}>
                                                        <p className={styles.cart_item_info}>
                                                            <span className={styles.cart_item_info_name}>Color:</span></p>
                                                        <div className={styles.available_color_select_div}
                                                            style={{ "backgroundColor": product.principal_color.code }}></div>
                                                    </div>

                                                    <p className={styles.cart_item_info}>
                                                        <span className={styles.cart_item_info_name}>{translate('word', 'quantity', 'partial')}:</span> {product.quantity}
                                                    </p>

                                                    <p className={styles.cart_item_info}>
                                                        <span className={styles.cart_item_info_name}>{translate('word', 'pricing', 'partial')}:</span> {" "}
                                                        ${parseFloat(product.product.base_pricing * product.quantity).toFixed(2)}
                                                    </p>


                                                </div>
                                                <Row className={styles.cart_buttons_row}>
                                                    <Col xs={12} sm={12} md={6} lg={6} className={styles.cart_button_col}>
                                                        <Button variant='outline-dark' className={styles.cart_delete_button} onClick={(e) => onDeleteProduct(e, product.id)}>
                                                        {translate('word', 'delete', 'partial')}
                                                        </Button>
                                                    </Col>
                                                    <Col xs={12} sm={12} md={6} lg={6} className={styles.cart_button_col}>
                                                        <Link href={`/product-variation/${product.id}`}>
                                                            <Button variant='dark' className={styles.cart_edit_button}>
                                                            {translate('word', 'edit', 'partial')}
                                                            </Button>
                                                        </Link>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            );
                        }):<div></div>}

                        <div className={styles.total_pricing_div}>
                            Pre Total: ${cart.total_amount?parseFloat(cart.total_amount).toFixed(2):"0.00"}
                        </div>

                    </div>

                </div>
            </main>
        </>
    );

}

export default Cart;