import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import * as collectionF from '../../logic/fetchCollections'
import * as categoryF from '../../logic/fetchCategories'

import React, { useEffect, useState } from "react";
import ProductCarousel from '../../components/ProductCarousel';
import { Button, Card, Col, Row } from 'react-bootstrap'

import * as commonConstants from '../../logic/common-constants'
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext'

const Index = () => {

    const [collections, setCollections] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { translate } = useLanguage()

    useEffect(() => {
        async function awaitCollections() {
            const body = JSON.stringify({
                name: commonConstants.principalCollections.names,
                year: commonConstants.principalCollections.year
            })
            await collectionF.fetchCollectionsByNameYear(setCollections, body);
        }
        async function awaitCategories() {
            await categoryF.fetchCategories(setCategories);
        }
            awaitCollections()
            awaitCategories()
    }, [])

    useEffect(() => {
        if (collections.length > 0) {
            setLoading(false)
        }
    }, [collections, categories])


    return (loading) ? <div></div> : (
        <div className={styles.container}>

            <Head>
                <title>Habaneras de Lino | Linen and Cotton Clothing</title>
                <meta name="description" content="Habaneras de Lino is a linen and cotton clothing store to buy online" />
                <link rel="icon" href="/favicon.ico" />
            </Head>


            <main className={styles.main}>

                <div className={styles.enzomen_title_div}>
                    <h1 className={styles.enzomen_title}>
                        MEN
                    </h1>
                </div>

                <div className={styles.collections_grid_container}>
                    <div className={styles.collections_grid_title_div}>
                        <h2 className={styles.collections_grid_title}>Categories</h2>
                    </div>
                    <Row className={styles.collections_grid_container_row}>
                        {categories.map((category, categoryIndex) => {
                            return (
                                <Col key={'category_grid_' + categoryIndex} xs={12} sm={12} md={12} lg={3} className={styles.collections_grid_container_col}>
                                    <div className={styles.collections_grid_container_wrapper}>
                                        <Link href={`/categories/${category.id}`}>
                                            <Card className={styles.collections_grid_container_card}>
                                                <Card.Body className={styles.collections_grid_container_card_body}>
                                                    <img src={category.image} alt='Collection' className={styles.collections_grid_container_card_img} />
                                                </Card.Body>
                                                <Card.Footer className={styles.collections_grid_container_card_footer}>
                                                    <Button variant='light' className={styles.collection_grid_button}>
                                                        {category.title}
                                                    </Button>
                                                </Card.Footer>
                                            </Card>
                                        </Link>
                                    </div>
                                </Col>
                            )
                        })}
                    </Row>
                </div>

                <div className={styles.collections_grid_container}>
                    <div className={styles.collections_grid_title_div}>
                        <h2 className={styles.collections_grid_title}>Collections</h2>
                    </div>
                    <Row className={styles.collections_grid_container_row}>
                        {collections.map((collection, collectionIndex) => {
                            return (
                                <Col key={'collection_grid_' + collectionIndex} xs={12} sm={12} md={12} lg={3} className={styles.collections_grid_container_col}>
                                    <div className={styles.collections_grid_container_wrapper}>
                                        <Link href={`/collections/${collection.id}`}>
                                            <Card className={styles.collections_grid_container_card}>
                                                <Card.Body className={styles.collections_grid_container_card_body}>
                                                    <img src={collection.image} alt='Collection' className={styles.collections_grid_container_card_img} />
                                                </Card.Body>
                                                <Card.Footer className={styles.collections_grid_container_card_footer}>
                                                    <Button variant='light' className={styles.collection_grid_button}>
                                                        {collection.title}
                                                    </Button>
                                                </Card.Footer>
                                            </Card>
                                        </Link>
                                    </div>
                                </Col>
                            )
                        })}
                    </Row>
                </div>


                <div className={styles.collections_div}>

                    {collections.map((collection, collectionIndex) => {
                        return (
                            <div key={collectionIndex}>
                                {(collection.products.length) > 0 ?
                                    <div className={styles.collection_div}>
                                        <ProductCarousel collection={collection} collectionTitle={true} />
                                        <div className={styles.collection_button_div}>
                                            <Link href={`/collections/${collection.id}`}>
                                                <Button variant='light' className={styles.collection_button}>
                                                    {translate('word', 'more', 'full')}
                                                </Button>
                                            </Link>
                                        </div>
                                    </div> : <div></div>}
                            </div>
                        )
                    })}
                </div>



                <div className={styles.categories_div}>

                    {categories.map((category, category_idx) => {
                        return (
                            <div key={category_idx}>
                                {(category.products.length) > 0 ?
                                    <div className={styles.category_div}>
                                        <ProductCarousel collection={category} />
                                        <div className={styles.category_button_div}>
                                            <Link href={`/categories/${category.id}`}>
                                                <Button variant='light' className={styles.category_button}>
                                                    {translate('word', 'more', 'full')}
                                                </Button>
                                            </Link>
                                        </div>
                                    </div> : <div></div>}
                            </div>
                        )
                    })}
                </div>
            </main>

        </div>
    )
}



export default Index;