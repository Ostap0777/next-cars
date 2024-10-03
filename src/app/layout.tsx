
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactNode } from "react";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});


export const metadata: Metadata = {
  title: "Створити Next App",
  description: "Згенеровано за допомогою create next app",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode; 
}) {
  return (
    <html lang="uk">
        <body
          className={`${geistSans.variable} ${geistMono.variable} flex flex-col items-center justify-center min-h-screen bg-cover bg-center`}
          style={{ backgroundImage: "url('/img/362262-svetik.jpg')" }}
        >
          {children}
        </body>
    </html>
  );
}
