import "@styles/globals.css";

import { siteConfig } from "@config/site";
import { GeistSans } from "geist/font/sans";

import Link from "next/link";

import { cn } from "@lib/utils";
import { marketingConfig } from "@config/marketing";

import { SiteFooter } from "@components/navigation/SiteFooter";
import { MainNav } from "@/components/navigation/MainNav";
import { buttonVariants } from "@/components/ui/Button";

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
          GeistSans.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header className="container z-40 bg-background">
            <div className="flex h-20 items-center justify-between py-6">
              <MainNav items={marketingConfig.mainNav} />
              <nav>
                <Link
                  href="/explore"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "sm" }),
                    "px-4"
                  )}
                >
                  {/**
                   * #TODO: Make this into a component that changes depending on the page
                   * Once "Start exploring"
                   * Once "Github star"
                   */}
                  Start exploring
                </Link>
              </nav>
            </div>
          </header>

          {children}
          <SiteFooter />

          <Analytics />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
