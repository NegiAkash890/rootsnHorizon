"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaSearchPlus, FaTimes } from "react-icons/fa";
import styles from "./HeroImage.module.css";

interface HeroImageProps {
    image: any;
    alt?: string;
}

const HeroImage = ({ image, alt = "Hero Image" }: HeroImageProps) => {
    const [isOpen, setIsOpen] = useState(false);

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const imageUrl = image?.asset?.url || (typeof image === 'string' ? image : "/hero-placeholder.png");

    return (
        <>
            <div
                className={styles.imageContainer}
                onClick={() => setIsOpen(true)}
                role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsOpen(true); }}
                    aria-label="View hero image in full view"
                >
                    <Image
                        src={imageUrl}
                        alt={alt}
                        fill
                        className={styles.image}
                        priority
                    />
                    <button
                        className={styles.zoomButton}
                        onClick={(e) => { e.stopPropagation(); setIsOpen(true); }}
                        aria-label="Zoom Image"
                    >
                        <FaSearchPlus />
                    </button>
                </div>

            {isOpen && (
                <div className={styles.modal} onClick={() => setIsOpen(false)}>
                    <div className={styles.modalImageWrapper} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
                            <FaTimes />
                        </button>
                        <Image
                            src={imageUrl}
                            alt={alt}
                            fill
                            className={styles.modalImage}
                            quality={100}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default HeroImage;
