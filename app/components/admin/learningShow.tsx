// Super.tsx
"use client";
import {
  Card,
  Button,
  Input,
  Typography,
  IconButton,
} from "@material-tailwind/react";

import axios from "axios";
import { HeaderAPI } from "@/headerApi";

import "react-toastify/dist/ReactToastify.css";

import {
  MdDelete,
  MdEdit,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

import { useState, useEffect, useCallback } from "react";

import { htmlToText } from "html-to-text";

import Swal from "sweetalert2";
import Image from "next/image";

interface Course {
  category_id: string;
  category_name: string;
  id: number;
  image: string;
  price: number;
  price_sale: number;
  title: string;
  lesson: string;
  video: string;
  videoFile: File;
  dec: string;
}

interface ResponseData {
  data: Course[];
  totalPages: number;
}

interface LearningShowProps {
  showToast: (message: string, type: "success" | "error") => void;
  onEdit: (data: Course) => void;
  setLearningAdd: (value: number) => void;
  learningAdd: number;
  onResetForm: () => void;
}

const LearningShow: React.FC<LearningShowProps> = ({
  showToast,
  onEdit,
  setLearningAdd,
  onResetForm,
  learningAdd,
}) => {
  const [data, setData] = useState<ResponseData>({ data: [], totalPages: 1 });
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const fetchCategory = useCallback(async () => {
    const requestData = {
      page: page,
      search: searchQuery,
    };
    // console.log(requestData)
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/product`,
        requestData,
        {
          ...HeaderAPI(localStorage.getItem("Token")),
        }
      );
      console.log(res.data);
      if (res.status === 200) {
        setData(res.data);
      } else {
        showToast("error", "error");
      }
    } catch (err) {
      const error = err as { response: { data: { message: string } } };
      showToast(error.response.data.message, "error");
    }
  }, [page, searchQuery, showToast]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory, page]);

  const handleDelete = async (category: Course) => {
    console.log(category.id);
    Swal.fire({
      title: "คุณแน่ใจหรือไม่ ?",
      text: "คุณจะไม่สามารถย้อนกลับได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่, ลบเลย!",
      cancelButtonText: "ยกเลิก",
      background: "#f9f9f9", // สีพื้นหลังของกรอบข้อความ
      width: "350px", // ปรับขนาดความกว้าง
      padding: "1em", // ปรับขนาดความสูง
      backdrop: `
        rgba(0,0,0,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `, // ปรับแต่ง backdrop
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(
            `${process.env.NEXT_PUBLIC_API}/api/product/${category.id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
              },
            }
          );
          // console.log(res);
          if (res.status === 200) {
            fetchCategory();
            Swal.fire({
              // title: "ลบแล้ว !",
              text: "ข้อมูลของคุณถูกลบแล้ว.",
              icon: "success",
              width: "400px", // ปรับขนาดความกว้าง
              background: "#f9f9f9", // สีพื้นหลังของกรอบข้อความ
              timer: 1000, // กำหนดเวลาให้ปิดเอง (2000 มิลลิวินาที = 2 วินาที)
              timerProgressBar: true, // แสดงแถบความคืบหน้า
              backdrop: `
              rgba(0,0,0,0.4)
              url("/images/nyan-cat.gif")
              left top
              no-repeat
            `, // ปรับแต่ง backdrop
            });
          } else {
            showToast("เกิดข้อผิดพลาด", "error");
          }
        } catch (err) {
          console.log(err);
          // const error = err as { response: { data: { message: string } } };
          const error = err as { response: { data: string } };
          showToast(error.response.data, "error");
        }
      }
    });
  };

  const handleAddNew = () =>{
    setLearningAdd(1)
    onResetForm()
  }
  return (
    <div className="flex justify-center gap-3  ">
      <div className="w-full p-5 justify-center items-center">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3 items-center ">
          <div className="flex w-full gap-3 flex-col sm:flex-row justify-between">
            <Input
              label="ค้นหาคอร์สเรียน"
              crossOrigin="anonymous"
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={() => setPage(1)}
            />

            <Button
            size="sm"
              className="bg-blue-500 text-white text-sm hover:bg-blue-700 whitespace-nowrap"
              onClick={() =>handleAddNew() }
            >
              เพิ่มข้อมูล
            </Button>
          </div>
        </div>
        <div className="overflow-auto ">
          <div className="overflow-auto">
            <Card className="mt-5 h-full  md:h-[58vh] lg:h-[63vh]  mb-3 border-2">
              <ul className="list-none p-0 overflow-auto">
                <li className="flex bg-blue-gray-50/50 border-b border-blue-gray-100 p-4 gap-5">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold leading-none opacity-70 w-1/12 whitespace-nowrap "
                  >
                    หน้าปก
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold leading-none text-center  opacity-70 w-6/12 whitespace-nowrap "
                  >
                    หัวข้อ
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold leading-none opacity-70 w-2/12 text-center whitespace-nowrap "
                  >
                    หมวดหมู่
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold leading-none opacity-70 w-2/12 text-center whitespace-nowrap "
                  >
                    ราคา
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold leading-none opacity-70 w-1/12 text-center whitespace-nowrap "
                  >
                    แก้ไข/ลบ
                  </Typography>
                </li>
                {data?.data?.length === 0 ? (
                  <li className="text-center pt-5">
                    <Typography>...ไม่พบข้อมูล...</Typography>
                  </li>
                ) : (
                  data?.data?.map((item, index) => (
                    <li
                      key={item.id}
                      className="flex border-b border-blue-gray-100 p-4   items-center gap-5"
                    >
                      <div className="flex font-bold  ps-1  leading-none  w-1/12 ">
                        <div className="flex    w-8 h-8 justify-stretch">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${item.image}`}
                            alt=""
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        </div>
                      </div>
                      <div className="w-6/12 flex flex-col ">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal overflow-hidden  text-ellipsis whitespace-nowrap"
                        >
                          {item?.title}
                        </Typography>
                        <div className="text-sm tooltip-text1 px-2">
                          {htmlToText(item?.dec)}
                        </div>
                      </div>
                      <div className="w-2/12 flex justify-center items-center whitespace-nowrap ">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                          {item?.category_name}
                        </Typography>
                      </div>
                      <div className="w-2/12 flex flex-col justify-center items-center whitespace-nowrap">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className={`font-normal overflow-hidden text-ellipsis whitespace-nowrap ${
                            item?.price_sale > 0 ? "text-red-500" : ""
                          }`}
                        >
                          {item?.price_sale > 0
                            ? item?.price_sale.toLocaleString()
                            : item?.price.toLocaleString()}{" "}
                          <span className=" line-through text-black ">
                            {item?.price_sale > 0 ? item?.price : ""}
                          </span>
                        </Typography>
                      </div>
                      <div className="w-1/12 flex  flex-col md:flex-row justify-center gap-2 whitespace-nowrap">
                        <IconButton
                          size="sm"
                          className="text-white max-w-7 max-h-7 bg-yellow-700"
                          onClick={() => [onEdit(item)]}
                        >
                          <MdEdit className="h-5 w-5" />
                        </IconButton>
                        <IconButton
                          size="sm"
                          className="bg-red-300 max-w-7 max-h-7"
                          onClick={() => {
                            handleDelete(item);
                          }}
                        >
                          <MdDelete className="h-5 w-5" />
                        </IconButton>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </Card>
          </div>

          <div className="flex justify-end gap-2 mt-3 px-2 items-center ">
            <button
              className={` text-gray-400  text-xl  whitespace-nowrap ${
                page == 1 ? "" : "hover:text-black"
              } `}
              disabled={page == 1}
              onClick={() => setPage((page) => Math.max(page - 1, 1))}
            >
              <MdOutlineKeyboardDoubleArrowLeft />
            </button>
            <span style={{ whiteSpace: "nowrap" }} className="text-xs">
              หน้าที่ {page} / {data?.totalPages || 1}{" "}
            </span>
            <button
              className={`text-gray-400 text-xl whitespace-nowrap ${
                Number(data?.totalPages) - Number(page) < 1
                  ? true
                  : false
                  ? ""
                  : "hover:text-black"
              }`}
              disabled={
                Number(data?.totalPages) - Number(page) < 1 ? true : false
              }
              onClick={() => setPage((page) => page + 1)}
            >
              <MdOutlineKeyboardDoubleArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningShow;
