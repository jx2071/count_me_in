"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import { UserInfoProvider } from "./context/userInfoContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Count Me In",
  description: "An acitivities discovery and teaming up app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <UserInfoProvider>
        <body className={inter.className}>
          <Navbar />
          <div className="flex min-h-screen flex-col items-center justify-between p-24">
            {children}
          </div>
        </body>
      </UserInfoProvider>
    </html>
  );
}
