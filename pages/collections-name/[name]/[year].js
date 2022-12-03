import { useEffect, useState } from "react";
import styles from "../../../styles/CollectionGrid.module.css";
import { Row, Col, Card, Button, Form } from 'react-bootstrap'
import * as CollectionF from "../../../logic/fetchCollections"
import Head from 'next/head'
import * as commonConstants from '../../../logic/common-constants'
import { ArrowLeftIcon, ArrowRightIcon } from "../../../components/Icons";
import Link from "next/link";

const CollectionGrid = ({ name, year }) => {

    const [collection, setCollection] = useState(null);
    const [loading, setLoading] = useState(true);

    const [products, setProducts] = useState([])
    const [currentFirstIndex, setCurrentFirstIndex] = useState(0);

    const body = JSON.stringify({
        name,
        year
    })

    useEffect(() => {
        async function awaitCollection() {
            console.log("Body: ", body)
            await CollectionF.fetchCollectionsByNameYear(setCollection, body);
        }
        return () => {
            awaitCollection()
        }
    }, [name, year])

    useEffect(() => {
        if (collection !== null && collection !== undefined) {
            setLoading(false)
        }
    }, [collection, name, year])

    useEffect(() => {
        if (collection !== null && collection !== undefined && collection[0].products.length > 0) {
            const new_products = []

            for (var i = 0; i < commonConstants.PAGINATION_SIZE; i++) {
                if (i < collection[0].products.length) {
                    new_products.push(collection[0].products[i]);
                }
                else {
                    break;
                }
            }
            setProducts(new_products)
        }
    }, [collection])


    useEffect(() => {
        if (collection !== null && collection !== undefined) {

            const new_products = []

            if (currentFirstIndex < collection[0].products.length) {
                for (var i = 0; i < commonConstants.PAGINATION_SIZE; i++) {
                    if (currentFirstIndex + i < collection[0].products.length) {
                        new_products.push(collection[0].products[currentFirstIndex + i]);
                    }
                    else {
                        break;
                    }
                }
                setProducts(new_products)
            }
        }
    }, [collection, currentFirstIndex])

    const nextArrow = (e) => {
        e.preventDefault();
        if (currentFirstIndex + commonConstants.PAGINATION_SIZE < collection[0].products.length) {
            setCurrentFirstIndex(currentFirstIndex + commonConstants.PAGINATION_SIZE)
        }
    }

    const prevArrow = (e) => {
        e.preventDefault();
        if (currentFirstIndex - commonConstants.PAGINATION_SIZE >= 0) {
            setCurrentFirstIndex(currentFirstIndex - commonConstants.PAGINATION_SIZE)
        }
    }


    return (loading) ? <div></div> : (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div className={styles.collection_div}>
                    <div className={styles.title_div}>
                        <h1 className={styles.title_h1}>{collection[0].title} Collection</h1>
                        <p>{collection[0].year}</p>
                    </div>

                    <div className={styles.grid_div}>
                        <div className={styles.grid_row}>
                            {products.map((product, product_idx) => {
                                return (
                                    <div className={styles.grid_col} key={product_idx}>
                                        <div className={styles.prod_card_div}>

                                            <Link href={`/products/${product.id}`}>
                                                <Card className={styles.prod_card}>

                                                    <div className={styles.card_img_div}>
                                                        <img src={product.secondary_image.image}
                                                            alt="Product"
                                                            className={styles.s_card_img} />
                                                    </div>

                                                    <div className={styles.card_img_div}>
                                                        <img src={product.primary_image.image}
                                                            alt="Product"
                                                            className={styles.prod_card_img} />
                                                    </div>

                                                    <Card.Footer className={styles.prod_card_footer}>
                                                        <div className={styles.prod_card_footer_div}>
                                                            <div className={styles.prod_card_footer_info_div}>
                                                                <p className={styles.prod_card_footer_info}>
                                                                    {commonConstants.TruncateLongString(product.name)}
                                                                </p>
                                                            </div>
                                                            <div className={styles.prod_card_footer_info_div}>
                                                                <p className={styles.prod_card_footer_info}>${parseFloat(product.base_pricing).toFixed(2)}</p>
                                                            </div>
                                                        </div>
                                                    </Card.Footer>
                                                </Card>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className={styles.arrow_wrapper_div}>


                            {(currentFirstIndex - commonConstants.PAGINATION_SIZE >= 0) ?
                                <div className={styles.arrow_div}>
                                    <Button className={styles.arrow_button} variant='outline-light' onClick={(e) => prevArrow(e)}>
                                        <ArrowLeftIcon className={styles.arrow_icon} height={30} width={30} fill={"lightblue"} />
                                    </Button>
                                </div>
                                : <div></div>
                            }

                            {(currentFirstIndex + commonConstants.PAGINATION_SIZE < collection[0].products.length) ?
                                <div className={styles.arrow_div}>
                                    <Button className={styles.arrow_button} variant='outline-light' onClick={(e) => nextArrow(e)}>
                                        <ArrowRightIcon className={styles.arrow_icon} height={30} width={30} fill={"lightblue"} />
                                    </Button>
                                </div>
                                : <div></div>
                            }
                        </div>
                    </div>
                </div>
            </main>
        </>
    );

}

CollectionGrid.getInitialProps = async ({ query }) => {
    const { name, year } = query;

    return { name, year };
};

export default CollectionGrid;