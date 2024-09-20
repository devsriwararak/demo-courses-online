import React from "react";

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
        <div  className="flex flex-col lg:flex-row w-full gap-10">
          <div className="flex flex-col w-full items-center md:items-start lg:w-7/12">
            <p className="text-[45px] text-[#F9F0CD] font-[300]">ขั้นตอน</p>
            <p className="text-[60px] text-[#F9F0CD] text-nowrap">การให้บริการ</p>
            <p className="text-[18px] text-white xl:pr-24 mt-16">
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
                <p className="text-[22px] font-extralight">
                  เรียนเทรดออนไลน์กับ...
                </p>
                <h1 className="text-[26px] sm:text-[35px] font-bold text-nowrap">
                  Nang Fah Pa Trade
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* กล่องข้อความด้านล่างแบบ Fixed Size พร้อมระยะห่าง */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4  2xl:grid-cols-5 gap-8 mt-10 justify-center">
          <a
            href="/register" // ลิงก์ที่ต้องการ
            className="bg-[#252525] w-[250px] h-[250px] p-6 rounded-lg shadow-lg hover:bg-[#333] transition flex flex-col justify-center items-center mx-auto"
          >
            <img
              src="/icon-create-account.svg"
              alt="สมัครสมาชิก"
              className="w-12 h-12 mb-4"
            />
            <h2 className="text-[22px] font-semibold text-white">สมัครสมาชิก</h2>
            <p className="text-[17px] text-gray-300 text-center">
              สมัครสมาชิกเพื่อลงทะเบียนคอร์สเรียน
            </p>
          </a>

          <a
            href="/select-course" // ลิงก์ที่ต้องการ
            className="bg-[#242424] w-[250px] h-[250px] p-6 rounded-lg shadow-lg hover:bg-[#333] transition flex flex-col justify-center items-center mx-auto"
          >
            <img
              src="/icon-select.svg"
              alt="เลือกคอร์สเรียน"
              className="w-12 h-12 mb-4"
            />
            <h2 className="text-[22px] font-semibold text-white">
              เลือกคอร์สเรียน
            </h2>
            <h2 className="text-[22px] font-semibold text-white">
              ที่ต้องการ
            </h2>
            <p className="text-[17px] text-gray-300 text-center">
            ชำระเงินผ่านระบบอัตโนมัติ
            </p>
          </a>

          <a
            href="/payment" // ลิงก์ที่ต้องการ
            className="bg-[#242424] w-[250px] h-[250px] p-6 rounded-lg shadow-lg hover:bg-[#333] transition flex flex-col justify-center items-center mx-auto"
          >
            <img
              src="/icon-payment.svg"
              alt="ชำระเงิน"
              className="w-12 h-12 mb-4 -mt-9"
            />
            <h2 className="text-[22px] font-semibold text-white">ชำระเงิน</h2>
            <p className="text-[17px] text-gray-300 text-center">
              ชำระเงินผ่านระบบอัตโนมัติ
            </p>
          </a>

          <a
            href="/receive-course" // ลิงก์ที่ต้องการ
            className="bg-[#242424] w-[250px] h-[250px] p-6 rounded-lg shadow-lg hover:bg-[#333] transition flex flex-col justify-center items-center mx-auto"
          >
            <img
              src="/icon-play.svg"
              alt="รับชมคอร์สเรียน"
              className="w-12 h-12 mb-4"
            />
            <h2 className="text-[22px] font-semibold text-white">
              รับชมคอร์สเรียน
            </h2>
            <p className="text-[17px] text-gray-300 text-center">
            คอร์สเรียนมีอายุ 1 ปี
            </p>
            <p className="text-[17px] text-gray-300 text-center">
            นับตั้งแต่วันที่สมัคร
            </p>
          </a>

          <a
            href="/test" // ลิงก์ที่ต้องการ
            className="bg-[#242424] w-[250px] h-[250px] p-6 rounded-lg shadow-lg hover:bg-[#333] transition flex flex-col justify-center items-center mx-auto"
          >
            <img
              src="/icon-test.svg"
              alt="ทำแบบทดสอบ"
              className="w-12 h-12 mb-4"
            />
            <h2 className="text-[22px] font-semibold text-white">ทำแบบทดสอบ</h2>
            <p className="text-[17px] text-gray-300 text-center">
              ทำแบบทดสอบหลังเรียน คุณครูตรวจให้คะแนน
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Part2;
