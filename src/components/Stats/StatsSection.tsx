import styles from "./StatsSection.module.css";
import content from "../../data/siteContent.json";
import { FaGraduationCap, FaTint, FaStethoscope, FaHome } from "react-icons/fa";

// Mapping string icons to React components for now (since we use JSON)
const iconMap: Record<string, React.ReactNode> = {
    education: <FaGraduationCap />,
    water: <FaTint />,
    health: <FaStethoscope />,
    home: <FaHome />
};

const StatsSection = ({ data }: { data: any }) => {
    // If data comes from Sanity, structure might be slightly different (e.g. data.stats instead of data.items)
    // We should normalize it or ensure schema matches JSON structure.
    // In schema I named it 'stats' (array), in JSON it is 'items'.
    // Let's handle both.
    const heading = data?.heading || "";
    const description = data?.description || "";
    const rawItems = data?.stats || data?.items || [];

    // Normalize items: handle both Sanity object structure and JSON fallback structure
    // If it's Sanity, icon is an object { asset: ... }. If JSON, it's a string "home".
    // We only support string keys for iconMap right now.
    // For now, let's just fallback icon to "home" if it's an object/missing.
    const items = rawItems;

    return (
        <section id="stats" className={styles['stats-section']}>
            <div className={styles['stats-section__container']}>
                <h2 className={styles['stats-section__heading']}>{heading}</h2>
                <p className={styles['stats-section__description']}>
                    {description}
                </p>

                <div className={styles['stats-section__grid']}>
                    {items.map((item: any, index: number) => (
                        <div key={index} className={styles['stat-card']}>
                            <div className={styles['stat-card__icon-wrapper']}>
                                <span className={styles['stat-card__icon']}>
                                    {/* Handle complex logic: if item.icon is string, use map. If not, default. */}
                                    {(typeof item.icon === 'string' && iconMap[item.icon]) ? iconMap[item.icon] : <FaHome />}
                                </span>
                            </div>
                            <div className={styles['stat-card__number']}>{item.number}</div>
                            <div className={styles['stat-card__text']}>{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
