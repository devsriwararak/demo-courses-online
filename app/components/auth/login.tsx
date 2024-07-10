"use client";
import React, { useState, FormEvent, useCallback } from "react";
import { useRouter } from "next/navigation";
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
        console.log(res);
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
            redirectPath = "/user";
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
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="flex items-stretch ">
        <Card className="p-5 sm:max-w-xs w-full rounded-r-none">
          <div className="flex flex-col items-center gap-5">
            <Typography>ระบบห้องเรียน Online</Typography>
            <div className="flex w-full flex-col sm:flex-row gap-3 mt-5 ">
              <Button
                variant="outlined"
                color="purple"
                className="w-full"
                onClick={() => router.push("/login")}
              >
                User Login
              </Button>
              <Button
                variant="outlined"
                color="purple"
                className="w-full"
                onClick={() => router.push("/loginopt")}
              >
                OTP Login
              </Button>
            </div>
            <form onSubmit={handleLogin} className="w-full">
              <div className="flex flex-col gap-5">
                <div>
                  <Input
                    type="text"
                    label="User"
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
                    <div className="mt-3 underline  justify-end">
                      <Typography className="text-purple-500 font-semibold">
                        ลงทะเบียน
                      </Typography>
                    </div>
                    <div className="mt-3 underline justify-end">
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
            สมัครสมาชิกกับเราตอนนี้ รับข้อเสนอพิเศษ ต่าง ๆ มากมาย
            รายละเอียดเพิ่มเติมในแต่ละรายวิชา
          </Typography>

          <Typography className="text-white  px-2 mt-5 text-sm  text-justify ">
            ความรู้ไม่มีวันสิ้นสุด ขอให้สนุกกับการเรียนรู้
          </Typography>
        </Card>
      </div>

      <ToastContainer autoClose={2000} theme="colored" />
    </div>
  );
};

export default LoginPage;
