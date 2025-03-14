import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({ weight: "400", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Calculator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} touch-none bg-black`}>
        {children}
      </body>
    </html>
  );
}
