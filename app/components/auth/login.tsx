"use client";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";  // ใช้การนำเข้าแบบ named import
import CryptoJS from "crypto-js";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { FormEvent, useCallback, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface MyJwtPayload extends JwtPayload {
  username: string;
  status: number;
  id: number;
}

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "your_secret_key";

const encryptData = (data: string) => {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

const decryptData = (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const LoginPage: React.FC = () => {
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleLogin = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const data = { username: user, password: password };

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/login`,
          data
        );
        const token = res.data.token;
        const decoded = jwtDecode<MyJwtPayload>(token);
        if (token && decoded) {
          toast.success("เข้าสู่ระบบสำเร็จ");

          // เข้ารหัสและเก็บข้อมูล
          localStorage.setItem("Token", encryptData(token));
          localStorage.setItem("Status", encryptData(decoded.status.toString()));
          sessionStorage.setItem("login", encryptData(decoded.username));

          let redirectPath = "/";
          
          const status = parseInt(decryptData(localStorage.getItem("Status") || ""));

        console.log(status)
          
          if (status === 2) {
            redirectPath = "/super";
          } else if (status === 1) {
            redirectPath = "/admin";
          } else if (status === 0) {
            redirectPath = "/user/shopcourse";
          }

          setTimeout(() => {
            router.push(redirectPath);
          }, 1500);
        } else {
          toast.error("Error: Token not found");
        }
      } catch (err) {
        const error = err as { response: { data: { message: string } } };
        toast.error(error?.response?.data.message);
      }
    },
    [user, password, router]
  );

  return (
    <div className="bg-gray-200 h-screen flex   justify-center items-center  px-10 md:px-64">
      <ToastContainer autoClose={3000} theme="colored" />
      <div className="bg-white rounded-3xl shadow-xl  flex flex-col lg:flex-row  ">
        <div className="  w-full lg:w-2/4 bg-gradient-to-b from-indigo-400 to-purple-300 rounded-3xl shadow-lg hidden  lg:flex flex-col justify-end items-center py-10 ">
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
                <div>
                  <Input
                    type="text"
                    label="Username"
                    value={user}
                    color="purple"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    className="mb-4"
                    crossOrigin=""
                  />
                </div>

                <div>
                  <Input
                    type="password"
                    label="Password"
                    value={password}
                    color="purple"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mb-4"
                    crossOrigin=""
                  />
                </div>
                <div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="submit"
                      className="w-full rounded-full"
                      color="deep-purple"
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
                      color="deep-purple"
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
                        onClick={() => router.push("/loginopt")}
                      >
                        เข้าสู่ระบบ OTP
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

export default LoginPage;
