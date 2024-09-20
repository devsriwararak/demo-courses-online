import React from "react";

const Part4 = () => {
  return (
    <div className="bg-[#222222] py-16 px-6 h-full  2xl:px-[300px] ">
      <h2 className="text-white text-[35px] font-[400]  mb-10">
        ข่าวสารและกิจกรรมล่าสุด
      </h2>

      <div className="flex flex-col w-full lg:flex-row gap-8 ">
        {/* บล็อกข่าวใหญ่ทางซ้าย */}
        <div
          className="rounded-lg mt-20  lg:w-5/12 xl:overflow-hidden "
          style={{
            top: "183px",
            left: "270px",
            background: "#CDCDCD",
            borderRadius: "12px 0px 0px 0px", // โค้งเฉพาะมุมซ้ายบน
            boxShadow: "2px -1px 6.7px #00000040", // เงาตามที่ระบุ
          }}
        >
          <img
            src="/blog-1.jpg" // เปลี่ยนพาธให้ตรงกับไฟล์ของคุณ
            alt="ข่าวหลัก"
            className=" lg:-mt-[50px] xl:-mt-[101px] w-full h-auto "
            style={{
              borderRadius: "12px 0px 0px 0px", // ปรับ border-radius ตามที่กำหนด
            }}
          />
          <div className="p-4">
            <h3 className="text-[18px] font-bold text-gray-900 mb-2">
              บรรยากาศสัมมนา ณ โรงแรมฮิลตันเทรนด์
            </h3>
            <p className="text-[#181818] mb-4 text-[14px]">
              คอร์สเรียนออนไลน์ สุดยอดเทคนิคขึ้นพื้นฐานสู่นักเทรดมืออาชีพ
              มีกลุ่มไลน์วิเคราะห์ กราฟเข้าแม่นทุกจุด พิเศษ! ฟรีคอร์ส Super VIP
            </p>
            <div className="flex justify-between items-center">
              <button className="bg-[#093165] text-white px-4 py-2 rounded-full">
                อ่านเพิ่มเติม
              </button>
              <span className="text-sm text-gray-500">12 พ.ค. 2024</span>
            </div>
          </div>
        </div>

        {/* บล็อกข่าวทางขวา */}
        <div className="flex flex-col lg:w-7/12  gap-10 lg:mt-[84px] xl:mt-[101px]  ">
          {/* ข่าวที่ 1 */}
          <div className="w-full flex flex-col xl:flex-row gap-3 ">
            <img
              src="/blog-3.jpg" // เปลี่ยนพาธให้ตรงกับไฟล์ของคุณ
              alt="ข่าว 1"
              className="  lg:w-[273px] h-[180px] object-cover rounded-xl"
            />
            <div>
            <div className="p-2 flex flex-col bg-[#cdcdcd]  rounded-lg">
              <h3 className="text-lg font-bold ">
                ภาพบรรยากาศ Meeting Manifest ที่บ้าน
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                เคลียร์ตัวเองจากด้านใน ค้นหาความเชื่อผิดๆ
                เกี่ยวข้องกับเรื่องเงินของคุณ
                ปรับเปลี่ยนความคิดที่ไม่ถูกต้องเกี่ยวกับเงินเพื่อเปลี่ยนนิสัยให้เป็นคนสำเร็จ
              </p>
              <div className="flex gap-5 items-center">
                <button className="bg-[#093165] text-white px-4 py-2 rounded-full">
                  อ่านเพิ่มเติม
                </button>
                <span className="text-sm  text-gray-500">12 พ.ค. 2024</span>
              </div>
            </div>
            </div>
          </div>


          {/* ข่าวที่ 2 */}
      
        
    
        </div>
      </div>
    </div>
  );
};

export default Part4;
