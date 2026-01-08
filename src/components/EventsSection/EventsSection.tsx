import Link from "next/link";
import Image from "next/image";
import styles from "./EventsSection.module.css";
import { format } from "date-fns";

// We'll define a basic Event interface.
// In a real app, integrate this with your common types.
interface Event {
    _id?: string;
    title: string;
    description: string;
    date: string; // ISO string
    status: 'upcoming' | 'on-going' | 'completed';
    slug: { current: string };
    image: any;
    location?: string;
}

interface EventsSectionData {
    heading?: string;
    seeAllText?: string;
    events?: Event[];
}

const EventsSection = ({ data }: { data: EventsSectionData }) => {
    const heading = data?.heading || "Upcoming Events";
    const seeAllText = data?.seeAllText || "See The Latest";
    const events = data?.events || [];


    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.heading}>{heading}</h2>
                </div>

                <div className={styles.grid}>
                    {events.length > 0 ? (
                        events.map((event, index) => {
                            const imageUrl = event.image?.asset?.url
                                || (typeof event.image === 'string' ? event.image : null)
                                || "/hero-placeholder.png";

                            const eventDate = event.date ? new Date(event.date) : null;

                            return (
                                <Link key={index} href={`/events`} className={styles.card}>
                                    <div className={styles.imageWrapper}>
                                        <Image
                                            src={imageUrl}
                                            alt={event.title}
                                            fill
                                            className={styles.image}
                                        />
                                        <div className={styles.statusBadge} data-status={event.status}>
                                            {event.status}
                                        </div>
                                    </div>
                                    <div className={styles.content}>
                                        <div className={styles.meta}>
                                            {eventDate && (
                                                <span className={styles.date}>
                                                    {format(eventDate, "MMM d, yyyy")}
                                                </span>
                                            )}
                                            {event.location && (
                                                <span className={styles.location}>
                                                    {event.location}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className={styles.title}>{event.title}</h3>
                                        <p className={styles.description}>{event.description}</p>
                                    </div>
                                </Link>
                            );
                        })
                    ) : (
                        <div className={styles.emptyState}>
                            <p>No upcoming events scheduled at the moment.</p>
                        </div>
                    )}
                </div>

                <div className={styles.footer}>
                    <Link href="/events" className={styles.seeAllBtn}>
                        {seeAllText}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default EventsSection;
