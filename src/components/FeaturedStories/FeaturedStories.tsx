import Image from "next/image";
import Link from "next/link";
import styles from "./FeaturedStories.module.css";
import content from "../../data/siteContent.json";

const FeaturedStories = ({ data }: { data: any }) => {
    // Sanity data: mainFeature is likely an expanded object reference.
    const heading = data?.heading || "";
    const mainFeature = data?.mainFeature || {};
    const subFeatures = data?.subFeatures || [];
    const seeAll = data?.seeAllText || data?.seeAll || "Explore More";

    return (
        <section id="featured" className={styles.featured}>
            <div className={styles['featured__container']}>
                <h2 className={styles['featured__heading']}>{heading}</h2>

                {/* Main Feature */}
                <div className={styles['featured__main']}>
                    <div className={styles['featured__main-image-wrapper']}>
                        <Image
                            src={mainFeature.image?.asset?.url || (typeof mainFeature.image === 'string' ? mainFeature.image : "/hero-placeholder.png")}
                            alt={mainFeature.title || "Featured Story"}
                            fill
                            className={styles['featured__main-image']}
                        />
                    </div>
                    <div className={styles['featured__main-content']}>
                        <span className={styles['featured__tag']}>{mainFeature.tag}</span>
                        <h3 className={styles['featured__main-title']}>{mainFeature.title}</h3>
                        <p className={styles['featured__main-desc']}>{mainFeature.description}</p>
                        <Link href={mainFeature.slug?.current ? `/stories/${mainFeature.slug.current}` : (mainFeature.link || "#")} className={styles['featured__main-btn']}>
                            Read now
                        </Link>
                    </div>
                </div>

                {/* Sub Features */}
                <div className={styles['featured__sub-grid']}>
                    {subFeatures.map((story: any, index: number) => (
                        <div key={index} className={styles['featured__sub-card']}>
                            <div className={styles['featured__sub-image-wrapper']}>
                                <Image
                                    src={story.image?.asset?.url || (typeof story.image === 'string' ? story.image : "/hero-placeholder.png")}
                                    alt={story.title || "Story"}
                                    fill
                                    className={styles['featured__main-image']} // reuse cover style
                                />
                            </div>
                            <div className={styles['featured__sub-content']}>
                                <span className={styles['featured__sub-tag']}>{story.tag}</span>
                                <h3 className={styles['featured__sub-title']}>{story.title}</h3>
                                <Link href={story.slug?.current ? `/stories/${story.slug.current}` : (story.link || "#")} className={styles['featured__sub-link']}>
                                    {story.linkText || "Read the article"}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles['featured__footer']}>
                    <Link href="/news" className={styles['featured__see-all']}>
                        {seeAll} &rarr;
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedStories;
