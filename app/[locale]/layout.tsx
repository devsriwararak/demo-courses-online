// Error: setRequestLocale is not defined

import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import Header from "../components/layout/home/Header";
import { HeaderHome } from "../components/home/header";
import Part8 from "../components/home/part8";
import { setRequestLocale } from "next-intl/server";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {

    // ใช้ setRequestLocale เพื่อเปิดใช้งาน Static Rendering
  setRequestLocale(locale);
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {/* <Header locale={locale} /> */}
      <HeaderHome locale={locale} />
      {children}
      <Part8 locale={locale} />
    </NextIntlClientProvider>
  );
}
