import Image from "next/image";
import styles from "./loading.module.css";

export default function Loading() {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.spinnerWrapper}>
                <div className={styles.spinnerRing} />
                <Image
                    src="/icon.png"
                    alt="Roots & Horizon"
                    width={32}
                    height={32}
                    className={styles.pulseLogo}
                />
            </div>
            <p className={styles.loadingText}>Loading Roots & Horizon...</p>
        </div>
    );
}
