import { useEffect, useState } from "react";
import styles from "../../styles/ProductDetail.module.css";
import { Row, Col, Card, Button, Form } from 'react-bootstrap'
import * as ProductVarF from "../../logic/fetchProductVariation"
import Head from 'next/head'
import * as commonConstants from '../../logic/common-constants'

import { useCart } from "../../context/CartContext";
import { useLanguage } from "../../context/LanguageContext";

const ProductVariationDetail = ({ id }) => {

    const [loading, setLoading] = useState(true);
    const [product_variation, setProductVariation] = useState(commonConstants.defaultProduct)
    const [current_image, setCurrentImage] = useState(null)

    const { cart, updateProduct } = useCart()
    const { translate } = useLanguage();

    useEffect(() => {
        async function awaitProductVariation() {
            await ProductVarF.fetchProductVariation(setProductVariation, id);
        }
            awaitProductVariation()
    }, [id])

    useEffect(() => {
        if (product_variation.product !== null && product_variation.product !== undefined) {
            setLoading(false)
        }
    }, [product_variation, id])

    useEffect(() => {
        if (product_variation.product !== null && product_variation.product !== undefined) {
            setCurrentImage(product_variation.product.primary_image)
        }
    }, [product_variation])

    const onColorClick = (e, new_color) => {
        e.preventDefault();
        setProductVariation(prevState => ({ ...prevState, principal_color: new_color }));
    }

    const onSizeClick = (e, new_size) => {
        e.preventDefault();
        setProductVariation(prevState => ({ ...prevState, size: new_size }));
    }

    const onSleeveClick = (e, new_sleeve) => {
        e.preventDefault();
        setProductVariation(prevState => ({ ...prevState, sleeve: new_sleeve }));
    }

    const onQuantityClick = (new_quantity) => {
        setProductVariation(prevState => ({ ...prevState, quantity: new_quantity }));
    }

    const onSmallImageClick = (e, new_image) => {
        e.preventDefault();
        setCurrentImage(new_image)
    }

    const onAddProductCart = async (e) => {
        e.preventDefault();
        await updateProduct(product_variation)
    }

    return (loading) ? <div></div> : (
        <>
            <Head>
                <title>Habaneras de Lino | {product_variation.product.name}</title>
                <meta name="description" content="Habaneras de Lino is a linen and cotton clothing store to buy online" />
                <link rel="icon" href="/favicon.ico" />
            </Head>


            <main className={styles.main}>
                <div className={styles.product_detail_div}>
                    <div className={styles.product_detail_wrapper_div}>
                        <Row className={styles.product_detail_row}>

                            <Col xs={12} sm={12} md={12} lg={6} className={styles.primary_image_col}>
                                <div className={styles.small_images_div}>

                                    <div className={styles.small_image_card_div}>

                                        <Button onClick={(e) => onSmallImageClick(e, product_variation.product.primary_image)} className={styles.small_image_button}>
                                            <Card className={styles.small_image_card}>
                                                <img
                                                    src={product_variation.product.primary_image.image}
                                                    alt='Product'
                                                    className={styles.small_image} />
                                            </Card>
                                        </Button>
                                    </div>

                                    <div className={styles.small_image_card_div}>

                                        <Button onClick={(e) => onSmallImageClick(e, product_variation.product.secondary_image)} className={styles.small_image_button}>
                                            <Card className={styles.small_image_card}>
                                                <img
                                                    src={product_variation.product.secondary_image.image}
                                                    alt='Product'
                                                    className={styles.small_image} />
                                            </Card>
                                        </Button>
                                    </div>

                                    {product_variation.product.extra_images ?
                                        <>
                                            {product_variation.product.extra_images.map((small_img, small_img_index) => {
                                                return (

                                                    <div className={styles.small_image_card_div} key={small_img_index}>
                                                        <Button onClick={(e) => onSmallImageClick(e, small_img)} className={styles.small_image_button}>
                                                            <Card className={styles.small_image_card}>
                                                                <img src={small_img.image} alt='Product' />
                                                            </Card>
                                                        </Button>
                                                    </div>
                                                );
                                            })}
                                        </> : <></>
                                    }
                                </div>
                                <div className={styles.primary_image_card_div}>
                                    <Card className={styles.primary_image_card}>
                                        <img
                                            src={current_image.image}
                                            alt='Product'
                                            className={styles.primary_image} />
                                    </Card>
                                </div>
                            </Col>

                            <Col xs={12} sm={12} md={12} lg={6} className={styles.product_info_col}>
                                <div className={styles.product_info_form_div}>
                                    <div className={styles.product_title_div}>
                                        <h4 className={styles.product_title}>
                                            {product_variation.product.name}
                                        </h4>
                                    </div>

                                    <div className={styles.product_info_divider} />

                                    <div className={styles.product_colors_div}>
                                        <h6 className={styles.product_colors_title}>
                                            COLOR
                                        </h6>

                                        <div className={styles.available_colors_row}>
                                            {product_variation.product.available_colors.map((available_color, available_color_idx) => {
                                                return (
                                                    <div className={styles.available_color_col} key={available_color_idx}>
                                                        <Button variant='outline-light' onClick={(e) => onColorClick(e, available_color)}>
                                                            {product_variation.principal_color.id == available_color.id ?
                                                                <div className={styles.available_color_select_div} style={{ "backgroundColor": available_color.code }}></div>
                                                                : <div className={styles.available_color_div} style={{ "backgroundColor": available_color.code }}></div>
                                                            }
                                                        </Button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className={styles.product_info_divider} />

                                    <div className={styles.product_size_div}>
                                        <h6 className={styles.product_size_title}>
                                            {translate('word', 'size', 'full')}
                                        </h6>

                                        <Row className={styles.product_size_row}>
                                            {commonConstants.productSizes[product_variation.product.tag].map((prod_size, prod_size_idx) => {
                                                return (
                                                    <Col xs={3} sm={3} md={3} lg={3} className={styles.product_size_col} key={prod_size_idx}>
                                                        <div className={styles.product_size_div}>
                                                            {product_variation.size == prod_size ?
                                                                <Button variant='light'
                                                                    className={styles.product_size_select_button}
                                                                    onClick={(e) => onSizeClick(e, prod_size)}>
                                                                    {prod_size}
                                                                </Button>
                                                                :
                                                                <Button variant='light' className={styles.product_size_button} onClick={(e) => onSizeClick(e, prod_size)}>
                                                                    {prod_size}
                                                                </Button>
                                                            }
                                                        </div>
                                                    </Col>
                                                );
                                            })
                                            }

                                        </Row>
                                    </div>

                                    {commonConstants.productFields[product_variation.product.tag].includes('sleeve') ?

                                        <div className={styles.product_sleeve_div}>
                                            <h6 className={styles.product_sleeve_title}>
                                                {translate('word', 'sleeve', 'full')}
                                            </h6>

                                            <Row className={styles.product_sleeve_row}>
                                                {commonConstants.productSleeves[product_variation.product.tag].map((prod_sleeve, prod_sleeve_idx) => {
                                                    return (
                                                        <Col xs={6} sm={4} md={4} lg={4} className={styles.product_sleeve_col} key={prod_sleeve_idx}>
                                                            <div className={styles.product_sleeve_element_div}>
                                                                {product_variation.sleeve == prod_sleeve ?
                                                                    <Button variant='light'
                                                                        className={styles.product_sleeve_select_button}
                                                                        onClick={(e) => onSizeClick(e, prod_sleeve)}>
                                                                        {translate('word', prod_sleeve, 'full')}
                                                                    </Button>
                                                                    :
                                                                    <Button variant='light' className={styles.product_sleeve_button} onClick={(e) => onSleeveClick(e, prod_sleeve)}>
                                                                        {translate('word', prod_sleeve, 'full')}
                                                                    </Button>
                                                                }
                                                            </div>
                                                        </Col>
                                                    );
                                                })
                                                }

                                            </Row>
                                        </div> : <div></div>
                                    }

                                    <div className={styles.product_info_divider} />

                                    <Row className={styles.product_quantity_pricing_div}>

                                        <Col xs={6} sm={6} md={6} lg={6}>

                                            <div className={styles.product_quantity_div}>
                                                <h6 className={styles.product_quantity_title}>
                                                    QTY
                                                </h6>

                                                <div className={styles.product_quantity_form_div}>
                                                    <Form.Select size='md' className={styles.product_quantity_form}
                                                        defaultValue={product_variation.quantity}
                                                        onChange={(e) => onQuantityClick(e.target.value)}>
                                                        {commonConstants.quantityArray.map((qty_value, qty_idx) => {
                                                            return (
                                                                <option key={qty_idx} value={qty_value}>
                                                                    {qty_value}
                                                                </option>
                                                            );
                                                        })}
                                                    </Form.Select>
                                                </div>

                                            </div>
                                        </Col>

                                        <Col xs={6} sm={6} md={6} lg={6}>
                                            <div className={styles.product_pricing_div}>
                                                <h6 className={styles.product_pricing_title}>
                                                    {translate('word', 'pricing', 'partial')}
                                                </h6>

                                                <h6>${parseFloat(parseFloat(product_variation.product.base_pricing) * parseFloat(product_variation.quantity)).toFixed(2)}</h6>
                                            </div>
                                        </Col>

                                    </Row>

                                    <div className={styles.add_button_div}>
                                        <Button variant='outline-light' className={styles.add_button} onClick={(e) => onAddProductCart(e)}>
                                            {translate('short phrase', 'add_to_cart', 'full')}
                                        </Button>
                                    </div>

                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </main>
        </>
    );

}

ProductVariationDetail.getInitialProps = async ({ query }) => {
    const { id } = query;

    return { id };
};

export default ProductVariationDetail;