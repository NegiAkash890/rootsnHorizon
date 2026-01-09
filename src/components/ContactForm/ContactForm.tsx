"use client";

import { useState } from "react";
import styles from "./ContactForm.module.css";
import { FaPaperPlane } from "react-icons/fa";
import { submitContact } from "@/app/actions/contact";
import SuccessPopup from "./SuccessPopup/SuccessPopup";

interface ContactFormData {
    heading?: string;
    subheading?: string;
}

const ContactForm = ({ data }: { data?: ContactFormData }) => {
    const heading = data?.heading || "Get in Touch";
    const subheading = data?.subheading || "Have questions or want to collaborate? We'd love to hear from you.";

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [submitterName, setSubmitterName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [fieldErrors, setFieldErrors] = useState<{ name?: string, email?: string, message?: string }>({});

    const validate = (formData: FormData) => {
        const errors: { name?: string, email?: string, message?: string } = {};
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const message = formData.get("message") as string;

        if (!name || name.length < 2) {
            errors.name = "Name must be at least 2 characters.";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            errors.email = "Please enter a valid email address.";
        }

        if (!message || message.length < 10) {
            errors.message = "Message must be at least 10 characters.";
        }

        return errors;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget; // Capture form reference
        setErrorMessage("");
        setFieldErrors({});

        const formData = new FormData(form);

        // Client-side validation
        const errors = validate(formData);
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await submitContact(null, formData);

            if (result.success) {
                setSubmitterName(result.name || "Friend");
                setPopupOpen(true);
                form.reset(); // Reset using captured reference
            } else {
                setErrorMessage(result.message || "An error occurred. Please try again.");
            }
        } catch (error) {
            // Silently fail or log to analytics, but do not show error message to user as requested
            console.error("Submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className={styles.contact}>
            {popupOpen && <SuccessPopup name={submitterName} onClose={() => setPopupOpen(false)} />}

            <div className={styles.contact__container}>
                <div className={styles.contact__header}>
                    <h2 className={styles.contact__heading}>{heading}</h2>
                    <p className={styles.contact__subheading}>
                        {subheading}
                    </p>
                </div>

                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                    {errorMessage && (
                        <div className={styles['form__error-message']}>
                            {errorMessage}
                        </div>
                    )}

                    <div className={styles.form__group}>
                        <label htmlFor="name" className={styles.form__label}>
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className={`${styles.form__input} ${fieldErrors.name ? styles.error : ''}`}
                            placeholder="Your Name"
                            disabled={isSubmitting}
                            onChange={() => setFieldErrors(prev => ({ ...prev, name: undefined }))}
                        />
                        {fieldErrors.name && <span className={styles['form__error-text']}>{fieldErrors.name}</span>}
                    </div>

                    <div className={styles.form__group}>
                        <label htmlFor="email" className={styles.form__label}>
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={`${styles.form__input} ${fieldErrors.email ? styles.error : ''}`}
                            placeholder="your@email.com"
                            disabled={isSubmitting}
                            onChange={() => setFieldErrors(prev => ({ ...prev, email: undefined }))}
                        />
                        {fieldErrors.email && <span className={styles['form__error-text']}>{fieldErrors.email}</span>}
                    </div>

                    <div className={styles.form__group}>
                        <label htmlFor="message" className={styles.form__label}>
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            className={`${styles.form__textarea} ${fieldErrors.message ? styles.error : ''}`}
                            placeholder="How can we help?"
                            disabled={isSubmitting}
                            onChange={() => setFieldErrors(prev => ({ ...prev, message: undefined }))}
                        />
                        {fieldErrors.message && <span className={styles['form__error-text']}>{fieldErrors.message}</span>}
                    </div>

                    <button
                        type="submit"
                        className={`btn btn-primary ${styles.form__submit}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            "Sending..."
                        ) : (
                            <>
                                Send Message &nbsp; <FaPaperPlane />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ContactForm;
