import Image from "next/image";
import Link from "next/link";
import styles from "./FeaturedStories.module.css";
import content from "../../data/siteContent.json";

interface Story {
    image?: { asset?: { url: string } } | string;
    title?: string;
    tag?: string;
    description?: string;
    slug?: { current: string };
    link?: string;
    linkText?: string;
}

interface FeaturedStoriesData {
    heading?: string;
    mainFeature?: Story;
    subFeatures?: Story[];
    seeAllText?: string;
    seeAll?: string;
}

const FeaturedStories = ({ data }: { data: FeaturedStoriesData }) => {
    // Sanity data: mainFeature is likely an expanded object reference.
    const heading = data?.heading || "";
    // Cast to Story to handle potential type mismatches if data comes from loose JSON
    const mainFeature = (data?.mainFeature || {}) as Story;
    const subFeatures = (data?.subFeatures || []) as Story[];
    const seeAll = data?.seeAllText || data?.seeAll || "Explore More";

    return (
        <section id="featured" className={styles.featured}>
            <div className={styles['featured__container']}>
                <h2 className={styles['featured__heading']}>{heading}</h2>

                {/* Main Feature */}
                <div className={styles['featured__main']}>
                    <div className={styles['featured__main-image-wrapper']}>
                        <Image
                            src={
                                (typeof mainFeature.image === 'object' && mainFeature.image?.asset?.url)
                                    ? mainFeature.image.asset.url
                                    : (typeof mainFeature.image === 'string' ? mainFeature.image : "/hero-placeholder.png")
                            }
                            alt={mainFeature.title || "Featured Story"}
                            fill
                            className={styles['featured__main-image']}
                        />
                    </div>
                    <div className={styles['featured__main-content']}>
                        <span className={styles['featured__tag']}>{mainFeature.tag}</span>
                        <h3 className={styles['featured__main-title']}>{mainFeature.title}</h3>
                        <p className={styles['featured__main-desc']}>{mainFeature.description}</p>
                        <Link href={mainFeature.slug?.current ? `/stories/${mainFeature.slug.current}` : `/stories/${mainFeature.link?.replace(/^\//, '') || 'featured'}`} className={styles['featured__main-btn']}>
                            Read now
                        </Link>
                    </div>
                </div>

                {/* Sub Features */}
                <div className={styles['featured__sub-grid']}>
                    {subFeatures.map((story: Story, index: number) => (
                        <div key={index} className={styles['featured__sub-card']}>
                            <div className={styles['featured__sub-image-wrapper']}>
                                <Image
                                    src={
                                        (typeof story.image === 'object' && story.image?.asset?.url)
                                            ? story.image.asset.url
                                            : (typeof story.image === 'string' ? story.image : "/hero-placeholder.png")
                                    }
                                    alt={story.title || "Story"}
                                    fill
                                    className={styles['featured__main-image']} // reuse cover style
                                />
                            </div>
                            <div className={styles['featured__sub-content']}>
                                <span className={styles['featured__sub-tag']}>{story.tag}</span>
                                <h3 className={styles['featured__sub-title']}>{story.title}</h3>
                                <Link href={story.slug?.current ? `/stories/${story.slug.current}` : `/stories/${story.link?.replace(/^\//, '') || 'story-' + index}`} className={styles['featured__sub-link']}>
                                    {story.linkText || "Read the article"}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles['featured__footer']}>
                    <Link href="/stories" className={styles['featured__see-all']}>
                        {seeAll} &rarr;
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedStories;
