"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import Image from "next/image";

import axios from "axios";
import { HeaderAPI } from "@/headerApi";

import CryptoJS from "crypto-js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaSearch } from "react-icons/fa";

import Banner from "./banner";
import parse from "html-react-parser";

interface Category {
  name: string;
  category_id: number;
  category_name:string
}

interface Course {
  products_title: string;
  products_dec: string;
  products_id: number ;
  products_image: string;
  products_price: number;
  products_price_sale: number;
}

const truncateText = (text: string, limit: number) => {
  if (text?.length > limit) {
    return text.substring(0, limit) + "...";
  }
  return text;
};

const ShopCourse: React.FC = () => {

  const [selectedCategory, setSelectedCategory] = useState<number | null>(0);
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
      search: searchQuery,
      page: 1,
      full:true,
      category_id:selectedCategory || 0,
    };
    try {
      console.log(requestData)
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/users/product`,
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
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    fetchProduct();
  }, [searchQuery,selectedCategory]);

  console.log(courseCategories)
  console.log(selectedCategory)
  return (
    <div>
      <ToastContainer autoClose={2000} theme="colored" />


      {/* section - 2 */}

      <div className=" px-6 md:px-28 py-10">

      <div className=" bg-white rounded-lg  lg:mb-0 w-[300px]">
          <Input
            type="text"
            label="ค้นหาคอร์สเรียน"
            icon={<FaSearch />}
            crossOrigin="anonymous"
            className="bg-white  !bg-opacity-100"
            onChange={(e) => setSearchQuery(e.target.value)}
            color="indigo"
          />
        </div>
      <div className="mt-8">
        <Typography className="text-3xl  text-black  font-light">คอร์สของฉัน</Typography>
      </div>
      <div className=" flex flex-col md:flex-row flex-wrap gap-2 justify-start mt-6 ">
      <Button
            variant="gradient"
            color="indigo"
            className={`${
              selectedCategory === 0
                ? "bg-purple-500 text-white font-light"
                : "border border-white text-white font-light"
            }`}
            onClick={() => setSelectedCategory(0)}
          >
            ทั้งหมด
          </Button>
        {courseCategories?.map((category, index) => (
          <Button
            key={index}
            variant="outlined"
            className={`${
              selectedCategory === category?.category_id
              ? "bg-indigo-700 text-white font-light"
              : "border border-gray-700 text-gray-800 font-light"
          }`}
            onClick={() => setSelectedCategory(category?.category_id)}
            // onClick={() => setSelectCatetegory(category.id)}
          >
            {category?.category_name}
          </Button>
        ))}
      </div>
      <div className="flex justify-center mt-4 ">
        <div className=" grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-14 ">
          {product?.map((course, index) => (
            <Card
              key={index}
              className="w-full mt-5 rounded-lg  flex flex-col justify-between border border-gray-300 cursor-pointer"
              onClick={() => router.push(`/user/study/${course?.products_id}`)}
              // onClick={() => router.push(`/user/study`)}
            >
              <div>
                <div className="flex w-full h-[200px]">
                  <Image
                     src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${course?.products_image}`}
                    alt={course?.products_title}
                    width={500}
                    height={500}
                    priority
                    className="rounded-lg rounded-b-none object-cover mb-4"
                    style={{width:"100%" , height:"100%"}}
                  />
                </div>

                <div className="px-2 md:px-4 mt-5">
                <Typography className="text-lg font-semibold text-black ps-2">
                    {truncateText(course?.products_title, 30)}
                  </Typography>

                  <Typography className="text-sm mt-2 text-gray-800 ps-3 pr-1">
                    {/* {course?.products_dec} */}
                    {parse(truncateText(course.products_dec.replace(/<\/?[^>]+(>|$)/g, ""), 100))}
                  </Typography>

                </div>
            
              </div>
              
              <div className="flex flex-col mt-4 px-6 pb-5 ">
                <div className="flex w-full text-wrap">
                  {/* <Typography
                    className={`text-xl ${
                      course.products_price_sale > 0
                        ? "text-red-500 font-semibold"
                        : "text-black"
                    }  mb-2  pr-1`}
                  >
                    {course?.products_price_sale > 0
                      ? course?.products_price_sale?.toLocaleString()
                      : course?.products_price?.toLocaleString()}{" "}
                    บาท
                  </Typography> */}
                </div>
                <Button
                  className="w-full justify-center items-center text-base font-normal "
                  variant="gradient"
                  color="indigo"
                  size="sm"
                >
                  {`ดูเนื้อหา`}
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
