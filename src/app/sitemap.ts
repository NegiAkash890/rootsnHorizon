import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rootsnhorizon.org";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/stories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  try {
    const storiesQuery = `*[_type == "story" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`;
    const genericQuery = `*[_type in ["genericPage", "teamMember"] && defined(slug.current)]{ "slug": slug.current, _updatedAt }`;

    const [stories, genericPages] = await Promise.all([
      client.fetch(storiesQuery).catch(() => []),
      client.fetch(genericQuery).catch(() => []),
    ]);

    const storyRoutes: MetadataRoute.Sitemap = (stories || []).map((story: { slug: string; _updatedAt?: string }) => ({
      url: `${baseUrl}/stories/${story.slug}`,
      lastModified: story._updatedAt ? new Date(story._updatedAt) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    const otherRoutes: MetadataRoute.Sitemap = (genericPages || []).map((page: { slug: string; _updatedAt?: string }) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: page._updatedAt ? new Date(page._updatedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    return [...staticRoutes, ...storyRoutes, ...otherRoutes];
  } catch (error) {
    console.error("Error generating dynamic sitemap:", error);
    return staticRoutes;
  }
}
