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
import Banner from '../components/Banner'

const BANNER_IMAGE_SRC = '/images/banner.jpg';

const Index = () => {

  const [collections, setCollections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language, translate } = useLanguage()

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
    // return(
    <div className={styles.container}>

      <Head>
        <title>Habaneras de Lino</title>
        <meta name="description" content="Habaneras de Lino is an e-commerce that sells high quality linen and cotton clothing, specializing in Caribbean guayaberas and guayamisas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <Banner image_source={BANNER_IMAGE_SRC} tagLineBool={true} tagLine='Luxurios, Comfortable, and Modern ...' />

        <div className={styles.collections_div}>

          {collections.map((collection, collectionIndex) => {
            return (
              <div key={collectionIndex}>
                {(collection.products.length) > 3 ?
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
                          {translate('word', 'more', 'full')}
                        </Button>
                      </Link>
                    </div>
                  </div> : <div></div>}
              </div>
            )
          })}
        </div>

        <div className={styles.infor_section} id='discounts'>

          <div className={styles.info_section_title_div}>
            <h2 className={styles.info_section_title}>{language === 'en' ? "Wholesaler's Discount" : "Descuento para mayoristas"}</h2>
          </div>

          <div className={styles.info_section_description_div}>
            {language === 'en' ?
              <p className={styles.infor_section_description}>Our sells policy at <strong>Habaneras de Lino</strong> encourages wholesalers to buy <strong>guayaberas</strong> and
                all <strong>linen and cotton clothing</strong> available at our website. We offer specific discounts when buying at least 12 units. The kind and the amount of
                the discount depend on the number of units to purchase, but our main and most popular ones are for purchases of 12 units,
                24 units, 50 units, and +50 units. To know more about these discounts, contact us via email at <strong>sales@habanerasdelino.com</strong> or <strong>WhatsApp</strong> (+1 941 447 5126).
              </p> :
              <p className={styles.infor_section_description}>Nuestra politica de ventas en <strong>Habaneras de Lino</strong> anima a los mayoristas a comprar <strong>guayaberas</strong> y
                y otras prendas de <strong>lino y algodon</strong> disponibles en nuestra web. Ofrecemos descuentos al comprar al menos 12 unidades. El monto del descuento depende
                de la cantidad de unidades a comprar, pero nuestros principales y mas populares son para compras de 12 unidades,
                24 unidades, 50 unidades y +50 unidades. Para saber mas sobre estos descuentos, contactenos a través de correo electronico a <strong>sales@habanerasdelino.com</strong> o <strong>WhatsApp</strong> (+1 941 447 5126).
              </p>
            }
          </div>


        </div>

        <div className={styles.infor_section} id='customization'>

          <div className={styles.info_section_title_div}>
            <h2 className={styles.info_section_title}> {language === 'en' ? "Customization" : "Pedidos Personalizados"}</h2>
          </div>

          <div className={styles.info_section_description_div}>

            {language === 'en' ? <p className={styles.infor_section_description}>Because all of our products are carefully <strong>made by hand</strong>, we welcome clients to ask for customizations
              beyond what is it being offered at our website. We can make modifications to the size/color and decorative shapes for any product offere. To know more about
              this policy or to order a customized product contact us at <strong>sales@habanerasdelino.com</strong> or <strong>WhatsApp</strong> (+1 941 447 5126). For this customization, the shipping time
              may vary depending on its complexity. For more information about shipping, please refer to our section About Shipping.
            </p> :

              <p className={styles.infor_section_description}>Dado que todos nuestros productos son cuidadosamente <strong>hechos a mano</strong>, invitamos a los clientes a solicitar personalizaciones
                mas alla de lo que se ofrece en nuestro sitio web. Podemos hacer modificaciones en el tamaño/color y formas decorativas para cualquier producto ofrecido. Para saber mas sobre
                esta politica o para solicitar un producto personalizado contactenos a <strong>sales@habanerasdelino.com</strong> o <strong>WhatsApp</strong> (+1 941 447 5126). Para esta personalizacion, el tiempo de envio
                puede variar dependiendo de su complejidad.
              </p>}
          </div>

        </div>

        <div className={styles.infor_section} id='about_us'>

          <div className={styles.info_section_title_div}>
            <h2 className={styles.info_section_title}> {language === 'en' ? "About Us" : "Sobre Nosotros"}</h2>
          </div>

          <div className={styles.info_section_description_div}>

            {language === 'en' ? <p className={styles.infor_section_description}><strong>Habaneras de Lino</strong> commercializes a Mexican brand that offers its customers an experience of comfort, luxury, and modernity. Initially inspired by the
              typical Cuban garment: the <strong>guayabera</strong>, it exceeded itself and went beyond this culture, while elegantly mixing <strong>linen</strong> and <strong>cotton</strong>
              with natural and fresh fibers that reminds of the Caribbean, and with a touch of originality that makes a distinction of the brand, and that allows it to be positioned as
              a leader in e-commerce in any part of the world.
            </p> :
              <p className={styles.infor_section_description}><strong>Habaneras de Lino</strong> comercializa una marca mexicana que ofrece a sus clientes una experiencia de confort, lujo y
                modernidad. Inicialmente inspirado en la
                prenda tipica cubana: la <strong>guayabera</strong>, se supero a si misma y fue mas alla de esta cultura, mezclando elegantemente el <strong>lino</strong> y
                el <strong>algodon</strong> con
                fibras naturales y frescas que recuerdan al Caribe, y con un toque de originalidad que hace una distincion de la marca, y que le permite posicionarse como
                lider en comercio electronico en cualquier parte del mundo.
              </p>
            }
          </div>

        </div>

        <div className={styles.infor_section} id='about_shipping'>

          <div className={styles.info_section_title_div}>
            <h2 className={styles.info_section_title}>{language === 'en' ? "About Shipping" : "Sobre el Envio"}</h2>
          </div>
          {language === 'en' ?
            <div className={styles.info_section_description_div}>

              <p className={styles.infor_section_description}>
                Once a purchase is made at <strong>Habaneras de Lino</strong>, it takes from 1 to 7 days for the shipping to arrive. Note that most of our products are <strong>hand-made</strong> in
                Mexico (all clothes and decorative shapes embedded in our <strong>guayaberas</strong> and <strong>guayamisas</strong> are hand-made). This delivery time only applies to
                products that are already in stock.</p>

              <p className={styles.infor_section_description}>
                To ask for a product with a different color/size or decorative shapes reach to us at any time at (sales@habanerasdelino.com) or WhatsApp/Phone (+1 941 447 5126). In this case,
                it takes from 8 to 15 days for the product to arrive.
              </p>
            </div> :
            <div className={styles.info_section_description_div}>

              <p className={styles.infor_section_description}>
                Una vez realizada la compra en <strong>Habaneras de Lino</strong>, el envio tarda de 1 a 7 dias en llegar. Tenga en cuenta que la mayoria de nuestros productos estan <strong>hechos a mano</strong> en
                México (Todas las prendas y formas decorativas incrustadas en nuestras <strong>guayaberas</strong> y <strong>guayamisas</strong> estan hechas a mano). Este plazo de entrega solo se aplica a
                productos que ya estan en stock.</p>

              <p className={styles.infor_section_description}>
                Para solicitar un producto con un color/tamaño o formas decorativas diferentes comuniquese con nosotros en cualquier momento via sales@habanerasdelino.com o WhatsApp (+1 941 447 5126). Para estas ordenes,
                , el producto demora de 8 a 15 dias en llegar.
              </p>
            </div>
          }
        </div>
      </main>

    </div>
  )
}



export default Index;