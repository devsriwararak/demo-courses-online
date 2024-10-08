"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Card, Typography, Button } from "@material-tailwind/react";
import { HeaderAPI, HeaderMultiAPI } from "@/headerApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import CryptoJS from "crypto-js";
import Link from "next/link";

interface ReviewFormData {
  id: number;
  title: string;
  image_title: string;
  dec: string;
  coverFile: File | null;
  link: string;
}

interface ResponseData {
  data: ReviewFormData[];
  totalPages: number;
}
export default function Page() {
  const [data, setData] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const requestData = {
        page,
        search: searchQuery,
        full: true,
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/homepage/ebook`,
        requestData
      );
      if (res.status === 200) {
        setData(res.data.data);
      }

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const truncateText = (text: string, limit: number) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  // const handleCardClick = (id: number) => {
  //   router.push(`/home/ebook/${id}`);
  // };
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-8 py-16 ">
      <ToastContainer autoClose={2000} theme="colored" />
      <Typography variant="h2" className="text-center  text-indigo-800 text-2xl md:text-4xl">
      เพิ่มศักยภาพการเรียนรู้ด้วย Ebook และคอร์สเรียนเทรด
      </Typography>
      <p className="text-gray-600 text-sm md:text-base mt-6 text-center">
      การเริ่มต้นศึกษาอาจเป็นเรื่องยากด้วยเหตุนี้ Ebook และคอร์สเรียนเทรดจึงเป็นแหล่งความรู้ที่เข้าถึงง่าย ช่วยทำให้สร้างรายได้อย่างมีประสิทธิภาพ สำหรับผู้ที่มีความรู้และความเข้าใจในตลาด
      </p>

      <div className="flex justify-center mt-10 ">
        <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.map((item: any, index: any) => (
            <Link href={item.link} key={index}>
              <Card
                key={index}
                className=" rounded-md w-full mt-2 flex flex-col justify-between  cursor-pointer shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl hover:translate-y-2"
              >
                <div>
                  <div className="flex w-full h-[300px]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${item?.image_title}`}
                      alt={item.title}
                      width={500}
                      height={500}
                      priority
                      className=" rounded-b-none object-cover mb-4"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>

                  <div className="px-2 md:px-4 py-3  ">
                    <Typography className="text-lg  text-black ps-2 ">
                      {truncateText(item.title, 30)}
                    </Typography>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
