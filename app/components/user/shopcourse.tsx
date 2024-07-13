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
  {
    title: "Course 2",
    dec: "Description for course 2  sit amet consectetur adipisicing elit. Cupiditate placeat tempora suscipit ipsum, doloribus maiores in recusandae amet? Harum laboriosam facere, explicabo vero odit odio earum nulla consequatur similique magnam, eaque commodi id animi voluptatibus at. Exercitationem eligendi illo odit, recusandae esse, labore a incidunt hic nisi sit qui doloribus!",
    image: "/pic4.jpg",
    price: 2500,
    price_sale: 0,
  },
  {
    title: "Course 3",
    dec: "Description for course 3",
    image: "/pic4.jpg",
    price: 4200,
    price_sale: 250,
  },
  {
    title: "Course 4",
    dec: "Description for course 2",
    image: "/pic4.jpg",
    price: 3000,
    price_sale: 1500,
  },
  {
    title: "Course 5",
    dec: "Description for course 2",
    image: "/pic4.jpg",
    price: 5500,
    price_sale: 0,
  },
  {
    title: "Course 6",
    dec: "Description for course 2",
    image: "/pic4.jpg",
    price: 7000,
    price_sale: 5000,
  },
  {
    title: "Course 7",
    dec: "Description for course 2",
    image: "/pic4.jpg",
    price: 3000,
    price_sale: 0,
  },
  {
    title: "Course 8",
    dec: "Description for course 2",
    image: "/pic4.jpg",
    price: 6000,
    price_sale: 0,
  },
  // Add more courses as needed
];

const slides = [
  { src: "/banner1.png", alt: "Picture 1" },
  // { src: "/pic2.jpg", alt: "Picture 2" },
  //   { src: "/pic3.jpg", alt: "Picture 3" },
];

const truncateText = (text: string, limit: number) => {
  if (text.length > limit) {
    return text.substring(0, limit) + "...";
  }
  return text;
};

const ShopCourse: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>("ทั้งหมด");
  const router = useRouter();

  const [buyCourse, setBuyCourse] = useRecoilState(BuyCourseStore);

  const handleBuyNow = (course: Course) => {
    setBuyCourse(course);
    router.push("/user/buycourse");
  };

  return (
    <div
      className="  "
      // style={{
      //   backgroundImage:
      //     "linear-gradient(109.6deg,   rgba(215,223,252,1) 0%, rgba(255,255,255,1) 0%, rgba(215,223,252,1) 84% )",
      // }}
    >
      <ToastContainer autoClose={2000} theme="colored" />
      <div className="p-1  ">
        <div
          className="flex flex-col lg:flex-row  w-full  rounded-lg gap-5 px-36 py-10 justify-center items-center  bg-purple-200 bg-opacity-20"
          // style={{
          //   backgroundColor:"#F3CEFF"
          // }}
          // style={{
          //   backgroundImage:
          //     "linear-gradient(150deg,  rgba(162,102,246,1) 10.8%, rgba(203,159,249,1) 94.3%)",
          // }}
        >
          <div className="w-full lg:w-5/12 pt-4 px-5 lg:ps-4   ">
            <div className="flex flex-col gap-5  ">
              <div>
                <Typography className=" txt-xl md:text-4xl   font-bold">
                  คอร์สเทรดออนไลน์
                </Typography>
           
              </div>
              <div className=" bg-white rounded-lg  lg:mb-0 w-full xl:w-[60%]">
                <Input
                  type="text"
                  label="ค้นหาคอร์สเรียน"
                  icon={<FaSearch />}
                  crossOrigin="anonymous"
                  className="bg-white  !bg-opacity-100"
                />
              </div>
              <Typography className="text-md">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Typography>
            </div>
          </div>
          <div className="flex  justify-center items-end w-full  lg:w-7/12 ">

          <Image
           
            src={"/banner1.png"}
            alt=""
            width={550}
            height={500}
            className=" object-cover "
            crossOrigin=''
          />
            {/* <div className="flex justify-center  py-2 px-2 ">
              <Carousel slides={slides} />
            </div> */}
          </div>
        </div>
      </div>


      {/* section - 2 */}

      <div className=" px-28">
      <div className="mt-8">
        <Typography className="text-lg font-bold">คอร์สแนะนำ</Typography>
      </div>
      <div className=" flex flex-wrap gap-2 justify-start mt-6 ">
        {courseCategories.map((category, index) => (
          <Button
            key={index}
            variant="outlined"
            className={`${
              selectedCategory === category
                ? "bg-purple-500 text-white"
                : "border border-purple-500 text-purple-500"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      <div className="flex justify-center mt-4 ">
        <div className=" grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 ">
          {recommendedCourses.map((course, index) => (
            <Card
              key={index}
              className="w-full mt-5  flex flex-col justify-between border border-gray-300"
              // style={{
              //   backgroundImage:
              //     "linear-gradient(180.6deg,  rgba(228,107,232,1) 11.2%, rgba(87,27,226,1) 96.7% )",
              // }}
            >
              <div>
                <div className="flex w-full h-[200px]">
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={330}
                    height={0}
                    priority
                    className="rounded-lg rounded-b-none object-cover mb-4"
                  />
                </div>

                <div className="px-2 md:px-4 ">
                <Typography className="text-lg font-semibold text-black ps-2">
                    {truncateText(course.title, 30)}
                  </Typography>

                  <Typography className="text-sm mt-2 text-gray-800 ps-3 pr-1">
                    {truncateText(course.dec, 90)}
                  </Typography>

                </div>
            
              </div>
              
              <div className="flex flex-col mt-4 px-6 pb-5 ">
                <div className="flex w-full text-wrap">
                  <Typography
                    className={`text-xl ${
                      course.price_sale > 0
                        ? "text-red-500 font-semibold"
                        : "text-black"
                    }  mb-2  pr-1`}
                  >
                    {course?.price_sale > 0
                      ? course?.price_sale.toLocaleString()
                      : course?.price.toLocaleString()}{" "}
                    บาท
                  </Typography>
                </div>
                <Button
                  className="w-full justify-center items-center text-base font-normal "
                  variant="outlined"
                  color="purple"
                  size="sm"
                  // style={{
                  //   backgroundImage:
                  //     "linear-gradient(150deg, rgba(162,102,246,1) 10.8%, rgba(203,159,249,1) 94.3%)",
                  // }}
                  onClick={() => handleBuyNow(course)}
                >
                  ซื้อตอนนี้
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      </div>

    



    </div>
  );
};

export default ShopCourse;
