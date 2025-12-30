"use client";

import { useState } from "react";
import styles from "./ContactForm.module.css";
import { FaPaperPlane } from "react-icons/fa";

const ContactForm = ({ data }: { data?: any }) => {
    const heading = data?.heading || "Get in Touch";
    const subheading = data?.subheading || "Have questions or want to collaborate? We'd love to hear from you.";

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate Network Request
        await new Promise((resolve) => setTimeout(resolve, 1500));

        console.log("Form Submitted:", formData);
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: "", email: "", message: "" });

        // Reset success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
    };

    return (
        <section id="contact" className={styles.contact}>
            <div className={styles.contact__container}>
                <div className={styles.contact__header}>
                    <h2 className={styles.contact__heading}>{heading}</h2>
                    <p className={styles.contact__subheading}>
                        {subheading}
                    </p>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.form__group}>
                        <label htmlFor="name" className={styles.form__label}>
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className={styles.form__input}
                            placeholder="Your Name"
                        />
                    </div>

                    <div className={styles.form__group}>
                        <label htmlFor="email" className={styles.form__label}>
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className={styles.form__input}
                            placeholder="your@email.com"
                        />
                    </div>

                    <div className={styles.form__group}>
                        <label htmlFor="message" className={styles.form__label}>
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className={styles.form__textarea}
                            placeholder="How can we help?"
                        />
                    </div>

                    <button
                        type="submit"
                        className={`btn btn-primary ${styles.form__submit}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            "Sending..."
                        ) : isSuccess ? (
                            "Message Sent!"
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
