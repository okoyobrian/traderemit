import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StytchProvider from "./components/StychProvider";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cowrie",
  description: "The best way to import goods from China",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StytchProvider>
      <html lang="en">
        <body
          className={`${inter.variable} antialiased`}
        >    
          {children}
          <Analytics />
        </body>
      </html>
    </StytchProvider>
  );
}
