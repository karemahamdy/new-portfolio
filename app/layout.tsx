import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Karema Hamdy — Senior Frontend Developer | React & Vue Expert",
  description:
    "Senior Frontend Developer based in Cairo with 3+ years building ERP, SaaS & CMS applications using React, Vue, Next.js, and Nuxt.js.",
  keywords: [
    "Karema Hamdy",
    "Senior Frontend Developer",
    "React Developer",
    "Vue Developer",
    "Next.js",
    "Nuxt.js",
    "ERP Systems",
    "Cairo Egypt",
    "TypeScript",
    "Frontend Engineer",
  ],
  authors: [{ name: "Karema Hamdy Soliman", url: "https://github.com/karemahamdy" }],
  creator: "Karema Hamdy Soliman",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Karema Hamdy — Senior Frontend Developer",
    description:
      "Senior Frontend Developer based in Cairo with 3+ years building ERP, SaaS & CMS applications using React, Vue, Next.js, and Nuxt.js.",
    siteName: "Karema Hamdy Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karema Hamdy — Senior Frontend Developer",
    description:
      "Senior Frontend Developer based in Cairo with 3+ years building ERP, SaaS & CMS applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Karema Hamdy Soliman",
  jobTitle: "Senior Frontend Developer",
  email: "karemahamdy51@gmail.com",
  telephone: "+201062340027",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cairo",
    addressCountry: "EG",
  },
  url: "https://github.com/karemahamdy",
  sameAs: [
    "https://github.com/karemahamdy",
    "https://linkedin.com/in/karema-hamdy2010",
  ],
  knowsAbout: [
    "React.js",
    "Vue.js",
    "Next.js",
    "Nuxt.js",
    "TypeScript",
    "Frontend Development",
    "ERP Systems",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
