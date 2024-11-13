// Error: setRequestLocale is not defined
// app/[locale]/layout.tsx

// import { NextIntlClientProvider } from "next-intl";
// import { ReactNode } from "react";
// import Header from "../components/layout/home/Header";
// import { HeaderHome } from "../components/home/header";
// import Part8 from "../components/home/part8";

// export const dynamic = 'force-static';

// export default async function LocaleLayout({
//   children,
//   params: { locale },
// }: {
//   children: ReactNode;
//   params: { locale: string };
// }) {
//   const messages = (await import(`../../messages/${locale}.json`)).default;

//   return (
//     <NextIntlClientProvider locale={locale} messages={messages}>
//       <HeaderHome locale={locale} />
//       {children}
//       <Part8 locale={locale} />
//     </NextIntlClientProvider>
//   );
// }

import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import { HeaderHome } from "../components/home/header";


export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    // Fallback ถ้าไม่มี locale ที่ถูกต้อง
    messages = (await import('../../messages/th.json')).default;
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <HeaderHome locale={locale} />
      {children}
    </NextIntlClientProvider>
  );
}