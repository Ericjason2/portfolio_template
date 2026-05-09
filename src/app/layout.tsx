import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alex Martin | Développeur Fullstack",
  description:
    "Portfolio d'Alex Martin — Développeur Fullstack passionné par la création d'applications web modernes, performantes et accessibles.",
  keywords: [
    "développeur fullstack",
    "portfolio",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
  ],
  icons: {
    icon: "/profile.png",
  },
  openGraph: {
    title: "Alex Martin | Développeur Fullstack",
    description: "Portfolio d'un développeur fullstack passionné",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
