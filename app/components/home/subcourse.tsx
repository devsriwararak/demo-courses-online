import axios from "axios";
import Image from "next/image";
import React from "react";
import parse from "html-react-parser";

interface PageProps {
  params: {
    id: string;
  };
}

const fetchData = async (id: String) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/api/homepage/courses/${id}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const SubCourse: React.FC<PageProps> = async ({ params }) => {
  const data = await fetchData(params.id);
  console.log(data);

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
      {/* ส่วนข้อมูลหลัก */}
      <div className="lg:col-span-2 md:col-span-1 ">
        {/* {JSON.stringify(data)} */}
        <div className="flex flex-col gap-10    ">
          <div className="bg-white shadow  rounded-xl">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${data?.product_image}`}
              alt={data?.product_title}
              width={2500}
              height={2500}
              className="w-full h-auto rounded-xl object-cover "
            />
          </div>
          <div className=" flex flex-col  gap-5 px-10 ">
          <div >
            <h1 className="text-xl lg:text-2xl font-bold">
              {data?.product_title}
            </h1>
            <h1 className="text-xl lg:text-2xl font-bold">
              {data?.product_id}
            </h1>
          </div>
          <div >{parse(data?.product_dec || '')}</div>
          </div>
        </div>

        {/* แสดงรายละเอียดบทเรียนโดยใช้ details และ summary */}
        <details className="mt-4  mb-10">
          <summary className="text-blue-500 text-center cursor-pointer  hover:text-blue-600 transition duration-200 ease-in-out">
            แสดงเพิ่มเติม
          </summary>
            <h2>รายละเอียดบทเรียน</h2>
          <div className="mt-2 bg-gray-50 rounded-b">
            {data?.result_list?.map((lesson: any, index: number) => (
              <div
                key={index}
                className="flex border-b last:border-none py-2 px-5 justify-between items-center hover:bg-gray-100 transition duration-200"
              >
                <h4 className="font-semibold text-gray-700">{lesson.title}</h4>
                <p className="text-gray-600">{lesson.video_count} บทเรียน</p>
              </div>
            ))}
          </div>
        </details>
      </div>

      {/* ส่วนข้อมูลเพิ่มเติม */}
      <div className="bg-gray-100 shadow p-4 rounded">
        <h2 className="text-md lg:text-lg font-bold mb-2">
          รายละเอียดการเรียน
        </h2>
        <p>คอร์สนี้เหมาะสำหรับ...</p>
        <button className="bg-purple-500 text-white py-2 px-4 rounded mt-2">
          ลงทะเบียนเรียน
        </button>
        <div className="mt-4">
          <h3 className="text-sm lg:text-md font-bold">
            Certificate of Completion
          </h3>
          {/* <img
            src="/path/to/certificate.jpg"
            alt="Certificate"
            className="w-full h-auto mt-2"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default SubCourse;
