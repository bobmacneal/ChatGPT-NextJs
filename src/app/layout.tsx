import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChatGPT App",
  description: "ChatGPT in NextJs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="text-white font-bold bg-slate-500 text-xl p-2">
          <div className="flex flex-grow">
            <Link href="/">ChatGPT</Link>
            <Link href="/about" className="ml-5 font-light">About</Link>
          </div>
          <div/>
        </header>
        <div className="flex flex-col md:flex-row p-2">
          <div className="flex-grow">{children}</div>
        </div>
      </body>
    </html>
  );
}
