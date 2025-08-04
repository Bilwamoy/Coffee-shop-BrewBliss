import type { Metadata } from "next";
import { Cinzel_Decorative, Open_Sans } from "next/font/google";
import "./globals.css";
import App from "@/components/loader"; // Import the App component from loader.tsx
import { ClientProviders } from "@/contexts/ClientProviders";
import GlobalClientComponents from "@/components/layout/GlobalClientComponents";

// Configure fonts according to design requirements
// Modern serif for headings, clean sans-serif for body
const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "700", "900"],
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
        className={`${cinzelDecorative.variable} ${openSans.variable} font-body bg-background text-foreground min-h-screen flex flex-col`}
      >
        <ClientProviders>
          <App>{children}</App>
        </ClientProviders>
        <GlobalClientComponents />
      </body>
    </html>
  );
}
