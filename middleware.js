import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname; // กำหนดค่า pathname จาก request.nextUrl
  let permition = "";
  let allowedPaths = {};

  // ตรวจสอบสิทธิ์การเข้าถึงเส้นทาง '/admin'
  if (pathname.startsWith("/admin")) {
    permition = "admin";
    allowedPaths = {
      admin: ["/admin", "/admin/report"],
    };
  }

  // ตรวจสอบสิทธิ์การเข้าถึงเส้นทาง '/super'
  if (pathname.startsWith("/super")) {
    permition = "super";
    allowedPaths = {
      super: ["/super", "/super/test"],
    };
  }
  // ตรวจสอบสิทธิ์การเข้าถึงเส้นทาง '/user'
  if (pathname.startsWith("/user")) {
    permition = "user";
    allowedPaths = {
      user: ["/user", "/user/test"],
    };
  }

  // Redirect ถ้าไม่มีสิทธิ์เข้าถึงเส้นทางนั้น
  if (!allowedPaths[permition]?.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // อนุญาตการเข้าถึงเส้นทางอื่นๆ
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/super/:path*"],
};
