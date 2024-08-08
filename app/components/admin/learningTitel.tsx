import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { HeaderAPI } from "@/headerApi";
import { toast } from "react-toastify";
import {
  Card,
  IconButton,
  Input,
  Typography,
  Button,
} from "@material-tailwind/react";
import {
  MdDelete,
  MdEdit,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

import { LuArrowRightSquare,LuArrowLeftSquare  } from "react-icons/lu";
import { GrUploadOption } from "react-icons/gr";

import { FaSearch } from "react-icons/fa";

interface LearningTitleProps {
  courseSelect: number | undefined;
  formData: {
    lesson: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      id: number;
      category_id: string;
      image: string | null;
      videoFile: File | null;
      videoUrl: string;
      dec: string;
      title: string;
      lesson: string;
      regularPrice: number;
      discountPrice: number;
    }>
  >;
  pageTitle: number;
  setDataTitle: React.Dispatch<React.SetStateAction<any[]>>;
  dataTitle: any;
  setPageTitle: React.Dispatch<React.SetStateAction<number>>;
  setTitleId: React.Dispatch<React.SetStateAction<number>>;
}

const LearningTitle: React.FC<LearningTitleProps> = ({
  courseSelect,
  formData,
  setFormData,
  pageTitle,
  setPageTitle,
  setDataTitle,
  dataTitle,
  setTitleId,
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchTitle = useCallback(
    async (id: any) => {
      const data = {
        products_id: id,
        page: pageTitle,
      };
      try {
        console.log(data);
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/product/title`,
          data,
          { ...HeaderAPI(localStorage.getItem("Token")) }
        );
        console.log(res);
        if (res.status === 200) {
          setDataTitle(res.data);
        } else {
          toast.error("error");
        }
      } catch (err) {
        const error = err as { response: { data: { message: string } } };
        toast.error(error.response.data.message);
      }
    },
    [pageTitle, setDataTitle]
  );

  useEffect(() => {
    if (courseSelect) {
      fetchTitle(courseSelect);
    }
  }, [courseSelect, fetchTitle, pageTitle]);

  const handleAddOrEditTitle = useCallback(async () => {
    if (!courseSelect) {
      toast.error("Course not selected");
      return;
    }
    if (editingId) {
      // Edit existing title
      const data = {
        id: editingId,
        products_id: courseSelect,
        title: formData.lesson,
      };
      try {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API}/api/product/title`,
          data,
          { ...HeaderAPI(localStorage.getItem("Token")) }
        );
        if (res.status === 200) {
          toast.success(res.data.message);
          setPageTitle(1); // ตั้งหน้าเป็นหน้า 1 เสมอ
          setDataTitle(res.data);
          fetchTitle(courseSelect);
          setFormData((prevFormData) => ({
            ...prevFormData,
            lesson: "", // เคลียร์ค่า lesson หลังจากส่งข้อมูลสำเร็จ
          }));
          setEditingId(null); // Clear editing state
        } else {
          toast.error("error");
        }
      } catch (err) {
        const error = err as { response: { data: { message: string } } };
        toast.error(error.response.data.message);
      }
    } else {
      // Add new title
      const data = {
        products_id: courseSelect,
        title: formData.lesson,
      };
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/product/add/title`,
          data,
          { ...HeaderAPI(localStorage.getItem("Token")) }
        );
        if (res.status === 200) {
          toast.success(res.data.message);
          setPageTitle(1); // ตั้งหน้าเป็นหน้า 1 เสมอ
          setDataTitle(res.data);
          fetchTitle(courseSelect);
          setFormData((prevFormData) => ({
            ...prevFormData,
            lesson: "", // เคลียร์ค่า lesson หลังจากส่งข้อมูลสำเร็จ
          }));
        } else {
          toast.error("error");
        }
      } catch (err) {
        const error = err as { response: { data: { message: string } } };
        toast.error(error.response.data.message);
      }
    }
  }, [
    courseSelect,
    formData.lesson,
    fetchTitle,
    setDataTitle,
    setFormData,
    setPageTitle,
    editingId,
  ]);

  const handleDelete = async (item: any) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API}/api/product/title/${item.id}`,
        { ...HeaderAPI(localStorage.getItem("Token")) }
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        setPageTitle(1); // ตั้งหน้าเป็นหน้า 1 เสมอ
        fetchTitle(courseSelect);
      } else {
        toast.error("Delete failed");
      }
    } catch (err) {
      const error = err as { response: { data: { message: string } } };
      toast.error(error.response.data.message);
    }
  };

  const handleEdit = (item: any) => {
    console.log(item);
    setFormData((prevFormData) => ({
      ...prevFormData,
      lesson: item.title,
    }));
    setEditingId(item.id);
  };

  const handleUpload = async (item: any) => {
    // console.log(item)
    setTitleId(item.id);
  };

  return (
    <div className="flex w-full   gap-3 shadow-lg">
      <div className="w-full overflow-auto  ">
        <Card className="p-5  overflow-auto border-2 ">
          <div className="flex gap-3 items-center">
            <Input
              label="สร้างบทเรียน"
              crossOrigin="anonymous"
              value={formData.lesson}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  lesson: e.target.value,
                }))
              }
            />
            <div className="md:w-[100px]">
              <Button
                size="sm"
                disabled={!!!courseSelect}
                color="purple"
                className="w-full text-sm"
                onClick={handleAddOrEditTitle}
              >
                {editingId ? "อัปเดต" : "บันทึก"}
              </Button>
            </div>
          </div>
          <div>
            <table className="w-full  mt-5  ">
              <thead>
                <tr>
                  <th className="border-y  border-blue-gray-100 bg-blue-gray-50/50 p-1 whitespace-nowrap">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold text-start leading-none opacity-70"
                    >
                      ลำดับ
                    </Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-1 whitespace-nowrap">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold text-start leading-none opacity-70  whitespace-nowrap"
                    >
                      หัวข้อ
                    </Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-1   whitespace-nowrap">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold text-end leading-none opacity-70 whitespace-nowrap "
                    >
                      อัพโหลด
                    </Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-1 w-1 whitespace-nowrap">
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
                {dataTitle?.data?.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center pt-5">
                      <Typography>...ไม่พบข้อมูล...</Typography>
                    </td>
                  </tr>
                ) : (
                  dataTitle?.data?.map((item: any, index: number) => (
                    <tr key={item.id} style={{ marginTop: "3px" }}>
                      <td className="py-1">
                        <div className="flex items-center ps-4 ">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal text-sm"
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
                            className="font-normal ps-1  text-sm overflow-hidden text-ellipsis whitespace-nowrap max-w-[250px]"
                          >
                            {item.title}
                          </Typography>
                          <div className="tooltip-text text-sm">
                            {item.title}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex  justify-end pr-5  ">
                            <GrUploadOption className="h-5 w-5 text-green-500" onClick={() => handleUpload(item)} />
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center gap-2">
                          <MdEdit
                            className="h-5 w-5 text-purple-500 cursor-pointer"
                            onClick={() => handleEdit(item)}
                          />

                          <MdDelete
                            className="h-5 w-5 text-purple-500 cursor-pointer"
                            onClick={() => handleDelete(item)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end gap-2 mt-3 px-2 items-center">
            <button
              className={` text-gray-400  text-xl  whitespace-nowrap ${
                pageTitle == 1 ? "" : "hover:text-black"
              } `}
              disabled={pageTitle == 1}
              onClick={() =>
                setPageTitle((pageTitle) => Math.max(pageTitle - 1, 1))
              }
            >
              <LuArrowLeftSquare />
            </button>
            <span style={{ whiteSpace: "nowrap" }} className="text-xs">
              หน้าที่ {pageTitle} / {dataTitle?.totalPages || 1}{" "}
            </span>
            <button
              className={`text-gray-400 text-xl whitespace-nowrap ${
                Number(dataTitle?.totalPages) - Number(pageTitle) < 1
                  ? true
                  : false
                  ? ""
                  : "hover:text-black"
              }`}
              disabled={
                Number(dataTitle?.totalPages) - Number(pageTitle) < 1
                  ? true
                  : false
              }
              onClick={() => setPageTitle((pageTitle) => pageTitle + 1)}
            >
              <LuArrowRightSquare />
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LearningTitle;
