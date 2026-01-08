import Image from "next/image";
import styles from "./GallerySection.module.css";

interface GalleryImage {
    asset: {
        _id: string;
        url: string;
    };
    alt?: string;
}

interface GallerySectionData {
    heading?: string;
    images?: GalleryImage[];
}

const GallerySection = ({ data }: { data: GallerySectionData }) => {
    if (!data) return null;

    const heading = data.heading || "Our Gallery";
    const images = data.images || [];

    if (images.length === 0) return null;

    return (
        <section className={styles.gallery}>
            <div className={styles.container}>
                <h2 className={styles.heading}>{heading}</h2>
                <div className={styles.grid}>
                    {images.map((image, index) => {
                        const imageUrl = image.asset?.url;
                        if (!imageUrl) return null;

                        return (
                            <div key={image.asset._id || index} className={styles.imageWrapper}>
                                <Image
                                    src={imageUrl}
                                    alt={image.alt || `Gallery Image ${index + 1}`}
                                    fill
                                    className={styles.image}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default GallerySection;
