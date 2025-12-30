import Image from "next/image";
import Link from "next/link";
import styles from "./AboutSection.module.css";

const AboutSection = ({ data }: { data: any }) => {
    if (!data) return null;

    const heading = data.heading || "";
    const description = data.description || "";
    const image = data.image?.asset?.url || (typeof data.image === 'string' ? data.image : "/hero-placeholder.png");
    const ctaText = data.ctaText || "LEARN MORE";
    const ctaLink = data.ctaLink || "/about";

    return (
        <section id="about" className={styles.about}>
            <div className={styles.about__container}>
                <div className={styles.about__content}>
                    <h2 className={styles.about__heading}>{heading}</h2>
                    <p className={styles.about__description}>{description}</p>
                    <Link href={ctaLink} className={styles.about__cta}>
                        {ctaText}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
