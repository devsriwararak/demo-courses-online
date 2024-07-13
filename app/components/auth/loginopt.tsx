"use client";
import React, { useState, FormEvent, useCallback } from "react";
import { useRouter,usePathname } from "next/navigation";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface MyJwtPayload extends JwtPayload {
  username: string;
  status: number;
  id: number;
}

const LoginOTPPage: React.FC = () => {
  const [tel, setTel] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();

  const handleLogin = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      console.log("aaaaa");

      //   const data = { username: user, password: password };
      const data = { username: tel.toString(), password: "1234" };

      try {
        console.log(data);
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/login`,
          data
        );
        console.log(res);
        const token = res.data.token;
        const decoded = jwtDecode<MyJwtPayload>(token);
        // console.log(decoded);
        if (token && decoded) {
          toast.success("เข้าสู่ระบบสำเร็จ");
          localStorage.setItem("Token", token);
          localStorage.setItem("Status", decoded.status.toString());
          sessionStorage.setItem("login", decoded.username);
          let redirectPath = "/";
          if (decoded.status === 2) {
            redirectPath = "/super";
          } else if (decoded.status === 1) {
            redirectPath = "/admin";
          } else if (decoded.status === 0) {
            redirectPath = "/user/shopcourse";
          }
          router.push(redirectPath);
        } else {
          toast.error("Error: Token not found");
        }
      } catch (err) {
        console.log(err);
        const error = err as { response: { data: { message: string } } };
        toast.error(error?.response?.data.message);
      }
    },
    [tel, router]
  );
  //   const handleLogin = useCallback(
  //     async (e: FormEvent) => {
  //       e.preventDefault();

  //     //   const data = { username: user, password: password };
  //       const data = {username: tel};

  //       try {
  //         const res = await axios.post(
  //           `${process.env.NEXT_PUBLIC_API}/api/login`,
  //           data
  //         );
  //         console.log(res);
  //         const token = res.data.token;
  //         const decoded = jwtDecode<MyJwtPayload>(token);
  //         console.log(decoded);
  //         if (token && decoded) {
  //           toast.success("เข้าสู่ระบบสำเร็จ");
  //           localStorage.setItem("Token", token);
  //           localStorage.setItem("Status", decoded.status.toString());
  //           sessionStorage.setItem("login", decoded.username);
  //           let redirectPath = "/";
  //           if (decoded.status === 2) {
  //             redirectPath = "/super";
  //           } else if (decoded.status === 1) {
  //             redirectPath = "/admin";
  //           } else if (decoded.status === 0) {
  //             redirectPath = "/user";
  //           }
  //           router.push(redirectPath);
  //         } else {
  //           toast.error("Error: Token not found");
  //         }
  //       } catch (err) {
  //         const error = err as { response: { data: { message: string } } };
  //         toast.error(error?.response?.data.message);
  //       }
  //     },
  //     [tel, router]
  //   );

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <ToastContainer autoClose={2000} theme="colored" />
      <div className="flex items-stretch ">
        <Card className="p-5 sm:max-w-xs w-full rounded-r-none">
          <div className="flex flex-col items-center gap-5">
            <div className="flex flex-col w-full justify-center items-center">
              <div>
                <Typography className="text-purple-500 font-medium ">
                  เข้าสู่ระบบ (OTP)
                </Typography>
              </div>
              <div className=" w-[90%] h-[1px] mt-2 bg-purple-300">{""}</div>
              <div>
                <Typography className="text-purple-500 mt-3 font-medium">
                  ระบบห้องเรียน Online
                </Typography>
              </div>
            </div>
            <div className="flex w-full flex-col sm:flex-row gap-3  ">
              <Button
                variant="outlined"
                color="purple"
                className="w-full"
                onClick={() => router.push("/login")}
              >
                User Login
              </Button>
              <Button
                  variant={pathname === "/loginopt" ? "gradient" : "outlined"}
                color="purple"
                className="w-full"
                onClick={() => router.push("/loginopt")}
              >
                OTP Login
              </Button>
            </div>
            <form onSubmit={handleLogin} className="w-full">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <div >
                    <Input
                      type="tel"
                      label="Phone Number"
                      value={tel}
                      color="purple"
                      onChange={(e) => setTel(e.target.value)}
                      required
                      className=""
                      crossOrigin=""
                    />
                  </div>
                  <div>
                    {" "}
                    <Button
                      type="submit"
                      className=" w-full whitespace-nowrap"
                      color="purple"
                      style={{
                        backgroundImage:
                          "linear-gradient(75deg, #6d28d9, #7c3aed, #8b5cf6)",
                      }}
                    >
                      ขอรับ OTP
                    </Button>
                  </div>
                </div>
                <div>
                <Input
                      type="textl"
                      label="Vertify OPT"
                      value={otp}
                      color="purple"
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      className=""
                      crossOrigin=""
                    />
                </div>
                <div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="submit"
                      className="w-full"
                      color="purple"
                      style={{
                        backgroundImage:
                          "linear-gradient(75deg, #6d28d9, #7c3aed, #8b5cf6)",
                      }}
                    >
                      เข้าสู่ระบบ
                    </Button>
                    <Button
                      variant="outlined"
                      className="w-full"
                      color="purple"
                      onClick={() => router.push("/")}
                    >
                      ยกเลิก
                    </Button>
                  </div>
                  <div className="flex justify-between px-1">
                    <div
                      className="mt-3 underline  justify-end cursor-pointer"
                      onClick={() => router.push("/register")}
                    >
                      <Typography className="text-purple-500 font-semibold">
                        ลงทะเบียน
                      </Typography>
                    </div>
                    <div className="mt-3 underline justify-end cursor-pointer">
                      <Typography>ลืมรหัสผ่าน</Typography>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Card>
        <Card
          className="pt-5 w-[200px] rounded-l-none hidden lg:block"
          style={{
            backgroundImage:
              "linear-gradient(125deg, #6d28d9, #7c3aed, #8b5cf6)",
          }}
        >
          <Typography className="text-white text-center whitespace-nowrap  text-xl  font-semibold">
            ยินดีต้อนรับ
          </Typography>
          <div className="px-3 mt-1">
            <hr />
          </div>
          <Typography className="text-white whitespace-nowrap text-center mt-3">
            เลือกรูปแบบที่ต้องการ{" "}
          </Typography>
          <Typography className="text-white whitespace-nowrap ml-3 mt-2 text-xs ">
            1. User Login{" "}
          </Typography>
          <Typography className="text-white whitespace-nowrap ml-3  text-xs ">
            2. OTP Login{" "}
          </Typography>
          <Typography className="text-white  px-2 mt-5 text-sm  text-justify ">
            เลือก Login ในแบบที่คุณ เพื่อเข้าสู่บทเรียน/เนื้อหา และ
            ตัวอย่างที่น่าสนใจ
          </Typography>

          <Typography className="text-white  px-2 mt-5 text-sm  text-justify ">
            ความรู้ไม่มีวันสิ้นสุด ขอให้สนุกกับการเรียนรู้
          </Typography>
        </Card>
      </div>
    </div>
  );
};

export default LoginOTPPage;
