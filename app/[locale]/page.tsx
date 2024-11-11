// app/[locale]/page.tsx
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations();
  return (
    <main>
      {/* ลิ้งค์ไปหน้าพวกนี้ไม่ได้ เพราะไม่มี /th และ /en */}
  
      <h1>{t("greeting")}</h1>
      <p>{t("welcome")}</p>
    </main>
  );
}
