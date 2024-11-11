// app/[locale]/layout.tsx
//  Error: This component must be used inside a <RecoilRoot> component.

import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import Header from "../components/layout/home/Header";
import { HeaderHome } from "../components/home/header";
import Part8 from "../components/home/part8";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
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
