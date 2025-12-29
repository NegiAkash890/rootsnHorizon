"use client";

import Link from "next/link";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import { useState } from "react"; // Added useState import
import styles from "./Navbar.module.css";
import content from "../../data/siteContent.json";

const Navbar = ({ data }: { data: any }) => {
    // Fallback to empty structure if data is missing, to prevent crash
    const topLinks = data?.topLinks || [];
    const mainLinks = data?.mainLinks || [];
    const cta = data?.cta || { label: "Donate", href: "/donate" };

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className={styles.header}>
            {/* Top Utility Bar */}
            <div className={styles['top-bar']}>
                <div className={styles['top-bar__container']}>
                    {topLinks.map((link, index) => (
                        <Link key={index} href={link.href || "#"} className={styles['top-bar__link']}>{link.label}</Link>
                    ))}
                </div>
            </div>

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
                        {mainLinks.map((link, index) => (
                            <li key={index}><Link href={link.href || "#"} className={styles['navbar__link']}>{link.label}</Link></li>
                        ))}
                    </ul>

                    <div className={styles.actions}>
                        <Link href={cta.href} className={styles['navbar__btn']}>
                            {cta.label}
                        </Link>
                        <button className={styles['navbar__toggle']} aria-label="Toggle menu">
                            <FaBars />
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
