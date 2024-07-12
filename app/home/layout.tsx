'use client'
import { useEffect } from "react";
import { FooterHome } from "../components/home/footer";
import { HeaderHome } from "../components/home/header";
export default function Layout({ children }: { children: React.ReactNode }) {

    useEffect(() => {
        if (typeof window !== "undefined") {
          // Access sessionStorage here
          const storedValue = sessionStorage.getItem("key");
          console.log(storedValue);
        }
      }, []);
      
  return (
    <div className=" flex flex-col min-h-screen ">
      <div className=" sticky top-0 z-50">
        <HeaderHome />
      </div>
      <div>
      {children}
      </div>
      <FooterHome />
    </div>
  );
}
