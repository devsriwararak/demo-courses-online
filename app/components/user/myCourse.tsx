"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import Image from "next/image";

import Carousel from "../carousel";

import { FaSearch } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

import { useRecoilState } from "recoil";
import { BuyCourseStore } from "@/store/store";

const courseCategories = [
  "ทั้งหมด",
  "การตลาดออนไลน์",
  "ธุรกิจ",
  "การเงิน & ลงทุน",
  "การพัฒนาตนเอง",
  "การพัฒนาซอฟต์แวร์",
  "การออกแบบ",
  "ถ่ายภาพ & วีดิโอ",
];

interface Course {
  title: string;
  dec: string;
  image: string;
  price: number;
  price_sale: number;
}

const recommendedCourses: Course[] = [
  {
    title:
      "Course 1 asfksdmkf dskjfjsdj;fjksd jkdsjfdllkljf  jkjsdjfjsldf kjsdkjfkljs",
    dec: "Description for course 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate placeat tempora suscipit ipsum, doloribus maiores in recusandae amet? Harum laboriosam facere, explicabo vero odit odio earum nulla consequatur similique magnam, eaque commodi id animi voluptatibus at. Exercitationem eligendi illo odit, recusandae esse, labore a incidunt hic nisi sit qui doloribus!",
    image: "/pic4.jpg",
    price: 5900,
    price_sale: 0,
  },

  // Add more courses as needed
];

const slides = [
  { src: "/pic1.jpg", alt: "Picture 1" },
  { src: "/pic2.jpg", alt: "Picture 2" },
  //   { src: "/pic3.jpg", alt: "Picture 3" },
];

const truncateText = (text: string, limit: number) => {
  if (text.length > limit) {
    return text.substring(0, limit) + "...";
  }
  return text;
};

const MyCourse: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const router = useRouter();

  const [buyCourse, setBuyCourse] = useRecoilState(BuyCourseStore);

  const handleBuyNow = (course: Course) => {
    setBuyCourse(course);
    router.push("/user/buycourse");
  };

  return (
    <div
      className=" h-full "
      style={{
        backgroundImage:
          "linear-gradient(109.6deg,   rgba(215,223,252,1) 0%, rgba(255,255,255,1) 0%, rgba(215,223,252,1) 84% )",
      }}
    >
      <ToastContainer autoClose={2000} theme="colored" />
      <div className="p-1">
        <div
          className="flex flex-col lg:flex-row   w-full  rounded-lg gap-5"
          style={{
            backgroundImage:
              "linear-gradient(150deg,  rgba(162,102,246,1) 10.8%, rgba(203,159,249,1) 94.3%)",
          }}
        >
          <div className="w-full lg:w-5/12 pt-4 px-5 lg:ps-4   ">
            <div className="flex flex-col gap-5">
              <div>
                <Typography className="text-xl  text-white font-bold">
                  Hearder Title
                </Typography>
                <Typography className="text-md mt-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Corrupti obcaecati dolore pariatur labore magnam excepturi
                  autem ea laudantium similique sint.
                </Typography>
              </div>
              <div className=" bg-white rounded-lg p-2 lg:mb-2 w-full xl:w-[60%]">
                <Input
                  type="text"
                  label="ค้นหาคอร์สเรียน"
                  icon={<FaSearch />}
                  crossOrigin="anonymous"
                  className="bg-white  !bg-opacity-100"
                />
              </div>
            </div>
          </div>
          <div className="flex  justify-center w-full lg:w-7/12 ">
            <div className="flex justify-center  w-[550px] h-[220px] py-2 px-2 ">
              <Carousel slides={slides} />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Typography className="text-lg font-bold">คอร์สแนะนำ</Typography>
      </div>
      <div className=" flex flex-wrap gap-2 justify-center ">
        {courseCategories.map((category, index) => (
          <Button
            key={index}
            variant="outlined"
            className={`${
              selectedCategory === category
                ? "bg-purple-500 opacity-75 text-white"
                : " hover:border hover:border-purple-500 hover:text-purple-800 hover:font-bold"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      <div className="flex justify-center ">
        <div className="p-4 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 ">
          {recommendedCourses.map((course, index) => (
            <Card
              key={index}
              className="w-[310px] mt-5  flex flex-col justify-between"
              style={{
                backgroundImage:
                  "linear-gradient(180.6deg,  rgba(228,107,232,1) 11.2%, rgba(87,27,226,1) 96.7% )",
              }}
            >
              <div>
                <div className="flex w-full h-[200px]">
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={310}
                    height={0}
                    priority
                    className="rounded-lg rounded-b-none object-cover mb-4"
                  />
                </div>
                <div>
                  <Typography className="text-lg font-semibold text-white ps-2">
                    {truncateText(course.title, 30)}
                  </Typography>
                </div>
                <div className="flex w-full text-wrap">
                  <Typography className="text-sm mt-2 text-white ps-3 pr-1">
                    {truncateText(course.dec, 90)}
                  </Typography>
                </div>
              </div>
              <div className="flex flex-col mt-auto px-4 pb-5">
                <Button
                  className="w-full justify-end items-center text-base font-normal mb-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(150deg, rgba(162,102,246,1) 10.8%, rgba(203,159,249,1) 94.3%)",
                  }}
                  onClick={() => router.push("/user/study")}
                >
                  {`ดูเนื้อหา >>>`}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCourse;
