// Component สำหรับแสดงข่าวขนาดใหญ่
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export const fetchNews = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/api/homepage/news`
    );
    return res.data;
  } catch (err) {
    const error = err as { response: { data: { message: string } } };
    console.error(error.response.data.message);
    return []; // Return เป็น array เปล่า เพื่อป้องกัน Error ในการ Map ข้อมูล
  }
};


interface NewsItemProps {
  image: string; // ประเภท string สำหรับ URL ของรูปภาพ
  title: string; // ประเภท string สำหรับหัวข้อข่าว
  description: string; // ประเภท string สำหรับคำบรรยายข่าว
  id: any;
}

interface News {
  id: number;
  image_title: string;
  title: string;
  dec: string;
}

const LargeNewsItem: React.FC<NewsItemProps> = ({
  image,
  title,
  description,
  id,
}) => (
  <div
    className="mt-10 rounded-xl lg:w-5/12 xl:overflow-hidden"
    style={{ background: "#CDCDCD" }}
  >
    <Link href={`/home/activity/${id}`}>
      <Image
        src={image}
        alt={title}
        width={500}
        height={500}
        className="lg:-mt-[50px] w-full h-auto 2xl:h-[300px] object-cover"
        style={{ borderRadius: "12px 12px 0px 0px" }}
      />
      <div className="p-4 px-7">
        <h3 className="text-[16px] sm:text-[18px] font-[700] text-[#093165] mb-4">
          {title}
        </h3>
        <p className="text-[14px] font-[400] text-[#181818] mb-4">
          {description}
        </p>
        <div className="flex gap-3 items-center">
          <button className="bg-[#093165] text-white text-[14px] font-[700] px-4 py-2 rounded-lg">
            อ่านเพิ่มเติม
          </button>
        </div>
      </div>
    </Link>
  </div>
);

// Component สำหรับแสดงข่าวทั่วไป
const NewsItem: React.FC<NewsItemProps> = ({
  image,
  title,
  description,
  id,
}) => (
  <div className="w-full flex flex-col xl:flex-row gap-3 rounded-xl">
    <Link href={`/home/course/${id}`}>
    <Image
      src={image}
      alt={title}
      width={1000}
      height={1000}
      className="xl:w-[350px] object-cover"
      style={{ borderRadius: "12px" }}
    />
    </Link>
    <div className="w-full">
      <div className="p-2 flex flex-col bg-[#cdcdcd] w-full h-full py-5 rounded-lg px-7">
          <Link href={`/home/course/${id}`}>
        <h3 className="text-[16px] sm:text-[18px] font-[700] text-[#093165] mb-4">
          {title}
        </h3>
        <p className="text-[14px] font-[400] text-[#181818] mb-4">
          {description}
        </p>
        <div className="flex gap-3 items-center">
            <button className="bg-[#093165] text-white text-[14px] font-[700] px-4 py-2 rounded-lg">
              อ่านเพิ่มเติม
            </button>
          <span className="text-[14px] font-[400] text-[#181818]">
            12 พ.ค. 2024
          </span>
        </div>
          </Link>
      </div>
    </div>
  </div>
);

// Main Component
const Part4 = async () => {
  const data = await fetchNews();

  return (
    <div className="bg-[#222222] py-10 px-10 h-full 2xl:px-[250px]">
      <h2 className="text-white text-[28px] sm:text-[35px] font-[700] text-nowrap">
        ข่าวสารและกิจกรรมล่าสุด
      </h2>
      <div className="flex flex-col w-full lg:flex-row gap-8">
        <LargeNewsItem
          image={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${data[0]?.image_title}`}
          title={data[0]?.title}
          description={data[0]?.dec}
          id={data[0]?.id}
        />

        <div className="flex flex-col lg:w-7/12 gap-7 lg:mt-[33px] xl:mt-[80px] 2xl:mt-[40px]">
          {data?.slice(1).map((news: News, index: number) => (
              <NewsItem
                key={index}
                id={news.id}
                image={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${news?.image_title}`}
                title={news.title}
                description={news.dec}
              />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Part4;
