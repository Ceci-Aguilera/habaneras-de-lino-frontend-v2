import React, { Component } from 'react'

import styles from '../styles/ProductCarousel.module.css'

import { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'

import { ArrowRightIcon, ArrowLeftIcon } from './Icons'
import Link from 'next/link'

import * as commonConstants from '../logic/common-constants'

const ProductCarousel = ({ collection }) => {

    const [products, setProducts] = useState([])
    const [currentProducts, setCurrentProducts] = useState([]);
    const [currentFirstIndex, setCurrentFirstIndex] = useState(0);

    useEffect(() => {
        setProducts(collection.products)
    }, [collection])

    useEffect(() => {
        setCurrentProducts([products[0], products[1], products[2]]);
    }, [products])

    useEffect(() => {
        setCurrentProducts([products[currentFirstIndex],
        products[(currentFirstIndex + 1) % products.length],
        products[(currentFirstIndex + 2) % products.length]
        ]);
    }, [currentFirstIndex])

    const nextArrow = (e) => {
        e.preventDefault();
        setCurrentFirstIndex((currentFirstIndex + 2) % products.length)
    }

    const prevArrow = (e) => {
        e.preventDefault();
        setCurrentFirstIndex((currentFirstIndex - 2 + products.length) % products.length)
    }

    return (currentProducts.length == 0 || currentProducts == undefined || currentProducts == null) ?
        <div></div> : (
            <div className={styles.carousel_div}>
                <h4 className={styles.carousel_title}>
                    {collection.title}
                </h4>

                <div className={styles.carousel_wrapper}>
                    <div className={styles.arrow_div}>
                        <Button className={styles.arrow_button} variant='outline-light' onClick={(e) => prevArrow(e)}>
                            <ArrowLeftIcon className={styles.arrow_icon} height={30} width={30} fill={"lightblue"} />
                        </Button>
                    </div>

                    <div className={styles.cards_div}>
                        {currentProducts.map((current_product, currentProductIndex) => {
                            return (
                                <div className={styles.card_div} key={currentProductIndex}>
                                    {current_product ?
                                        <>
                                            <Link href={`products/${current_product.id}`}>
                                                <Card className={styles.element_card}>

                                                    <div className={styles.card_img_div}>
                                                        <img src={current_product.secondary_image.image}
                                                            height={"318px"} width={"258px"}
                                                            className={styles.s_card_img} />
                                                    </div>

                                                    <div className={styles.card_img_div}>
                                                        <img src={current_product.primary_image.image}
                                                            height={"318px"} width={"258px"}
                                                            className={styles.card_img} />
                                                    </div>

                                                </Card>
                                            </Link>
                                            <p className={styles.card_info}>{commonConstants.TruncateLongString(current_product.name)}</p>
                                        </>
                                        : <div></div>}
                                </div>
                            )
                        })}
                    </div>

                    <div className={styles.arrow_div}>
                        <Button className={styles.arrow_button} variant='outline-light' onClick={(e) => nextArrow(e)}>
                            <ArrowRightIcon className={styles.arrow_icon} height={30} width={30} fill={"lightblue"} />
                        </Button>
                    </div>
                </div>
            </div>
        )
}

export default ProductCarousel