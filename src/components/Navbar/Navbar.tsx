"use client";

import Link from "next/link";
import Image from "next/image";
import DonationModal from "../DonationModal/DonationModal";
import { FaBars, FaHeart } from "react-icons/fa";
import { useState } from "react";
import styles from "./Navbar.module.css";

interface NavLink {
    label: string;
    href?: string;
    targetSection?: {
        heading: string;
        _type: string;
    };
    anchorOverride?: string;
    anchor?: string;
}

interface NavbarData {
    topLinks?: NavLink[];
    mainLinks?: NavLink[];
    cta?: {
        label: string;
        href: string;
        anchor?: string;
    };
}

const sectionTypeToAnchor: Record<string, string> = {
    heroSection: "home",
    statsSection: "stats",
    aboutSection: "about",
    featuredStoriesSection: "featured",
    getInvolvedSection: "involved",
    contactSection: "contact",
};

const getLinkData = (link: NavLink) => {
    let label = link.label;
    let href = link.href || "#";

    // Dynamic Section Linking
    if (link.targetSection) {
        if (!label) label = link.targetSection.heading;
        const anchor = sectionTypeToAnchor[link.targetSection._type];
        if (anchor) href = `/#${anchor}`;
    } else if (link.anchorOverride) {
        // Handle manual anchor override (with or without #)
        const cleanAnchor = link.anchorOverride.startsWith("#") ? link.anchorOverride : `#${link.anchorOverride}`;
        href = `/${cleanAnchor}`;
    } else if (link.anchor) {
        // Backwards compatibility for the simple 'anchor' field if still present
        const cleanAnchor = link.anchor.startsWith("#") ? link.anchor : `#${link.anchor}`;
        href = `/${cleanAnchor}`;
    }

    return { label, href };
};

const Navbar = ({ data }: { data: NavbarData }) => {
    // const topLinks = data?.topLinks || [];
    const mainLinks = data?.mainLinks || [];
    const cta = data?.cta || { label: "Donate", href: "/donate" };

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDonationOpen, setIsDonationOpen] = useState(false);

    const handleDonationClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDonationOpen(true);
    };

    return (
        <header className={styles.header}>
            <DonationModal isOpen={isDonationOpen} onClose={() => setIsDonationOpen(false)} />

            {/* Top Utility Bar */}
            {/* <div className={styles['top-bar']}>
                <div className={styles['top-bar__container']}>
                    {topLinks.map((link: any, index: number) => {
                        const { label, href } = getLinkData(link);
                        return (
                            <Link key={index} href={href} className={styles['top-bar__link']}>
                                {label}
                            </Link>
                        );
                    })}
                </div>
            </div> */}

            {/* Main Navbar */}
            <nav className={styles.navbar}>
                <div className={styles['navbar__container']}>
                    <Link href="/" className={styles['navbar__logo-wrapper']}>
                        <Image
                            src="/logo.png"
                            alt="Roots & Horizon Logo"
                            width={80}
                            height={80}
                            className={styles['navbar__logo-image']}
                        />
                    </Link>

                    <ul className={styles['navbar__links']}>
                        {mainLinks.map((link, index) => {
                            const { label, href } = getLinkData(link);
                            return (
                                <li key={index}>
                                    <Link href={href} className={styles['navbar__link']}>
                                        {label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    <div className={styles.actions}>
                        <a
                            href={cta.href}
                            onClick={cta.label === 'Donate' ? handleDonationClick : undefined}
                            className={styles['navbar__btn']}
                        >
                            {cta.label}
                            {cta.label === 'Donate' && <FaHeart />}
                        </a>
                        <button
                            className={styles['navbar__toggle']}
                            aria-label="Toggle menu"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <FaBars />
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
