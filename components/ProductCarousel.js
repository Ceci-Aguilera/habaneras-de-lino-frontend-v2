import React, { Component } from 'react'

import styles from '../styles/ProductCarousel.module.css'

import { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'

import { ArrowRightIcon, ArrowLeftIcon } from './Icons'
import Link from 'next/link'

import * as commonConstants from '../logic/common-constants'

import useWindowSize from './WindowSizeHook'

const ProductCarousel = ({ collection, collectionTitle = false }) => {

    const [products, setProducts] = useState([])
    const [currentProducts, setCurrentProducts] = useState([]);
    const [currentFirstIndex, setCurrentFirstIndex] = useState(0);

    const {amountOfProducts, amountOfTime} = useWindowSize();

    useEffect(() => {
        setProducts(collection.products)
    }, [collection])

    useEffect(() => {
        var productArray = new Array();
        for (var i = 0; i < amountOfProducts; i++){
            productArray.push(products[i])
        }
        setCurrentProducts(productArray);
    }, [products])

    useEffect(() => {
        if(currentFirstIndex !== null){

            var productArray = new Array();
            for (var i = 0; i < amountOfProducts; i++){
                productArray.push(products[currentFirstIndex + i])
            }
            
            console.log("Index 2: ", currentFirstIndex + 0)
            setCurrentProducts(productArray);
        }
    }, [currentFirstIndex])

    const nextArrow = (e=null) => {
        if(e !== null) e.preventDefault();
        setCurrentFirstIndex((currentFirstIndex + amountOfProducts) % products.length)
    }

    const prevArrow = (e) => {
        e.preventDefault();
        setCurrentFirstIndex((currentFirstIndex - amountOfProducts + products.length) % products.length)
    }

    return (currentProducts.length == 0 || currentProducts == undefined || currentProducts == null) ?
        <div></div> : (
            <div className={styles.carousel_div}>
                <h4 className={styles.carousel_title}>
                    {collection.title + ' ' + (collectionTitle ? 'Collection' : '')}
                </h4>

                <div className={styles.carousel_wrapper}>
                    <div className={styles.arrow_div}>
                        <Button className={styles.arrow_button} variant='outline-light' onClick={(e) => prevArrow(e)}>
                            <ArrowLeftIcon className={styles.arrow_icon} height={40} width={40} fill={"lightblue"} />
                        </Button>
                    </div>

                    <div className={styles.cards_div}>
                        {currentProducts.map((current_product, currentProductIndex) => {
                            return (
                                <div className={styles.card_div} key={currentProductIndex}>
                                    {current_product ?
                                        <>
                                            <Link href={`products/${current_product.id}`}>
                                                <Card className={`${styles.element_card}`}>

                                                    <div className={styles.card_img_div}>
                                                        <img src={current_product.secondary_image.image}
                                                            height={"328px"} width={"268px"}
                                                            className={styles.s_card_img} />
                                                    </div>

                                                    <div className={styles.card_img_div}>
                                                        <img src={current_product.primary_image.image}
                                                            height={"328px"} width={"268px"}
                                                            className={styles.card_img} />
                                                    </div>

                                                </Card>
                                            </Link>
                                            <div className={`${styles.product_card_footer}`}>
                                                <p className={styles.card_info}>{commonConstants.TruncateLongString(current_product.name).toUpperCase()}</p>
                                                <p className={styles.card_product_pricing}>${parseFloat(current_product.base_pricing).toFixed(2)}</p>
                                            </div>
                                        </>
                                        : <div></div>}
                                </div>
                            )
                        })}
                    </div>

                    <div className={styles.arrow_div}>
                        <Button className={styles.arrow_button} variant='outline-light' onClick={(e) => nextArrow(e)}>
                            <ArrowRightIcon className={styles.arrow_icon} height={40} width={40} fill={"lightblue"} />
                        </Button>
                    </div>
                </div>
            </div>
        )
}

export default ProductCarousel