"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "@/app/(site)/events/page.module.css";
import { FaMapMarkerAlt } from "react-icons/fa";

import BackButton from "@/components/BackButton/BackButton";

export interface EventItem {
    _id: string;
    title: string;
    slug?: { current: string };
    date?: string;
    status: 'upcoming' | 'on-going' | 'completed';
    image?: any;
    description: string;
    location?: string;
}

interface EventsClientProps {
    initialEvents: EventItem[];
}

export default function EventsClient({ initialEvents }: EventsClientProps) {
    const [filter, setFilter] = useState<string>('all');

    const filterKey = filter.toLowerCase();
    const filteredEvents = filterKey === 'all'
        ? initialEvents
        : initialEvents.filter(e => e.status?.toLowerCase() === filterKey);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>All Events</h1>

            <div className={styles.alignedRow}>
                <BackButton fallbackHref="/" />
            </div>

            <div className={styles.filters}>
                {['All', 'Upcoming', 'On-going', 'Completed'].map((f) => (
                    <button
                        key={f}
                        className={styles.filterBtn}
                        data-active={filter.toLowerCase() === f.toLowerCase()}
                        onClick={() => setFilter(f)}
                    >
                        {f.replace('-', ' ')}
                    </button>
                ))}
            </div>

            <div className={styles.grid}>
                {filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => {
                        const imageUrl = event.image?.asset?.url || "/hero-placeholder.png";
                        return (
                            <div key={event._id} className={styles.card}>
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={imageUrl}
                                        alt={event.title || "Event Image"}
                                        fill
                                        className={styles.image}
                                    />
                                    <div className={styles.status} data-status={event.status}>
                                        {event.status}
                                    </div>
                                </div>
                                <div className={styles.content}>
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
        </div>
    );
}
