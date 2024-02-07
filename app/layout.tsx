import "@styles/globals.css";

import { siteConfig } from "@config/site";
import { GeistSans } from "geist/font/sans";

import { cn } from "@lib/utils";
import { marketingConfig } from "@config/marketing";
import { Web3ModalProvider } from "@components/Web3ModalProvider";

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
      url: "#",
    },
  ],
  creator: "crazyrabbitLTC",
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
          "min-h-screen font-sans antialiased bg-[#f1eefc] dark:bg-[#0f0c1b] transition-colors duration-200 ease-in-out",
          GeistSans.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Web3ModalProvider>
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
          </Web3ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
