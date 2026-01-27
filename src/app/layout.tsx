import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/lib/smooth-scroll";
import CustomCursor from "@/lib/custom-cursor";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ramy Esam | Frontend Developer",
  description: "Portfolio of Ramy Esam — A passionate Frontend Developer specializing in React, Next.js, and modern UI/UX design.",
  keywords: ["Frontend Developer", "Next.js", "React", "Portfolio", "Web Development", "UI/UX", "Ramy Esam"],
  authors: [{ name: "Ramy Esam" }],
  openGraph: {
    title: "Ramy Esam | Frontend Developer",
    description: "Building beautiful, interactive, and performant web experiences.",
    url: "https://ramy-esam-portfolio.vercel.app", // Replace with actual URL when deployed
    siteName: "Ramy Esam Portfolio",
    images: [
      {
        url: "/images/og-image.jpg", // Needs to be added to public/images/
        width: 1200,
        height: 630,
        alt: "Ramy Esam Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ramy Esam | Frontend Developer",
    description: "Building beautiful, interactive, and performant web experiences.",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: "/icons/code.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CustomCursor />
        <Navbar />
        <SmoothScroll>
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
