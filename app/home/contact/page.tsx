"use client";
import { Input, Textarea } from "@material-tailwind/react";
import Link from "next/link";
import { FaPhoneSquare } from "react-icons/fa";
import { LuMapPin, LuPhone, LuAlarmClock, LuMail } from "react-icons/lu";
import { FaLine } from "react-icons/fa6";

export default function Page() {
  return (
    <div className="bg-gray-100 h-full">
      <div className="mx-auto container px-6 md:px-20 py-10">
        <h1 className="text-3xl ">ติดต่อเรา</h1>

        <div className="flex flex-col lg:flex-row gap-8 mt-8 items-end">
          <div className="w-full ">
            <div className="bg-white border border-gray-200 shadow-md rounded-md px-6 py-8">
              <h1 className="text-xl text-gray-800">ส่งข้อความหาเรา</h1>
              <div className="flex flex-col md:flex-row gap-2 mt-6">
                <div className="bg-gray-100 rounded-md w-full">
                  <Input
                    crossOrigin="anonymous"
                    type="text"
                    label="ชื่อ"
                    color="indigo"
                  />
                </div>
                <div className="bg-gray-100 rounded-md w-full">
                  <Input
                    crossOrigin="anonymous"
                    type="text"
                    label="เบอร์โทร"
                    color="indigo"
                  />
                </div>
              </div>
              <div className="mt-4  bg-gray-100 rounded-md w-full   ">
                <Textarea label="รายละเอียด" className=" " color="indigo" />
              </div>
              <div className="text-right mt-8">
                <button className="bg-indigo-800 hover:bg-indigo-600 text-white px-4 py-2 rounded-md">
                  ส่งข้อความหาเรา
                </button>
              </div>
            </div>
          </div>

          <div className="w-full md:mx-4">
            <h1 className="text-3xl text-gray-800">
              บริษัท นางฟ้าพาเทรด จํากัด
            </h1>
            <p className="mt-4 text-gray-600">
              {" "}
              มุ่งเน้นให้ความรู้เกี่ยวกับการวิเคราะห์ตลาด
              ใช้เครื่องมือทางการเงิน และการจัดการความเสี่ยง
              สำหรับการเป็นเทรดเดอร์มืออาชีพ
            </p>

            <div className="flex flex-col md:flex-row gap-3 md:gap-6 mt-5">
              <div className="w-full border border-gray-100 rounded-md px-4 py-3 bg-white shadow-lg">
                <div className="flex flex-row gap-0 items-center justify-center">
                  <div className="w-1/3">
                    <LuMapPin size={40} className="text-indigo-800" />
                  </div>
                  <div className="w-2/3">
                    <h2 className="text-lg text-indigo-800">ที่อยู่</h2>
                    <p className=" text-sm text-gray-600 mt-1 ">
                      998/5 ม.7 9.เมืองเก่า อ.เมืองเก่า จ. ขอนแก่น 40000
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full border border-gray-100 rounded-md px-4 py-3 bg-white shadow-lg">
                <div className="flex flex-row gap-0 items-center justify-center">
                  <div className="w-1/3">
                    <LuPhone size={40} color="indigo" />
                  </div>
                  <div className="w-2/3">
                    <h2 className="text-lg text-indigo-800">เบอร์โทร</h2>

                    <ul className=" text-sm text-gray-600 mt-1">
                      <li>
                        <Link href="tel:0949926280">094 992 6280</Link>
                      </li>
                      <li>
                        <Link href="tel:0949926280">094 992 6280</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mt-6">
              <div className="w-full border border-gray-100 rounded-md px-4 py-3 bg-white shadow-lg">
                <div className="flex flex-row gap-4 items-center justify-center">
                  <div className="w-1/3">
                    <LuAlarmClock size={40} color="indigo" />
                  </div>
                  <div className="w-2/3">
                    <h2 className="text-lg text-indigo-800">เวลาทำการ</h2>
                    <p className=" text-sm text-gray-600 mt-1">
                      สามารถเข้าเรียนออนไลน์ได้ตลอด 24 ชั่วโมง
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full border border-gray-100 rounded-md px-4 py-3 bg-white shadow-lg">
                <div className="flex  gap-4 items-center justify-center">
                  <div className="w-1/3">
                    <FaLine size={40} color="indigo" />
                  </div>
                  <div className="w-2/3">
                    <h2 className="text-lg text-indigo-800">Line</h2>
                    <Link href="https://line.me/R/ti/p/@nangfahpatrade">
                      <p className=" text-sm text-gray-600 mt-1">
                        ติดต่อสอบถาม มีแอดมินคอยให้คำปรึกษา คลิก
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
