// app/[lang]/(with-nav-footer)/layout.tsx
import Footer from "@/components/main/Footer";
import Navbar from "@/components/main/Navbar";
import type { Metadata } from "next";

interface WithNavFooterLayoutProps {
  children: React.ReactNode;
}

// ✅ Optional: default metadata for all pages using this layout
export const metadata: Metadata = {
  title: {
    default: "Raza Tech Solution",
    template: "%s | Raza Tech Solution",
  },
  description:
    "Explore Raza Tech Solution — personal portfolio showcasing web design and development expertise.",
  openGraph: {
    title: "Raza Tech Solution",
    description:
      "Explore Raza Tech Solution — personal portfolio showcasing web design and development expertise.",
    images: ["/opengraph-image.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raza Tech Solution",
    description:
      "Explore Raza Tech Solution — personal portfolio showcasing web design and development expertise.",
    images: ["/opengraph-image.jpg"],
  },
};

export default function WithNavFooterLayout({
  children,
}: WithNavFooterLayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
