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
      `${process.env.NEXT_PUBLIC_API}/api/homepage/reviews/${id}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const SubPortFolioPage: React.FC<PageProps> = async ({ params }) => {
  const data = await fetchData(params.id);
  console.log(data);

  return (
    <div className="container mx-auto flex flex-col mb-5 gap-6 px-6 lg:px-24 mt-10">
      {/* แถบด้านซ้ายและขวา */}
      {JSON.stringify(data)}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* ด้านซ้าย: เนื้อหาและรูปภาพ */}
        <div className="flex-2 lg:w-2/3">
          <div>
            <h1 className="text-2xl font-bold mb-5 text-center lg:text-start">
              {data?.title}
            </h1>
          </div>
          <div>
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${data?.image_title}`}
              alt={data?.title}
              width={2500}
              height={2500}
              objectFit="cover"
              layout="responsive"
              className="w-full h-auto rounded-xl object-cover"
            />
          </div>
          <div className="px-5">
            <p className="text-gray-700 leading-relaxed mt-5">{data?.dec}</p>
          </div>
        </div>

        {/* ด้านขวา: Carousel */}
        <div className="flex-1 lg:w-1/3">
          <CarouselPortFolio data={data?.result_list || []} />
        </div>
      </div>
    </div>
  );
};

export default SubPortFolioPage;
