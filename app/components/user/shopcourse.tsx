"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import Image from "next/image";
import parse from "html-react-parser";

import Carousel from "../carousel";

import axios from "axios";
import { HeaderAPI } from "@/headerApi";

import CryptoJS from "crypto-js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaSearch } from "react-icons/fa";

import { useRecoilState } from "recoil";
import { BuyCourseStore } from "@/store/store";
import Banner from "./banner";

interface Category {
  name: string;
  id: number;
  category_name: string;
}

interface Course {
  title: string;
  dec: string;
  id: number;
  image: string;
  price: number;
  price_sale: number;
  category_name: string;
}

const truncateText = (text: string, limit: number) => {
  if (text?.length > limit) {
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
  const [buyCourse, setBuyCourse] = useRecoilState(BuyCourseStore);
  const router = useRouter();

  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "your_secret_key";

  const decryptData = (ciphertext: string) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const fetchCategory = useCallback(async () => {
    const requestData = {
      page: page,
      search: searchQuery,
      full: true,
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/category`,
        requestData,
        {
          ...HeaderAPI(decryptData(localStorage.getItem("Token") || "")),
        }
      );
      console.log(res.data);
      if (res.status === 200) {
        setCourseCategories(res.data.data);
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
      category_id: selectCatetegory || 0,
      search: searchQuery || "",
      full: true,
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/product/`,
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
  }, [searchQuery, selectCatetegory]);

  const handleBuyNow = (id: any) => {
    // setBuyCourse(course);
    router.push(`/user/buycourse/${id}`);
  };


  return (
    <div>
      <ToastContainer autoClose={2000} theme="colored" />
      {/* <div>
        <Banner />
      </div> */}

      {/* section - 2 */}

      <div className=" px-6  pb-10 md:px-28">
        <div className=" bg-white rounded-lg mt-10 lg:mb-0 w-[300px]">
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
          <Typography className="text-3xl  text-black  font-light">คอร์สแนะนำ</Typography>
        </div>
        <div className=" flex flex-col md:flex-row flex-wrap gap-2 justify-start mt-6 ">
          <Button
            variant="gradient"
            color="indigo"
            className=" font-light"
            onClick={() => setSelectCatetegory(0)}
          >
            ทั้งหมด
          </Button>
          {courseCategories.map((category, index) => (
            <Button
              key={index}
              variant="outlined"
              className={`${
                selectedCategory === String(category.id)
                  ? "bg-purple-500 text-gray-700 font-light"
                  : "border border-gray-500 text-gray-800 font-light"
              }`}
              onClick={() => setSelectCatetegory(category.id)}
            >
              {category?.name}
            </Button>
          ))}
        </div>
        <div className="flex justify-center mt-4 ">
          <div className=" grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-14 ">
            {product.map((course, index) => (
              <Card
                key={index}
                className="w-full mt-5 rounded-lg flex flex-col justify-between border border-gray-300 cursor-pointer"
                onClick={() => handleBuyNow(course?.id)}
              >
                <div>
                  <div className="flex w-full h-[200px]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${course.image}`}
                      alt=""
                      width={500}
                      height={500}
                      priority
                      className="rounded-lg rounded-b-none object-cover mb-4"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>

                  <div className="px-2 md:px-4 mt-5 ">
                    <Typography className="text-lg font-semibold text-black ps-2">
                      {truncateText(course.title, 30)}
                    </Typography>
                    <Typography className="text-md font-semibold text-gray-700 ps-2">
                      หมวดหมู่ {truncateText(course.category_name, 30)}
                    </Typography>

                    <Typography className="text-sm mt-2 text-gray-800 ps-3 pr-1">
                      {parse(truncateText(course.dec.replace(/<\/?[^>]+(>|$)/g, ""), 100))}
                    </Typography>
                  </div>
                </div>

                <div className="flex flex-col mt-4 px-6 pb-5 ">
                  <div className="flex w-full text-wrap gap-3">
                    <Typography
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
                    </Typography>
                    <Typography className="  line-through  mb-2  pr-1">
                      {course?.price_sale > 0
                        ? `${course?.price.toLocaleString()} บาท` 
                        : ""}{" "} 
                    </Typography>
                  </div>
                  <Button
                    className="w-full justify-center items-center text-base font-normal "
                    variant="outlined"
                    color="purple"
                    size="sm"
                    onClick={() => handleBuyNow(course?.id)}
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
