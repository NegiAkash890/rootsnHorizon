import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { PortableText } from '@portabletext/react';
import Image from "next/image";
import styles from "./page.module.css";
import { notFound } from "next/navigation";

// Define components for Portable Text customization if needed
const ptComponents = {
    block: {
        normal: ({ children }: any) => <p className={styles.paragraph}>{children}</p>,
        h2: ({ children }: any) => <h2>{children}</h2>,
        h3: ({ children }: any) => <h3>{children}</h3>,
    },
};

export const revalidate = 60;

async function getPageData(slug: string) {
    let query = `*[_type == "genericPage" && slug.current == $slug][0]{
        _type,
        title,
        content
    }`;
    let page = await client.fetch(query, { slug });

    if (!page) {
        query = `*[_type == "teamMember" && slug.current == $slug][0]{
            _type,
            name,
            role,
            bio,
            image { asset->{_id, url} }
        }`;
        page = await client.fetch(query, { slug });
    }

    return page;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    if (!slug) return {};
    const page = await getPageData(slug);
    if (!page) return {};

    const title = page.name || page.title || "Roots & Horizon";
    const description = page.bio || (page.role ? `${page.name} - ${page.role}` : `Read ${title} on Roots & Horizon.`);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rootsnhorizon.org";
    const imageUrl = page.image?.asset?.url || `${siteUrl}/icon.png`;

    return {
        title: title,
        description: description,
        openGraph: {
            title: `${title} | Roots & Horizon`,
            description: description,
            url: `${siteUrl}/${slug}`,
            images: [{ url: imageUrl, alt: title }],
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
        const query = `*[_type in ["genericPage", "teamMember"] && defined(slug.current)]{ "slug": slug.current }`;
        const pages = await client.fetch(query);

        return (pages || [])
            .map((page: any) => (typeof page.slug === 'string' ? page.slug : page.slug?.current))
            .filter((slug: any): slug is string => typeof slug === 'string' && slug.trim().length > 0)
            .map((slug: string) => ({
                slug,
            }));
    } catch (error) {
        console.error("Error generating static params for generic pages/team members:", error);
        return [];
    }
}

import BackButton from "@/components/BackButton/BackButton";

export default async function GenericPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    if (!slug) return notFound();

    const page = await getPageData(slug);

    if (!page) {
        return notFound();
    }

    // Render based on type
    if (page._type === 'teamMember') {
        return (
            <main className={`container ${styles.page}`}>
                <div className={styles.teamProfile}>
                    {page.image?.asset?.url && (
                        <div className={styles.profileImageWrapper} style={{ position: "relative" }}>
                            <Image
                                src={page.image.asset.url}
                                alt={page.name || "Team Member"}
                                fill
                                className={styles.profileImage}
                                sizes="200px"
                            />
                        </div>
                    )}
                    <h1 className={styles.title}>{page.name}</h1>
                    <h2 className={styles.subtitle}>{page.role}</h2>
                    <BackButton fallbackHref="/team" />
                    <div className={styles.content}>
                        <p>{page.bio}</p>
                    </div>
                </div>
            </main>
        );
    }

    // Default generic page render
    return (
        <main className={`container ${styles.page}`}>
            <div className={styles.content}>
                <BackButton fallbackHref="/" />
                <h1 className={styles.title}>{page.title}</h1>
                <PortableText value={page.content} components={ptComponents} />
            </div>
        </main>
    );
}
