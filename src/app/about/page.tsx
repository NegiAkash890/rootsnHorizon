import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { client } from "@/sanity/client";
import { PortableText } from "@portabletext/react";
import styles from "../page.module.css";
import Image from "next/image";

// Define the data type
type AboutPageData = {
    title?: string;
    mainContent?: any[];
    missionTitle?: string;
    missionDescription?: string;
    visionTitle?: string;
    visionDescription?: string;
    image?: any;
};

// Fetch data
async function getAboutData(): Promise<AboutPageData | null> {
    const query = `*[_type == "aboutPage"][0]{
        title,
        mainContent,
        missionTitle,
        missionDescription,
        visionTitle,
        visionDescription,
        image {
            asset -> {
                _id,
                url
            }
        }
    }`;
    try {
        return await client.fetch(query);
    } catch (error) {
        console.error("About page fetch error:", error);
        return null;
    }
}

export default async function AboutPage() {
    const data = await getAboutData();

    // Fallbacks if data is missing or partial
    const title = data?.title || "About Roots & Horizon";
    const missionTitle = data?.missionTitle || "Our Mission";
    const missionDesc = data?.missionDescription || "To empower displaced and marginalized communities by providing the resources and support they need to rebuild their lives and secure a sustainable future.";
    const visionTitle = data?.visionTitle || "Our Vision";
    const visionDesc = data?.visionDescription || "A world where every individual, regardless of their circumstances, has the agency and opportunity to lead a life of dignity and purpose.";
    const imageUrl = data?.image?.asset?.url;

    return (
        <main className={styles.page}>
            <div className={styles.container} style={{ padding: '100px 20px' }}>
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

                <h1 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '40px' }}>{title}</h1>

                {imageUrl && (
                    <div style={{ position: 'relative', width: '100%', height: '400px', marginBottom: '40px', borderRadius: '12px', overflow: 'hidden' }}>
                        <Image src={imageUrl} alt={title} fill style={{ objectFit: 'cover' }} />
                    </div>
                )}

                <div style={{ maxWidth: '800px', fontSize: '1.25rem', lineHeight: '1.8' }}>
                    {/* Main Content: Portable Text or Fallback */}
                    {data?.mainContent ? (
                        <div className="portable-text">
                            <PortableText value={data.mainContent} />
                        </div>
                    ) : (
                        // Fallback static text if no content in CMS
                        <>
                            <p>
                                Roots & Horizon is a global humanitarian organization dedicated to providing immediate aid and long-term support to communities in crisis.
                                Founded on the principles of compassion, equity, and resilience, we work in some of the world's most challenging environments to restore
                                health, safety, and opportunity.
                            </p>
                            <p>
                                Our work spans across various sectors including emergency relief, education, healthcare, and sustainable development.
                                By collaborating with local partners and empowering individuals, we ensure that our impact is both profound and lasting.
                            </p>
                            <p>
                                At Roots & Horizon, we believe that everyone deserves the chance to thrive. Whether it's responding to natural disasters,
                                supporting refugees, or building resilient infrastructure, our commitment to humanity remains unshakable.
                            </p>
                        </>
                    )}

                    <h2 style={{ fontSize: '2.5rem', marginTop: '60px', marginBottom: '20px' }}>{missionTitle}</h2>
                    <p>{missionDesc}</p>

                    <h2 style={{ fontSize: '2.5rem', marginTop: '60px', marginBottom: '20px' }}>{visionTitle}</h2>
                    <p>{visionDesc}</p>
                </div>
            </div>
        </main>
    );
}
