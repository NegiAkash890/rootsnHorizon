import React from 'react';
import { MdClose } from "react-icons/md";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import styles from "./BankDetailsModal.module.css";

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

interface BankDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    bankDetails: BankDetails;
}

const BankDetailsModal: React.FC<BankDetailsModalProps> = ({ isOpen, onClose, bankDetails }) => {
    if (!isOpen) return null;

    // Close on click outside
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
                    <MdClose />
                </button>

                <div className={styles.modalHeader}>
                    <h3 className={styles.heading}>{bankDetails.heading || "Donate / Support Us"}</h3>
                </div>

                <div className={styles.modalBody}>
                    {/* QR Code Section */}
                    {bankDetails.qrCode && bankDetails.qrCode.asset && (
                        <div className={styles.qrCodeContainer}>
                            <Image
                                src={urlFor(bankDetails.qrCode).width(400).url()}
                                alt="Payment QR Code"
                                width={200}
                                height={200}
                                className={styles.qrImage}
                            />
                        </div>
                    )}

                    {/* Bank Details Text */}
                    <div className={styles.bankInfo}>
                        {bankDetails.accountName && (
                            <div className={styles.infoRow}>
                                <span className={styles.label}>Account Name</span>
                                <span className={styles.value}>{bankDetails.accountName}</span>
                            </div>
                        )}
                        {bankDetails.bankName && (
                            <div className={styles.infoRow}>
                                <span className={styles.label}>Bank Name</span>
                                <span className={styles.value}>{bankDetails.bankName}</span>
                            </div>
                        )}
                        {bankDetails.accountNumber && (
                            <div className={styles.infoRow}>
                                <span className={styles.label}>Account Number</span>
                                <span className={styles.value}>{bankDetails.accountNumber}</span>
                            </div>
                        )}
                        {bankDetails.ifscCode && (
                            <div className={styles.infoRow}>
                                <span className={styles.label}>IFSC Code</span>
                                <span className={styles.value}>{bankDetails.ifscCode}</span>
                            </div>
                        )}
                        {bankDetails.branchName && (
                            <div className={styles.infoRow}>
                                <span className={styles.label}>Branch</span>
                                <span className={styles.value}>{bankDetails.branchName}</span>
                            </div>
                        )}
                        {bankDetails.upiId && (
                            <div className={styles.infoRow}>
                                <span className={styles.label}>UPI ID</span>
                                <span className={styles.value}>{bankDetails.upiId}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BankDetailsModal;
