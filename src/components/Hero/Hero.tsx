import Link from "next/link";
import Image from "next/image";
import styles from "./Hero.module.css";

const Hero = ({ data }: { data: any }) => {
    const { label, title, description, cta } = data;

    return (
        <section id="home" className={styles.hero}>
            <div className={styles['hero__bg-wrapper']}>
                <Image
                    src={data.image || "/hero-placeholder.png"}
                    alt="Hero Background"
                    fill
                    className={styles['hero__bg-image']}
                    priority
                />
                <div className={styles['hero__overlay']}></div>
            </div>
            <div className={styles['hero__content']}>
                <div className={styles['hero__label']}>{label}</div>
                <h2 className={styles['hero__title']}>
                    {title}
                </h2>
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
