import { FaTimes, FaCheckCircle } from "react-icons/fa";

interface SuccessPopupProps {
    name: string;
    onClose: () => void;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ name, onClose }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
        }}>
            <div style={{
                backgroundColor: '#fff',
                padding: '40px',
                borderRadius: '12px',
                textAlign: 'center',
                maxWidth: '400px',
                width: '90%',
                position: 'relative',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        background: 'none',
                        border: 'none',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        color: '#666'
                    }}
                >
                    <FaTimes />
                </button>
                <div style={{ color: 'var(--primary)', fontSize: '3rem', marginBottom: '20px' }}>
                    <FaCheckCircle />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#000' }}>Thank You, {name}!</h3>
                <p style={{ color: '#666', lineHeight: '1.5' }}>
                    We have received your message and will get back to you shortly.
                </p>
                <button
                    onClick={onClose}
                    style={{
                        marginTop: '20px',
                        backgroundColor: '#000',
                        color: '#fff',
                        border: 'none',
                        padding: '12px 24px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        textTransform: 'uppercase'
                    }}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default SuccessPopup;
