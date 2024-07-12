"use client";
import {
  Button,
  Card,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";

export default function ManageProfile() {
  // const user = sessionStorage.getItem("login");
  const router = useRouter();

  return (
    <div className="relative w-full  overflow-auto">
      {/* Background Image */}
      <div
        className="absolute inset-0"
        // style={{
        //   backgroundImage: `url("/bg2.jpg")`,
        //   backgroundSize: "fill",
        //   backgroundPosition: "center",
        //   backgroundRepeat: "no-repeat",
        //   opacity: "0.75",
        //   filter: "blur(3px)", // Adjust the blur level as needed
        //   zIndex: -1,
        // }}
        style={{
          backgroundImage:
            "linear-gradient(150deg,  rgba(162,102,246,1) 10.8%, rgba(203,159,249,1) 94.3%)",
            opacity: "0.75",
          filter: "blur(5px)", // Adjust the blur level as needed
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
              {/* {`คุณ ${user}`} */}
              xxxxx
            </Typography>
          </div>
          <div className="flex flex-col lg:flex-row gap-5 w-full">
            <div className="w-full">
              <Input type="text" label="ชื่อผู้ใช้" crossOrigin />
            </div>
            <div className="w-full">
              <Input type="password" label="รหัสผ่าน" crossOrigin />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-5 w-full">
            <div className="w-full">
              <Input type="email" label="อีเมล์" crossOrigin />
            </div>
            <div className="w-full">
              <Input type="tel" label="เบอร์โทรศัพท์" crossOrigin />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-5 w-full">
            <div className="w-full">
              <Input type="text" label="บัญชีเทรด" crossOrigin />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-5 w-full">
            <Textarea label="ที่อยู่" />
          </div>
          <div className="flex flex-col w-full lg:flex-row gap-5 justify-end">
            {/* <div className="flex flex-col w-full gap-5 items-center"> */}
              <div className="w-full" >
                <Button variant="outlined" onClick={() => router.push("/user/shopcourse")}   color="red" className="w-full text-sm">
                  ยกเลิก
                </Button>
              </div>
              <div  className="w-full">
                <Button color="purple" className="w-full text-sm">อัพเดท</Button>
              </div>
            {/* </div> */}
          </div>
        </Card>
      </div>
    </div>
  );
}
