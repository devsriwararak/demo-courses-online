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
      admin: [
        "/admin",
        "/admin/learning",
        "/admin/pay",
        "/admin/homework",
        "/admin/question",
        "/admin/manageebook",
        "/admin/managereviews",
        "/admin/manageactivity",
        "/admin/reports"
      ],
    };
  }
  // ตรวจสอบสิทธิ์การเข้าถึงเส้นทาง '/super'
  if (pathname.startsWith("/super")) {
    permition = "super";
    allowedPaths = {
      super: [
        "/super",
        "/super/test",
        "/super/total",
        "/super/good",
        "/admin",
        "/admin/learning",
        "/admin/pay",
        "/admin/homework",
        "/admin/question",
        "/admin/manageebook",
        "/admin/managereviews",
        "/admin/manageactivity",
        "/admin/reports"
      ],
    };
  }
  // ตรวจสอบสิทธิ์การเข้าถึงเส้นทาง '/user'
  if (pathname.startsWith("/user")) {
    permition = "user";
    allowedPaths = {
      user: [
        "/user",
        "/user/manageprofile",
        "/user/shopcourse",
        "/user/buycourse",
        "/user/buycourse/:id*", 
        "/user/mycourse",
        "/user/study", 
        "/user/study/:id*", 
        "/user/myorder",
      ],
    };
  }

  // ตรวจสอบการเข้าถึงด้วย wildcard
  const allowed = allowedPaths[permition]?.some((allowedPath) => {
    // เปลี่ยนให้รองรับการตรวจสอบ wildcard
    const pathPattern = new RegExp(
      `^${allowedPath.replace(/\*/g, ".*").replace(/:\w+/g, "\\w+")}$`
    );
    return pathPattern.test(pathname);
  });

  // Redirect ถ้าไม่มีสิทธิ์เข้าถึงเส้นทางนั้น
  if (!allowed) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // อนุญาตการเข้าถึงเส้นทางอื่นๆ
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/super/:path*"],
};
