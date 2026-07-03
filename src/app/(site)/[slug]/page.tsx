import { client } from "@/sanity/client";
import { PortableText } from '@portabletext/react';
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

export async function generateStaticParams() {
    try {
        const query = `*[_type == "genericPage" || _type == "teamMember"]{ "slug": slug.current }`;
        const pages = await client.fetch(query);

        return pages.map((page: { slug: string }) => ({
            slug: page.slug,
        }));
    } catch (error) {
        console.error("Error generating static params for generic pages/team members:", error);
        return [];
    }
}

export default async function GenericPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Check for genericPage first
    let query = `*[_type == "genericPage" && slug.current == $slug][0]{
        _type,
        title,
        content
    }`;
    let page = await client.fetch(query, { slug });

    // If not found, check for teamMember
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

    if (!page) {
        return notFound();
    }

    // Render based on type
    if (page._type === 'teamMember') {
        return (
            <main className={`container ${styles.page}`}>
                <div className={styles.teamProfile}>
                    {page.image?.asset?.url && (
                        <div className={styles.profileImageWrapper}>
                            <img
                                src={page.image.asset.url}
                                alt={page.name}
                                className={styles.profileImage}
                            />
                        </div>
                    )}
                    <h1 className={styles.title}>{page.name}</h1>
                    <h2 className={styles.subtitle}>{page.role}</h2>
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
            <h1 className={styles.title}>{page.title}</h1>
            <div className={styles.content}>
                <PortableText value={page.content} components={ptComponents} />
            </div>
        </main>
    );
}
