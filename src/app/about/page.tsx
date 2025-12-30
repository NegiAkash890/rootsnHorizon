import styles from "../page.module.css";
import content from "@/data/siteContent.json";

export default function AboutPage() {
    return (
        <main className={styles.page}>
            <div className={styles.container} style={{ padding: '100px 20px' }}>
                <h1 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '40px' }}>About Roots & Horizon</h1>
                <div style={{ maxWidth: '800px', fontSize: '1.25rem', lineHeight: '1.8' }}>
                    <p>
                        Roots & Horizon is a global humanitarian organization dedicated to providing immediate aid and long-term support to communities in crisis.
                        Founded on the principles of compassion, equity, and resilience, we work in some of the world's most challenging environments to restore
                        health, safety, and opportunity.
                    </p>
                    <p>
                        Our work spans across various sectors including emergency relief, education, healthcare, and sustainable development.
                        By collaborating with local partners and empowering individuals, we ensure that our impact is both profound and lasting.
                    </p>
                    <p>
                        At Roots & Horizon, we believe that everyone deserves the chance to thrive. Whether it's responding to natural disasters,
                        supporting refugees, or building resilient infrastructure, our commitment to humanity remains unshakable.
                    </p>
                    <h2 style={{ fontSize: '2.5rem', marginTop: '60px', marginBottom: '20px' }}>Our Mission</h2>
                    <p>
                        To empower displaced and marginalized communities by providing the resources and support they need to rebuild their lives and secure a sustainable future.
                    </p>
                    <h2 style={{ fontSize: '2.5rem', marginTop: '60px', marginBottom: '20px' }}>Our Vision</h2>
                    <p>
                        A world where every individual, regardless of their circumstances, has the agency and opportunity to lead a life of dignity and purpose.
                    </p>
                </div>
            </div>
        </main>
    );
}
