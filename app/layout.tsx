import type { Metadata } from "next";
import { Nunito, Space_Grotesk } from "next/font/google";

import { LenisProvider } from "@/components/lenis-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export const metadata: Metadata = {
  metadataBase: new URL("https://reawen.xyz"),
  title: "reawen.xyz",
  description: "AI sosyal deneyimler, tatlı animasyonlar ve paylaşılabilir sonuç kartları için Vercel hazır platform.",
  applicationName: "reawen.xyz",
  openGraph: {
    title: "reawen.xyz",
    description: "AI sosyal deneyimler platformu",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "reawen.xyz",
    description: "AI sosyal deneyimler platformu"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${nunito.variable} bg-slate-950 text-white antialiased`}>
        <LenisProvider>
          <div className="min-h-dvh overflow-hidden">
            <SiteHeader />
            {children}
            <SiteFooter />
          </div>
        </LenisProvider>
      </body>
    </html>
  );
}