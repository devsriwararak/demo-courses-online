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
    <div className="p-5 md:p-10 2xl:px-10 flex flex-col md:flex-row">
      <div className="w-full 2xl:px-10">
        <div className="flex items-center justify-between mt-5 md:mt-10">
          <div>
            <p className="text-xl md:text-2xl font-bold">
              คอร์สเรียน{" "}
              <span className="text-[#3e8df3] font-bold">ทั้งหมด</span>
            </p>
            <p className="mb-4">
              ผลลัพท์การค้นหา <span>{data?.data?.length || 0} คอร์ส</span>
            </p>
          </div>

          <div>
            {/* Select element for page navigation */}
            <select
              className="w-full p-2 mb-4 border rounded-md"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mt-10 gap-10">
          {data?.data?.map((course: Course, index: number) => (
            <div
              key={index}
              className="bg-white pb-3 shadow-md rounded-2xl flex flex-col justify-between"
            >
              <Link href={`/home/activity/${course.id}`}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${course.image_title}`}
                  alt={course.title}
                  width={1500}
                  height={1500}
                  className="rounded-t-2xl mb-4 object-cover h-48 w-full"
                />
                <div className="px-2 md:px-5">
                  <h2 className="text-md md:text-lg font-semibold">
                    {course.title}
                  </h2>
                  <p className="text-gray-600">{course.dec}</p>
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
