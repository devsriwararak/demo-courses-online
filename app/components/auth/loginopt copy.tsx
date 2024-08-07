"use client";
import React, { useState, FormEvent, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
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
  const [otpActive, setOtpActive] = useState<number>(0);
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
    <div className="bg-gray-200 h-screen flex   justify-center items-center  px-10 md:px-64">
      <div className="bg-white rounded-lg shadow-lg  flex flex-col md:flex-row lg:h-[89%]  ">
        <div className="  w-full md:w-2/4 bg-purple-50 rounded-lg shadow-lg hidden  md:flex flex-col justify-center items-center ">
          <h1 className="text-xl">xxxxxxxxxxx</h1>
          <img src="/login1.webp" alt="" />
          <small>xxxxxxxx</small>
        </div>

        <div className="w-full md:w-3/4     ">
          <div className="flex flex-col w-full items-center gap-3  justify-end py-4 px-8">
          <div className="flex flex-col w-full  ">
              <div>
                <Typography className=" font-medium text-3xl ">
                  Welcome to course 
                </Typography>
              </div>
              <div className=" w-[90%] h-[1px] mt-2 bg-gray-300">{""}</div>
              <div>
                <Typography className=" mt-3 font-medium text-gray-600">
                  ระบบห้องเรียน Online
                </Typography>
              </div>
            </div>
            <div className="flex w-full md:w-60 flex-row  gap-3 justify-start items-start   ">
              <Button
                variant={pathname === "/login" ? "gradient" : "outlined"}
                color="deep-purple"
                className="w-full  rounded-full whitespace-nowrap "
                size="sm"
                onClick={() => router.push("/login")}
              >
                User Login
              </Button>
              <Button
                variant="outlined"
                size="sm"
                color="purple"
                className="w-full rounded-full  whitespace-nowrap "
                onClick={() => router.push("/loginopt")}
              >
                OTP Login
              </Button>
            </div>
            <form onSubmit={handleLogin} className="w-full">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  {otpActive === 0 ? (
                    <div>
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
                  ) : (
                    <div>
                      <Input
                        type="textl"
                        label="Vertify OPT"
                        value={otp}
                        color="purple"
                        onChange={(e) => setOtp(e.target.value)}
                        // required
                        className=""
                        crossOrigin=""
                      />
                    </div>
                  )}
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
                      onClick={() => [setOtpActive(1)]}
                    >
                      ขอรับ OTP
                    </Button>
                  </div>
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
        </div>
      </div>
    </div>
  );
};

export default LoginOTPPage;
