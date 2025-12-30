import Image from "next/image";
import styles from "./GetInvolved.module.css";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";

const GetInvolved = ({ data }: { data: any }) => {
    const heading = data?.heading || "";
    const cards = data?.cards || [];

    return (
        <section id="involved" className={styles.involved}>
            <div className={styles['involved__container']}>
                <h2 className={styles['involved__heading']}>{heading}</h2>

                <div className={styles['involved__grid']}>
                    {cards.map((card: any, index: number) => (
                        <div key={index} className={styles.card}>
                            <div className={styles['card__image-wrapper']}>
                                <Image
                                    src={card.image?.asset?.url || (typeof card.image === 'string' ? card.image : "/hero-placeholder.png")}
                                    alt={card.title}
                                    fill
                                    className={styles['card__image']}
                                />
                            </div>
                            <div className={styles['card__content']}>
                                <div className={styles['card__header']}>
                                    <h3 className={styles['card__title']}>{card.title}</h3>
                                </div>
                                <p className={styles['card__description']}>{card.description}</p>

                                <div className={styles['card__meta']}>
                                    <div className={styles['card__meta-item']}>
                                        <FaCalendarAlt className={styles['card__meta-icon']} />
                                        <span>{card.date || "TBD"}</span>
                                    </div>
                                    <div className={styles['card__meta-item']}>
                                        <FaClock className={styles['card__meta-icon']} />
                                        <span>{card.time || "TBD"}</span>
                                    </div>
                                    <div className={styles['card__meta-item']}>
                                        <FaMapMarkerAlt className={styles['card__meta-icon']} />
                                        <span>{card.location || "TBD"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GetInvolved;
