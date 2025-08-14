import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Doar Conecta",
  description: "Conectando doadores e ONGs",
  viewport: "width=device-width, initial-scale=1.0",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Doar Conecta",
    description: "Conectando doadores e ONGs",
    url: "https://seusite.com",
    siteName: "Doar Conecta",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "Doar Conecta",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Doar Conecta",
    description: "Conectando doadores e ONGs",
    images: ["/banner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
