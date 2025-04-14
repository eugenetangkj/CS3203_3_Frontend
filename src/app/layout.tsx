import type { Metadata } from "next"
import { Afacad, Kavoon } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/common/navigation/Navbar"
import Footer from "@/components/common/navigation/Footer"
import { Toaster } from "@/components/ui/toaster"


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
    description: "A platform that aggregates online complaints from social media platforms to inform the decision-making process of authorities.",
    
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode}>) {
    return (
        <html lang="en">
            <body className={`${afacadFont.variable} ${kavoonFont.variable} antialiased min-h-screen flex flex-col`}>
				<Navbar />
				<div className='flex-grow flex flex-col' >
					{children}
				</div>
				<Footer />
				<Toaster />
        	</body>
        </html>
  );
}
