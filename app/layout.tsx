import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script"; // Import this
import "./globals.css";
import "./chat-fix.css"; // Add this line
import ChatAgent from "@/components/dashboard/ChatAgent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Garden System",
  description: "Monitor and control your garden remotely",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}

        {/* Recomi Chat Agent - NEW METHOD */}
       <ChatAgent />
      </body>
    </html>
  );
}
