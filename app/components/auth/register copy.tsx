// pages/register.tsx
'use client'
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";

const Register = () => {
    const [user, setUser] = useState<string>("");
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        // if (password !== confirmPassword) {
        //     toast.error('Passwords do not match!');
        //     return;
        // }

        const data = { username: user, password: password, status: 0 };
        console.log(data)

        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/api/register`,
                data
            );
            console.log(res)
            if (res?.status === 200) {
                toast.success(res?.data?.message);
                setTimeout(()=> {
                    router.push('/login'); // Redirect to login page
                },1000)
            }
        } catch (err) {
            const error = err as { response: { data: { message: string } } };
            // console.log(error)
            toast.error(error?.response?.data?.message);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <ToastContainer autoClose={2000} theme="colored" />
      <div className="flex items-stretch ">
        <Card className="p-4  w-[300px] rounded-r-none">
          <div className="flex flex-col items-center gap-5">
            <div className="flex flex-col w-full justify-center items-center">
              <div>
                <Typography className="text-purple-500 font-medium ">
                  ลงทะเบียนผู้ใช้
                </Typography>
              </div>
              <div className=" w-[90%] h-[1px] mt-2 bg-purple-300">{""}</div>
              <div>
                <Typography className="text-purple-500 mt-3 font-medium">
                  ระบบห้องเรียน Online
                </Typography>
              </div>
            </div>
            <form onSubmit={handleRegister} className="w-full">
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
                  <Input
                    type="email"
                    label="email"
                    value={email}
                    color="purple"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mb-4"
                    crossOrigin=""
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    label="Phone"
                    value={phone}
                    color="purple"
                    onChange={(e) => setPhone(e.target.value)}
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
                    <div
                      className="mt-3 underline  justify-end cursor-pointer"
                      onClick={() => router.push("/login")}
                    >
                      <Typography  className="text-purple-500 font-semibold">
                        เข้าสู่ระบบ
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
          className="pt-5 w-[180px] rounded-l-none hidden lg:block"
          style={{
            backgroundImage:
              "linear-gradient(125deg, #6d28d9, #7c3aed, #8b5cf6)",
          }}
        >
          <Typography className="text-white text-center whitespace-nowrap  text-xl  font-semibold">
            ลงทะเบียน
          </Typography>
          <div className="px-3 mt-1">
            <hr />
          </div>
          <Typography className="text-white  px-2 mt-5 text-sm  text-justify ">
            สมัครสมาชิกกับเราตอนนี้ รับข้อเสนอพิเศษ และส่วนลด ต่าง ๆ มากมาย
          </Typography>
          <Typography className="text-white  px-2 mt-3 text-sm  text-justify ">
            เรารวมบทเรียนที่มีคุณภาพ หลากหลายหมวดหมู่ เนื้อหาครบถ้วนง่ายต่อการทำความเข้าใจ ทำให้เราเป็นที่นิยมต่อผู้ใช้งานมากมาย 
          </Typography>
        </Card>
      </div>

      
    </div>
    );
};

export default Register;
