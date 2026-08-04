import type { Metadata } from "next";
import { client } from "@/sanity/client";

export const revalidate = 60; // Revalidate every 60 seconds

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import { FaArrowLeft } from "react-icons/fa";
import content from "@/data/siteContent.json";
import { PortableText } from "@portabletext/react";

// Fetch story data based on slug
async function getStory(slug: string) {
    if (!slug) return null;

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
        content,
        seo {
            metaTitle,
            metaDescription,
            keywords,
            noIndex,
            ogImage { asset->{ url } }
        }
    }`;

    try {
        const story = await client.fetch(query);
        if (story) return story;
    } catch (error) {
        console.warn("Sanity fetch failed or not configured, falling back to local data.");
    }

    const mainFeature = content.featuredStories.mainFeature;
    const mainSlug = mainFeature.link?.replace(/^\//, '') || 'featured';

    if (mainSlug === slug) {
        return mainFeature;
    }

    const foundSub = content.featuredStories.subFeatures.find((f: any, index: number) => {
        const fSlug = f.link?.replace(/^\//, '') || ('story-' + index);
        return fSlug === slug;
    });

    if (foundSub) return foundSub;

    return null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    if (!slug) return {};
    const story = await getStory(slug);
    if (!story) return {};

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rootsnhorizon.org";
    const title = story.seo?.metaTitle || story.title;
    const description = story.seo?.metaDescription || story.description || `Read ${story.title} on Roots & Horizon.`;
    const imageUrl = story.seo?.ogImage?.asset?.url || story.image?.asset?.url || `${siteUrl}/icon.png`;
    const noIndex = story.seo?.noIndex;

    return {
        title: title,
        description: description,
        keywords: story.seo?.keywords,
        robots: noIndex ? { index: false, follow: false } : undefined,
        openGraph: {
            title: `${title} | Roots & Horizon`,
            description: description,
            type: "article",
            url: `${siteUrl}/stories/${slug}`,
            images: [
                {
                    url: imageUrl,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: title,
            description: description,
            images: [imageUrl],
        },
    };
}

export async function generateStaticParams() {
    try {
        const query = `*[_type == "story" && defined(slug.current)]{ "slug": slug.current }`;
        const stories = await client.fetch(query);

        return (stories || [])
            .map((story: any) => (typeof story.slug === 'string' ? story.slug : story.slug?.current))
            .filter((slug: any): slug is string => typeof slug === 'string' && slug.trim().length > 0)
            .map((slug: string) => ({
                slug,
            }));
    } catch (error) {
        console.error("Error generating static params for stories:", error);
        return [];
    }
}

import BackButton from "@/components/BackButton/BackButton";

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    if (!slug) return notFound();

    const story = await getStory(slug);

    if (!story) {
        return notFound();
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rootsnhorizon.org";
    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": story.title,
        "description": story.description || "",
        "image": story.image?.asset?.url ? [story.image.asset.url] : [],
        "publisher": {
            "@type": "NGO",
            "name": "Roots & Horizon",
            "logo": {
                "@type": "ImageObject",
                "url": `${siteUrl}/icon.png`
            }
        }
    };

    return (
        <main className={styles.container}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />
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
                            <span className={styles.storiesTag}>
                                {story.tag}
                            </span>
                        )}
                        <h1 className={styles.title}>{story.title}</h1>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <article className={styles.content}>
                <BackButton fallbackHref="/stories" />

                <div className={styles.description}>
                    {(story.content && Array.isArray(story.content)) ? (
                        <div className={styles.portableText}>
                            <PortableText value={story.content} />
                        </div>
                    ) : (
                        story.description && <p className={styles.descriptionText}>{story.description}</p>
                    )}
                </div>
            </article>
        </main>
    );
}
