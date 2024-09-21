"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface Course {
  id: number;
  image_title: string;
  title: string;
  dec: string;
  category_name: string;
  price: number;
  price_sale: number;
}

const ActivityPage = () => {
  const [data, setData] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    const requestData = {
      page: page,
      search: "",
      full: false,
      home: false,
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/homepage/news`,
        requestData
      );
      if (res.status === 200) {
        setData(res.data);
        setTotalPages(res.data.totalPages || 1);
      } else {
        console.error("Error fetching data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  // Handle page change from select
  const handlePageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPage = Number(event.target.value);
    setPage(selectedPage);
  };

  return (
    <div className="p-6 md:p-12 flex flex-col">
      <div className="w-full">
        <div className="flex flex-col md:flex-row items-center justify-between mt-5 md:mt-10">
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              คอร์สเรียน{" "}
              <span className="text-blue-500 font-bold">ทั้งหมด</span>
            </h1>
            <p className="text-gray-600">
              ผลลัพท์การค้นหา <span className="font-semibold">{data?.data?.length || 0} คอร์ส</span>
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            {/* Select element for page navigation */}
            <select
              className="p-2 border px-5 border-gray-300 rounded-md shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out"
              value={page}
              onChange={handlePageChange}
            >
              {Array.from({ length: totalPages }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  หน้าที่ {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mt-10 gap-8">
          {data?.data?.map((course: Course, index: number) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <Link href={`/home/activity/${course?.id}`}>
                <div className="relative h-48">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${course?.image_title}`}
                    alt={course?.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {course?.title}
                  </h2>
                  <p className="text-gray-600 text-sm">{course?.dec}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;
