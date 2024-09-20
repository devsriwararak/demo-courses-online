import React from "react";

const Part6 = () => {
  return (
    <div
      className="py-10 px-6 text-center 2xl:h-[220px]"
      style={{
        background:
          "linear-gradient(92.31deg, #050F20 12.18%, #0C1F43 104.06%, #0B224E 149.78%)",
      }}
    >
      <h2 className="text-white text-[32px] sm:text-4xl font-[500] mb-4">
        ถ้าไม่เริ่ม ก็เหมือนเดิมทั้งชีวิต...
      </h2>
      <p className="text-white text-[16px] font-[300] mb-8">
        สนใจลงทะเบียนคอร์สเทรดทั้งด้านความรู้ และการควบคุมจิตใจ
      </p>
      <button className="bg-white text-[#1f58a1] text-[16px] font-[600] px-8 py-2 rounded-lg shadow-lg transition duration-300 hover:bg-gray-200">
        ลงทะเบียน
      </button>
    </div>
  );
};

export default Part6;
