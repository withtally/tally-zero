import "@styles/globals.css";

import { siteConfig } from "@config/site";
import { GeistSans } from "geist/font/sans";

import { cn } from "@lib/utils";
import { marketingConfig } from "@config/marketing";

import { SiteFooter } from "@components/navigation/SiteFooter";
import { MainNav } from "@/components/navigation/MainNav";
import { ButtonNav } from "@/components/navigation/ButtonNav";
import OrderbookDrawer from "@/components/container/OrderbookDrawer";

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

import { headers } from "next/headers";

export default function RootLayout({ children }: RootLayoutProps) {
  const heads = headers();

  const pathname = heads.get("next-url");
  console.log(pathname);

  return (
    <html lang="en" suppressHydrationWarning>
      <head />

      <body
        className={cn(
          "min-h-screen font-sans antialiased bg-gradient-to-b from-transparent via-purple-200 to-purple-50 dark:bg-gradient-to-tl dark:from-transparent dark:via-purple-950 dark:to-transparent",
          GeistSans.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header className="container z-40">
            <div className="flex h-20 items-center justify-between py-6">
              <MainNav items={marketingConfig.mainNav} />

              <ButtonNav>
                <OrderbookDrawer />
              </ButtonNav>
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
