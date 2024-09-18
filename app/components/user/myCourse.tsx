"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import Image from "next/image";

import Carousel from "../carousel";

import axios from "axios";
import { HeaderAPI } from "@/headerApi";

import CryptoJS from "crypto-js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



import { FaSearch } from "react-icons/fa";

import { useRecoilState } from "recoil";
import { BuyCourseStore } from "@/store/store";

interface Category {
  name: string;
  id: any;
  category_name:string
}

interface Course {
  title: string;
  dec: string;
  id: number ;
  image: string;
  price: number;
  price_sale: number;
  category_name:string
}

// const slides = [
//   { src: "/banner1.png", alt: "Picture 1" },
//   // { src: "/pic2.jpg", alt: "Picture 2" },
//   //   { src: "/pic3.jpg", alt: "Picture 3" },
// ];

const truncateText = (text: string, limit: number) => {
  if (text.length > limit) {
    return text.substring(0, limit) + "...";
  }
  return text;
};

const ShopCourse: React.FC = () => {

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "ทั้งหมด"
  );
  const [courseCategories, setCourseCategories] = useState<Category[]>([]);
  const [product, setProduct] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectCatetegory, setSelectCatetegory] = useState(0);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "your_secret_key";

  const decryptData = (ciphertext: string) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const userId = decryptData(localStorage.getItem("Id") || "");

  const fetchCategory = useCallback(async () => {
    const requestData = {
      users_id: userId || 0,
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/users/category`,
        requestData,
        {
          ...HeaderAPI(decryptData(localStorage.getItem("Token") || "")),
        }
      );
      console.log(res.data);
      if (res.status === 200) {
        setCourseCategories(res.data);
      } else {
        toast.error("error");
      }
    } catch (error) {
      console.error(error);
      toast.error("error");
    }
  }, [page, searchQuery]);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchProduct = useCallback(async () => {
    const requestData = {
      // page: page,
      users_id: userId || 0,
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/users/category`,
        requestData,
        {
          ...HeaderAPI(decryptData(localStorage.getItem("Token") || "")),
        }
      );
      console.log(res.data);
      if (res.status === 200) {
        setProduct(res.data.data);
      } else {
        toast.error("error");
      }
    } catch (error) {
      console.error(error);
      toast.error("error");
    }
  }, [searchQuery, selectCatetegory]);

  useEffect(() => {
    fetchProduct();
  }, [searchQuery,selectCatetegory]);




 


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
          className="flex flex-col lg:flex-row  w-full  rounded-lg gap-5 px-6 sm:px-16 lg:px-36 py-10 justify-center items-center  bg-purple-200 bg-opacity-20"
          // style={{
          //   backgroundColor:"#F3CEFF"
          // }}
          // style={{
          //   backgroundImage:
          //     "linear-gradient(150deg,  rgba(162,102,246,1) 10.8%, rgba(203,159,249,1) 94.3%)",
          // }}
        >
          <div className="w-full lg:w-5/12 pt-4 md:px-5 lg:ps-4   ">
            <div className="flex flex-col  gap-5 ">
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
                  onChange={(e)=> setSearchQuery(e.target.value)}
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

      <div className=" px-6 md:px-28">
      <div className="mt-8">
        <Typography className="text-lg font-bold">คอร์สแนะนำ</Typography>
      </div>
      <div className=" flex flex-col md:flex-row flex-wrap gap-2 justify-start mt-6 ">
        {courseCategories?.map((category, index) => (
          <Button
            key={index}
            variant="outlined"
            className={`${
              selectedCategory === category.id
                ? "bg-purple-500 text-white"
                : "border border-purple-500 text-purple-500"
            }`}
            // onClick={() => setSelectedCategory(category)}
          >
            {category?.category_name}
          </Button>
        ))}
      </div>
      <div className="flex justify-center mt-4 ">
        <div className=" grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 ">
          {product?.map((course, index) => (
            <Card
              key={index}
              className="w-full mt-5  flex flex-col justify-between border border-gray-300 cursor-pointer"
              onClick={() => router.push("/user/study")}
              // style={{
              //   backgroundImage:
              //     "linear-gradient(180.6deg,  rgba(228,107,232,1) 11.2%, rgba(87,27,226,1) 96.7% )",
              // }}
            >
              <div>
                <div className="flex w-full h-[200px]">
                  <Image
                     src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${course.image}`}
                    alt={course.title}
                    width={500}
                    height={500}
                    priority
                    className="rounded-lg rounded-b-none object-cover mb-4"
                    style={{width:"100%" , height:"100%"}}
                  />
                </div>

                <div className="px-2 md:px-4 mt-5">
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

    



    </div>
  );
};

export default ShopCourse;
