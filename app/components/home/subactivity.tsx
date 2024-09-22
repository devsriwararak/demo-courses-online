import axios from "axios";
import Image from "next/image";
import React from "react";
import { isArray } from "util";
import CarouselActivity from "@/app/components/carouselactivity";

interface PageProps {
  params: {
    id: string;
  };
}

const fetchData = async (id: String) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/api/homepage/news/${id}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const mockNewsData = [
  {
    id: "1",
    title: "รวมข่าวรายสัปดาห์: ภูฎานมี Bitcoin มากกว่าเอลซัลวาดอร์!",
    date: "Fri, 20 Sep 2024",
    image: "/images/news1.jpg", // ใส่ path รูปที่ต้องการทดสอบ
  },
  {
    id: "2",
    title:
      "รู้จักโทเคน ATH จาก Aethir โซลูชันการประมวลผล GPU ขับเคลื่อนการเล่นเกม",
    date: "Wed, 18 Sep 2024",
    image: "/images/news2.jpg",
  },
  {
    id: "3",
    title:
      "ประกาศรายชื่อผู้ที่ได้รับรางวัล ลูกค้าใหม่รับ Bitcoin สูงสุด 500 บาท",
    date: "Wed, 18 Sep 2024",
    image: "/images/news3.jpg",
  },
];

const ActivityPage: React.FC<PageProps> = async ({ params }) => {
  const data = await fetchData(params.id);
  console.log(data);


  return (
    <div className=" container mx-auto  flex flex-col mb-5 gap-6 px-6 lg:px-24 mt-10">
      {/* แถบด้านซ้าย */}
      {/* {JSON.stringify(data)} */}
      <div className="flex flex-col lg:flex-row gap-6">

    
      <div className="flex-1 ">
        <div>
          <h1 className="text-2xl font-bold mb-5 text-center lg:text-start">{data.title}</h1>
        </div>
        <div>
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${data?.image_title}`}
            alt={data?.title}
            width={2500}
            height={2500}
            objectFit="cover" // ทำให้ภาพครอบคลุมพื้นที่โดยรักษาสัดส่วน
            layout="responsive" // ทำให้ภาพเป็น responsive
            className="w-full h-auto rounded-xl  object-cover "
          />
        </div>
        <div className="px-5">
          <p className="text-gray-700 leading-relaxed mt-5">{data?.dec}</p>
        </div>
      </div>

      {/* แถบด้านขวา */}
      <div className="lg:w-4/12 bg-gray-50 p-4 rounded-md">
        <h2 className="text-lg font-semibold mb-4 text-green-500">ข่าว</h2>
        {/* <div className="flex space-x-4 border-b-2">
        <button className="pb-2 border-b-2 border-green-500 text-black">
          BITKUB
        </button>
        <button className="pb-2 text-gray-400">SIAM BLOCKCHAIN</button>
      </div> */}
        <ul className="mt-4 space-y-4">
          {mockNewsData.map((newsItem, index) => (
            <li
              key={index}
              className="flex space-x-4 items-start border-b pb-4"
            >
              <div className="w-16 h-16 relative">
                <Image
                  src={"/pic1.jpg" || "/default-image.jpg"}
                  alt={newsItem.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <div className="flex-1">
                <a
                  href={`/news/${newsItem.id}`}
                  className="text-sm text-black font-medium hover:underline"
                >
                  {newsItem.title}
                </a>
                <p className="text-xs text-gray-500 mt-1">{newsItem.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      </div>
      <div className="p-5  ">
      <CarouselActivity data={data?.result_list || []} />
      </div>
    </div>

  );
};

export default ActivityPage;
