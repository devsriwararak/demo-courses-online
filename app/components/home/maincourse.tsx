import axios from "axios";
import Image from "next/image";
import React from "react";

const fetchData = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/api/homepage/courses/`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

interface Course {
    id: number; // Assuming courses have a unique identifier
    image: string;
    title: string;
    category_name: string;
    price: number;
    price_sale: number;
  }

const CoursesPage = async () => {
  const data = await fetchData();

  return (
    <div className="p-5 md:p-10 2xl:px-10 flex flex-col md:flex-row">
      {/* Sidebar Filters */}
      <div className="w-full md:w-1/4 p-4 bg-white shadow-md rounded-lg mb-5 md:mb-0 md:mr-4">
        <h2 className="text-lg md:text-xl font-bold mb-4">ตัวกรองคอร์สเรียน</h2>
        <select className="w-full p-2 mb-4 border rounded-md">
          <option value="">หมวดหมู่ทั้งหมด</option>
          <option value="category1">หมวดหมู่ 1</option>
          <option value="category2">หมวดหมู่ 2</option>
        </select>
        <select className="w-full p-2 mb-4 border rounded-md">
          <option value="">หมวดหมู่ย่อยทั้งหมด</option>
          <option value="subcategory1">หมวดหมู่ย่อย 1</option>
          <option value="subcategory2">หมวดหมู่ย่อย 2</option>
        </select>
      </div>

      {/* Courses Display */}
      <div className="w-full md:w-3/4 2xl:px-10">
        {/* Search Bar */}
        <div className="flex flex-col md:flex-row items-center mb-4">
          <input
            type="text"
            placeholder="ค้นหา"
            className="flex-grow p-2 border rounded-md md:rounded-l-md mb-2 md:mb-0 md:mr-2"
          />
          <button className="bg-purple-500 text-white px-4 py-2 rounded-md md:rounded-r-md">
            ค้นหา
          </button>
        </div>

        <div className="flex items-center justify-between  mt-5 md:mt-10">
          <div>
            <p className="text-xl md:text-2xl font-bold  ">
              คอร์สเรียน{" "}
              <span className="text-[#3e8df3] font-bold">ทั้งหมด</span>
            </p>
            <p className="mb-4 ">
              ผลลัพท์การค้นหา <span>{data?.length} คอร์ส </span>
            </p>
          </div>

          <div>
            <select className="w-full p-2 mb-4 border rounded-md">
              <option value="">ทั้งหมด</option>
              <option value="subcategory1">หมวดหมู่ย่อย 1</option>
              <option value="subcategory2">หมวดหมู่ย่อย 2</option>
            </select>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
        {data?.map((course: Course, index: number) => (
            <div
              key={index}
              className="bg-white p-5 shadow-md rounded-2xl flex flex-col justify-between"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${course.image}`}
                alt={course.title}
                width={100}
                height={100}
                className="rounded-t-2xl mb-4 object-cover h-48 w-full"
              />
              <div className="px-2 md:px-5">
                <h2 className="text-md md:text-lg font-semibold">
                  {course.title}
                </h2>
                <p className="text-gray-600">{course.category_name}</p>
                <div className="flex w-full flex-wrap gap-3">
                  <p
                    className={`text-lg md:text-xl ${
                      course.price_sale > 0
                        ? "text-red-500 font-semibold"
                        : "text-red-500 font-semibold"
                    } mb-2 pr-1`}
                  >
                    {course?.price_sale > 0
                      ? course?.price_sale.toLocaleString()
                      : course?.price.toLocaleString()}{" "}
                    บาท
                  </p>
                  {course?.price_sale > 0 && (
                    <p className="line-through mb-2 pr-1">
                      {course?.price.toLocaleString()}{" "}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-auto px-5">
                <button className="bg-[#184785] text-white px-4 py-2 rounded-md w-full">
                  ดูคอร์สเรียนนี้
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
