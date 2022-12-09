import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import * as collectionF from '../logic/fetchCollections'
import * as categoryF from '../logic/fetchCategories'

import React, { useEffect, useState } from "react";
import ProductCarousel from '../components/ProductCarousel';
import { Button } from 'react-bootstrap'

import * as commonConstants from '../logic/common-constants'
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext'

const Index = () => {

  const [collections, setCollections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const {translate} = useLanguage()

  useEffect(() => {
    async function awaitCollections() {
      const body = JSON.stringify({
        name:  commonConstants.principalCollections.names,
        year:  commonConstants.principalCollections.year
      })
      await collectionF.fetchCollectionsByNameYear(setCollections, body);
    }
    async function awaitCategories() {
      await categoryF.fetchCategories(setCategories);
    }
    return () => {
      awaitCollections()
      awaitCategories()
    }
  }, [])

  useEffect(() => {
    if (collections.length > 0) {
      setLoading(false)
    }
  }, [collections, categories])
  

  return (loading) ? <div></div> : (
    <div className={styles.container}>

      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
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
                {(category.products.length) > 2 ?
                  <div className={styles.category_div}>
                    <ProductCarousel collection={category} />
                    <div className={styles.category_button_div}>
                      <Link href={`/categories/${category.id}`}>
                        <Button variant='light' className={styles.category_button}>
                          MORE
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