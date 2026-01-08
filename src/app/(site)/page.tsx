import { client } from "@/sanity/client";

export const revalidate = 60; // Revalidate every 60 seconds

import Image from "next/image";
import Hero from "@/components/Hero/Hero";
import HeroImage from "@/components/Hero/HeroImage";
import StatsSection from "@/components/Stats/StatsSection";
import FeaturedStories from "@/components/FeaturedStories/FeaturedStories";
import AboutSection from "@/components/AboutSection/AboutSection";
import TeamSection from "@/components/TeamSection/TeamSection";
import GetInvolved from "@/components/GetInvolved/GetInvolved";
import ContactForm from "@/components/ContactForm/ContactForm";
import GallerySection from "@/components/GallerySection/GallerySection";
import styles from "./page.module.css";
import content from "@/data/siteContent.json"; // Fallback

async function getHomepageData() {
  const query = `*[_type == "homepage"][0]{
    "hero": coalesce(hero->, hero) {
      ...,
      image { asset->{_id, url} }
    },
    "heroSidebar": coalesce(heroSidebar->, heroSidebar),
    "statsSection": coalesce(statsSection->, statsSection) {
      ...,
      stats[] {
        ...,
        icon { asset->{_id, url} }
      }
    },
    "featuredStoriesSection": coalesce(featuredStoriesSection->, featuredStoriesSection) {
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
    "aboutSection": coalesce(aboutSection->, aboutSection) {
      ...
    },
    teamSection{
      ...,
      members[]-> {
        ...,
        image { asset->{_id, url} },
        slug
      }
    },
    eventsSection{
      ...,
      events[]->{
        ...,
        image { asset->{_id, url} },
        slug
      }
    },
    "getInvolvedSection": coalesce(getInvolvedSection->, getInvolvedSection) {
      ...,
      "cards": *[_type == "event" && isFeatured == true] | order(date asc)[0...3] {
        title,
        description,
        date,
        location,
        image { asset->{_id, url} },
        slug,
        status
      }
    },
    "contactSection": coalesce(contactSection->, contactSection),
    "gallerySection": coalesce(gallerySection->, gallerySection) {
      ...,
      images[] {
        asset->{_id, url},
        alt
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
          <HeroImage image={heroData?.image} />
        </div>
      </div>
      <div className={styles.main}>
        <AboutSection data={sanityData?.aboutSection || content.aboutSection} />
        <StatsSection data={sanityData?.statsSection || content.stats} />
        <TeamSection data={sanityData?.teamSection} />
        <FeaturedStories data={sanityData?.featuredStoriesSection || content.featuredStories} />
        <GetInvolved data={sanityData?.getInvolvedSection || content.getInvolved} />
        <GallerySection data={sanityData?.gallerySection} />
        <ContactForm data={sanityData?.contactSection} />
      </div>
    </main>
  );
}
