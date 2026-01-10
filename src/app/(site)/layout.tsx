import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { client } from "@/sanity/client";
import MobileDonateFab from "@/components/MobileDonateFab/MobileDonateFab";

export const revalidate = 60; // Revalidate every 60 seconds


async function getLayoutData() {
  const query = `{
    "navbar": *[_type == "navbar"][0]{
      ...,
      topLinks[]{
        ...,
        targetSection->{
          heading,
          _type
        }
      },
      mainLinks[]{
        ...,
        targetSection->{
          heading,
          _type
        }
      },
      bankDetails {
        ...,
        qrCode {
          asset->
        }
      }
    },
    "footer": *[_type == "footer"][0]{
      ...,
      sections[]{
        ...,
        links[]{
          ...,
          targetPage->{
            "slug": slug.current,
            _type
          }
        }
      }
    }
  }`;
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Layout fetch error:", error);
    return { navbar: null, footer: null };
  }
}

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { navbar, footer } = await getLayoutData();

  return (
    <>
      <Navbar data={navbar} />
      {children}
      <Footer data={footer} />
      <MobileDonateFab bankDetails={navbar?.bankDetails} cta={navbar?.cta} />
    </>
  );
}
