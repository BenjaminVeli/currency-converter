import type { Metadata } from "next";
import { Bitter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const bitter = Bitter({
  variable: "--font-bitter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Currency Flow",
  description: "Aplicación para la conversión de divisas en tiempo real, compatible con 186 monedas globales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={bitter.className}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
