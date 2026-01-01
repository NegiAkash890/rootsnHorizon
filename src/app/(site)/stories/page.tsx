import { client } from "@/sanity/client";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import content from "@/data/siteContent.json";

// Define the partial type we need for the listing
type Story = {
    _id?: string;
    title: string;
    slug?: { current: string }; // Sanity slug
    link?: string; // JSON fallback link
    tag?: string;
    description?: string;
    image?: any;
};

// Fetch all stories from Sanity
async function getAllStories() {
    // 1. Fetch from Sanity
    const query = `*[_type == "story"] | order(_createdAt desc) {
        _id,
        title,
        slug,
        tag,
        description,
        image {
            asset -> {
                _id,
                url
            }
        }
    }`;

    let sanityStories: Story[] = [];
    try {
        sanityStories = await client.fetch(query);
    } catch (error) {
        console.warn("Sanity fetch failed, using fallback only.");
    }

    // 2. Mix in fallback JSON stories if needed or if they are unique
    // For simplicity, let's just combine them or use JSON if Sanity is empty.
    // Ideally, we might want to de-duplicate.
    const jsonStories: Story[] = [];

    if (content.featuredStories) {
        const main = content.featuredStories.mainFeature;
        if (main) jsonStories.push(main as Story);

        if (Array.isArray(content.featuredStories.subFeatures)) {
            content.featuredStories.subFeatures.forEach((s: any) => jsonStories.push(s as Story));
        }
    }

    // Combine: Sanity first, then JSON (deduplication logic skipped for simplicity, unless IDs match)
    // We give preference to Sanity. If Sanity has data, we might not want JSON duplicates.
    // But since JSON is static fallback, let's just show them if Sanity is empty OR show both if different.
    // For this implementation, let's concat. 
    // In a real app we'd filter or prefer one source. 
    // If Sanity has content, let's trust that. If not, fallback.

    if (sanityStories.length > 0) {
        return sanityStories;
    }

    return jsonStories;
}

export default async function StoriesIndexPage() {
    const stories = await getAllStories();

    return (
        <main className={styles.storiesPage}>
            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>Stories</h1>
            </section>

            <div className={styles.container} style={{ maxWidth: '75rem', margin: '0 auto', padding: '0 20px' }}>
                <Link href="/" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '20px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: '#000',
                    textDecoration: 'none'
                }}>
                    <FaArrowLeft style={{ color: 'var(--primary)' }} /> Back to Home
                </Link>
            </div>

            <div className={styles.gridContainer}>
                {stories.map((story, index) => {
                    // Determine URL: priority to Sanity slug, then JSON link
                    const href = story.slug?.current
                        ? `/stories/${story.slug.current}`
                        : (story.link
                            ? `/stories/${story.link.replace(/^\//, '')}`
                            : `/stories/story-${index}`); // fallback

                    const imageUrl = story.image?.asset?.url
                        || (typeof story.image === 'string' ? story.image : null)
                        || "/hero-placeholder.png";

                    return (
                        <Link href={href} key={index} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={imageUrl}
                                    alt={story.title}
                                    fill
                                    className={styles.cardImage}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.tag}>{story.tag || "News"}</span>
                                <h3 className={styles.title}>{story.title}</h3>
                                <p className={styles.description}>{story.description}</p>
                                <span className={styles.readMore}>Read Full Story</span>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </main>
    )
}
