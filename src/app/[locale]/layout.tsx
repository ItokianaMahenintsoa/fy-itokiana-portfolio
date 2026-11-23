import { Outfit } from "next/font/google";
import ".././globals.css";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { SkipLink } from "@/components/layout/SkipLink";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-outfit",
  display: "swap",
});

export async function generateMetadata() {
  const t = await getTranslations("Metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={outfit.variable}>
      <body className="antialiased">
        <NextIntlClientProvider>
          <MotionProvider>
            <SkipLink />
            <main id="content">{children}</main>
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
