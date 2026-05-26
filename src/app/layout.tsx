import type { Metadata } from "next";
import { getMessages } from 'next-intl/server';
import "./globals.css";
import Header from "@/components/LayoutHeader";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/components/AuthProvider";
import CookieConsent from "@/components/CookieConsent";
import ClientLocaleProvider from "@/components/ClientLocaleProvider";

export const metadata: Metadata = {
  title: "China Compliance Self-Check | SinoTrade Compliance",
  description: "Check if your product needs GACC registration, CCC certification, or NMPA filing for export to China.",
  icons: {
    icon: 'https://sinotradecompliance.com/favicon.ico',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages();

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <ClientLocaleProvider serverMessages={messages}>
          <AuthProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CookieConsent />
          </AuthProvider>
        </ClientLocaleProvider>
      </body>
    </html>
  );
}
