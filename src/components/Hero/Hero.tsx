import Link from "next/link";
import styles from "./Hero.module.css";

interface HeroData {
    label?: string;
    title?: string;
    description?: string;
    cta?: {
        label: string;
        href: string;
    };
}

const Hero = ({ data }: { data: HeroData }) => {
    const { label, title, description, cta = { label: "Read Story", href: "/donate" } } = data || {};

    return (
        <section id="home" className={styles.hero}>
            {/* Full-width Subtle Flying Birds Background Graphic */}
            <svg
                className={styles.heroBirdsBackground}
                viewBox="0 0 1200 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                {/* Left top flock */}
                <path d="M80 40C92 25 108 28 118 40C128 28 144 25 156 40C140 36 126 44 118 52C110 44 96 36 80 40Z" fill="#888888" opacity="0.18" />
                <path d="M160 25C170 12 184 14 192 25C200 14 214 12 224 25C210 22 198 28 192 35C186 28 174 22 160 25Z" fill="#777777" opacity="0.15" />
                <path d="M120 70C128 60 139 62 145 70C151 62 162 60 170 70C160 67 151 72 145 77C139 72 130 67 120 70Z" fill="#999999" opacity="0.12" />

                {/* Center skyline flock */}
                <path d="M480 80C495 62 515 65 528 80C541 65 561 62 576 80C555 75 538 85 528 95C518 85 501 75 480 80Z" fill="#888888" opacity="0.16" />
                <path d="M580 50C592 35 608 37 618 50C628 37 644 35 656 50C640 46 627 55 618 62C609 55 596 46 580 50Z" fill="#aaaaaa" opacity="0.14" />
                <path d="M530 120C539 108 551 110 558 120C565 110 577 108 586 120C575 117 565 122 558 128C551 122 541 117 530 120Z" fill="#777777" opacity="0.12" />

                {/* Right skyline flock */}
                <path d="M880 35C895 18 915 21 928 35C941 21 961 18 976 35C955 30 938 40 928 50C918 40 901 30 880 35Z" fill="#888888" opacity="0.2" />
                <path d="M990 20C1000 8 1014 10 1022 20C1030 10 1044 8 1054 20C1040 17 1028 23 1022 30C1016 23 1004 17 990 20Z" fill="#777777" opacity="0.16" />
                <path d="M940 75C949 63 961 65 968 75C975 65 987 63 996 75C985 72 975 77 968 83C961 77 951 72 940 75Z" fill="#aaaaaa" opacity="0.15" />
                <path d="M1060 60C1067 50 1076 52 1082 60C1088 52 1097 50 1104 60C1095 58 1087 62 1082 67C1077 62 1069 58 1060 60Z" fill="#888888" opacity="0.12" />
            </svg>

            <div className={styles['hero__content']}>
                {label && (
                    <div className={styles['hero__label']}>{label}</div>
                )}
                <h2 className={styles['hero__title']}>
                    {title}
                </h2>
                <p className={styles['hero__description']}>
                    {description}
                </p>
            </div>
        </section>
    );
};

export default Hero;
