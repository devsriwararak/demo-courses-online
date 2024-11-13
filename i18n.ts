// // root - i18n.ts
// import { getRequestConfig , setRequestLocale} from 'next-intl/server';


// // Parameter 'locale' implicitly has an 'any' type.
// export default getRequestConfig(async ({ locale }) => ({
//   setRequestLocale(locale);
//   messages: (await import(`./messages/${locale}.json`)).default
// }));


// // root - i18n.ts
// import { getRequestConfig, setRequestLocale } from 'next-intl/server';

// export default getRequestConfig(async ({ locale }: { locale: string }) => {
//   // ตรวจสอบว่ามี locale หรือไม่ก่อนตั้งค่า
//   if (locale) {
//     setRequestLocale(locale);
//   }

//   // โหลดไฟล์ข้อความแปลตาม locale ที่ได้รับ
//   const messages = (await import(`./messages/${locale}.json`)).default;

//   return {
//     messages
//   };
// });

import { getRequestConfig, setRequestLocale } from 'next-intl/server';

export default getRequestConfig(async ({ locale }: { locale: string }) => {
  if (locale) {
    setRequestLocale(locale);
  }

  const messages = (await import(`./messages/${locale}.json`)).default;

  return {
    messages,
  };
});

