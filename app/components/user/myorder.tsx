"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  Button,
  Input,
  Typography,
  IconButton,
  Select,
  Option,
} from "@material-tailwind/react";
import axios from "axios";
import { HeaderAPI, HeaderMultiAPI } from "@/headerApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoAccessibility } from "react-icons/io5";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FaSearch, FaEye } from "react-icons/fa";
import { MdFactCheck } from "react-icons/md";
import ModalOrder from "./modalorder";
import ModalCheck from "./modalcheck";
import CryptoJS from "crypto-js";

interface ReviewFormData {
  products_name: string;
  products_price: any;
  code: string;
  pay_image:""
  start_pay: string;
  end_pay: string;
  status: number;
  pay_id:number
}


interface ResponseData {
  data: ReviewFormData[];
  totalPages: number;
}

const MyOrder: React.FC = () => {
  const [data, setData] = useState<ResponseData>({ data: [], totalPages: 1 });
  const [item, setItem] = useState<ReviewFormData | null>(null); 
  const [searchQuery, setSearchQuery] = useState("");
  const [image, setImage] = useState("");
  const [page, setPage] = useState(1);

  const [openModal, setOpenModal] = useState(false);
  const [openModal1, setOpenModal1] = useState(false);

  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "your_secret_key";

  const decryptData = (ciphertext: string) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const userId = decryptData(localStorage.getItem("Id") || "");

  const fetchData = useCallback(async () => {
    const requestData = {
      users_id: userId,
      page,
      search: searchQuery,
      full: true,
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/pay/users`,
        requestData,
        {
          ...HeaderAPI(decryptData(localStorage.getItem("Token") || "")),
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
    fetchData();
  }, [page, searchQuery, fetchData]);


 // ฟังก์ชันใหม่ที่ใช้ในการตั้งค่า image และเปิด modal
 const openModalWithImage = (image: string) => {
    setImage(image);
    setOpenModal(true);
  };

  const openModalWithImage1 = (selectedItem: ReviewFormData) => {
    setItem(selectedItem); // ตั้งค่า item ด้วยข้อมูลที่เลือก
    setOpenModal1(true);
  };

    // ฟังก์ชันที่ใช้สำหรับปิด/เปิด modal โดยไม่มีพารามิเตอร์
    const handleModal = () => {
        setOpenModal(!openModal);
      };


    const handleModal1 = () => {
        setOpenModal1(!openModal1);
      };

      console.log(userId)
    
  return (
    <div className="flex justify-center gap-3">
      <ToastContainer autoClose={2000} theme="colored" />
      <Card className="flex w-full px-5 h-[85vh]">
        <div className="flex flex-col sm:flex-row mt-3 sm:justify-between gap-3 lg:items-center">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-2 ">
              <IoAccessibility className="text-xl" />
              <Typography className="font-semibold">
                จัดการข้อมูลกิจกรรม
              </Typography>
            </div>
            <div>
              <Input
                label="ค้นหากิจกรรม"
                crossOrigin="anonymous"
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={() => setPage(1)}
                color="deep-purple"
                style={{ backgroundColor: "#f4f2ff" }}
                icon={<FaSearch className=" text-gray-500" />}
              />
            </div>
          </div>
        </div>
        <div className="overflow-auto ">
          <table className="w-full mt-5 overflow-auto">
            <thead>
              <tr>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 w-1 whitespace-nowrap">
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
                    className="font-bold leading-none opacity-70"
                  >
                    รหัส
                  </Typography>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 whitespace-nowrap">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold leading-none opacity-70"
                  >
                    ชื่อ
                  </Typography>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 whitespace-nowrap">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold leading-none opacity-70"
                  >
                    ราคา
                  </Typography>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 whitespace-nowrap">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold leading-none opacity-70"
                  >
                    วันเริ่มต้น
                  </Typography>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 whitespace-nowrap">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold leading-none opacity-70"
                  >
                    วันสิ้นสุด
                  </Typography>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 whitespace-nowrap">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold leading-none opacity-70"
                  >
                    สถานะ
                  </Typography>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 w-1 whitespace-nowrap">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold leading-none opacity-70"
                  >
                    ดู/ตรวจสอบ
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center pt-5">
                    <Typography>...ไม่พบข้อมูล...</Typography>
                  </td>
                </tr>
              ) : (
                data?.data?.map((item, index) => (
                  <tr key={index} style={{ marginTop: "3px" }}>
                    <td className="py-2">
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
                    <td className="py-2 flex justify-center">
                      <div className="flex items-center justify-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item?.code}
                        </Typography>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center justify-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item?.products_name}
                        </Typography>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center justify-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item?.products_price}
                        </Typography>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center justify-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item?.start_pay}
                        </Typography>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center justify-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item?.end_pay}
                        </Typography>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center justify-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          //   className={`font-normal ${item?.status === 0 ? "bg-red-500" : "bg-green-500"}`}
                          className={`font-normal`}
                        >
                          {item?.status === 0 ? "ยังไม่จาย" : "จ่ายแล้ว"}
                        </Typography>
                      </div>
                    </td>

                    <td>
                      <div className="flex ps-6 gap-2">
                        <FaEye
                          className="h-5 w-5 text-purple-500 cursor-pointer"
                          onClick={() => openModalWithImage(item?.pay_image)}
                        />

                        <MdFactCheck
                          className={`h-5 w-5 text-purple-500 bg  cursor-pointer ${item?.status === 1 ? 'hidden ': "" }`}
                          onClick={() => openModalWithImage1(item)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end gap-2 mt-7 px-2 items-center">
          <button
            className={`text-gray-400 text-2xl whitespace-nowrap rounded-full border border-gray-300 shadow-md ${
              page == 1 ? "" : "hover:text-black"
            }`}
            disabled={page == 1}
            onClick={() => setPage((page) => Math.max(page - 1, 1))}
          >
            <IoIosArrowBack />
          </button>
          <span style={{ whiteSpace: "nowrap" }} className="text-sm">
            หน้าที่ {page} / {data?.totalPages || 1}{" "}
          </span>
          <button
            className={`text-gray-400 text-2xl whitespace-nowrap rounded-full border border-gray-300 shadow-md ${
              Number(data?.totalPages) - Number(page) < 1
                ? true
                : false
                ? ""
                : "hover:text-black"
            }`}
            disabled={Number(data?.totalPages) - Number(page) < 1}
            onClick={() => setPage((page) => page + 1)}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </Card>

      <ModalOrder open={openModal} handleModal={handleModal} image={image} />
     
      <ModalCheck open={openModal1} handleModal1={handleModal1} item={item}  fetchData={fetchData} />


    </div>
  );
};

export default MyOrder;
