import { client } from "@/sanity/client";
import { REVALIDATE_TIME } from "@/config";

export const revalidate = REVALIDATE_TIME;

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import { FaArrowLeft } from "react-icons/fa";
import content from "@/data/siteContent.json";
import { PortableText } from "@portabletext/react";

// Fetch story data based on slug
async function getStory(slug: string) {
    // 1. Try Sanity
    // Only run query if we have a valid slug to avoid build errors with undefined params
    if (!slug) return null;

    // Sanitize slug to prevent injection (though strictly speaking slugs are URL safe usually)
    const sanitizedSlug = slug.replace(/"/g, '\\"');
    const query = `*[_type == "story" && slug.current == "${sanitizedSlug}"][0]{
        title,
        description,
        image {
            asset -> {
                _id,
                url
            }
        },
        tag,
        content 
    }`;

    try {
        const story = await client.fetch(query);
        if (story) return story;
    } catch (error) {
        console.warn("Sanity fetch failed or not configured, falling back to local data.");
    }

    // 2. Fallback to JSON
    // Check main feature
    const mainFeature = content.featuredStories.mainFeature;
    const mainSlug = mainFeature.link?.replace(/^\//, '') || 'featured'; // match the logic in FeaturedStories.tsx

    if (mainSlug === slug) {
        return mainFeature;
    }

    // Check sub features
    const foundSub = content.featuredStories.subFeatures.find((f: any, index: number) => {
        const fSlug = f.link?.replace(/^\//, '') || ('story-' + index);
        return fSlug === slug;
    });

    if (foundSub) return foundSub;

    return null;
}

// Generate static params for all stories
export async function generateStaticParams() {
    const query = `*[_type == "story"]{ "slug": slug.current }`;
    const stories = await client.fetch(query);

    return stories.map((story: any) => ({
        slug: story.slug,
    }));
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    if (!slug) return notFound();

    const story = await getStory(slug);

    if (!story) {
        return notFound();
    }

    return (
        <main className={styles.container}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <Image
                    src={story.image?.asset?.url || "/hero-placeholder.png"}
                    alt={story.title || "Story Image"}
                    fill
                    className={styles.heroImage}
                    priority
                />
                <div className={styles.heroOverlay}>
                    <div className={styles.titleWrapper}>
                        {story.tag && (
                            <span style={{
                                display: 'inline-block',
                                backgroundColor: 'var(--primary)',
                                color: '#000',
                                padding: '4px 12px',
                                fontWeight: '700',
                                fontSize: '0.9rem',
                                marginBottom: '16px',
                                textTransform: 'uppercase'
                            }}>
                                {story.tag}
                            </span>
                        )}
                        <h1 className={styles.title}>{story.title}</h1>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <article className={styles.content}>
                <Link href="/#featured" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '30px',
                    color: 'var(--primary)',
                    fontWeight: '700',
                    textDecoration: 'none'
                }}>
                    <FaArrowLeft /> Back to stories
                </Link>

                <div className={styles.description}>
                    {(story.content && Array.isArray(story.content)) ? (
                        <div className={styles.portableText}>
                            <PortableText value={story.content} />
                        </div>
                    ) : (
                        story.description && <p style={{ fontSize: '1.2rem', fontWeight: 500 }}>{story.description}</p>
                    )}
                </div>
            </article>
        </main>
    );
}
