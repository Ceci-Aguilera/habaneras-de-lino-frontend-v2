import styles from "../styles/Banner.module.css"
import Image from "next/image"
import { Container } from "react-bootstrap"

const Banner = ({ image_source, fromPublic = true, tagLineBool = false, tagLine = '' }) => {

    return (
        <div>
            {fromPublic ?
                <div className={styles.banner_div_p}>
                    {tagLineBool ? <div className={styles.banner_tagline_div_p}>{tagLine}</div> : <></>}

                    <div className={styles.banner_img_cover_div_p}> </div>

                    <div className={styles.banner_img_div_p}>
                        <Image src={image_source} alt='Habaneras de Lino Banner' layout="fill" />
                    </div>
                </div>
                : <div className={styles.banner_div}>
                    {tagLineBool ? <div className={styles.banner_tagline_div}>{tagLine}</div> : <></>}
                    <div className={styles.banner_img_cover_div}> </div>
                    : <div className={styles.banner_img_div_wrapper}><img src={image_source} alt='Habaneras de Lino Banner' className={styles.banner_img} /> </div>
                </div>
            }
        </div>
    )
}

export default Banner;