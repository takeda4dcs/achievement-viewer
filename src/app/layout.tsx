import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_TITLE,
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
  icons: {
    icon: "resources/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const chainNameForCssClass = process.env.NEXT_PUBLIC_CHAIN!.replaceAll(" ", "-").toLowerCase();
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className={chainNameForCssClass}>{children}</div>
      </body>
    </html>
  );
}
