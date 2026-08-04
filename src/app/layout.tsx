import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rootsnhorizon.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Roots & Horizon | Empowering Communities & Restoring Hope",
    template: "%s | Roots & Horizon",
  },
  description: "Roots & Horizon is a global non-profit organization dedicated to empowering displaced and marginalized communities through emergency relief, education, healthcare, and sustainable development.",
  keywords: ["Roots & Horizon", "NGO", "Non-profit", "Humanitarian Aid", "Community Empowerment", "Refugee Support", "Emergency Relief"],
  authors: [{ name: "Roots & Horizon Team" }],
  creator: "Roots & Horizon",
  publisher: "Roots & Horizon",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Roots & Horizon | Empowering Communities & Restoring Hope",
    description: "Roots & Horizon is a global non-profit organization dedicated to empowering displaced and marginalized communities.",
    siteName: "Roots & Horizon",
    images: [
      {
        url: `${siteUrl}/icon.png`,
        width: 1200,
        height: 630,
        alt: "Roots & Horizon Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Roots & Horizon | Empowering Communities & Restoring Hope",
    description: "Roots & Horizon is a global non-profit organization dedicated to empowering displaced and marginalized communities.",
    images: [`${siteUrl}/icon.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "name": "Roots & Horizon",
  "url": siteUrl,
  "logo": `${siteUrl}/icon.png`,
  "description": "A global non-profit organization dedicated to empowering displaced and marginalized communities.",
  "sameAs": [
    "https://facebook.com/rootsnhorizon",
    "https://twitter.com/rootsnhorizon",
    "https://instagram.com/rootsnhorizon"
  ]
};

import ProgressBarProvider from "@/components/Providers/ProgressBarProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`antialiased`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <ProgressBarProvider>
              {children}
            </ProgressBarProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      )}
    </html>
  );
}