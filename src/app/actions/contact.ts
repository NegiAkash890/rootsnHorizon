'use server'

import { createClient } from "next-sanity";

export async function submitContact(prevState: any, formData: FormData) {
    // 1. Validate Fields
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
        return { success: false, message: "Please fill in all fields." };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { success: false, message: "Please enter a valid email address." };
    }

    // 2. Setup Sanity Client with Write Token
    const token = process.env.NEXT_PUBLIC_SANITY_API_TOKEN;

    if (!token) {
        console.warn("Missing SANITY_API_TOKEN. Simulating success for demo purposes.");
        // For demo/dev environment without token, we simulate success
        return { success: true, name: name, simulation: true };
    }

    const client = createClient({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        apiVersion: "2024-01-01",
        token: token,
        useCdn: false,
    });

    try {
        // 3. Create Document
        await client.create({
            _type: "contactSubmission",
            name,
            email,
            message,
            submittedAt: new Date().toISOString(),
            status: "new",
        });

        return { success: true, name: name };
    } catch (error: any) {
        console.error("Sanity submission error:", error.message);
        return { success: false, message: "Something went wrong. Please try again later." };
    }
}