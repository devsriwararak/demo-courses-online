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
import AddEditModal from "./addEditModal";

import Swal from "sweetalert2";
import Image from "next/image";

interface Customer {
    id: number;
    username: string;
    name: string;
    address: string;
}

interface ResponseData {
    data: Customer[];
    // totalPages: number;
}

interface LearningShowProps {
    showToast: (message: string, type: "success" | "error") => void;
}

const LearningShow: React.FC<LearningShowProps>= ({ showToast }) => {
    // const [data, setData] = useState<ResponseData>({ data: [], totalPages: 1 });
    const [data, setData] = useState<ResponseData>({ data: []});
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        name: "",
    });

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
            // console.log(res.data);
            if (res.status === 200) {
                setData(res.data);
            } else {
                showToast("error" , "error");
            }
        } catch (err) {
            const error = err as { response: { data: { message: string } } };
            showToast(error.response.data.message ,"error");
        }
    }, [page, searchQuery , showToast]);

    useEffect(() => {
        fetchCategory();
    }, [fetchCategory, page]);

 

    //------------- modal Add Product -----------------------//
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [dataEdit, setDataEdit] = useState<Customer | null>(null);

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
                    fetchCategory();
                    showToast("ข้อมูลถูกแก้ไขเรียบร้อยแล้ว" ,"success");
                    handleModalAdd();
                } else {
                    showToast("เกิดข้อผิดพลาด", "error");
                }
            } catch (err) {
                handleModalAdd();
                const error = err as { response: { data: { message: string } } };
                showToast(error.response.data.message ,"error");
            }
        } else {
            // Adding new customer
            const data = {
                // username: formData.username,
                // password: formData.password,
                name: formData.name,
                // status: 1,
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
                    fetchCategory();
                    showToast(res.data.message, "success");
                    setFormData({ username: "", password: "", name: "" });
                    handleModalAdd();
                } else {
                    showToast("เกิดข้อผิดพลาด" , "error");
                }
            } catch (err) {
                handleModalAdd();
                const error = err as { response: { data: { message: string } } };
                showToast(error.response.data.message , "error");
            }
        }
    };

    const handleDelete = async (customer: Customer) => {
        Swal.fire({
            title: "คุณแน่ใจหรือไม่ ?",
            text: "คุณจะไม่สามารถย้อนกลับได้!",
            icon: 'warning',
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
                        fetchCategory();
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
                        showToast("เกิดข้อผิดพลาด" , "error");
                    }
                } catch (err) {
                    const error = err as { response: { data: { message: string } } };
                    showToast(error.response.data.message , "error");
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
                    <div>
                        <Button
                            className="bg-blue-500 text-white hover:bg-blue-700 whitespace-nowrap"
                            onClick={handleModalAdd}
                        >
                            เพิ่มข้อมูล
                        </Button>
                    </div>
                </div>
                <div className="overflow-auto h-[100%]">
                    <Card className="mt-5 h-[35vh] sm:h-[48vh] md:h-[58vh] lg:h-[63vh] overflow-auto mb-3 border-2 ">
                        <table className="w-full min-w-max ">
                            <thead>
                                <tr>
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 w-1 whitespace-nowrap">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70 "
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
                                            หน้าปก
                                        </Typography>
                                    </th>
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 whitespace-nowrap">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70 whitespace-nowrap"
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
                                                <div className="flex items-center justify-center">
                                                    <Image
                            
                                                        // src={`http://${item.image}` || ""}
                                                        src="data:image/png;base64,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"
                                                        alt=""
                                                        width={50}
                                                        height={50}
                                                        className="p-2 rounded-full"
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex items-center justify-center">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {item?.title}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td>
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


            {/* modal Add and Edit  */}
            <AddEditModal
                open={openModalAdd}
                handleModalAdd={handleModalAdd}
                formData={formData}
                setFormData={setFormData}
                handleChange={handleChange}
                handleAddCategory={handleAddCategory}
                dataEdit={dataEdit}
            />
        </div>
    );
};

export default LearningShow;
