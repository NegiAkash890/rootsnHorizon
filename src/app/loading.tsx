import Image from "next/image";
import styles from "./(site)/loading.module.css";

export default function RootLoading() {
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
