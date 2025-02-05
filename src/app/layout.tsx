import type { Metadata } from "next";
import { Afacad, Kavoon } from "next/font/google";
import "./globals.css";

const afacadFont = Afacad({
  variable: "--font-afacad",
  subsets: ["latin"],
});

const kavoonFont = Kavoon({
  variable: "--font-kavoon",
  subsets: ["latin"],
  weight: ["400"]
});

export const metadata: Metadata = {
  title: "Just Yap!",
  description: "A platform that aggregates online feedback from social media platforms to inform the decision-making process of authorities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${afacadFont.variable} ${kavoonFont.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
