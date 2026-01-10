"use client";

import Link from "next/link";
import Image from "next/image";
import BankDetailsModal from "../BankDetailsModal/BankDetailsModal";
// import DonationModal from "../DonationModal/DonationModal"; // Replaced
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

interface BankDetails {
    heading?: string;
    bankName?: string;
    accountName?: string;
    accountNumber?: string;
    ifscCode?: string;
    branchName?: string;
    upiId?: string;
    qrCode?: any;
}

interface NavbarData {
    topLinks?: NavLink[];
    mainLinks?: NavLink[];
    cta?: {
        label: string;
        href: string;
        anchor?: string;
    };
    bankDetails?: BankDetails;
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
    const bankDetails = data?.bankDetails;

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDonationOpen, setIsDonationOpen] = useState(false);

    const handleDonationClick = (e: React.MouseEvent) => {
        // Only open modal if we have bank details and the label implies donation
        if (cta.label.includes('Donate') && bankDetails) {
            e.preventDefault();
            setIsDonationOpen(true);
        }
    };

    const DonateButton = ({ className, isFab = false }: { className: string, isFab?: boolean }) => {
        const content = (
            <>
                {!isFab && cta.label}
                <FaHeart />
            </>
        );

        if (bankDetails) {
            return (
                <button
                    onClick={() => setIsDonationOpen(true)}
                    className={className}
                    aria-label={isFab ? "Donate" : undefined}
                >
                    {content}
                </button>
            );
        }

        return (
            <Link
                href={cta.href}
                className={className}
                aria-label={isFab ? "Donate" : undefined}
            >
                {content}
            </Link>
        );
    };

    return (
        <header className={styles.header}>
            {bankDetails && (
                <BankDetailsModal
                    isOpen={isDonationOpen}
                    onClose={() => setIsDonationOpen(false)}
                    bankDetails={bankDetails}
                />
            )}

            <nav className={styles.navbar}>
                <div className={styles['navbar__container']}>
                    <Link href="/" className={styles['navbar__logo-wrapper']}>
                        <Image
                            src="/logo.jpg"
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
                        <DonateButton className={styles['navbar__btn']} />
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
