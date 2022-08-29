import { useEffect, useState } from "react";
import styles from "../../styles/Cart.module.css";
import { Row, Col, Card, Button, Form } from 'react-bootstrap'
import Head from 'next/head'
import * as commonConstants from '../../logic/common-constants'
import Link from "next/link";


import { useCart } from "../../context/CartContext";

const Cart = () => {

    const { cart, deleteProduct } = useCart()
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
                                    <h1 className={styles.cart_title}>Cart</h1>
                                </div>
                            </Col>
                            <Col xs={3} sm={3} md={3} lg={3} className={styles.cart_title_col}>
                                <div className={styles.cart_checkout_col_div}>
                                    <Button variant="dark" size='lg' className={styles.checkout_button}>
                                        Checkout
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <div className={styles.cart_prods_div}>

                        {cart.product_variations.map((product, prodIdx) => {
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
                                                        <span className={styles.cart_item_info_name}>Size:</span> {product.size}
                                                    </p>

                                                    {product.sleeve ?
                                                        <p className={styles.cart_item_info}>
                                                            <span className={styles.cart_item_info_name}>Sleeve:</span> {product.sleeve}
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
                                                        <span className={styles.cart_item_info_name}>Quantity:</span> {product.quantity}
                                                    </p>

                                                    <p className={styles.cart_item_info}>
                                                        <span className={styles.cart_item_info_name}>Pricing:</span> {" "}
                                                        ${parseFloat(product.product.base_pricing * product.quantity).toFixed(2)}
                                                    </p>


                                                </div>
                                                <Row className={styles.cart_buttons_row}>
                                                    <Col xs={12} sm={12} md={6} lg={6} className={styles.cart_button_col}>
                                                        <Button variant='outline-dark' className={styles.cart_delete_button} onClick={(e) => onDeleteProduct(e, product.id)}>
                                                            Delete
                                                        </Button>
                                                    </Col>
                                                    <Col xs={12} sm={12} md={6} lg={6} className={styles.cart_button_col}>
                                                        <Link href={`/product-variation/${product.id}`}>
                                                            <Button variant='dark' className={styles.cart_edit_button}>
                                                                Edit
                                                            </Button>
                                                        </Link>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            );
                        })}

                        <div className={styles.total_pricing_div}>
                            Pre Total: ${parseFloat(cart.total_amount).toFixed(2)}
                        </div>

                    </div>

                </div>
            </main>
        </>
    );

}

export default Cart;