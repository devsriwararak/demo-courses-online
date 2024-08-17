"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Card, Typography, Button } from "@material-tailwind/react";
import { HeaderAPI, HeaderMultiAPI } from "@/headerApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

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
  const [data, setData] = useState<ResponseData>({ data: [], totalPages: 1 });
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const router = useRouter();

  const fetchEbook = useCallback(async () => {
    const requestData = {
      page,
      search: searchQuery,
      full:true
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/ebook`,
        requestData,
        {
          ...HeaderAPI(localStorage.getItem("Token")),
        }
      );
      console.log(res.data);
      if (res.status === 200) {
        setData(res.data);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error");
    }
  }, [page, searchQuery]);

  useEffect(() => {
    fetchEbook();
  }, [page, searchQuery, fetchEbook]);

  const truncateText = (text: string, limit: number) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  const handleCardClick = (id: number) => {
    router.push(`/home/ebook/${id}`);
};
  return (
    <div className="container mx-auto px-4 py-8">
       <ToastContainer autoClose={2000} theme="colored" />
      <Typography variant="h2" className="text-center mb-8 text-purple-600">
        Ebook
      </Typography>
     
      <div className="flex justify-center mt-4 ">
          <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" >
            {data?.data?.map((item, index) => (
              <Card
              key={index}
              className="w-full mt-5 flex flex-col justify-between  cursor-pointer shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl hover:translate-y-2"
              onClick={() => handleCardClick(item.id)}
            >
                <div>
                  <div className="flex w-full h-[300px]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${item?.image_title}`}
                      alt={item.title}
                      width={500}
                      height={500}
                      priority
                      className="rounded-lg rounded-b-none object-cover mb-4"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>

                  <div className="px-2 md:px-4 py-5  ">
                    <Typography className="text-lg font-semibold text-black ps-2">
                      {truncateText(item.title, 30)}
                    </Typography>

                    {/* <Typography className="text-sm mt-2 text-gray-800 ps-3 pr-1">
                      {truncateText(item.dec, 90)}
                    </Typography> */}
                  </div>
                </div>

                {/* <div className="flex flex-col mt-4 px-6 pb-5 ">
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
                        ? course?.price.toLocaleString()
                        : ""}{" "}
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
                    // onClick={() => handleBuyNow(course)}
                  >
                    ซื้อตอนนี้
                  </Button>
                </div> */}
              </Card>
            ))}
          </div>
        </div>
    </div>
  );
}
