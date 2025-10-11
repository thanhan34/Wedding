import type { Metadata } from "next";
import { Great_Vibes, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "../components/ui/sonner";

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thanh An 💞 Thanh Ngân- Wedding",
  description: "Trang web đám cưới của Thanh An và Thanh Ngân. Xem thông tin sự kiện, RSVP, và gửi lời chúc mừng.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${greatVibes.variable} ${cormorantGaramond.variable} ${inter.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
