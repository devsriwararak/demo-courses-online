import React from "react";
import axios from "axios";
import Image from "next/image";

export const fetchNews = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/api/homepage/news`
    );
    return res.data;
  } catch (err) {
    const error = err as { response: { data: { message: string } } };
    console.error(error.response.data.message);
  }
};

const Part4 = async () => {
  const data = await fetchNews();

  console.log(data);
  return (
    <div className="bg-[#222222] py-10 px-10 h-full  2xl:px-[250px] ">
      <h2 className="text-white text-[28px] sm:text-[35px] font-[700] text-nowrap">
        ข่าวสารและกิจกรรมล่าสุด
      </h2>
      <div className="flex flex-col w-full  lg:flex-row gap-8 ">
        {/* บล็อกข่าวใหญ่ทางซ้าย */}
        <div
          className=" mt-10   rounded-xl  lg:w-5/12 xl:overflow-hidden "
          style={{
            top: "183px",
            left: "270px",
            background: "#CDCDCD",
            // borderRadius: "12px 12px 12px 12px", // โค้งเฉพาะมุมซ้ายบน
            // boxShadow: "2px -1px 6.7px #00000040", // เงาตามที่ระบุ
          }}
        >
          <img
            src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${data[0].image_title}`}
            alt={data[0].id}
            className=" lg:-mt-[50px] w-full h-auto 2xl:h-[300px] object-cover "
            style={{
              borderRadius: "12px 12px 0px 0px", // ปรับ border-radius ตามที่กำหนด
            }}
          />
          <div className="p-4 px-7">
            <h3 className="text-[16px] sm:text-[18px] font-[700] text-[#093165]  mb-4">
            {data[0].title}
            </h3>
            <p className="text-[14px] font-[400] text-[#181818] mb-4 ">
            {data[0].dec}
            </p>
            <div className="flex gap-3 items-center ">
              <button className="bg-[#093165] text-white text-[14px] font-[700] px-4 py-2 rounded-lg">
                อ่านเพิ่มเติม
              </button>
              {/* <span className="text-[14px] font-[400]  text-[#181818]">
                12 พ.ค. 2024
              </span> */}
            </div>
          </div>
        </div>

        {/* บล็อกข่าวทางขวา */}
        <div className="flex flex-col lg:w-7/12  gap-7 lg:mt-[33px] xl:mt-[80px] 2xl:mt-[40px]  ">
          {/* ข่าวที่ 1 */}
          <div className="w-full flex flex-col xl:flex-row gap-3 rounded-xl ">
            <img
              src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${data[1].image_title}`}
            alt={data[1].id}
              className="xl:w-[350px]  object-cover "
              style={{
                borderRadius: "12px 12px 12px 12px", 
              }}
            />

            <div className="w-full   ">
              <div className="p-2 flex flex-col bg-[#cdcdcd] w-full h-full  py-5 rounded-lg px-7">
                <h3 className="text-[16px] sm:text-[18px] font-[700]  text-[#093165]  mb-4 ">
                {data[1].title}
                </h3>
                <p className="text-[14px] font-[400] text-[#181818] mb-4">
                {data[1].dec}
                </p>
                <div className="flex gap-3 items-center">
                  <button className="bg-[#093165] text-white text-[14px] font-[700] px-4 py-2 rounded-lg">
                    อ่านเพิ่มเติม
                  </button>
                  <span className="text-[14px] font-[400]  text-[#181818]">
                    12 พ.ค. 2024
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ข่าวที่ 2 */}
          <div className="w-full flex flex-col xl:flex-row gap-3 rounded-xl ">
            <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${data[2].image_title}`}
                  alt={data[2].id}
              className="  xl:w-[350px]    object-cover "
              style={{
                borderRadius: "12px 12px 12px 12px", // ปรับ border-radius ตามที่กำหนด
              }}
            />
            <div className="w-full ">
              <div className="p-2 flex flex-col bg-[#cdcdcd] w-full h-full  py-5   rounded-lg px-7">
                <h3 className=" text-[16px] sm:text-[18px] font-[700]  text-[#093165] mb-4 ">
                  {data[2].title}
                </h3>
                <p className=" text-[14px] font-[400] text-[#181818] mb-4">
                {data[2].dec}
                </p>
                <div className="flex gap-3 items-center">
                  <button className="bg-[#093165] text-white text-[14px] font-[700] px-4 py-2 rounded-lg">
                    อ่านเพิ่มเติม
                  </button>
                  <span className="text-[14px] font-[400] text-[#181818]">
                    12 พ.ค. 2024
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Part4;
