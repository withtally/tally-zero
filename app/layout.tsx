import "@styles/globals.css";

import { siteConfig } from "@/config/site";

import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";

import { cn } from "@lib/utils";

import { Analytics } from "@components/Analytics";
import { TailwindIndicator } from "@/components/TailwindIndicator";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["Tally Zero", "TallyZero", "Tally"],
  authors: [
    {
      name: "crazyrabbitLTC",
      url: "https://www.findmalek.com",
    },
  ],
  creator: "crazyrabbitLTC",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@crazyrabbitLTC",
  },
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon-16x16.png",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Analytics />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
