import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { cn } from "@ark-market/ui";
import { Toaster as Sonner } from "@ark-market/ui/sonner";
import { Toaster } from "@ark-market/ui/toaster";

import SiteHeader from "~/components/site-header";

import "~/app/globals.css";

import type { PropsWithChildren } from "react";

import ConnectWalletDialog from "~/components/connect-wallet-dialog";
import CustomFonts from "~/components/custom-fonts";
import DataFooter from "~/components/data-footer";
import Footer from "~/components/footer";
import Providers from "~/components/providers";
import UnframedFooter from "~/components/unframed-footer";
import { env } from "~/env";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://market.arkproject.dev"
      : "http://localhost:3000",
  ),
  title: env.NEXT_PUBLIC_THEME === "unframed" ? "Unframed" : "Ark Market",
  description:
    env.NEXT_PUBLIC_THEME === "unframed"
      ? "Buy and sell NFTs on Starknet"
      : "Simple monorepo with starknet marketplace",
  openGraph: {
    title: env.NEXT_PUBLIC_THEME === "unframed" ? "Unframed" : "Ark Market",
    description:
      env.NEXT_PUBLIC_THEME === "unframed"
        ? "Buy and sell NFTs on Starknet"
        : "Simple monorepo with starknet marketplace",
    url: "https://market.arkproject.dev",
    siteName: env.NEXT_PUBLIC_THEME === "unframed" ? "Unframed" : "Ark Market",
  },
  twitter: {
    card: "summary_large_image",
    site: "@ArkProjectNFTs",
    creator: "@ArkProjectNFTs",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-sans",
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={env.NEXT_PUBLIC_THEME === "unframed" ? "unframed" : undefined}
    >
      <body
        className={cn(
          "min-h-screen overscroll-y-none bg-background font-sans text-foreground antialiased lg:pb-10",
          inter.variable,
        )}
      >
        <CustomFonts />
        <Providers>
          <div className="flex-col md:flex">
            <SiteHeader />
            {children}
            <SpeedInsights />
          </div>
          {env.NEXT_PUBLIC_THEME === "unframed" ? (
            <UnframedFooter />
          ) : (
            <Footer />
          )}
          <DataFooter className="fixed bottom-0 hidden w-full lg:flex" />
          <Toaster />
          <Sonner richColors />
          <ConnectWalletDialog />
        </Providers>
      </body>
    </html>
  );
}
