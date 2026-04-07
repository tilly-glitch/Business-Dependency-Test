import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Business Dependency Test — Efficiency Integration",
  description:
    "In 90 seconds, see how dependent your business is on your good days, what your crashes are really costing you, and what to fix first. Built for women with autoimmune conditions.",
  openGraph: {
    title: "The Business Dependency Test — Efficiency Integration",
    description:
      "In 90 seconds, see how dependent your business is on your good days, what your crashes are really costing you, and what to fix first. Built for women with autoimmune conditions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className="min-h-full flex flex-col"
        style={{
          background: "linear-gradient(135deg, #11114e 0%, #1a1a70 100%)",
          backgroundAttachment: "fixed",
          color: "#ffffff",
          minHeight: "100vh",
        }}
      >
        {children}
      </body>
    </html>
  );
}
