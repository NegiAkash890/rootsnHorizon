import type { Metadata } from "next";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/client";
import BackButton from "@/components/BackButton/BackButton";
import aboutStyles from "./about.module.css";

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata: Metadata = {
    title: "About Us",
    description: "Learn about Roots & Horizon's mission, vision, and core values in empowering displaced and marginalized communities worldwide.",
    openGraph: {
        title: "About Us | Roots & Horizon",
        description: "Learn about Roots & Horizon's mission, vision, and core values in empowering displaced and marginalized communities worldwide.",
    },
};

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
        <main className={aboutStyles.page}>
            <section className={aboutStyles.header}>
                <div className="container">
                    <h1 className={aboutStyles.title}>{title}</h1>
                </div>
            </section>

            <div className={aboutStyles.aboutContainer}>
                <BackButton fallbackHref="/" />

                {imageUrl && (
                    <div className={aboutStyles.mainImageWrapper}>
                        <Image src={imageUrl} alt={title} fill className={aboutStyles.mainImage} />
                    </div>
                )}

                <div className={aboutStyles.contentWrapper}>
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

                    <h2 className={aboutStyles.sectionHeading}>{missionTitle}</h2>
                    <p>{missionDesc}</p>

                    <h2 className={aboutStyles.sectionHeading}>{visionTitle}</h2>
                    <p>{visionDesc}</p>
                </div>
            </div>
        </main>
    );
}
