"use client";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import SendIcon from "@mui/icons-material/Send";
import { submitContact } from "@/app/actions/contact";
import SuccessPopup from "./SuccessPopup/SuccessPopup";
import { sendGAEvent } from "@next/third-parties/google";
import styles from "./ContactForm.module.css";

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
        const form = event.currentTarget;
        setErrorMessage("");
        setFieldErrors({});

        const formData = new FormData(form);

        // Client-side validation
        const errors = validate(formData);
        if (Object.keys(errors).length > 0) {
            sendGAEvent({ event: "contact_form_validation_error", value: Object.keys(errors).join(",") });
            setFieldErrors(errors);
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await submitContact(null, formData);

            if (result.success) {
                sendGAEvent({ event: "contact_form_submit", value: "success" });
                setSubmitterName(result.name || "Friend");
                setPopupOpen(true);
                form.reset();
            } else {
                sendGAEvent({ event: "contact_form_submit", value: "failure" });
                setErrorMessage(result.message || "An error occurred. Please try again.");
            }
        } catch (error) {
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
                        <Alert severity="error" sx={{ mb: 1, borderRadius: 0 }}>
                            {errorMessage}
                        </Alert>
                    )}

                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Name"
                        variant="outlined"
                        placeholder="Your Name"
                        disabled={isSubmitting}
                        error={!!fieldErrors.name}
                        helperText={fieldErrors.name}
                        onChange={() => setFieldErrors(prev => ({ ...prev, name: undefined }))}
                        sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.5)",
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 0,
                            }
                        }}
                    />

                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        variant="outlined"
                        placeholder="your@email.com"
                        disabled={isSubmitting}
                        error={!!fieldErrors.email}
                        helperText={fieldErrors.email}
                        onChange={() => setFieldErrors(prev => ({ ...prev, email: undefined }))}
                        sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.5)",
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 0,
                            }
                        }}
                    />

                    <TextField
                        fullWidth
                        id="message"
                        name="message"
                        label="Message"
                        variant="outlined"
                        placeholder="How can we help?"
                        multiline
                        rows={6}
                        disabled={isSubmitting}
                        error={!!fieldErrors.message}
                        helperText={fieldErrors.message}
                        onChange={() => setFieldErrors(prev => ({ ...prev, message: undefined }))}
                        sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.5)",
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 0,
                            }
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        endIcon={<SendIcon />}
                        sx={{
                            alignSelf: "flex-start",
                            width: "100%",
                            mt: 1,
                            boxShadow: "none",
                            "&:hover": {
                                boxShadow: "none",
                            }
                        }}
                    >
                        {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default ContactForm;
