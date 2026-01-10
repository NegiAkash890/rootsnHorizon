"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import styles from "./page.module.css";
import { FaArrowLeft, FaMapMarkerAlt } from "react-icons/fa";

interface Event {
    _id: string;
    title: string;
    slug: { current: string };
    date: string;
    status: 'upcoming' | 'on-going' | 'completed';
    image: any;
    description: string;
    location?: string;
}

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [filter, setFilter] = useState<'all' | 'upcoming' | 'on-going' | 'completed'>('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
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
                setEvents(data);
            } catch (error) {
                console.error("Failed to fetch events", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const filteredEvents = filter === 'all'
        ? events
        : events.filter(e => e.status === filter);

    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <Link href="/" className={styles.backLink}>
                    <FaArrowLeft /> Back to Home
                </Link>

                <h1 className={styles.title}>All Events</h1>

                <div className={styles.filters}>
                    {['all', 'upcoming', 'on-going', 'completed'].map((f) => (
                        <button
                            key={f}
                            className={styles.filterBtn}
                            data-active={filter === f}
                            onClick={() => setFilter(f as any)}
                        >
                            {f.replace('-', ' ')}
                        </button>
                    ))}
                </div>
                <div className={styles.alignedRow}>
                    <Link href="/" className={styles.backLink} style={{ marginBottom: 0 }}>
                        <FaArrowLeft /> Back to Home
                    </Link>
                </div>

                {loading ? (
                    <div className={styles.loading}>Loading events...</div>
                ) : (
                    <div className={styles.grid}>
                        {filteredEvents.length > 0 ? (
                            filteredEvents.map((event) => {
                                const imageUrl = event.image?.asset?.url || "/hero-placeholder.png";
                                return (
                                    <div key={event._id} className={styles.card}>
                                        <div className={styles.imageWrapper}>
                                            <Image
                                                src={imageUrl}
                                                alt={event.title}
                                                fill
                                                className={styles.image}
                                            />
                                            <div className={styles.status} data-status={event.status}>
                                                {event.status}
                                            </div>
                                        </div>
                                        <div className={styles.content}>
                                            <div className={styles.date}>
                                                {event.date ? format(new Date(event.date), "MMM d, yyyy • h:mm a") : "Date TBD"}
                                            </div>
                                            <h2 className={styles.cardTitle}>{event.title}</h2>
                                            <p className={styles.description}>{event.description}</p>

                                            {event.location && (
                                                <div className={styles.location}>
                                                    <FaMapMarkerAlt className={styles.markerIcon} /> {event.location}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className={styles.empty}>No events found for this category.</div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}
