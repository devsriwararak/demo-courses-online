import React from "react";

const Part8 = () => {
  return (
    <footer className="bg-[#0B1F3C] text-white py-10 px-6">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* โลโก้และที่อยู่ */}
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold">Nang Fah Pa Trade</h2>
        <span className="text-[#DF9E10]">If i want it ,i get it.</span>
        <p>998/5 ม.7 9.เมืองเก่า อ.เมืองเก่า</p>
        <p>จ. ขอนแก่น 40000</p>
      </div>

      {/* ลิงก์เมนู */}
      <div className="flex flex-col space-y-2">
        <h3 className="font-bold">เกี่ยวกับเรา</h3>
        <ul className="space-y-1">
          <li>เกี่ยวกับเรา</li>
          <li>ผลงาน</li>
          <li>ติดต่อเรา</li>
        </ul>
      </div>
      <div className="flex flex-col space-y-2">
        <h3 className="font-bold">วิธีการซื้อคอร์สเรียน</h3>
        <ul className="space-y-1">
          <li>วิธีการซื้อคอร์สเรียน</li>
          <li>นโยบายความเป็นส่วนตัว</li>
        </ul>
      </div>

      {/* ไอคอนโซเชียลมีเดีย */}
      <div className="flex space-x-4 items-center mt-4 md:mt-0">
        <a href="#" className="p-2 bg-white text-[#0B1F3C] rounded-full">
          <i className="fab fa-youtube"></i> {/* แทนที่ด้วยไอคอนจริง */}
        </a>
        <a href="#" className="p-2 bg-white text-[#0B1F3C] rounded-full">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#" className="p-2 bg-white text-[#0B1F3C] rounded-full">
          <i className="fab fa-whatsapp"></i>
        </a>
        <a href="#" className="p-2 bg-white text-[#0B1F3C] rounded-full">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="#" className="p-2 bg-white text-[#0B1F3C] rounded-full">
          <i className="fab fa-tiktok"></i>
        </a>
        <a href="#" className="p-2 bg-white text-[#0B1F3C] rounded-full">
          <i className="fab fa-line"></i>
        </a>
      </div>
    </div>
  </footer>
  );
};

export default Part8;
