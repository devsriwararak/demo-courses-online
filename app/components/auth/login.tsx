"use client";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
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

const LoginPage: React.FC = () => {
  const [user, setUser] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();

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
        console.log(decoded);
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
        const error = err as { response: { data: { message: string } } };
        toast.error(error?.response?.data.message);
      }
    },
    [user, password, router]
  );

  return (
    <div className="bg-gray-200 h-screen flex   justify-center items-center  px-10 md:px-64">
      
      <div className="bg-white rounded-lg shadow-lg  flex flex-col md:flex-row  ">
        <div className="  w-full md:w-2/4 bg-purple-50 rounded-lg shadow-lg hidden  md:flex flex-col justify-center items-center ">
        <h1 className="text-xl">xxxxxxxxxxx</h1>
        <img src="/login1.webp" alt=""  />
        <small>xxxxxxxx</small>
        </div>

        <div className="w-full md:w-3/4 ">

        <div className="flex flex-row w-full items-center gap-3  justify-end py-4 px-8">
          <p className="text-gray-600">xxxxxxxx</p>
            <button
            className=" text-[10px]  border border-gray-500 px-4 py-2 rounded-full"
              onClick={() => router.push("/register")}
            > สมัครสมาชิก</button>
            </div>

        <div className="flex flex-col  gap-6 py-6 md:py-10 md:pb-14 px-8 md:px-16  ">
          
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
                  <div className="flex justify-end px-1">
                    {/* <div
                      className="mt-3 underline  justify-end cursor-pointer"
                      onClick={() => router.push("/register")}
                    >
                      <Typography className="text-purple-500 font-semibold">
                        ลงทะเบียน
                      </Typography>
                    </div> */}
                    <div className="mt-5 underline text-gray-700   cursor-pointer">
                      <Typography className="text-xs">ลืมรหัสผ่าน</Typography>
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

export default LoginPage;
