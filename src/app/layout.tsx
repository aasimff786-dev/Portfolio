import type { Metadata } from "next";
import { Poppins, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { BASE_URL, OG_IMAGE } from "@/lib/constants";
import LenisWrapper from "@/providers/lenis-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import FooterSection from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import StructuredData from "@/components/common/structured-data";
import Analytics from "@/components/common/analytics";
import ConsoleLog from "@/components/common/console-log";
import CustomCursor from "@/components/ui/custom-cursor";
import WhatsAppButton from "@/components/common/whatsapp-button";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Mohd Aasim - Video Editor, Motion Designer & Graphic Designer",
    template: "%s | Mohd Aasim",
  },
  description:
    "Portfolio of Mohd Aasim — a Video Editor, Motion Designer and Graphic Designer from Modinagar, crafting brand films, social reels, and cinematic edits with technical precision.",
  keywords: [
    "Video Editor",
    "Motion Designer",
    "Motion Graphics",
    "Graphic Designer",
    "Video Editing",
    "Brand Films",
    "Social Reels",
    "Cinematic Editing",
    "Visual Storytelling",
    "Modinagar",
  ],
  authors: [{ name: "Mohd Aasim" }],
  creator: "Mohd Aasim",
  publisher: "Mohd Aasim",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    title: "Mohd Aasim - Video Editor, Motion Designer & Graphic Designer",
    description:
      "Explore a portfolio featuring brand films, social reels, and motion graphics that turn raw footage into stories worth watching.",
    siteName: "Mohd Aasim",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Portfolio preview",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohd Aasim - Video Editor, Motion Designer & Graphic Designer",
    description:
      "Explore a portfolio featuring brand films, social reels, and motion graphics that turn raw footage into stories worth watching.",
    creator: "@mohdaasim",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Portfolio preview",
      },
    ],
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
  icons: {
    icon: [
      { url: "/icon" },
      { url: "/md-red-logo.svg", type: "image/svg+xml" },
    ],
    shortcut: "/md-red-logo.svg",
    apple: "/md-red-logo.svg",
  },
  manifest: "/manifest.webmanifest",
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  alternates: {
    canonical: BASE_URL,
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // suppressHydrationWarning: next-themes adds the `class="dark"` +
  // `color-scheme` style to <html> on the client, which the server can't know
  // about — this tells React to ignore that expected attribute mismatch.
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          The hero video (/hv.webm) is eagerly buffered by its own
          <video preload="auto" fetchpriority="high"> in AboutMe. We intentionally
          do NOT use <link rel="preload" as="video"> — browsers reject "video" as
          an unsupported `as` value, which is what triggered the console warning.
        */}

        {/* Warm up Vimeo connections early so ShowReel iframes load faster */}
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="preconnect" href="https://i.vimeocdn.com" />
        <link rel="preconnect" href="https://f.vimeocdn.com" />

        {/* ImageKit serves the 47 AboutScrollSection frames (crossOrigin) */}
        <link
          rel="preconnect"
          href="https://ik.imagekit.io"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://ik.imagekit.io" />

        <StructuredData />
        <Analytics />
      </head>
      <body
        className={`${poppins.variable} ${cormorantGaramond.variable} antialiased  mx-auto `}
      >
        <CustomCursor />
        <ConsoleLog />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LenisWrapper>
            <Navbar />
            {children}
            <FooterSection />
            {/* <FloatingDockDemo /> */}
          </LenisWrapper>
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
