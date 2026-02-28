import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WikiAgent - AI-Powered Wikipedia Q&A",
  description: "Ask factual questions and get AI-generated answers sourced from Wikipedia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
