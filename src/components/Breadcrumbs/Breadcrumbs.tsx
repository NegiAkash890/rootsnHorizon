"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronRight } from "react-icons/fa";
import styles from "./Breadcrumbs.module.css";

function formatSegment(segment: string): string {
    return segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function Breadcrumbs() {
    const pathname = usePathname();

    // Hide breadcrumbs on homepage (/) or studio admin route
    if (pathname === "/" || pathname.startsWith("/studio")) {
        return null;
    }

    const segments = pathname.split("/").filter(Boolean);

    const items = [
        { label: "Home", href: "/" },
        ...segments.map((segment, index) => {
            const href = "/" + segments.slice(0, index + 1).join("/");
            return {
                label: formatSegment(segment),
                href,
            };
        }),
    ];

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rootsnhorizon.org";
    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.label,
            "item": `${siteUrl}${item.href}`,
        })),
    };

    return (
        <nav aria-label="Breadcrumb" className={styles.breadcrumbsContainer}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <div className={styles.breadcrumbsWrapper}>
                <ol className={styles.list}>
                    {items.map((item, index) => {
                        const isLast = index === items.length - 1;
                        return (
                            <li key={item.href} className={styles.item}>
                                {index > 0 && <FaChevronRight className={styles.separator} />}
                                {isLast ? (
                                    <span className={styles.current} aria-current="page">
                                        {item.label}
                                    </span>
                                ) : (
                                    <Link href={item.href} className={styles.link}>
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </div>
        </nav>
    );
}
