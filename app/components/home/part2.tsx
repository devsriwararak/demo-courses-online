import React from "react";
import Carousel2 from "../carousel2";
import Image from "next/image";

const Part2 = () => {
  return (
    <div
      style={{
        background: "#19191A",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="h-auto py-20"
    >
      <div className="flex flex-col px-10  2xl:px-[300px] h-full">
        <div className="flex flex-col lg:flex-row w-full gap-10">
          <div className="flex flex-col w-full items-center md:items-start lg:w-7/12">
            <p className="text-[45px] text-[#F9F0CD] font-[400]">ขั้นตอน</p>
            <p className="text-[60px] font-[700] text-[#F9F0CD] text-nowrap">
              การให้บริการ
            </p>
            <p className="text-[18px] font-[400] text-white xl:pr-24 mt-10">
              Lorem Ipsum คือ เนื้อหาจำลองแบบเรียบๆ
              ที่ใช้กันในธุรกิจงานพิมพ์หรืองานเรียงพิมพ์
              มันได้กลายมาเป็นเนื้อหาจำลองมาตรฐานของธุรกิจดังกล่าวมาตั้งแต่ศตวรรษที่
              16
              เมื่อเครื่องพิมพ์โนเนมเครื่องหนึ่งนำรางตัวพิมพ์มาสลับสับตำแหน่งตัวอักษรเพื่อทำหนังสือตัวอย่าง
              Lorem Ipsum อยู่ยงคงกระพันมาไม่ใช่แค่เพียงห้าศตวรรษ
              แต่อยู่มาจนถึงยุคที่พลิกโฉมเข้าสู่งานเรียงพิมพ์ด้วยวิธีทางอิเล็กทรอนิกส์
            </p>
          </div>
          <div className="flex w-full lg:w-5/12 items-center">
            <div className="relative w-full h-[400px]">
              <img
                src="/banner-step.jpg"
                alt="Background"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-8 left-8 text-white">
                <p className="text-[22px] font-[400]">เรียนเทรดออนไลน์กับ...</p>
                <h1 className="text-[26px] sm:text-[35px] font-[700] text-nowrap">
                  Nang Fah Pa Trade
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* กล่องข้อความด้านล่างแบบ Fixed Size พร้อมระยะห่าง */}

        <div className=" hidden 2xl:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4  2xl:grid-cols-5 gap-8 mt-10 justify-center">
          <div
            className="bg-[#252525] w-[250px] h-[250px] p-6 rounded-lg shadow-lg hover:bg-[#333] transition flex flex-col justify-center items-center mx-auto"
          >
            <Image
              src="/icon-create-account.svg"
              alt="เลือกคอร์สเรียน"
              loading="lazy"
              width={100}
              height={100}
              className="w-12 h-12 mb-4"
            />
            <h2 className="text-[22px] font-[700] text-white">สมัครสมาชิก</h2>
            <p className="text-[17px] font-[400] text-white text-center">
              สมัครสมาชิกเพื่อลงทะเบียนคอร์สเรียน
            </p>
          </div>

          <div
            className="bg-[#242424] w-[250px] h-[250px] p-6 rounded-lg shadow-lg hover:bg-[#333] transition flex flex-col justify-center items-center mx-auto"
          >
            <Image
              src="/icon-select.svg"
              alt="เลือกคอร์สเรียน"
              loading="lazy"
              width={100}
              height={100}
              className="w-12 h-12 mb-4"
            />
            <h2 className="text-[22px] font-[700] text-white">
              เลือกคอร์สเรียน
            </h2>
            <h2 className="text-[22px] font-[700] text-white">ที่ต้องการ</h2>
            <p className="text-[17px] font-[400] text-white  text-center">
              ชำระเงินผ่านระบบอัตโนมัติ
            </p>
          </div>

          <div
            className="bg-[#242424] w-[250px] h-[250px] p-6 rounded-lg shadow-lg hover:bg-[#333] transition flex flex-col justify-center items-center mx-auto"
          >
            <Image
              src="/icon-payment.svg"
              alt="เลือกคอร์สเรียน"
              loading="lazy"
              width={100}
              height={100}
              className="w-12 h-12 mb-4"
            />

            <h2 className="text-[22px] font-[700] text-white">ชำระเงิน</h2>
            <p className="text-[17px] font-[400] text-white  text-center">
              ชำระเงินผ่านระบบอัตโนมัติ
            </p>
          </div>

          <div
            className="bg-[#242424] w-[250px] h-[250px] p-6 rounded-lg shadow-lg hover:bg-[#333] transition flex flex-col justify-center items-center mx-auto"
          >
             <Image
              src="/icon-play.svg"
              alt="เลือกคอร์สเรียน"
              loading="lazy"
              width={100}
              height={100}
              className="w-12 h-12 mb-4"
            />
            <h2 className="text-[22px] font-[700] text-white">
              รับชมคอร์สเรียน
            </h2>
            <p className="text-[17px] font-[400] text-white  text-center">
              คอร์สเรียนมีอายุ 1 ปี
            </p>
            <p className="text-[17px] font-[400] text-white  text-center">
              นับตั้งแต่วันที่สมัคร
            </p>
          </div>

          <div
            className="bg-[#242424] w-[250px] h-[250px] p-6 rounded-lg shadow-lg hover:bg-[#333] transition flex flex-col justify-center items-center mx-auto"
          >
             <Image
              src="/icon-test.svg"
              alt="เลือกคอร์สเรียน"
              loading="lazy"
              width={100}
              height={100}
              className="w-12 h-12 mb-4"
            />
            <h2 className="text-[22px] font-[700] text-white">ทำแบบทดสอบ</h2>
            <p className="text-[17px] font-[400] text-white  text-center">
              ทำแบบทดสอบหลังเรียน คุณครูตรวจให้คะแนน
            </p>
          </div>
        </div>
        <div className="flex justify-center 2xl:hidden ">
          <Carousel2 />
        </div>
      </div>
    </div>
  );
};

export default Part2;
