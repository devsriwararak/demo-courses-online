"use client";
import {
  Button,
  Card,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import CryptoJS from "crypto-js";
import { HeaderAPI } from "@/headerApi";
import { useEffect, useCallback, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

interface Profile {
  id: number;
  email: string;
  address: string;
  phone: string;
  trade: string;
  username: string;
  name: string;
  password: string;
}

export default function ManageProfile() {
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const router = useRouter();

  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "your_secret_key";

  const decryptData = (ciphertext: string) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const userId = decryptData(localStorage.getItem("Id") || "");

  const getProfile = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/api/login/user/${userId}`,
        {
          ...HeaderAPI(decryptData(localStorage.getItem("Token") || "")),
        }
      );
      if (res.status === 200) {
        setUserProfile(res.data);
      } else {
        toast.error("Error fetching user data");
      }
    } catch (err) {
      const error = err as { response: { data: { message: string } } };
      toast.error(error.response.data.message);
    }
  }, [userId]);

  useEffect(() => {
    getProfile();
  }, []);

  // ฟังก์ชันจัดการการเปลี่ยนค่าในแต่ละฟิลด์
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile) => {
      if (!prevProfile) return null;
      return {
        ...prevProfile,
        [name]: value,
      };
    });
  };

  // ฟังก์ชันการอัปเดทข้อมูล
  const handleUpdate = async () => {
    if (userProfile) {
      const data = {
        id: userProfile.id,
        username: userProfile.username || '',
        password: userProfile.password || '',
        name: userProfile.name || '' ,
        email: userProfile.email  || '',
        phone: userProfile.phone  || '',
        trade: userProfile.trade  || '',
        address: userProfile.address  || '',
      };

      try {

        console.log(data)
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API}/api/login/user`,
          data,
          {
            ...HeaderAPI(decryptData(localStorage.getItem("Token") || "")),
          }
        );
        console.log(res)
        if (res.status === 200) {
          toast.success("อัพเดทข้อมูลสำเร็จ");
          if(res.data.statusPassword  === 1) {
            router.push("/home");
            localStorage.clear();
          }else {
            // router.push("/user/shopcourse");
          }
        } else {
          toast.error("Error updating profile");
        }
      } catch (err) {
        const error = err as { response: { data: { message: string } } };
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="relative w-full overflow-auto">
      {/* Background Image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(150deg,  rgba(162,102,246,1) 10.8%, rgba(203,159,249,1) 94.3%)",
          opacity: "0.75",
          filter: "blur(5px)",
        }}
      ></div>
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Foreground Content */}
      <div className="relative w-full h-full px-10 lg:px-48 xl:px-[500px] flex flex-col items-center">
        <ToastContainer autoClose={2000} theme="colored" />
        <Card className="flex flex-col items-center my-10 lg:my-5 mt-5 p-10 shadow-md gap-5 overflow-hidden bg-white bg-opacity-90 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row gap-2">
            <Typography className="text-xl font-semibold whitespace-nowrap">
              {`จัดการข้อมูลผู้ใช้:`}
            </Typography>
            <Typography className="text-xl font-semibold">
              {userProfile?.username}
            </Typography>
          </div>
          <div className="flex flex-col lg:flex-row gap-5 w-full">
            <div className="w-full">
              <Input
                type="text"
                label="ชื่อผู้ใช้"
                name="username"
                value={userProfile?.username || ""}
                onChange={handleChange}
                crossOrigin="anonymous"
              />
            </div>
            <div className="w-full">
              <Input
                type="password"
                label="รหัสผ่าน"
                name="password"
                value={userProfile?.password || ""}
                onChange={handleChange}
                crossOrigin="anonymous"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-5 w-full">
            <div className="w-full">
              <Input
                type="name"
                label="ชื่อ-สกุล"
                name="name"
                value={userProfile?.name || ""}
                onChange={handleChange}
                crossOrigin="anonymous"
              />
            </div>
            <div className="w-full">
              <Input
                type="email"
                label="อีเมล์"
                name="email"
                value={userProfile?.email || ""}
                onChange={handleChange}
                crossOrigin="anonymous"
              />
            </div>
            <div className="w-full">
              <Input
                type="tel"
                label="เบอร์โทรศัพท์"
                name="phone"
                value={userProfile?.phone || ""}
                onChange={handleChange}
                crossOrigin="anonymous"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-5 w-full">
            <div className="w-full">
              <Input
                type="text"
                label="บัญชีเทรด"
                name="trade"
                value={userProfile?.trade || ""}
                onChange={handleChange}
                crossOrigin="anonymous"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-5 w-full">
            <Textarea
              label="ที่อยู่"
              name="address"
              value={userProfile?.address || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-full lg:flex-row gap-5 justify-end">
            <div className="w-full">
              <Button
                variant="outlined"
                onClick={() => router.push("/user/shopcourse")}
                color="red"
                className="w-full text-sm"
              >
                ยกเลิก
              </Button>
            </div>
            <div className="w-full">
              <Button
                color="purple"
                className="w-full text-sm"
                onClick={handleUpdate} // เรียกฟังก์ชันอัพเดทเมื่อกดปุ่ม
              >
                อัพเดท
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
