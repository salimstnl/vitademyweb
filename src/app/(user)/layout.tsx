import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
// import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vitademy",
  description: "The greatest space to ask.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/public/logo-small.png", // Path to your light mode icon
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/public/logo-small.png", // Path to your dark mode icon
      },
    ],
  },
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {/* <ClerkProvider> */}
      <html lang="en" className={inter.className}>
        <body>
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
      {/* </ClerkProvider> */}
    </ThemeProvider>
  );
}
