"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BankDetailsModal from "../BankDetailsModal/BankDetailsModal";
import { sendGAEvent } from "@next/third-parties/google";

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
        const cleanAnchor = link.anchorOverride.startsWith("#") ? link.anchorOverride : `#${link.anchorOverride}`;
        href = `/${cleanAnchor}`;
    } else if (link.anchor) {
        const cleanAnchor = link.anchor.startsWith("#") ? link.anchor : `#${link.anchor}`;
        href = `/${cleanAnchor}`;
    }

    return { label, href };
};

const Navbar = ({ data }: { data: NavbarData }) => {
    const mainLinks = data?.mainLinks || [];
    const cta = data?.cta || { label: "Donate", href: "/donate" };
    const bankDetails = data?.bankDetails;

    const [isDonationOpen, setIsDonationOpen] = useState(false);

    const handleDonateClick = (e: React.MouseEvent) => {
        if (bankDetails) {
            e.preventDefault();
            sendGAEvent({ event: "navbar_donate_click", value: "modal" });
            setIsDonationOpen(true);
        } else {
            sendGAEvent({ event: "navbar_donate_click", value: "link" });
        }
    };

    const navLinks = mainLinks.map(link => getLinkData(link));

    return (
        <AppBar position="fixed" sx={{ backgroundColor: "#000000", borderBottom: "1px solid var(--border)", boxShadow: "none" }}>
            <Toolbar sx={{
                width: "100%",
                maxWidth: "var(--container-width, 75rem)",
                mx: "auto",
                height: { xs: 70, md: 80 },
                minHeight: { xs: "70px !important", md: "80px !important" },
                display: "flex",
                justifyContent: "space-between",
                px: { xs: 2.5, sm: 3, md: 4 },
            }}>
                {bankDetails && (
                    <BankDetailsModal
                        isOpen={isDonationOpen}
                        onClose={() => setIsDonationOpen(false)}
                        bankDetails={bankDetails}
                    />
                )}

                {/* Logo & Brand Name */}
                <Box sx={{
                    position: { xs: 'absolute', md: 'static' },
                    left: { xs: '50%', md: 'auto' },
                    transform: { xs: 'translateX(-50%)', md: 'none' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: { xs: 'center', md: 'flex-start' },
                    zIndex: 1,
                }}>
                    <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
                        <Box sx={{ width: { xs: 45, md: 55 }, height: { xs: 45, md: 55 }, position: "relative", overflow: "hidden", borderRadius: "50%", flexShrink: 0 }}>
                            <Image
                                src="/logo.jpg"
                                alt="Roots & Horizon Logo"
                                fill
                                style={{ objectFit: "cover" }}
                                priority
                            />
                        </Box>
                        <Typography
                            component="span"
                            sx={{
                                color: "#FFFFFF",
                                fontWeight: 800,
                                fontSize: { xs: "1.05rem", md: "1.2rem" },
                                letterSpacing: "-0.02em",
                                whiteSpace: "nowrap",
                                fontFamily: "var(--font-primary)",
                            }}
                        >
                            Roots 'n Horizon
                        </Typography>
                    </Link>
                </Box>

                {/* Navigation Links */}
                <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4, height: "100%", alignItems: "center" }}>
                    {navLinks.map((link, index) => (
                        <Link key={index} href={link.href} passHref legacyBehavior>
                            <Box
                                component="a"
                                sx={{
                                    fontFamily: "var(--font-primary)",
                                    fontWeight: 700,
                                    fontSize: "0.9rem",
                                    color: "#FFFFFF",
                                    letterSpacing: "0.05em",
                                    textDecoration: "none",
                                    position: "relative",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    transition: "color 0.3s ease",
                                    "&:hover": {
                                        color: "primary.main",
                                    },
                                }}
                            >
                                {link.label}
                            </Box>
                        </Link>
                    ))}
                </Box>

                {/* Action (Donate Button) */}
                <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
                    <Button
                        component={bankDetails ? "button" : Link}
                        href={bankDetails ? undefined : cta.href}
                        onClick={handleDonateClick}
                        variant="contained"
                        color="primary"
                        endIcon={<FavoriteIcon />}
                        sx={{
                            fontFamily: "var(--font-primary)",
                            fontWeight: 900,
                            px: { xs: 2, md: 4 },
                            py: 1.25,
                            fontSize: { xs: "0.875rem", md: "1rem" },
                            borderRadius: 0,
                        }}
                    >
                        {cta.label}
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
