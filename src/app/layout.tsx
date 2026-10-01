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
  title: "Portfolio Template | Professionnel & Créatif",
  description:
    "Template de portfolio universel et moderne pour présenter vos projets, compétences, parcours et contact quel que soit votre domaine d'activité.",
  keywords: [
    "portfolio template",
    "portfolio universel",
    "portfolio professionnel",
    "cv en ligne",
    "freelance",
    "créatif",
    "template Next.js",
  ],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Portfolio Template | Professionnel & Créatif",
    description:
      "Template de portfolio universel pour présenter n'importe quel profil professionnel.",
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
