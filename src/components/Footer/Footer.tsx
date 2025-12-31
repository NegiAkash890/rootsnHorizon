import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import styles from "./Footer.module.css";
import content from "../../data/siteContent.json";
// In a real app, I'd use an icon library like react-icons or lucide-react.
// For now, I'll use text placeholders or simple SVGs if needed, but text is safer without extra deps.
// I will just use text abbreviations for Socials for simplicity or simple inline SVGs.

interface FooterLink {
    label: string;
    href: string;
}

interface FooterSection {
    heading: string;
    links: FooterLink[];
}

const Footer = ({ data }: { data: any }) => {
    const description = data?.description || "";
    const sections: FooterSection[] = data?.sections || [];
    const socialLinks = data?.socialLinks || [];

    const getIcon = (platform: string) => {
        switch (platform) {
            case 'facebook': return <FaFacebookF />;
            case 'twitter': return <FaTwitter />;
            case 'instagram': return <FaInstagram />;
            case 'linkedin': return <FaLinkedinIn />;
            default: return null;
        }
    };

    return (
        <footer className={styles.footer}>
            <div className={styles['footer__container']}>
                <div className={styles['footer__top-section']}>
                    <div className={styles['footer__column']}>
                        <Link href="/" className={styles['footer__logo']}>Roots & Horizon</Link>
                        <p className={styles['footer__description']}>
                            {description}
                        </p>
                        {/* Social Media Links */}
                        <div className={styles['footer__social-links']}>
                            {socialLinks.map((link: any, index: number) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    className={styles['footer__social-icon']}
                                    aria-label={link.platform}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {getIcon(link.platform)}
                                </a>
                            ))}
                        </div>
                    </div>

                    {sections.map((section, index) => (
                        <div key={index} className={styles['footer__column']}>
                            <h4 className={styles['footer__heading']}>{section.heading}</h4>
                            <ul className={styles['footer__link-list']}>
                                {section.links?.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <Link href={link.href || "#"} className={styles['footer__link']}>{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className={styles['footer__bottom-section']}>
                    <p>© {new Date().getFullYear()} Roots & Horizon. All rights reserved.</p>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <Link href="/privacy" className={styles['footer__link']}>Privacy Policy</Link>
                        <Link href="/terms" className={styles['footer__link']}>Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
