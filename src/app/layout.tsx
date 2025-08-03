import type { Metadata } from "next";
import { Playfair_Display, Open_Sans } from "next/font/google";
import "./globals.css";
import App from "@/components/loader"; // Import the App component from loader.tsx

// Configure fonts according to design requirements
// Modern serif for headings, clean sans-serif for body
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Brew & Bliss - Premium Coffee Experience",
  description: "Discover our premium coffee selection and enjoy a blissful experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfairDisplay.variable} ${openSans.variable} font-body bg-background text-foreground min-h-screen flex flex-col`}
      >
        <App>{children}</App>
      </body>
    </html>
  );
}
