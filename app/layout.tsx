import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import BottomNavbar from "../components/BottomNavbar";
import { StoreProvider } from "@/context/StoreContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DOMINO - Artisanal Grace, Absolute Honesty",
  description: "Heritage minimalism and pure craftsmanship in every creation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="pb-[70px] md:pb-0">
        <StoreProvider>
          <Header />
          {children}
          <BottomNavbar />
        </StoreProvider>
      </body>
    </html>
  );
}
