import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roots n Horizon | Empowering Communities",
  description: "Join us in making a difference.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}