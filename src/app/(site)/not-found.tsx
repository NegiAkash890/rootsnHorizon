import Link from "next/link";
import Image from "next/image";
import styles from "./not-found.module.css";

export default function NotFound() {
    return (
        <main className={styles.notFound}>
            <div className={styles.logoWrapper}>
                <Image
                    src="/logo.png"
                    alt="Roots & Horizon Logo"
                    width={150}
                    height={150}
                    className={styles.logo}
                    priority
                />
            </div>

            <h1 className={styles.title}>Oops!</h1>
            <p className={styles.text}>The page you&apos;re looking for doesn&apos;t seem to exist.</p>

            <Link href="/" className={styles.homeButton}>
                Return to home page
            </Link>
        </main>
    );
}
