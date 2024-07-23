import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Card,
  Button,
  Input,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";

import Swal from "sweetalert2";

import axios from "axios";
import { HeaderAPI, HeaderMultiAPI } from "@/headerApi";

const CustomEditor = dynamic(() => import("./richTextEditor"), { ssr: false });
import {
  MdDelete,
  MdEdit,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

interface Course {
  id: number;
  video: File;

}

interface LearningVideoProps {
  showToast: (message: string, type: "success" | "error") => void;
  titleId: number;
  pageVideo: number;
  setPageVideo: React.Dispatch<React.SetStateAction<number>>;
  setDataVideo: React.Dispatch<React.SetStateAction<any[]>>;
  dataVideo: any;
}

const LearningVideo: React.FC<LearningVideoProps> = ({
  titleId,
  pageVideo,
  setPageVideo,
  setDataVideo,
  dataVideo,
  showToast,
}) => {
  const [formData, setFormData] = useState({
    videoFile: null as File | null,
  });
  const [statusEdit, setStatusEdit] = useState(0); // เพิ่มสถานะนี้
  const [videoId, setVideoId] = useState(0); 

  const fetchVideo = useCallback(async () => {
    const data = {
      products_title_id: titleId,
      page: pageVideo,
    };
    try {
      console.log(data);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/product/videos`,
        data,
        { ...HeaderAPI(localStorage.getItem("Token")) }
      );
      console.log(res.data);
      if (res.status === 200) {
        setDataVideo(res.data);
      } else {
        toast.error("error");
      }
    } catch (err) {
      const error = err as { response: { data: { message: string } } };
      toast.error(error.response.data.message);
    }
  }, [pageVideo, titleId, setDataVideo]);

  useEffect(() => {
    fetchVideo();
  }, [fetchVideo, pageVideo, titleId]);

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // console.log(file);
    if (file) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        videoFile: file,
      }));
    } else {
      toast.error("Please upload a valid video file.");
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();

    formDataToSubmit.append("products_title_id", titleId.toLocaleString());
    if (formData.videoFile) {
      formDataToSubmit.append("video", formData.videoFile);
    }
    if(videoId != 0){
      formDataToSubmit.append("id", videoId.toLocaleString());
    }
    try {
      console.log(titleId);
      console.log(formData.videoFile);
      console.log(statusEdit);
      console.log(videoId);

      let res;
      if (statusEdit === 0) {
        console.log("aaa");
        res = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/product/add/videos`,
          formDataToSubmit,
          { ...HeaderMultiAPI(localStorage.getItem("Token")) }
        );
      } else {
        res = await axios.put(
          `${process.env.NEXT_PUBLIC_API}/api/product/videos`,
          formDataToSubmit,
          { ...HeaderMultiAPI(localStorage.getItem("Token")) }
        );
      }

      console.log(res);

      if (res.status === 200) {
        toast.success(res.data.message);
        fetchVideo();
        resetForm();
      } else {
        toast.error("Form submission failed!");
      }
    } catch (err) {
      console.log(err);
      const error = err as { response: { data: { message: string } } };
      toast.error(error.response.data.message);
    }
  };

  const resetForm = () => {
    setFormData({
      videoFile: null,
    });

    // Reset file inputs
    const videoInput = document.getElementById(
      "videoInput"
    ) as HTMLInputElement;

    if (videoInput) {
      videoInput.value = "";
    }
  };

  const handleEdit = (item:any) => {
    console.log(item)
    setStatusEdit(1)
  }

  const handleDelete = async (item: Course) => {
    console.log(item.id);
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
            `${process.env.NEXT_PUBLIC_API}/api/product/videos/${item.id}`,
            {
              ...HeaderAPI(localStorage.getItem("Token")),
            }
          );
          // console.log(res);
          if (res.status === 200) {
            fetchVideo();
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
    <div>
      <Card className="flex  overflow-auto">
        <form
          className="flex flex-col w-full px-5 mt-3 gap-4"
          onSubmit={handleFormSubmit}
        >
          <div className="flex flex-col gap-5 xl:flex-row">
            <div className="w-full xl:w-[200px]">
              <Input
                label="Upload VDO"
                type="file"
                accept="video/*"
                id="videoInput"
                onChange={handleVideoUpload}
                crossOrigin="anonymous"
              />
            </div>
            <div>
              <div className="md:w-[100px]">
                <Button color="blue" size="sm" className="w-full" type="submit" disabled={!!!titleId}>
                  บันทึก
                </Button>
              </div>
            </div>
          </div>
          <div></div>
        </form>
        <div>
          <table className="w-full  mt-3  ">
            <thead>
              <tr>
                <th className="border-y flex justify-between px-5 border-blue-gray-100 bg-blue-gray-50/50 p-1 whitespace-nowrap">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold leading-none opacity-70"
                  >
                    บทเรียน
                  </Typography>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-1 whitespace-nowrap">
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
            <tbody className="justify-start items-start ">
              {dataVideo?.data?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center pt-5">
                    <Typography>...ไม่พบข้อมูล...</Typography>
                  </td>
                </tr>
              ) : (
                dataVideo?.data?.map((item: any, index: number) => (
                  <tr key={item.id} style={{ marginTop: "3px" }}>
                    <td className="flex py-2 px-5 justify-between">
                      <div className="flex items-center justify-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {` บทเรียนที่ ${index + 1}`}
                        </Typography>
                      </div>
                    </td>
                    <td>
                      <div className="flex justify-center gap-2">
                        <IconButton
                          size="sm"
                          className="text-white max-w-7 max-h-7 bg-yellow-700"
                          onClick={() => [handleEdit(item) , setVideoId(item.id)]}
                        >
                          <MdEdit className="h-5 w-5" />
                        </IconButton>
                        <IconButton
                          size="sm"
                          className="bg-red-300 max-w-7 max-h-7"
                          onClick={() => handleDelete(item)}
                        >
                          <MdDelete className="h-5 w-5" />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end gap-5 mt-3 px-2 items-center">
          <button
            className={` text-gray-400  text-3xl  whitespace-nowrap ${
              pageVideo == 1 ? "" : "hover:text-black"
            } `}
            disabled={pageVideo == 1}
            onClick={() =>
              setPageVideo((pageVideo) => Math.max(pageVideo - 1, 1))
            }
          >
            <MdOutlineKeyboardDoubleArrowLeft />
          </button>
          <span style={{ whiteSpace: "nowrap" }}>
            หน้าที่ {pageVideo} / {dataVideo?.totalPages || 1}{" "}
          </span>
          <button
            className={`text-gray-400 text-3xl whitespace-nowrap ${
              Number(dataVideo?.totalPages) - Number(pageVideo) < 1
                ? true
                : false
                ? ""
                : "hover:text-black"
            }`}
            disabled={
              Number(dataVideo?.totalPages) - Number(pageVideo) < 1
                ? true
                : false
            }
            onClick={() => setPageVideo((pageVideo) => pageVideo + 1)}
          >
            <MdOutlineKeyboardDoubleArrowRight />
          </button>
        </div>
      </Card>
    </div>
  );
};

export default LearningVideo;
