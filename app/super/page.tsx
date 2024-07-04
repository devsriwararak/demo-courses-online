// Super.tsx
"use client";
import { Card, Button, Input, Typography, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";

import axios from "axios";
import { HeaderAPI } from "@/headerApi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaRegEdit, FaRegSave, FaCheckCircle } from "react-icons/fa";
import { AiOutlineStop } from "react-icons/ai";
import { BsPlusCircle } from "react-icons/bs";
import { IoTrashBin } from "react-icons/io5";

import { useState, useEffect, useCallback } from "react";

interface Customer {
    id: number;
    username: string;
    name: string;
    address: string;
    // Add other fields as necessary
}

interface ResponseData {
    data: Customer[];
    totalPages: number;
}

type FormDataKey = "username" | "password" | "name";

const SuperPage: React.FC = () => {
    const [data, setData] = useState<ResponseData>({ data: [], totalPages: 1 });
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);

    const [formData, setFormData] = useState({ username: "", password: "", name: "" });

    const fetchCustomer = useCallback(async () => {
        const requestData = {
            status: 1,
            page: page,
            search: searchQuery
        };
        console.log(requestData)
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/api/admin`,
                requestData,
                {
                    ...HeaderAPI(localStorage.getItem("Token")),
                }
            );
            // console.log(res.data);
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
        fetchCustomer();
    }, [fetchCustomer, page]);

    console.log(searchQuery);

    //------------- modal Add Product -----------------------//
    const [openModalAdd, setOpenModalAdd] = useState(false);


    const handleModalAdd = () => {
        setOpenModalAdd(!openModalAdd);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // console.log(formData)

    const handleAddCustomer = async () => {

        const data = {
            username: formData.username,
            password: formData.password,
            name: formData.name,
            status: 1
        }

        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/api/register`,
                data,
                {
                    ...HeaderAPI(localStorage.getItem("Token")),
                }
            );
            console.log(res)
            if (res.status === 200) {
                fetchCustomer()
                toast.success(res.data.message);
                setFormData({ username: "", password: "", name: "" })
                handleModalAdd();
            } else {
                toast.error("เกิดข้อผิดพลาด");
            }
        } catch (err) {
            // console.error(err);
            handleModalAdd();
            const error = err as { response: { data: { message: string } } };
            toast.error(error.response.data.message);
        }
    };

    console.log(page)

    return (
        <div className="flex justify-center">
            <ToastContainer autoClose={2000} theme="colored" />

            <Card className="flex w-[800px] h-[85vh]">
                <div className="w-full p-5 justify-center items-center">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-3 items-center">
                        <div className="flex gap-3">
                            <Input
                                label="ค้นหาผู้ใช้"
                                crossOrigin="anonymous"
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onClick={() => setPage(1)}
                            />
                            <Button className="bg-blue-500 text-white hover:bg-blue-700 whitespace-nowrap">
                                ล้างค้นหา
                            </Button>
                        </div>
                        <div>
                            <Button className="bg-blue-500 text-white hover:bg-blue-700 whitespace-nowrap" onClick={handleModalAdd}>
                                เพิ่มข้อมูล
                            </Button>
                        </div>
                    </div>
                    <div className="overflow-auto h-[80%] lg:h-[100%]">
                        <Card className="mt-5 h-[35vh] sm:h-[48vh] md:h-[58vh] lg:h-[65vh] overflow-auto mb-3 border-2 mx-3">
                            <table className="w-full min-w-max">
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
                                                ชื่อ-สกุล
                                            </Typography>
                                        </th>
                                        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 whitespace-nowrap">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-bold leading-none opacity-70 whitespace-nowrap"
                                            >
                                                Username
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
                                                <td className="py-1">
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
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {item?.name}
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
                                                            {item?.username}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex justify-center px-3 gap-2">
                                                        {/* Add edit/delete buttons here */}
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

            {/* modal Add Customer */}

            <Dialog open={openModalAdd} size="xs" handler={handleModalAdd}>
                <DialogHeader className="bg-blue-700 py-3  px-3  justify-center text-lg text-white opacity-80">
                    <Typography variant="h5">เพิ่มข้อมูล</Typography>
                </DialogHeader>
                <DialogBody divider className="overflow-auto">
                    <div className="w-full flex flex-col justify-center gap-4">
                        {["Username", "Password", "Name"].map((field) => (
                            <Input
                                key={field}
                                type={field === "Password" ? "password" : "text"}
                                label={field}
                                name={field.toLowerCase()}
                                maxLength={50}
                                color="blue-gray"
                                style={{ backgroundColor: "#F4F4F4" }}
                                crossOrigin="anonymous"
                                value={formData[field.toLowerCase() as FormDataKey]}
                                onChange={handleChange}
                            />
                        ))}
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        size="sm"
                        onClick={handleModalAdd}
                        className="flex mr-1 text-base"
                    >
                        <span className="text-xl mr-2">
                            <AiOutlineStop />
                        </span>
                        ยกเลิก
                    </Button>
                    <Button
                        size="sm"
                        variant="gradient"
                        color="green"
                        onClick={handleAddCustomer}
                        className="flex text-base mr-1"
                    >
                        <span className="mr-2 text-xl">
                            <FaRegSave />
                        </span>
                        บันทึก
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default SuperPage;
