import type { Metadata } from "next";
import { Inter, Raleway, Syne } from "next/font/google";
import "./globals.css";
import UtilityBar from "./components/layout/UtilityBar";
import Navbar from "./components/layout/navbar";
import Newsletter from "./components/layout/Newsletter";
import Footer from "./components/layout/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Algo Vision - Digital Solutions for Growing Businesses",
  description: "Strategic IT solutions and digital transformation services that deliver measurable results for growing enterprises.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${raleway.variable} ${syne.variable} antialiased`}
      >
        <UtilityBar />
        <Navbar />
        {children}
        <Newsletter />
        <Footer />
      </body>
    </html>
  );
}
