// import { useEffect } from "react";
import { useLocale } from "next-intl";
import { FooterHome } from "../components/home/footer";
import { HeaderHome } from "../components/home/header";
import Part8 from "../components/home/part8";
export default function Layout({ children }: { children: React.ReactNode }) {
  const locale = useLocale();

  

    // useEffect(() => {
    //     const storedValue = sessionStorage.getItem("login");
    //       console.log(storedValue);
    //   }, []);
      
  return (
    <div className=" flex flex-col min-h-screen bg-gray-100  ">
      <div className=" sticky top-0 z-50">
        <HeaderHome locale={locale} />
      </div>
      <div className="flex-grow -mt-1">
      {children}
      </div>
      <Part8 locale={locale} />
    </div>
  );
}
