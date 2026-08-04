import type { Metadata } from "next";
import { client } from "@/sanity/client";
import EventsClient, { EventItem } from "@/components/EventsSection/EventsClient";
import styles from "./page.module.css";

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata: Metadata = {
    title: "Upcoming & Ongoing Events",
    description: "Explore upcoming, ongoing, and past community initiatives and events hosted by Roots & Horizon.",
    openGraph: {
        title: "Upcoming & Ongoing Events | Roots & Horizon",
        description: "Explore upcoming, ongoing, and past community initiatives and events hosted by Roots & Horizon.",
    },
};

async function getEvents(): Promise<EventItem[]> {
    const query = `*[_type == "event"] | order(date asc) {
        _id,
        title,
        slug,
        date,
        status,
        description,
        location,
        image { asset->{_id, url} }
    }`;
    try {
        const data = await client.fetch(query);
        return data || [];
    } catch (error) {
        console.error("Failed to fetch events server-side:", error);
        return [];
    }
}

export default async function EventsPage() {
    const events = await getEvents();

    return (
        <main className={styles.page}>
            <EventsClient initialEvents={events} />
        </main>
    );
}
