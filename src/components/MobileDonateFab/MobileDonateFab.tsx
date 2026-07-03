"use client";

import { useState } from "react";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import BankDetailsModal from "../BankDetailsModal/BankDetailsModal";
import { sendGAEvent } from "@next/third-parties/google";
import styles from "./MobileDonateFab.module.css";

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

    if (bankDetails) {
        return (
            <>
                <button
                    className={styles.mobileDonateFab}
                    onClick={() => {
                        sendGAEvent({ event: "mobile_donate_click", value: "modal" });
                        setIsDonationOpen(true);
                    }}
                    aria-label="Donate"
                >
                    <FaHeart />
                </button>
                <BankDetailsModal
                    isOpen={isDonationOpen}
                    onClose={() => setIsDonationOpen(false)}
                    bankDetails={bankDetails}
                />
            </>
        );
    }

    return (
        <Link
            href={safeCta.href}
            className={styles.mobileDonateFab}
            aria-label="Donate"
            onClick={() => sendGAEvent({ event: "mobile_donate_click", value: "link" })}
        >
            <FaHeart />
        </Link>
    );
};

export default MobileDonateFab;
