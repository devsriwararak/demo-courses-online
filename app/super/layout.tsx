'use client'
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from "next/navigation";
import LayoutContent from "../components/layout/layoutContent";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const router = useRouter();

    const checkAuthorization = useCallback(() => {
        const token = localStorage.getItem("login");
        const loginStatus = localStorage.getItem("Status");
        if (!token && loginStatus !== "2") {
            router.push("/"); // Redirect ไปที่หน้า login ถ้าไม่มี token
        } else {
            setIsAuthorized(true); // ตั้งค่า state ให้แสดงเนื้อหาถูกต้อง
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router]);

    useEffect(() => {
        checkAuthorization();
    }, [checkAuthorization]);

    if (!isAuthorized) {
        return null; // ไม่แสดงเนื้อหาก่อนตรวจสอบสิทธิ์เสร็จสิ้น
    }

    return <LayoutContent>{children}</LayoutContent>;
};

export default Layout;
