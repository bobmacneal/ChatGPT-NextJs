import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { SessionProvider } from "@/app/components/SessionProvider";
import UserButton from "@/app/components/UserButton";


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
    <SessionProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <header className="flex text-white font-bold bg-slate-500 text-xl pl-2 pr-1">
            <div className="flex flex-grow items-center">
              <Link href="/">ChatGPT</Link>
              <Link href="/about" className="ml-5 font-light">About</Link>
            </div>
            <div><UserButton /></div>
          </header>
          <div className="flex flex-col md:flex-row p-2">
            <div className="flex-grow">{children}</div>
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}
