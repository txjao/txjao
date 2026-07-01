import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { ThemeProvider } from "@/src/components/providers/theme-provider";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  weight: ["700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'João "Tx" Teixeira',
  description: "Full-stack software engineer portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white-secondary text-black transition-colors dark:bg-black dark:text-white">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
