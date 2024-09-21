import Image from "next/image";
import React from "react";

const Part7 = () => {
  return (
    <div
      className=" py-16 px-6 flex flex-col lg:flex-row 2xl:gap-24 items-center  2xl:h-[800px]  2xl:px-[250px]"
      style={{
        background: "linear-gradient(89.98deg, #151519 12.72%, #232325 89.74%)",
      }}
    >
      {/* ภาพทางด้านซ้าย */}
      <div className="w-full 2xl:w-[450px]">
        <Image
          src="/banner-faq.jpg" // เปลี่ยนพาธให้ตรงกับไฟล์ของคุณ
          alt="FAQ Image"
          width={500}
          height={500}
          className="w-full rounded-lg lg:w-[550px] xl:w-[650px] 2xl:w-full"
        />
      </div>

      {/* กล่องข้อความด้านขวา */}
      <div className="w-full lg:w-7/12 pt-5 space-y-6">
        <h2 className="text-white text-[50px]   font-[700] mb-6">
          Faq
          <span className="text-white text-[30px] font-[700]   ps-6">
            คำถามที่พบบ่อย
          </span>
        </h2>

        {/* FAQ Item */}
        <div className="bg-[#F3F4F6] rounded-lg p-4 mb-4 2xl:mr-52">
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer">
              <h3 className="text-[#093165] font-[700] text-[24px]">
                มีคอร์สสำหรับทดลองเรียนหรือไม่?
              </h3>
              <span className="text-2xl font-bold text-[#093165] group-open:hidden">
                <Image
                  src="/icon-plus.svg" // เปลี่ยนพาธให้ตรงกับไฟล์ของคุณ
                  alt="บวก"
                  width={500}
                  height={500}
                  className=" w-full h-auto "
                />
              </span>
              <span className="text-2xl font-bold text-[#093165] hidden group-open:inline">
                <Image
                  src="/icon-minus.svg" // เปลี่ยนพาธให้ตรงกับไฟล์ของคุณ
                  alt="ลบ"
                  width={500}
                  height={500}
                  className=" w-full h-auto "
                />
              </span>
            </summary>
            <p className="text-[#2c2c2c] text-[16px] font-[400] mt-2">
              เรามีคอร์สสอนเทรดพื้นฐานให้คุณทดลองเรียนฟรี
              ให้คุณกล้าที่จะเริ่มต้นครั้งใหม่ ไปกับเรา สามารถเริ่มเรียนได้ฟรี
              ไม่มีค่าใช้จ่ายเพิ่มเติม
            </p>
          </details>
        </div>

        {/* FAQ Item */}
        <div className="bg-[#F3F4F6] rounded-lg p-4 mb-4 2xl:mr-52">
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer">
              <h3 className="text-[#093165] font-[700] text-[24px]">
                มีคอร์สสำหรับทดลองเรียนหรือไม่?
              </h3>
              <span className="text-2xl font-bold text-[#093165] group-open:hidden">
                <Image
                  src="/icon-plus.svg" // เปลี่ยนพาธให้ตรงกับไฟล์ของคุณ
                  alt="บวก"
                  width={500}
                  height={500}
                  className=" w-full h-auto "
                />
              </span>
              <span className="text-2xl font-bold text-[#093165] hidden group-open:inline">
                <Image
                  src="/icon-minus.svg" // เปลี่ยนพาธให้ตรงกับไฟล์ของคุณ
                  alt="ลบ"
                  width={500}
                  height={500}
                  className=" w-full h-auto "
                />
              </span>
            </summary>
            <p className="text-[#2c2c2c] text-[16px] font-[400] mt-2">
              เรามีคอร์สสอนเทรดพื้นฐานให้คุณทดลองเรียนฟรี
              ให้คุณกล้าที่จะเริ่มต้นครั้งใหม่ ไปกับเรา สามารถเริ่มเรียนได้ฟรี
              ไม่มีค่าใช้จ่ายเพิ่มเติม
            </p>
          </details>
        </div>

        {/* FAQ Item */}
        <div className="bg-[#F3F4F6] rounded-lg p-4 mb-4 2xl:mr-52">
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer">
              <h3 className="text-[#093165] font-[700] text-[24px]">
                มีคอร์สสำหรับทดลองเรียนหรือไม่?
              </h3>
              <span className="text-2xl font-bold text-[#093165] group-open:hidden">
                <Image
                  src="/icon-plus.svg" // เปลี่ยนพาธให้ตรงกับไฟล์ของคุณ
                  alt="บวก"
                  width={500}
                  height={500}
                  className=" w-full h-auto "
                />
              </span>
              <span className="text-2xl font-bold text-[#093165] hidden group-open:inline">
                <Image
                  src="/icon-minus.svg" // เปลี่ยนพาธให้ตรงกับไฟล์ของคุณ
                  alt="ลบ"
                  width={500}
                  height={500}
                  className=" w-full h-auto "
                />
              </span>
            </summary>
            <p className="text-[#2c2c2c] text-[16px] font-[400] mt-2">
              เรามีคอร์สสอนเทรดพื้นฐานให้คุณทดลองเรียนฟรี
              ให้คุณกล้าที่จะเริ่มต้นครั้งใหม่ ไปกับเรา สามารถเริ่มเรียนได้ฟรี
              ไม่มีค่าใช้จ่ายเพิ่มเติม
            </p>
          </details>
        </div>
      </div>
    </div>
  );
};

export default Part7;
