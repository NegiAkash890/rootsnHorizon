
import { createClient } from "next-sanity";
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
    useCdn: false, // Ensure fresh data
});

async function debugQuery() {
    const query = `*[_type == "homepage"][0]{
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
    }
  }`;

    try {
        console.log("Fetching featuredStoriesSection...");
        const data = await client.fetch(query);
        console.log("featuredStoriesSection:", JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

debugQuery();
