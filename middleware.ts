// // middleware.ts
// // แก้ไขจาก code ของฉัน
// import { NextRequest, NextResponse } from "next/server";
// import createMiddleware from "next-intl/middleware";

// // 2 ภาษา
// const locales = ["th", "en"];
// const defaultLocale = "th";

// export function middleware(request: NextRequest) {
//   const url = request.nextUrl.clone();
//   const pathname = url.pathname; // กำหนดค่า pathname จาก request.nextUrl

//   // 2ภาษา
//   // ตรวจสอบว่ามีภาษาใน URL หรือไม่


//   let permition = "";
//   let allowedPaths = {};

//   // ตรวจสอบสิทธิ์การเข้าถึงเส้นทาง '/admin'
//   if (pathname.startsWith("/admin")) {
//     permition = "admin";
//     allowedPaths = {
//       admin: [
//         "/admin",
//         "/admin/learning",
//         "/admin/pay",
//         "/admin/homework",
//         "/admin/question",
//         "/admin/manageebook",
//         "/admin/managereviews",
//         "/admin/manageactivity",
//         "/admin/reports",
//         "/admin/checkuser",
//       ],
//     };
//   }
//   // ตรวจสอบสิทธิ์การเข้าถึงเส้นทาง '/super'
//   if (pathname.startsWith("/super")) {
//     permition = "super";
//     allowedPaths = {
//       super: [
//         "/super",
//         "/super/test",
//         "/super/total",
//         "/super/good",
//         "/admin",
//         "/admin/learning",
//         "/admin/pay",
//         "/admin/homework",
//         "/admin/question",
//         "/admin/manageebook",
//         "/admin/managereviews",
//         "/admin/manageactivity",
//         "/admin/reports",
//         "/admin/checkuser",
//       ],
//     };
//   }
//   // ตรวจสอบสิทธิ์การเข้าถึงเส้นทาง '/user'
//   if (pathname.startsWith("/user")) {
//     permition = "user";
//     allowedPaths = {
//       user: [
//         "/user",
//         "/user/manageprofile",
//         "/user/shopcourse",
//         "/user/buycourse",
//         "/user/buycourse/:id*",
//         "/user/mycourse",
//         "/user/study",
//         "/user/study/:id*",
//         "/user/myorder",
//       ],
//     };
//   }

//   // ตรวจสอบการเข้าถึงด้วย wildcard
//   const allowed = allowedPaths[permition]?.some((allowedPath: any) => {
//     const pathPattern = new RegExp(
//       `^${allowedPath.replace(/:\w+/g, "\\w+").replace(/\*/g, ".*")}$`
//     );
//     return pathPattern.test(pathname);
//   });

//   // Redirect ถ้าไม่มีสิทธิ์เข้าถึงเส้นทางนั้น
//   if (!allowed) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }



//   // อนุญาตการเข้าถึงเส้นทางอื่นๆ
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/admin/:path*",
//     "/user/:path*",
//     "/super/:path*",
//     "/(th|en)/:path*",
//   ],
// };


//middleware.ts ใช้ได้ 

// import createMiddleware from 'next-intl/middleware';

// export default createMiddleware({
//   locales: ['en', 'th'],
//   defaultLocale: 'en'
// });

// export const config = {
//   matcher: ['/((?!api|_next|.*\\..*).*)']
// };


// middleware.ts  

import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

// สร้าง Middleware สำหรับ next-intl
const intlMiddleware = createMiddleware({
  locales: ['en', 'th'],
  defaultLocale: 'th',
});

type PermissionType = 'admin' | 'super' | 'user';

const permissions: Record<PermissionType, string[]> = {
  admin: ['/admin/:path*'],
  super: ['/super/:path*'],
  user: ['/user/:path*'],
};

// ฟังก์ชันตรวจสอบสิทธิ์
function checkPermission(pathname: string, permission: PermissionType): boolean {
  const allowedPaths = permissions[permission] || [];
  return allowedPaths.some((allowedPath) => {
    const pathPattern = new RegExp(`^${allowedPath.replace(/:\w+/g, '\\w+').replace(/\*/g, '.*')}$`);
    return pathPattern.test(pathname);
  });
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ตรวจสอบสิทธิ์การเข้าถึงสำหรับ `/admin`, `/super`, `/user`
  let permission: PermissionType | '' = '';
  if (pathname.startsWith('/admin')) permission = 'admin';
  else if (pathname.startsWith('/super')) permission = 'super';
  else if (pathname.startsWith('/user')) permission = 'user';

  // ถ้าผู้ใช้ไม่มีสิทธิ์เข้าถึงเส้นทางนั้น ให้ Redirect ไปยังหน้า `/th/home`
  if (permission && !checkPermission(pathname, permission)) {
    return NextResponse.redirect(new URL('/th/home', request.url));
  }

  // ใช้ next-intl middleware สำหรับการจัดการภาษา
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/user/:path*',
    '/super/:path*',
    '/(th|en)/:path*',
    '/',
    '/home',
  ],
};