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

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MdDelete, MdEdit } from "react-icons/md";

import { useState, useEffect, useCallback } from "react";
import AddEditModal from "./addEditModal";

import Swal from "sweetalert2";

interface pay {
  id: number;
  code: string;
  start_pay: string;
  end_pay: string;
  name: string;
  title: string;
  status: number;
}

interface ResponseData {
  data: pay[];
  totalPages: number;
}

const PayPage: React.FC = () => {
  const [data, setData] = useState<ResponseData>({ data: [], totalPages: 1 });
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
  });

  const fetchPay = useCallback(async () => {
    const requestData = {
      page: page,
      search: searchQuery,
    };
    // console.log(requestData)
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/pay`,
        requestData,
        {
          ...HeaderAPI(localStorage.getItem("Token")),
        }
      );
      console.log(res.data);
      if (res.status === 200) {
        setData(res.data);
      } else {
        toast.error("error");
      }
    } catch (error) {
      console.error(error);
      toast.error("error");
    }
  }, [page, searchQuery]);

  useEffect(() => {
    fetchPay();
  }, [fetchPay, page]);

  console.log(searchQuery);

  //------------- modal Add Product -----------------------//
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [dataEdit, setDataEdit] = useState<pay | null>(null);

  const handleModalAdd = () => {
    setOpenModalAdd(!openModalAdd);
    if (!openModalAdd) {
      setFormData({
        username: "",
        password: "",
        name: "",
      });
      setDataEdit(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddCategory = async () => {
    if (dataEdit) {
      const updateData = { ...formData, id: dataEdit.id };
      try {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API}/api/category`,
          updateData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          }
        );
        if (res.status === 200) {
          fetchPay();
          toast.success("ข้อมูลถูกแก้ไขเรียบร้อยแล้ว");
          handleModalAdd();
        } else {
          toast.error("เกิดข้อผิดพลาด");
        }
      } catch (err) {
        handleModalAdd();
        const error = err as { response: { data: { message: string } } };
        toast.error(error.response.data.message);
      }
    } else {
      const data = {
        name: formData.name,
      };

      console.log(data);

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/category/add`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          }
        );
        console.log(res);
        if (res.status === 200) {
          fetchPay();
          toast.success(res.data.message);
          setFormData({ username: "", password: "", name: "" });
          handleModalAdd();
        } else {
          toast.error("เกิดข้อผิดพลาด");
        }
      } catch (err) {
        handleModalAdd();
        const error = err as { response: { data: { message: string } } };
        toast.error(error.response.data.message);
      }
    }
  };

  const handleDelete = async (customer: pay) => {
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
            `${process.env.NEXT_PUBLIC_API}/api/category/${customer.id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
              },
            }
          );
          if (res.status === 200) {
            fetchPay();
            Swal.fire({
              // title: "ลบแล้ว !",
              text: "ข้อมูลของคุณถูกลบแล้ว.",
              icon: "success",
              width: "400px", // ปรับขนาดความกว้าง
              background: "#f9f9f9", // สีพื้นหลังของกรอบข้อความ
              timer: 1000, // กำหนดเวลาให้ปิดเอง (2000 มิลลิวินาที = 2 วินาที)
              timerProgressBar: true, // แสดงแถบความคืบหน้า
              // willClose: () => {
              //   console.log("Alert is closed"); // คุณสามารถเพิ่มการทำงานเพิ่มเติมได้ที่นี่
              // },
              backdrop: `
              rgba(0,0,0,0.4)
              url("/images/nyan-cat.gif")
              left top
              no-repeat
            `, // ปรับแต่ง backdrop
            });
          } else {
            toast.error("เกิดข้อผิดพลาด");
          }
        } catch (err) {
          const error = err as { response: { data: { message: string } } };
          toast.error(error.response.data.message);
        }
      }
    });
  };

  console.log(dataEdit);

  return (
    <div className="flex justify-center gap-3 ">
      <ToastContainer autoClose={2000} theme="colored" />
      <Card className="flex w-full h-[85vh]">
        <div className="w-full p-5 justify-center items-center">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-3 items-center ">
            <div className="flex gap-3">
              <Input
                label="ค้นหาการซื้อคอร์ดเรียน"
                crossOrigin="anonymous"
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={() => setPage(1)}
              />
              {/* <Button className="bg-blue-500 text-white hover:bg-blue-700 whitespace-nowrap">
                ล้างค้นหา
              </Button> */}
            </div>
            {/* <div>
              <Button
                className="bg-blue-500 text-white hover:bg-blue-700 whitespace-nowrap"
                onClick={handleModalAdd}
              >
                เพิ่มข้อมูล
              </Button>
            </div> */}
          </div>
          <div className="overflow-auto  lg:h-[100%]">
            <Card className="mt-5 h-[35vh] sm:h-[48vh] md:h-[58vh] lg:h-[60vh] overflow-auto mb-3 border-2 ">
              <table className="w-full min-w-max">
                <thead>
                  <tr>
                    <th className="border-y  border-blue-gray-100 bg-blue-gray-50/50 p-4 w-1 whitespace-nowrap">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none opacity-70 "
                      >
                        ลำดับ
                      </Typography>
                    </th>
                    <th className="border-y  border-blue-gray-100 bg-blue-gray-50/50 p-4 w-1 whitespace-nowrap">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none opacity-70 "
                      >
                        เลขที่บิล
                      </Typography>
                    </th>
                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 whitespace-nowrap">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none opacity-70"
                      >
                        ชื่อผู้ซื้อ
                      </Typography>
                    </th>
                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 whitespace-nowrap  w-[200px]">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none opacity-70 "
                      >
                        หัวข้อ
                      </Typography>
                    </th>
                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 whitespace-nowrap ">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none opacity-70 whitespace-nowrap"
                      >
                        วันที่เริ่มซื้อ
                      </Typography>
                    </th>
                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 whitespace-nowrap">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none opacity-70 whitespace-nowrap"
                      >
                        วันที่สิ้นสุด
                      </Typography>
                    </th>
                    {/* <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 w-1 whitespace-nowrap">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none opacity-70"
                      >
                        แก้ไข/ลบ
                      </Typography>
                    </th> */}
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
                        <td className="py-2">
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
                              {item?.name}
                            </Typography>
                          </div>
                        </td>
                        <td className=" flex mt-2 justify-center  ">
                          <div className="relative  justify-center align-middle text-center  tooltip  ">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal   overflow-hidden text-ellipsis whitespace-nowrap  max-w-[350px]"
                            >
                              {item?.title}
                            </Typography>
                            <div className="tooltip-text text-sm  ">
                              {item?.title}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center justify-center ">
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
                        {/* <td>
                          <div className="flex justify-center gap-2  ">
                            <IconButton
                              size="sm"
                              className=" text-white max-w-7 max-h-7 bg-yellow-700  "
                              onClick={(e) => [
                                handleModalAdd(),
                                setDataEdit(item),
                              ]}
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
                        </td> */}
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
                {/* <IoIosArrowBack /> */}
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
      </Card>

      {/* modal Add and Edit  */}
      {/* <AddEditModal
        open={openModalAdd}
        handleModalAdd={handleModalAdd}
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
        handleAddCategory={handleAddCategory}
        dataEdit={dataEdit}
      /> */}
    </div>
  );
};

export default PayPage;
