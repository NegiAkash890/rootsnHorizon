"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./BackButton.module.css";

interface BackButtonProps {
    fallbackHref?: string;
    className?: string;
}

export default function BackButton({ fallbackHref = "/", className = "" }: BackButtonProps) {
    const router = useRouter();

    const handleBack = () => {
        if (typeof window !== "undefined" && window.history.length > 1) {
            router.back();
        } else {
            router.push(fallbackHref);
        }
    };

    return (
        <button
            type="button"
            onClick={handleBack}
            className={`${styles.backButton} ${className}`}
            aria-label="Go back to previous page"
        >
            <span className={styles.iconWrapper}>
                <FaArrowLeft />
            </span>
            <span>Back</span>
        </button>
    );
}
