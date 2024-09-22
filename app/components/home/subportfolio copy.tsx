import axios from "axios";
import Image from "next/image";
import React from "react";
import CarouselPortFolio from "@/app/components/carouselportfolio";

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

// const mockNewsData = [
//   {
//     id: "1",
//     title: "รวมข่าวรายสัปดาห์: ภูฎานมี Bitcoin มากกว่าเอลซัลวาดอร์!",
//     date: "Fri, 20 Sep 2024",
//     image: "/images/news1.jpg", // ใส่ path รูปที่ต้องการทดสอบ
//   },
//   {
//     id: "2",
//     title:
//       "รู้จักโทเคน ATH จาก Aethir โซลูชันการประมวลผล GPU ขับเคลื่อนการเล่นเกม",
//     date: "Wed, 18 Sep 2024",
//     image: "/images/news2.jpg",
//   },
//   {
//     id: "3",
//     title:
//       "ประกาศรายชื่อผู้ที่ได้รับรางวัล ลูกค้าใหม่รับ Bitcoin สูงสุด 500 บาท",
//     date: "Wed, 18 Sep 2024",
//     image: "/images/news3.jpg",
//   },
// ];

const SubPortFolioPage: React.FC<PageProps> = async ({ params }) => {
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

      <div className="flex-1   ">
      <CarouselPortFolio data={data?.result_list || []} />
      </div>

      </div>
     
     
    </div>

  );
};

export default SubPortFolioPage;
