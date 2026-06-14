import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsappFloat } from "@/components/WhatsappFloat";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-poppins" });

export const metadata: Metadata = {
  title: "Jelajah Nusantara | Tour & Travel Indonesia",
  description: "Jelajahi keindahan Indonesia bersama kami. Paket tour Bali, Labuan Bajo, Bromo, Raja Ampat dengan harga terjamin.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} font-body bg-white text-navy antialiased`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsappFloat />
      </body>
    </html>
  );
}
