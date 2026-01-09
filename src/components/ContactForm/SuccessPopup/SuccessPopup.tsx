import { FaTimes, FaCheckCircle } from "react-icons/fa";
import styles from "./SuccessPopup.module.css";

interface SuccessPopupProps {
    name: string;
    onClose: () => void;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ name, onClose }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button
                    onClick={onClose}
                    className={styles.closeButton}
                >
                    <FaTimes />
                </button>
                <div className={styles.icon}>
                    <FaCheckCircle />
                </div>
                <h3 className={styles.title}>Thank You, {name}!</h3>
                <p className={styles.message}>
                    We have received your message and will get back to you shortly.
                </p>
                <button
                    onClick={onClose}
                    className={styles.closeBtn}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default SuccessPopup;
