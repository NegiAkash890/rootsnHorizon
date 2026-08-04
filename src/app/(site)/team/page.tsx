
import type { Metadata } from "next";
import { client } from "@/sanity/client";
import Image from "next/image";
import styles from "./page.module.css";

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata: Metadata = {
    title: "Our Team",
    description: "Meet the dedicated team, leaders, and volunteers behind Roots & Horizon.",
    openGraph: {
        title: "Our Team | Roots & Horizon",
        description: "Meet the dedicated team, leaders, and volunteers behind Roots & Horizon.",
    },
};

async function getTeamData() {
    const query = `*[_type == "teamPage"][0] {
    title,
    description,
    sections[] {
      _key,
      heading,
      members[] {
        _key,
        name,
        role,
        image { 
          asset->{
            _id, 
            url,
            metadata {
              lqip
            }
          },
          hotspot,
          crop
        }
      }
    }
  }`;

    try {
        const data = await client.fetch(query);
        return data;
    } catch (error) {
        console.error("Sanity fetch error:", error);
        return null;
    }
}

import BackButton from "@/components/BackButton/BackButton";

export default async function TeamPage() {
    const data = await getTeamData();

    if (!data) {
        return (
            <main className={styles.page}>
                <div className={styles.header}>
                    <div className="container">
                        <BackButton fallbackHref="/" />
                        <h1 className={styles.title}>Our Team</h1>
                        <p className={styles.description}>Meet the people behind Roots & Horizon.</p>
                    </div>
                </div>
                <div className={`container ${styles.fallback}`}>
                    <p>Content coming soon.</p>
                </div>
            </main>
        );
    }

    const { title, description, sections } = data;

    return (
        <main className={styles.page}>
            {/* Header Section */}
            <section className={styles.header}>
                <div className="container">
                    <h1 className={styles.title}>{title || "Our Team"}</h1>
                    {description && <p className={styles.description}>{description}</p>}
                </div>
            </section>

            <div className="container" style={{ paddingTop: '1.5rem' }}>
                <BackButton fallbackHref="/" />
            </div>

            {/* Team Sections */}
            <div className={styles.content}>
                {sections?.map((section: any) => (
                    <section key={section._key} className={styles.section}>
                        <div className="container">
                            {section.heading && (
                                <h2 className={styles.sectionHeading}>{section.heading}</h2>
                            )}

                            <div className={styles.grid}>
                                {section.members?.map((member: any) => (
                                    <div key={member._key} className={styles.card}>
                                        <div className={styles.imageWrapper}>
                                            {member.image?.asset?.url ? (
                                                <Image
                                                    src={member.image.asset.url}
                                                    alt={member.name || "Team Member"}
                                                    fill
                                                    className={styles.image}
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                                                    placeholder={member.image.asset.metadata?.lqip ? "blur" : "empty"}
                                                    blurDataURL={member.image.asset.metadata?.lqip}
                                                />
                                            ) : (
                                                <div className={styles.fallbackImage} />
                                            )}
                                            <div className={styles.overlay}></div>
                                        </div>
                                        <div className={styles.info}>
                                            <h3 className={styles.name}>{member.name}</h3>
                                            <p className={styles.role}>{member.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </main>
    );
}
