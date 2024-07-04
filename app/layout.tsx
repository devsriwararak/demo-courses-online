// RootLayout.tsx
import { Inter } from "next/font/google";
import "./globals.css";
import RecoilProvider from "./recoilProvider";  // นำเข้า RecoilProvider

const inter = Inter({ subsets: ["latin"] });

import type { Metadata } from "next";
// import RemoveToken from "./removeToken"

export const metadata: Metadata = {
  title: "ระบบคอร์สเรียน(เฉพาะธุรกิจ)",
  // description: "aaaaaa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilProvider> {/* ใช้ RecoilProvider */}
          {children}
        </RecoilProvider>
      </body>
    </html>
  );
}
