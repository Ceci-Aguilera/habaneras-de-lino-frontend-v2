import styles from "../styles/Banner.module.css"
import Image from "next/image"
import { Container } from "react-bootstrap"

const Banner = ({ image_source, fromPublic = true, tagLineBool = false, tagLine = '' }) => {

    return (
        <div className={styles.banner_div}>
            {tagLineBool ? <div className={styles.banner_tagline_div}>{tagLine}</div> : <></>}
            <div className={styles.banner_img_cover_div}> </div>
            {fromPublic ? <div className={styles.banner_img_div}>
                <Image src={image_source} alt='Habaneras de Lino Banner' layout="fill" />
            </div>
                : <div className={styles.banner_img_div_wrapper}><img src={image_source} alt='Habaneras de Lino Banner' className={styles.banner_img} /> </div>
            }
        </div>
    )
}

export default Banner;