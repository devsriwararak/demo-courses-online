'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ReportPage = () => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("login");
    if (!token) {
      router.push("/"); // Redirect ไปที่หน้า login ถ้าไม่มี token
    } else {
      setIsAuthorized(true); // ตั้งค่า state ให้แสดงเนื้อหาถูกต้อง
    }
  }, [router]);

  if (!isAuthorized) {
    return null; // ไม่แสดงเนื้อหาก่อนตรวจสอบสิทธิ์เสร็จสิ้น
  }
  return (
    <div>Report Page</div>
  )
}

export default ReportPage