// layouts/AdminLayout.tsx
"use client";
import { useEffect, useState, ReactNode, useCallback } from "react";

import { useRouter } from "next/navigation";
import LayoutContent from "@/app/components/layout/layoutContent";

interface AdminLayoutProps {
  children: ReactNode;
}
const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const router = useRouter();

  const checkAuthorization = useCallback(() => {
    const token = localStorage.getItem("login");
    if (!token && sessionStorage.getItem("login") !== "admin") {
      router.push("/"); // Redirect ไปที่หน้า login ถ้าไม่มี token
    } else {
      setIsAuthorized(true); // ตั้งค่า state ให้แสดงเนื้อหาถูกต้อง
    }
  }, [router]);

  useEffect(() => {
    checkAuthorization();
  }, [checkAuthorization]);

  if (!isAuthorized) {
    return null; // ไม่แสดงเนื้อหาก่อนตรวจสอบสิทธิ์เสร็จสิ้น
  }
  return (

    <LayoutContent>{children}</LayoutContent>

  );
};

export default AdminLayout;
