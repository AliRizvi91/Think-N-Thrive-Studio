import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Jost, Ballet } from "@/components/pocket/fontData/Font";
import ClientLayout from "@/components/main/ClientLayout";

// SEO metadata
export const metadata: Metadata = {
  title: "Think N Thrive Academy",
  description: "Think N Thrive Academy offers quality education and training programs to help students excel in academics and career development.",
  keywords: ["Education", "Academy", "Learning", "Courses", "Training", "Online Education", "Think N Thrive"],
  authors: [{ name: "Think N Thrive Academy", url: "https://res.cloudinary.com/dkbz23qyt/image/upload/v1765695865/2_hrzvym.jpg" }],
  creator: "Think N Thrive Academy",
  publisher: "Think N Thrive Academy",
  openGraph: {
    title: "Think N Thrive Academy",
    description: "Quality education and training programs for students and professionals.",
    url: "https://res.cloudinary.com/dkbz23qyt/image/upload/v1765695865/2_hrzvym.jpg",
    siteName: "Think N Thrive Academy",
    images: [
      {
        url: "https://res.cloudinary.com/dkbz23qyt/image/upload/v1765695865/2_hrzvym.jpg",
        width: 1200,
        height: 630,
        alt: "Think N Thrive Academy Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Think N Thrive Academy",
    description: "Quality education and training programs for students and professionals.",
    creator: "@ThinkNThrive",
    images: ["https://res.cloudinary.com/dkbz23qyt/image/upload/v1765695865/2_hrzvym.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${Jost.variable} ${Ballet.variable} overflow-x-hidden bg-white`}
    >
      <body className={Jost.className}>
        <ClientLayout>
          {children}
        </ClientLayout>

        {/* Structured data for Education Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Think N Thrive Academy",
              "url": "https://res.cloudinary.com/dkbz23qyt/image/upload/v1765695865/2_hrzvym.jpg",
              "logo": "https://res.cloudinary.com/dkbz23qyt/image/upload/v1766301924/Logo_l4h8n0.png",
              "sameAs": [
                "https://www.facebook.com/youracademy",
                "https://twitter.com/ThinkNThrive",
                "https://www.linkedin.com/company/thinknthriveacademy"
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Main Street",
                "addressLocality": "City",
                "addressRegion": "State",
                "postalCode": "12345",
                "addressCountry": "Country"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-123-456-7890",
                "contactType": "customer support",
                "email": "info@youracademy.com"
              }
            }),
          }}
        />
      </body>
    </html>
  );
}
