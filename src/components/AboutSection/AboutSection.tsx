import Link from "next/link";
import styles from "./AboutSection.module.css";

interface AboutSectionData {
    heading?: string;
    description?: string;
    image?: { asset?: { url: string } } | string;
    ctaText?: string;
    ctaLink?: string;
}

const AboutSection = ({ data }: { data: AboutSectionData }) => {
    if (!data) return null;

    const heading = data.heading || "";
    const description = data.description || "";
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
