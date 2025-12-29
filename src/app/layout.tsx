import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { client } from "@/sanity/client";

export const metadata: Metadata = {
  title: "Roots & Horizon - Empowering Communities",
  description: "Join us in making a difference.",
};

async function getLayoutData() {
  const query = `{
    "navbar": *[_type == "navbar"][0],
    "footer": *[_type == "footer"][0]
  }`;
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Layout fetch error:", error);
    return { navbar: null, footer: null };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { navbar, footer } = await getLayoutData();

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Navbar data={navbar} />
        {children}
        <Footer data={footer} />
      </body>
    </html>
  );
}