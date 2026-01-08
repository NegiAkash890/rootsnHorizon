"use client";

import { useEffect } from 'react';
import styles from './DonationModal.module.css';

interface DonationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function DonationModal({ isOpen, onClose }: DonationModalProps) {
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

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose} aria-label="Close">×</button>

                <div className={styles.contentWrapper}>
                    <h2 className={styles.title}>Support Our <span>Cause</span></h2>
                    <p className={styles.subtitle}>Scan the QR code to donate directly to our NGO foundation.</p>

                    <div className={styles.qrContainer}>
                        {/* INSTRUCTION: Replace this div with your actual QR code image */}
                        {/* <Image src="/path-to-qr.png" width={220} height={220} alt="Donation QR" /> */}
                        <div className={styles.qrPlaceholder}>
                            QR Code Here
                        </div>
                    </div>

                    <div className={styles.divider}>
                        <span>Or Transfer Manually</span>
                    </div>

                    <div className={styles.bankDetails}>
                        <div className={styles.bankRow}>
                            <span className={styles.label}>Bank</span>
                            <span className={styles.value}>[Bank Name]</span>
                        </div>
                        <div className={styles.bankRow}>
                            <span className={styles.label}>Account</span>
                            <span className={styles.value}>[1234 5678 9000]</span>
                        </div>
                        <div className={styles.bankRow}>
                            <span className={styles.label}>IFSC</span>
                            <span className={styles.value}>[IFSC0001234]</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
