import Image from "next/image";
import React from "react";

const Part8 = () => {
  return (
    <footer>
      <div className="bg-[#042044] text-white py-8 ">
        <div className="container mx-auto 2xl:mx-[200px] grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3 2xl:gap-8 2xl:pr-28">
          {/* โลโก้และที่อยู่ */}
          <div className="flex flex-col space-y-4  ">
            {/* <h2 className="text-xl font-semibold">Nang Fah Pa Trade</h2>
            <span className="text-[#DF9E10]">If i want it ,i get it.</span> */}
            <div className="flex flex-col gap-5 items-center">
              <Image
                src="/logonavbar.svg" // เปลี่ยนพาธให้ตรงกับไฟล์ของคุณ
                alt="FAQ Image"
                width={500}
                height={500}
                className=" rounded-lg w-[150px]   "
              />
              <div className=" text-center ">
                <p className="text-[16px] font-[700]">
                  998/5 ม.7 9.เมืองเก่า อ.เมืองเก่า
                </p>
                <p className="text-[16px] font-[700]">จ. ขอนแก่น 40000</p>
              </div>
            </div>
          </div>

          {/* ลิงก์เมนู */}
          <div className="flex gap-20 md:mt-8 justify-center 2xl:mt-6 ">
            <div className="flex flex-col space-y-3">
              <ul className="space-y-1">
                <li className="text-[16px] font-[700] text-nowrap">
                  เกี่ยวกับเรา
                </li>

                <li className="text-[16px] font-[700]">ผลงาน</li>
                <li className="text-[16px] font-[700]">ติดต่อเรา</li>
              </ul>
            </div>
            <div className="flex flex-col space-y-2">
              <ul className="space-y-1">
                <li className="text-[16px] font-[700] text-nowrap">
                  วิธีการซื้อคอร์สเรียน
                </li>
                <li className="text-[16px] font-[700]">
                  นโยบายความเป็นส่วนตัว
                </li>
              </ul>
            </div>
          </div>

          {/* ไอคอนโซเชียลมีเดีย */}
          <div className="flex space-x-5 items-center justify-center">
            <a href="#">
              <Image
                src="/icon-youtube.svg" // เปลี่ยนพาธให้ตรงกับไฟล์ของคุณ
                alt="youtube"
                width={500}
                height={500}
                className=" w-[30px] h-[30px] "
              />
            </a>
            <a href="#">
              <Image
                src="/icon-email.svg" // เปลี่ยนพาธให้ตรงกับไฟล์ของคุณ
                alt="youtube"
                width={500}
                height={500}
                className=" w-[30px] h-[30px] "
              />
            </a>
            <a href="#">
              <Image
                src="/icon-call.svg" // เปลี่ยนพาธให้ตรงกับไฟล์ของคุณ
                alt="youtube"
                width={500}
                height={500}
                className=" w-[30px] h-[30px] "
              />
            </a>
            <a href="#">
              <Image
                src="/icon-fb.svg" // เปลี่ยนพาธให้ตรงกับไฟล์ของคุณ
                alt="youtube"
                width={500}
                height={500}
                className=" w-[30px] h-[30px] "
              />
            </a>
            <a href="#">
              <Image
                src="/icon-tiktok.svg" // เปลี่ยนพาธให้ตรงกับไฟล์ของคุณ
                alt="youtube"
                width={500}
                height={500}
                className=" w-[30px] h-[30px] "
              />
            </a>
            <a href="#">
              <Image
                src="/icon-line.svg" // เปลี่ยนพาธให้ตรงกับไฟล์ของคุณ
                alt="youtube"
                width={500}
                height={500}
                className=" w-[30px] h-[30px] "
              />
            </a>
          </div>
        </div>
      </div>

      <div className="bg-[#07172D] 2xl:px-20 pt-4 text-white hidden lg:flex items-center 2xl:gap-80 ">
        <p className=" px-2 text-[12px] md:text-[16px] font-[700] 2xl:px-[200px] ">
          Copyright © 2024 all rights reserved. | Nang Fah Pa Trade
        </p>
        <div className=" w-[200px]  bg-[#df9310] flex py-3 justify-center  rounded-t-xl ">
        <Image
                src="/icon-chat.svg" // เปลี่ยนพาธให้ตรงกับไฟล์ของคุณ
                alt="youtube"
                width={500}
                height={500}
                className=" w-[30px] h-[30px] "
              />
          <p className="  px-2 text-[12px] md:text-[18px] font-[700] text-nowrap  ">
            สอบถามเพิ่มเติม
          </p>
        </div>
      </div>

      {/* ส่วนข้อความลิขสิทธิ์ */}

      {/* ปุ่มสอบถามเพิ่มเติม */}
      {/* <div className="fixed bottom-4 right-4">
        <button className="bg-[#DF9E10] text-[#0B1F3C] px-4 py-2 rounded-full flex items-center shadow-lg">
        <i className="fas fa-comment-dots mr-2"></i>
        สอบถามเพิ่มเติม
        </button>
        </div> */}
    </footer>
  );
};

export default Part8;
