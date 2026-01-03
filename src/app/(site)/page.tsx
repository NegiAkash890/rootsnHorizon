import { client } from "@/sanity/client";

export const revalidate = 60; // Revalidate every 60 seconds

import Image from "next/image";
import Hero from "@/components/Hero/Hero";
import StatsSection from "@/components/Stats/StatsSection";
import FeaturedStories from "@/components/FeaturedStories/FeaturedStories";
import AboutSection from "@/components/AboutSection/AboutSection";
import GetInvolved from "@/components/GetInvolved/GetInvolved";
import ContactForm from "@/components/ContactForm/ContactForm";
import styles from "./page.module.css";
import content from "@/data/siteContent.json"; // Fallback

async function getHomepageData() {
  const query = `*[_type == "homepage"][0]{
    hero->{
      ...,
      image { asset->{_id, url} }
    },
    heroSidebar->,
    statsSection->{
      ...,
      stats[] {
        ...,
        icon { asset->{_id, url} }
      }
    },
    featuredStoriesSection->{
      ...,
      mainFeature->{
        ...,
        image { asset->{_id, url} }
      },
      subFeatures[]->{
        ...,
        image { asset->{_id, url} }
      }
    },
    aboutSection->{
      ...
    },
    getInvolvedSection->{
      ...,
      cards[] {
        ...,
        image { asset->{_id, url} }
      }
    },
    contactSection->
  }`;

  try {
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return null;
  }
}

export default async function Home() {
  const sanityData = await getHomepageData();

  // Helper to merge or fallback
  // If sanityData exists, we try to use it. If parts are missing, we might need fallback logic or just render empty/null.
  // For now, let's pass the sanityData OR local content to components.
  // We'll need to update components to accept props.
  const heroData = sanityData?.hero || content.hero;

  return (
    <main className={styles.page}>
      <div className={styles.topSection}>
        <div className={styles.heroWrapper}>
          <Hero data={heroData} />
        </div>
        <div className={styles.heroImageWrapper}>
          {/* Fallback image if Sanity data is missing or string path */}
          <Image
            src={heroData?.image?.asset?.url || (typeof heroData?.image === 'string' ? heroData.image : "/hero-placeholder.png")}
            alt="Hero Image"
            fill
            className={styles.heroImage}
            priority
          />
        </div>
      </div>
      <div className={styles.main}>
        <AboutSection data={sanityData?.aboutSection || content.aboutSection} />
        <StatsSection data={sanityData?.statsSection || content.stats} />
        <FeaturedStories data={sanityData?.featuredStoriesSection || content.featuredStories} />
        <GetInvolved data={sanityData?.getInvolvedSection || content.getInvolved} />
        <ContactForm data={sanityData?.contactSection} />
      </div>
    </main>
  );
}
