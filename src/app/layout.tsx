import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { SessionProvider } from "next-auth/react";

import { signIn, signOut, auth } from "@/auth";

import UserButton from "./components/UserButton";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatGPT App",
  description: "ChatGPT in NextJs",
};

export default async function RootLayout({
                                           children,
                                         }: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (session?.user) {
    // TODO: Look into https://react.dev/reference/react/experimental_taintObjectReference
    // filter out sensitive data before passing to client.
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
  }

  return (
    <SessionProvider basePath="/api/auth" session={session}>
      <html lang="en">
        <body className={`${inter.className}`}>
        <header className="flex text-white bg-slate-500 text-xl pl-2 pr-2 drop-shadow-md mb-1">
          <div className="flex flex-grow items-center">
              <Link href="/">Home</Link>
              <Link href="/about" className="ml-8 font-light">
                About
              </Link>
            </div>
            <div>
              <UserButton
                onSignIn={async () => {
                  "use server";
                  await signIn();
                }}
                onSignOut={async () => {
                  "use server";
                  await signOut();
                }}
              />
            </div>
          </header>
          <div className="flex flex-col md:flex-row">
            <div className="flex-grow p-2">{children}</div>
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}
