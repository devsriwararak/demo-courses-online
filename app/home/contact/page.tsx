"use client";
import { Input, Textarea } from "@material-tailwind/react";
import { FaPhoneSquare } from "react-icons/fa";
import { LuMapPin, LuPhone, LuAlarmClock , LuMail  } from "react-icons/lu";


export default function Page() {
  return (
    <div className="bg-gray-100 h-full">
      <div className="mx-auto container px-6 md:px-20 py-10">
        <h1 className="text-3xl ">ติดต่อเรา</h1>

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="w-full ">
            <div className="bg-gray-200 border border-gray-300 shadow-md rounded-md px-6 py-8">
              <h1 className="text-xl text-gray-800">ส่งข้อความหาเรา</h1>
              <div className="flex flex-col md:flex-row gap-2 mt-6">
                <Input
                  crossOrigin="anonymous"
                  type="text"
                  label="ชื่อ"
                  className="bg-white"
                  color="indigo"
                />
                <Input
                  crossOrigin="anonymous"
                  type="text"
                  label="เบอร์โทร"
                  className="bg-white"
                  color="indigo"
                />
              </div>
              <div className="mt-4">
                <Textarea
                  label="รายละเอียด"
                  className="bg-white h-60 border-2 border-white"
                  color="indigo"
                />
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
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione
              repudiandae, velit corporis neque eum, ducimus libero odit
            </p>

            <div className="flex flex-col md:flex-row gap-6 mt-8">
              <div className="w-full border-2 border-gray-300 rounded-md px-4 py-3">
                <div className="flex flex-row gap-4 items-start">
                  <LuMapPin size={60} color="indigo" />
                  <div>
                    <h2 className="text-lg text-gray-800">ที่อยู่</h2>
                    <p className=" text-sm text-gray-600">
                      998/5 ม.7 9.เมืองเก่า อ.เมืองเก่า จ. ขอนแก่น 40000
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full border-2 border-gray-300 rounded-md px-4 py-3">
                <div className="flex flex-row gap-4 items-start">
                  <LuPhone size={60} color="indigo" />
                  <div>
                    <h2 className="text-lg text-gray-800">ที่อยู่</h2>
                    <p className=" text-sm text-gray-600">
                      998/5 ม.7 9.เมืองเก่า อ.เมืองเก่า จ. ขอนแก่น 40000
                    </p>
                  </div>
                </div>
              </div>
            </div>


            <div className="flex flex-col md:flex-row gap-6 mt-6">
              <div className="w-full border-2 border-gray-300 rounded-md px-4 py-3">
                <div className="flex flex-row gap-4 items-start">
                  <LuAlarmClock  size={60} color="indigo" />
                  <div>
                    <h2 className="text-lg text-gray-800">ที่อยู่</h2>
                    <p className=" text-sm text-gray-600">
                      998/5 ม.7 9.เมืองเก่า อ.เมืองเก่า จ. ขอนแก่น 40000
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full border-2 border-gray-300 rounded-md px-4 py-3">
                <div className="flex  gap-4 items-start">
                  <LuMail  size={60} color="indigo" />
                  <div>
                    <h2 className="text-lg text-gray-800">ที่อยู่</h2>
                    <p className=" text-sm text-gray-600">
                      998/5 ม.7 9.เมืองเก่า อ.เมืองเก่า จ. ขอนแก่น 40000
                    </p>
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
