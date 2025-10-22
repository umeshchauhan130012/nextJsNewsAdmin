import WebsiteMainLayout from "./components/websiteMainLayout";
import "./globals.css";
import { Noto_Sans_Devanagari } from 'next/font/google';

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata = {
  title: "Breaking News in Hindi",
  description: "At Breaking News in Hindi, we deliver cutting-edge software solutions that drive innovation and growth. From intuitive mobile apps to powerful web platforms and enterprise systems, we build reliable, scalable, and secure software tailored to your unique needs.",
  keywords: ["nextjs", "seo", "web development", "your keyword"],
  authors: [{ name: "Trioford", url: "https://trioford-new-website.vercel.app/" }],
  creator: "Trioford",
  publisher: "Trioford",
  openGraph: {
    type: "website",
    url: "https://trioford-new-website.vercel.app/",
    title: "Trioford",
    description:
      "This is the best website for ... (social sharing description)",
    siteName: "My Website",
    images: [
      {
        url: "https://trioford-new-website.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "My Website Preview",
      },
    ],
    locale: "en_US",
  },

  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "My Website Title",
    description: "This is the best website for ... (Twitter preview text)",
    creator: "@yourtwitter",
    images: ["https://trioford-new-website.vercel.app/twitter-image.jpg"],
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  // Canonical URL
  alternates: {
    canonical: "https://trioford-new-website.vercel.app",
  },
  // Robots 
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // MetadataBase
  metadataBase: new URL("https://trioford-new-website.vercel.app"),
};


export default function WebsiteLayout({ children }) {
  return (
    <html lang="en">
      <body className={notoSansDevanagari.className}>
        <WebsiteMainLayout>
          {children}
        </WebsiteMainLayout>
      </body>
    </html>
  );
}
