// pages/login.tsx
"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
    Button,
    Card,
    Input,
    Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage: React.FC = () => {
    const [user, setUser] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router = useRouter();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        const data = { username: user, password: password };

        try {
            // const res = await axios.post(
            //     `${process.env.NEXT_PUBLIC_API}/api/login`,
            //     data
            // );
            // const token = res.data.token;
            const token = "aaaaaaaaaaaa";

            if (token) {
                toast.success("เข้าสู่ระบบสำเร็จ");
                localStorage.setItem("Token", token);
                sessionStorage.setItem("login", "admin");
                router.push("/admin");
            } else {
                toast.error("Error: Token not found");
            }
        } catch (error) {
            toast.error("ไม่สำเร็จ กรุณาลองอีกครั้ง");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <Card className="p-10 max-w-xs w-full">
                <div className="flex flex-col items-center gap-5">
                    <Typography className=" font-bold text-2xl">
                        Login
                    </Typography>
                    <form onSubmit={handleLogin} className="w-full  ">
                        <div className="flex flex-col gap-5">
                            <div>

                                <Input
                                    type="text"
                                    label="User"
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                    required
                                    className="mb-4 "
                                    crossOrigin=""
                                />
                            </div>
                            <div>

                                <Input
                                    type="password"
                                    label="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="mb-4"
                                    crossOrigin=""
                                />
                            </div>
                            <div>

                                <Button type="submit" className="w-full" color="blue">
                                    Login
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </Card>
            <ToastContainer autoClose={2000} theme="colored" />
        </div>
    );
};

export default LoginPage;
