import axios from "axios";
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

const CoursesPage = async () => {
  const data = await fetchData();

  return (
    <div className=" p-10 flex">
      {/* Sidebar Filters */}
      <div className="w-1/4 p-4 bg-white shadow-md rounded-lg mr-4">
        <h2 className="text-xl font-bold mb-4">ตัวกรองคอร์สเรียน</h2>
        <select
          className="w-full p-2 mb-4 border rounded-md"
          //   onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">หมวดหมู่ทั้งหมด</option>
          <option value="category1">หมวดหมู่ 1</option>
          <option value="category2">หมวดหมู่ 2</option>
        </select>
        <select
          className="w-full p-2 mb-4 border rounded-md"
          //   onChange={(e) => setSubcategory(e.target.value)}
        >
          <option value="">หมวดหมู่ย่อยทั้งหมด</option>
          <option value="subcategory1">หมวดหมู่ย่อย 1</option>
          <option value="subcategory2">หมวดหมู่ย่อย 2</option>
        </select>
        {/* <button
          className="bg-purple-500 text-white px-4 py-2 rounded-md w-full"
        //   onClick={handleFilterChange}
        >
          ค้นหา
        </button> */}
      </div>

      {/* Courses Display */}
      <div className="w-3/4 mt-3 px-10">
        {/* Search Bar */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="ค้นหา"
            className="flex-grow p-2 border rounded-l-md"
            //   value={searchTerm}
            //   onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded-r-md"
            //   onClick={handleSearch}
          >
            ค้นหา
          </button>
        </div>

        <h1 className="text-2xl font-bold mb-4  mt-10">คอร์สเรียนทั้งหมด</h1>
        {/* {JSON.stringify(data)} */}
        <div className="grid grid-cols-1 md:grid-cols-3  gap-10">
          {data?.map((course, index) => (
            <div
              key={index}
              className="bg-white p-5 shadow-md rounded-2xl  flex flex-col justify-between"
            >
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${course.image}`}
                alt={course.title}
                className=" rounded-t-2xl mb-4"
              />
              <div className="px-10">
                <h2 className="text-lg font-semibold">{course.title}</h2>
                <div className="text-gray-700 mb-4" />
                <p className="text-gray-600">{course.category_name}</p>
                <div className="flex w-full text-wrap gap-3">
                  <p
                    className={`text-xl ${
                      course.price_sale > 0
                        ? "text-red-500 font-semibold"
                        : "text-red-500 font-semibold"
                    }  mb-2  pr-1`}
                  >
                    {course?.price_sale > 0
                      ? course?.price_sale.toLocaleString()
                      : course?.price.toLocaleString()}{" "}
                    บาท
                  </p>
                  <p className="  line-through  mb-2  pr-1">
                    {course?.price_sale > 0
                      ? course?.price.toLocaleString()
                      : ""}{" "}
                  </p>
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
