"use client";
import axios from "axios";
import Image from "next/image";
import parse from "html-react-parser";
import React, { useEffect, useState } from "react";

// กำหนดโครงสร้างของข้อมูลข่าว
interface NewsItem {
  id: string;
  title: string;
  dec: string;
  image: string;
  image_title: string;
}

// กำหนดประเภทของ props ที่คอมโพเนนต์จะรับ
interface NewsSidebarProps {
  id: string;
  name: string;
  title: string
}

const NewsSidebar: React.FC<NewsSidebarProps> = ({ id, name, title }) => {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);

  // ฟังก์ชันดึงข้อมูลข่าวจาก API
  const fetchNews = async () => {
    const requestData = {
      name,
      id,
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/homepage/top_4`,
        requestData
      );
      setNewsData(res.data || []);
    } catch (error) {
      console.log("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [id, name]);

  const getImageSource = (newsItem: NewsItem) => {
    if (name === "products") {
      return newsItem?.image;
    } else if (name === "reviews") {
      return newsItem?.image_title;
    } else if (name === "activity") {
      return newsItem?.image_title;
    }
    return newsItem.image; // ค่าเริ่มต้น
  };

  console.log(newsData);

  return (
    <div className="w-full bg-white p-4 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-green-500">แนะนำ {title}</h2>
      <hr />
      <ul className="mt-4 space-y-4">
        {newsData.map((newsItem, index) => (
          <li key={index} className="flex space-x-4 items-start border-b pb-4">
            <div className="w-20 h-20 relative">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${getImageSource(newsItem)}`}
                alt={newsItem.title}
                width={500}
                height={500}
                className="rounded-md object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-black font-medium">{newsItem?.title}</p>
             <div>{parse(newsItem?.dec)}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsSidebar;
