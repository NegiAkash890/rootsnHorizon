"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
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

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
            <Toolbar sx={{ height: { xs: 70, md: 100 }, display: "flex", justifyContent: "space-between", px: { xs: 2, lg: 4 } }}>
                {bankDetails && (
                    <BankDetailsModal
                        isOpen={isDonationOpen}
                        onClose={() => setIsDonationOpen(false)}
                        bankDetails={bankDetails}
                    />
                )}

                {/* Logo */}
                <Box sx={{
                    position: { xs: 'absolute', md: 'static' },
                    left: { xs: '50%', md: 'auto' },
                    transform: { xs: 'translateX(-50%)', md: 'none' },
                    display: 'flex',
                    alignItems: 'center',
                    zIndex: 1,
                }}>
                    <Link href="/" style={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ width: { xs: 55, md: 80 }, height: { xs: 55, md: 80 }, position: "relative" }}>
                            <Image
                                src="/logo.jpg"
                                alt="Roots & Horizon Logo"
                                fill
                                style={{ objectFit: "contain" }}
                                priority
                            />
                        </Box>
                    </Link>
                </Box>

                {/* Desktop Navigation Links */}
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

                {/* Desktop Action (Donate Button) */}
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
                            px: 4,
                            py: 1.5,
                            fontSize: "1rem",
                            borderRadius: 0,
                        }}
                    >
                        {cta.label}
                    </Button>
                </Box>

                {/* Mobile Menu Icon */}
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    onClick={() => setIsMobileMenuOpen(true)}
                    sx={{ display: { xs: "flex", md: "none" }, ml: 'auto' }}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>

            {/* Mobile Navigation Drawer */}
            <Drawer
                anchor="right"
                open={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                slotProps={{
                    paper: {
                        sx: {
                            width: 280,
                            backgroundColor: "#000000",
                            color: "#FFFFFF",
                            borderLeft: "1px solid var(--border)",
                            p: 3,
                        },
                    },
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
                    <IconButton color="inherit" onClick={() => setIsMobileMenuOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {navLinks.map((link, index) => (
                        <ListItem key={index} disablePadding>
                            <Link href={link.href} passHref legacyBehavior>
                                <ListItemButton
                                    component="a"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    sx={{
                                        p: 1.5,
                                        borderRadius: 0,
                                        "&:hover": {
                                            backgroundColor: "rgba(255, 255, 255, 0.08)",
                                        },
                                    }}
                                >
                                    <ListItemText
                                        primary={
                                            <Typography
                                                sx={{
                                                    fontFamily: "var(--font-primary)",
                                                    fontWeight: 700,
                                                    fontSize: "1.1rem",
                                                    letterSpacing: "0.05em",
                                                }}
                                            >
                                                {link.label}
                                            </Typography>
                                        }
                                    />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))}
                </List>

                <Box sx={{ mt: 4 }}>
                    <Button
                        component={bankDetails ? "button" : Link}
                        href={bankDetails ? undefined : cta.href}
                        onClick={(e: React.MouseEvent) => {
                            handleDonateClick(e);
                            setIsMobileMenuOpen(false);
                        }}
                        variant="contained"
                        color="primary"
                        fullWidth
                        endIcon={<FavoriteIcon />}
                        sx={{
                            fontFamily: "var(--font-primary)",
                            fontWeight: 900,
                            py: 2,
                            borderRadius: 0,
                        }}
                    >
                        {cta.label}
                    </Button>
                </Box>
            </Drawer>
        </AppBar>
    );
};

export default Navbar;
