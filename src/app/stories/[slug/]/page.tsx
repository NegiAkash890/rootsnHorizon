import { client } from "@/sanity/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./Article.module.css";

async function getStory(slug: string) {
    const query = `*[_type == "story" && slug.current == $slug][0]{
        ...,
        image {
            asset->{
                _id,
                url
            }
        }
    }`;
    return await client.fetch(query, { slug });
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const story = await getStory(slug);

    if (!story) {
        notFound();
    }

    return (
        <article className={styles.article}>
            {story.image?.asset?.url && (
                <div className={styles.article__hero}>
                    <Image
                        src={story.image.asset.url}
                        alt={story.title}
                        fill
                        priority
                        className={styles.article__image}
                    />
                </div>
            )}

            <div className={styles.article__container}>
                <Link href="/#featured" className={styles['article__back-btn']}>
                    <FaArrowLeft /> Back to Stories
                </Link>

                {story.tag && <span className={styles.article__tag}>{story.tag}</span>}
                <h1 className={styles.article__title}>{story.title}</h1>
                {story.description && (
                    <p className={styles.article__description}>{story.description}</p>
                )}

                <div className={styles.article__content}>
                    {story.content ? (
                        <PortableText value={story.content} />
                    ) : (
                        <p>Article content is being prepared. Stay tuned!</p>
                    )}
                </div>
            </div>
        </article>
    );
}
