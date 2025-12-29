import Image from "next/image";
import Link from "next/link";
import styles from "./GetInvolved.module.css";
import content from "../../data/siteContent.json";
import { FaChevronRight } from "react-icons/fa";

const GetInvolved = ({ data }: { data: any }) => {
    const heading = data?.heading || "";
    const cards = data?.cards || [];

    return (
        <section className={styles.involved}>
            <div className={styles['involved__container']}>
                <h2 className={styles['involved__heading']}>{heading}</h2>

                <div className={styles['involved__grid']}>
                    {cards.map((card: any, index: number) => (
                        <Link href={card.link || "#"} key={index} className={styles.card}>
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
                                    <FaChevronRight className={styles['card__arrow']} />
                                </div>
                                <p className={styles['card__description']}>{card.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GetInvolved;
