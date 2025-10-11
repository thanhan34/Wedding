import type { Metadata } from "next";
import { Great_Vibes, Cormorant_Garamond, Inter, Dancing_Script, Lora, Abril_Fatface } from "next/font/google";
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

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const abrilFatface = Abril_Fatface({
  variable: "--font-abril-fatface",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thanh An 💞 Thanh Ngân Wedding - Kính mời {GuestInfo.title}",
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
        className={`${greatVibes.variable} ${cormorantGaramond.variable} ${inter.variable} ${dancingScript.variable} ${lora.variable} ${abrilFatface.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
