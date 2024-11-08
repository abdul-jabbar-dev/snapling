import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import RootHeader from "@/components/layouts/Headers/RootHeader";
import ReduxProvider from "@/provider/ReduxProvider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// SEO metadata tailored for Snapling
export const metadata: Metadata = {
  title: "Snapling - Powerful URL Shortening Service",
  description:
    "Snapling is your go-to link shortening service, providing quick, secure, and trackable short URLs to streamline your links and enhance accessibility.",
  keywords: [
    "Snapling",
    "URL shortener",
    "link shortening service",
    "link tracking",
    "custom short links",
    "Snapling URL",
  ],
  openGraph: {
    title: "Snapling - Secure & Fast URL Shortener",
    description:
      "Optimize your links with Snapling's advanced URL shortening and tracking features.",
    images: "/public/Icon.png", // replace with actual image path
    type: "website",
    // url: "https://yourwebsite.com",
  },
  twitter: {
    card: "summary_large_image",
    images: "/public/Icon.png", // replace with actual image path
  },
  viewport: "width=device-width, initial-scale=1.0, viewport-fit=cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="index, follow" />
        {/* <link rel="canonical" href="https://yourwebsite.com" /> */}
      </head>
      <ReduxProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <header role="banner">
            <RootHeader />
          </header>
          <main role="main">
            {children}
          </main>
          <Toaster />
          <footer role="contentinfo">
            {/* Optional footer content for additional navigation links */}
          </footer>
        </body>
      </ReduxProvider>
    </html>
  );
}
