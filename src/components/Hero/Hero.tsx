import Link from "next/link";
import styles from "./Hero.module.css";

interface HeroData {
    label?: string;
    title?: string;
    description?: string;
    cta?: {
        label: string;
        href: string;
    };
}

const Hero = ({ data }: { data: HeroData }) => {
    const { label, title, description, cta = { label: "Donate", href: "/donate" } } = data || {};

    return (
        <section id="home" className={styles.hero}>
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
