import { setRequestLocale } from 'next-intl/server';
import Page from '@/app/home/about/page';

export const dynamic = 'force-static';

export default async function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  // ตั้งค่า locale โดยใช้ setRequestLocale
  setRequestLocale(locale);
  return (
    <div>
      <Page />
    </div>
  );
}