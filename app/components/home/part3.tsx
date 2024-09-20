import React from "react";

const Part3 = () => {
  return (
    <div className="bg-[#070e20] py-16 px-6 flex flex-col items-center">
      <h2 className="text-white text-[60px] font-light text-center mb-10">
        เรียนเทรดกับเราได้อะไรบ้าง
      </h2>

      <div className="flex flex-col lg:flex-row  gap-10   xl:gap-0 w-full xl:w-9/12 mx-auto">
        {/* ข้อความด้านซ้าย */}
        <div className="flex flex-col  text-white space-y-16 2xl:space-y-28 2xl:pt-10  lg:w-5/12">
          <div className="text-center xl:w-[400px]">
            <h3 className="text-[28px] font-[500]">รู้ข่าวทองคำ</h3>
            <p className="text-[20px]  font-extralight">
            อ่านข่าวสารเกี่ยวกับทองคำรูปแบบ
            </p>
            <p className="text-[20px]  font-extralight">
            การเทรดแบบชนข่าวและการเทรดแบบช้อนข่าว
            </p>
          </div>
          <div className="text-center  2xl:ps-[180px]">
            <h3 className="text-[28px] font-[500] ">เทคนิคกราฟปลายไส้</h3>
            <p className="text-[20px] font-extralight">
              เรียนรู้เทคนิคกราฟปลายไส้ที่จะทำให้คุณเทรด ได้อย่างแม่นยำ
            </p>
          </div>
          <div className="text-center lg:w-[400px] ">
            <h3 className="text-[28px] font-[500]">จุด TP, SL ที่แม่นยำ</h3>
            <p className="text-[20px] font-extralight">
              รู้เทคนิควิเคราะห์จุด TP, SL ที่แม่นยำ
            </p>
          </div>
        </div>

        {/* รูปภาพโทรศัพท์ */}
        <div className="relative flex lg:w-4/12 items-center text-center  justify-center">
          <img
            src="/iphone.png" // เปลี่ยนพาธให้ตรงกับไฟล์ของคุณ
            alt="Phone with Trading Screen"
            className="w-[300px] lg:w-[400px] mx-auto"
          />
        </div>

        {/* ข้อความด้านขวา */}
        <div className="flex flex-col item-start lg:items-start    text-white space-y-16  2xl:space-y-28 2xl:mt-[100px] text-left lg:w-5/12">
        <div className="text-center xl:w-[400px]  ">
            <h3 className="text-[28px] font-[500] ">วิเคราะห์แนวรับ-แนวต้าน</h3>
            <p className="text-[20px] 2xl:ps-[70px] font-extralight">
            วิเคราะหจุด์แนวรับ-แนวต้านที่แม่นยำ เพื่อให้คุณไม่พลาดทุกออเดอร์
            </p>
          </div>
          <div className="text-center  ">
            <h3 className="text-[28px] font-[500]">การอ่านแท่งเทียน/แท่งกราฟ</h3>
            <p className="text-[20px] font-extralight xl:w-[300px]">
              การอ่านแท่งเทียน/แท่งกราฟ สัญลักษณ์ที่สำคัญในการเทรด
            </p>
          </div>
          <div className="text-center  ">
            <h3 className="text-[28px] font-[500]">เทคนิคเทรด 30 เทคนิค</h3>
            <p className="text-[20px] font-extralight">
            สอนเทคนิคเทรดทองคำ สั้น - ยาว กว่า 30 เทคนิค
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Part3;
