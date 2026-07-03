import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Poppins } from "next/font/google";
import { ThemeProvider } from "@/src/providers/theme-provider";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/src/consts/language.consts";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/src/consts/site.consts";
import { isLocale } from "@/src/utils/is-locale";
import "../globals.css";
import { Header } from "@/src/components/header/header";

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

const languageAlternates = SUPPORTED_LOCALES.reduce<Record<string, string>>(
  (alternates, locale) => ({
    ...alternates,
    [locale]: `/${locale}`,
  }),
  { "x-default": `/${DEFAULT_LOCALE}` },
);

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>): Promise<Metadata> {
  const { locale } = await params;
  const canonicalLocale = isLocale(locale) ? locale : DEFAULT_LOCALE;

  return {
    metadataBase: new URL(SITE_URL),
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    alternates: {
      canonical: `/${canonicalLocale}`,
      languages: languageAlternates,
    },
  };
}

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white-secondary text-black transition-colors dark:bg-black dark:text-white">
        <ThemeProvider>
          <Header locale={locale} />
          <main>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
