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
    <div className="bg-white rounded-3xl shadow-xl  flex flex-col lg:flex-row  ">
      <div className="  w-full lg:w-2/4 bg-gradient-to-b from-indigo-400 to-indigo-200 rounded-3xl shadow-lg hidden  lg:flex flex-col justify-end items-center py-10 ">
        <h1 className="text-3xl text-center text-white">คอร์สเรียนออนไลน์</h1>
        <h1 className="text-2xl text-white">แบบฉบับมืออาชีพ</h1>
        <small className="text-gray-200 mt-3">อัพเดทเนื้อหาใหม่ 2024</small>

        <img src="/login1.webp" alt="" />
      </div>

      <div className="w-full lg:w-3/4 ">
        <div className="flex flex-row w-full items-center gap-3  justify-end py-4 px-8">
          <p className="text-gray-600 text-xs">
            สมัครสมาชิกเพื่อซื้อคอร์สเรียน
          </p>
          <button
            className=" text-[10px]  border border-gray-500 px-4 py-2 rounded-full"
            onClick={() => router.push("/register")}
          >
            {" "}
            สมัครสมาชิก
          </button>
        </div>

        <div className="flex flex-col  gap-6 py-6 md:py-10 md:pb-14 px-8 md:px-16  ">
          <div className="flex flex-col w-full  ">
            <div>
              <Typography className=" font-medium text-3xl ">
                DEV SRIWARARAK
              </Typography>
            </div>
            <div>
              <Typography className=" mt-3 text-sm font-medium text-gray-500">
                ระบบห้องเรียน Online
              </Typography>
            </div>
          </div>
          <form onSubmit={handleLogin} className="w-full">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-6">
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
                      className=" w-full whitespace-nowrap rounded-full"
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
                      className="w-full rounded-full"
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
                      className="w-full rounded-full"
                      color="purple"
                      onClick={() => router.push("/")}
                    >
                      ยกเลิก
                    </Button>
                  </div>

                  <div className="flex flex-row items-center justify-center gap-4">
                    <hr className="w-28 h-px my-8  bg-gray-300 border-0 dark:bg-gray-700"></hr>
                    <p className="text-gray-600 text-sm">ตัวเลือกอื่น</p>
                    <hr className="w-28 h-px my-8 bg-gray-300 border-0 dark:bg-gray-700"></hr>
                  </div>

                  <div className="flex w-full  flex-row  gap-2 justify-center items-center   ">
                    <div className="w-full ">
                      <p
                        className=" text-right text-purple-300 hover:bg-purple-50 px-2  py-1 cursor-pointer "
                        onClick={() => router.push("/login")}
                      >
                        เข้าสู่ระบบ user/password
                      </p>
                    </div>

                    <div className="w-full ">
                      <p className=" text-left text-purple-300 hover:bg-purple-50 px-2 py-1  cursor-pointer ">
                        ลืมรหัสผ่าน{" "}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end px-1"></div>
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
