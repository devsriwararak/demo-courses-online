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

import { MdDelete, MdEdit } from "react-icons/md";

import { useState, useEffect, useCallback } from "react";

import Swal from "sweetalert2";
import Image from "next/image";

interface Course {
  category_id: string;
  id: number;
  image: string;
  price: number;
  price_sale: number;
  title: string;
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
}

const LearningShow: React.FC<LearningShowProps> = ({ showToast, onEdit }) => {
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
          console.log(res);
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

  return (
    <div className="flex justify-center gap-3 ">
      <div className="w-full p-5 justify-center items-center">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3 items-center ">
          <div className="flex gap-3">
            <Input
              label="ค้นหาคอร์สเรียน"
              crossOrigin="anonymous"
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={() => setPage(1)}
            />
          </div>
        </div>
        <div className="overflow-auto h-[100%]">
          <Card className="mt-5 h-[35vh] sm:h-[48vh] md:h-[58vh] lg:h-[63vh] overflow-auto mb-3 border-2 ">
            <table className="w-full min-w-max ">
              <thead>
                <tr>
                  <th className="border-y  border-blue-gray-100 bg-blue-gray-50/50 p-4 w-1 whitespace-nowrap">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70 "
                    >
                      หน้าปก
                    </Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 whitespace-nowrap">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70"
                    >
                      ลำดับ
                    </Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 whitespace-nowrap">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold  text-start leading-none opacity-70 whitespace-nowrap"
                    >
                      หัวข้อ
                    </Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 w-1 whitespace-nowrap">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70"
                    >
                      แก้ไข/ลบ
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center pt-5">
                      <Typography>...ไม่พบข้อมูล...</Typography>
                    </td>
                  </tr>
                ) : (
                  data?.data?.map((item, index) => (
                    <tr key={item.id} style={{ marginTop: "3px" }}>
                      <td className="py-2">
                        <div className=" flex   items-center  align-center  justify-center">
                          <div className="flex w-8 h-8 justify-items-stretch  ">
                            <Image
                              //   src={
                              //     "data:image/png;base64,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"
                              //   }
                              src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${item.image}`}
                              alt=""
                              width={40}
                              height={40}
                              className=" rounded-full  "
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center justify-center">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {index + 1}
                          </Typography>
                        </div>
                      </td>
                      <td>
                        <div className="relative flex items-center justify-center tooltip">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal ps-4   overflow-hidden text-ellipsis whitespace-nowrap  max-w-[250px]"
                          >
                            {item?.title}
                          </Typography>
                          <div className="tooltip-text text-sm">{item?.title}</div>
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center gap-2  ">
                          <IconButton
                            size="sm"
                            className=" text-white max-w-7 max-h-7 bg-yellow-700  "
                            onClick={() => [onEdit(item)]}
                          >
                            <MdEdit className="h-5 w-5   " />
                          </IconButton>
                          <IconButton
                            size="sm"
                            className=" bg-red-300 max-w-7 max-h-7 "
                            onClick={() => {
                              handleDelete(item);
                            }}
                          >
                            <MdDelete className="h-5 w-5   " />
                          </IconButton>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Card>
          <div className="flex justify-end gap-5 mt-3 px-2 items-center ">
            <Button
              className="bg-gray-400 text-white whitespace-nowrap hover:bg-gray-600"
              disabled={page == 1}
              onClick={() => setPage((page) => Math.max(page - 1, 1))}
            >
              ก่อนหน้า
            </Button>
            <span style={{ whiteSpace: "nowrap" }}>
              หน้าที่ {page} / {data?.totalPages || 1}{" "}
            </span>
            <Button
              className="bg-gray-400 text-white whitespace-nowrap hover:bg-gray-600"
              disabled={
                Number(data?.totalPages) - Number(page) < 1 ? true : false
              }
              onClick={() => setPage((page) => page + 1)}
            >
              ถัดไป
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningShow;
