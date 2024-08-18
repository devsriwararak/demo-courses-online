// layouts/AdminLayout.tsx
"use client";
import { useEffect, useState, ReactNode, useCallback } from "react";

import { useRouter } from "next/navigation";
import LayoutContent from "@/app/components/layout/layoutContent";
import { ThemeProvider } from "@material-tailwind/react";



// const theme = {
//   input: {
//     styles: {
//       variants: {
//         outlined: {
//           base: {
//             input: {
//               "deep-purple": {
//                 color: "text-deep-purple-500",
//                 borderColor:
//                   "border-deep-purple-500 placeholder-shown:border-t-deep-purple-500 placeholder-shown:border-deep-purple-500 ",
//                 borderColorFocused: "focus:border-gray-700",
//               },
//             },
//             label: {
//               "deep-purple": {
//                 color: "!text-deep-purple-500 peer-focus:text-deep-purple-700",
//                 before:
//                   "before:border-deep-purple-500 peer-focus:before:border-deep-purple-700",
//                 after:
//                   "after:border-deep-purple-500 peer-focus:after:border-deep-purple-700",
//               },
//             },
//           },
//         },
//       },
//     },
//   },
//   textarea: {
//     styles: {
//       variants: {
//         outlined: {
//           base: {
//             textarea: {
//               "deep-purple": {
//                 color: "text-deep-purple-500",
//                 borderColor: "placeholder-shown:border-t-deep-purple-500 placeholder-shown:border-deep-purple-500 ",
//                 borderColorFocused: "focus:border-deep-purple-700",
//               },
//             },
//             label: {
//               "deep-purple": {
//                 color: "!text-deep-purple-500 peer-focus:text-deep-purple-700",
//                 before:
//                   "before:border-deep-purple-500 peer-focus:before:border-deep-purple-700",
//                 after:
//                   "after:border-deep-purple-500 peer-focus:after:border-deep-purple-700",
//               },
//             },
//           },
//         },
//       },
//     },
//   },
// };


interface AdminLayoutProps {
  children: ReactNode;
}
const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const router = useRouter();

  const checkAuthorization = useCallback(() => {
    const token = localStorage.getItem("login");
    const loginStatus = localStorage.getItem("Status");
    if ((!token && loginStatus === "1") || loginStatus === "2") {
      setIsAuthorized(true); // ตั้งค่า state ให้แสดงเนื้อหาถูกต้อง
    } else {
      router.push("/"); // Redirect ไปที่หน้า login ถ้าไม่มี token
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    checkAuthorization();
  }, [checkAuthorization]);

  if (!isAuthorized) {
    return null; // ไม่แสดงเนื้อหาก่อนตรวจสอบสิทธิ์เสร็จสิ้น
  }
  return (
    // <ThemeProvider value={theme}>
      <LayoutContent>{children}</LayoutContent>
    // </ThemeProvider>
  );
};

export default AdminLayout;
