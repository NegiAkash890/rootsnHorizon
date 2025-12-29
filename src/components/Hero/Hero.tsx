import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.css";
import content from "../../data/siteContent.json";

const Hero = ({ data }: { data: any }) => {
    const { label, title, description, cta } = data;

    return (
        <section className={styles.hero}>
            <div className={styles['hero__content']}>
                <div className={styles['hero__label']}>{label}</div>
                <h1 className={styles['hero__title']}>
                    {title}
                </h1>
                <p className={styles['hero__description']}>
                    {description}
                </p>
                <div className={styles['hero__cta-wrapper']}>
                    <Link href={cta.href || "/donate"} className={styles['hero__btn']}>
                        {cta.label}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
