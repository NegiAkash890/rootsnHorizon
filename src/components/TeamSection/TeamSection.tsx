import Image from 'next/image';
import Link from 'next/link';
import styles from './TeamSection.module.css';

interface TeamMember {
    name: string;
    role: string;
    image?: {
        asset: {
            url: string;
        };
    };
    bio?: string;
    slug?: { current: string };
}

interface TeamSectionProps {
    data: {
        heading?: string;
        description?: string;
        members?: TeamMember[];
    };
}

export default function TeamSection({ data }: TeamSectionProps) {
    if (!data) return null;

    const { heading = "Our Team", description, members = [] } = data;

    return (
        <section className={styles.team}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.heading}>{heading}</h2>
                    {description && <p className={styles.description}>{description}</p>}
                </div>

                <div className={styles.grid}>
                    {members.map((member, index) => (
                        <div key={index} className={styles.member}>
                            <div className={styles.imageWrapper}>
                                {member.image?.asset?.url ? (
                                    <Image
                                        src={member.image.asset.url}
                                        alt={member.name}
                                        fill
                                        className={styles.image}
                                    />
                                ) : (
                                    <div className={styles.fallbackImage} />
                                )}
                            </div>
                            {member.slug?.current ? (
                                <Link href={`/${member.slug.current}`} className={styles.memberLink}>
                                    <h3 className={styles.name}>{member.name}</h3>
                                </Link>
                            ) : (
                                <h3 className={styles.name}>{member.name}</h3>
                            )}
                            <p className={styles.role}>{member.role}</p>
                            {member.bio && <p className={styles.bio}>{member.bio}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
