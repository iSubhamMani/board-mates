import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import ProviderWrapper from "./Provider";
import { Toaster } from "react-hot-toast";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: "Scribble",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ProviderWrapper>
        <body className={`${rubik.className} antialiased`}>
          <Toaster />
          {children}
        </body>
      </ProviderWrapper>
    </html>
  );
}
