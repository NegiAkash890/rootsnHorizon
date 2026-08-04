"use client";

import { useState } from "react";
import Link from "next/link";
import Fab from "@mui/material/Fab";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BankDetailsModal from "../BankDetailsModal/BankDetailsModal";
import { sendGAEvent } from "@next/third-parties/google";

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

interface MobileDonateFabProps {
    bankDetails?: BankDetails;
    cta?: {
        label: string;
        href: string;
    };
}

const MobileDonateFab = ({ bankDetails, cta }: MobileDonateFabProps) => {
    const [isDonationOpen, setIsDonationOpen] = useState(false);

    // Default CTA if not provided
    const safeCta = cta || { label: "Donate", href: "/donate" };

    const fabStyles = {
        position: "fixed",
        bottom: "calc(20px + env(safe-area-inset-bottom))",
        right: "calc(20px + env(safe-area-inset-right))",
        width: 60,
        height: 60,
        backgroundColor: "primary.main",
        color: "primary.contrastText",
        zIndex: 2147483647,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        display: { xs: "flex", md: "none" },
        "&:hover": {
            backgroundColor: "primary.light",
        },
        "&:active": {
            transform: "scale(0.95)",
        },
    };

    if (bankDetails) {
        return (
            <>
                <Fab
                    sx={fabStyles}
                    onClick={() => {
                        sendGAEvent({ event: "mobile_donate_click", value: "modal" });
                        setIsDonationOpen(true);
                    }}
                    aria-label="Donate"
                >
                    <FavoriteIcon />
                </Fab>
                <BankDetailsModal
                    isOpen={isDonationOpen}
                    onClose={() => setIsDonationOpen(false)}
                    bankDetails={bankDetails}
                />
            </>
        );
    }

    return (
        <Fab
            component={Link}
            href={safeCta.href}
            sx={fabStyles}
            aria-label="Donate"
            onClick={() => sendGAEvent({ event: "mobile_donate_click", value: "link" })}
        >
            <FavoriteIcon />
        </Fab>
    );
};

export default MobileDonateFab;
