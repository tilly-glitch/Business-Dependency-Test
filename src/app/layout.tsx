import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const SITE_URL = "https://dependency.efficiencyintegration.com";
const TITLE = "The Business Dependency Test — Efficiency Integration";
const DESCRIPTION =
  "In 90 seconds, see how dependent your business is on your good days, what your crashes are really costing you, and what to fix first. Built for women with autoimmune conditions.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Efficiency Integration",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=3853078938328170&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body
        className="min-h-full flex flex-col"
        style={{
          background: "linear-gradient(135deg, #11114e 0%, #1a1a70 100%)",
          backgroundAttachment: "fixed",
          color: "#ffffff",
          minHeight: "100vh",
        }}
      >
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '3853078938328170');
          fbq('track', 'PageView');`}
        </Script>
        {children}
      </body>
    </html>
  );
}
