"use client";
import {
  Card,
  Button,
  Input,
  ThemeProvider,
  Textarea,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import Select from "react-select";
import axios from "axios";
import { HeaderAPI } from "@/headerApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { MdDelete, MdEdit } from "react-icons/md";

const MySwal = withReactContent(Swal);

import dynamic from "next/dynamic";

interface Product {
  id: number;
  title: string;
}
interface List {
  product_id: 0;
  count: "";
  title: "";
}

interface question {
  products_id: number;
  title: string;
  count: string;
}
interface list {
  id: number;
  question: string;
}

interface ResponseData {
  data: question[];
  totalPages: number;
}
interface ResponseData1 {
  data: list[];
  totalPages: number;
}

const theme = {
  input: {
    styles: {
      base: {
        container: {
          width: "w-auto",
          minWidth: "min-w-[100px]",
        },
      },
    },
  },
};

const HomeWorkPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [list, setList] = useState<List[]>([]);
  const [data, setData] = useState<ResponseData>({ data: [], totalPages: 1 });
  const [dataList, setDataList] = useState<ResponseData1>({
    data: [],
    totalPages: 1,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchList, setSearchList] = useState("");
  const [questNumber, setQuestNumber] = useState(0);
  const [page, setPage] = useState(1);
  const [pageList, setPageList] = useState(1);

  const [formData, setFormData] = useState({
    id: 0,
    product_id: "",
    questNumber: 0,
    question: "",
  });
  const [formList, setFormList] = useState({
    product_id: 0,
    count: "",
    title: "",
  });

  const fetchProduct = useCallback(async () => {
    const requestData = { full: true };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/product`,
        requestData,
        { ...HeaderAPI(localStorage.getItem("Token")) }
      );
      if (res.status === 200) {
        setProducts(res.data.data);
      } else {
        toast.error("error");
      }
    } catch (err) {
      const error = err as { response: { data: { message: string } } };
      toast.error(error.response.data.message);
    }
  }, []);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleCategoryChange = (selectedOption: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      product_id: selectedOption ? selectedOption.value : "",
    }));
    fetchCheckNum(selectedOption?.value);
  };

  const fetchCheckNum = useCallback(async (id: number) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/api/question/check_index/${id}`,
        { ...HeaderAPI(localStorage.getItem("Token")) }
      );
      if (res.status === 200) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          questNumber: res.data,
        }));
      } else {
        toast.error("error");
      }
    } catch (err) {
      console.log(err);
      const error = err as { response: { data: { message: string } } };
      toast.error(error.response.data.message);
    }
  }, []);

  const handleSubmit = async () => {
    const data = {
      products_id: formData?.product_id,
      index: formData?.questNumber,
      question: formData?.question,
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/question/add`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        fetchQuestion();
        resetForm();
        MySwal.close();
      } else {
        toast.error("Form submission failed!");
        MySwal.close();
      }
    } catch (err) {
      MySwal.close();
      const error = err as { response: { data: { message: string } } };
      toast.error(error.response.data.message);
    }
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      product_id: "",
      questNumber: 0,
      question: "",
    });
  };

  //   console.log(formData);

  const fetchQuestion = useCallback(async () => {
    const requestData = {
      search: searchQuery,
      page: page,
      full: false,
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/question`,
        requestData,
        { ...HeaderAPI(localStorage.getItem("Token")) }
      );
      //   console.log(res);
      if (res.status === 200) {
        setData(res.data);
      } else {
        toast.error("error");
      }
    } catch (err) {
      const error = err as { response: { data: { message: string } } };
      toast.error(error.response.data.message);
    }
  }, [page, searchQuery]);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion, page]);

  //   console.log(data);

  //   console.log(formList);

  const fetchList = useCallback(
    async (products_id: any, value: any) => {
      setFormList({
        product_id: products_id,
        count: "", // กำหนดค่าเบื้องต้นให้กับ count
        title: "", // กำหนดค่าเบื้องต้นให้กับ title
      });
      const data = {
        products_id,
        search: value ? value : "",
        page: pageList,
        full: false,
      };
      try {
        // console.log(data);
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/question/list`,
          data,
          { ...HeaderAPI(localStorage.getItem("Token")) }
        );
        console.log(res.data);
        if (res.status === 200) {
          setDataList(res.data);
        } else {
          toast.error("error");
        }
      } catch (err) {
        console.log(err);
        const error = err as { response: { data: { message: string } } };
        toast.error(error.response.data.message);
      }
    },
    [pageList]
  );

  console.log(dataList);

  const handleSendList = async (item: any) => {
    const products_id = item.products_id;
    await fetchList(products_id, "");
  };

  const handleSearch = async (value: any) => {
    const products_id = formList.product_id;
    await fetchList(products_id, value);
  };

  return (
    <ThemeProvider value={theme}>
      <div className="flex flex-col lg:flex-row justify-center gap-3 overflow-auto">
        <ToastContainer autoClose={2000} theme="colored" />
        <div className="w-full lg:w-5/12">
          <div className="flex flex-col  h-[88vh] gap-3">
            <Card className="flex shadow-none overflow-auto h-[40%] p-3">
              <div className=" flex flex-col gap-3 w-full justify-center lg:justify-start">
                <div className="flex w-full flex-col justify-between lg:flex-row gap-3">
                  <div>
                    <Select
                      options={products.map((product) => ({
                        value: product.id.toString(),
                        label: product.title,
                      }))}
                      onChange={handleCategoryChange}
                      value={
                        products
                          .map((product) => ({
                            value: product.id.toString(),
                            label: product.title,
                          }))
                          .find(
                            (option) => option.value === formData.product_id
                          ) || null
                      }
                      placeholder="เลือกคอร์ดเรียน"
                      isClearable
                      className="w-full xl:w-[300px]  "
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          borderRadius: "8px",
                        }),
                        menu: (provided) => ({
                          ...provided,
                          borderRadius: "8px",
                          //   maxHeight: "150px", // กำหนดความสูงของเมนู
                        }),
                        menuList: (provided) => ({
                          ...provided,
                          maxHeight:
                            window.innerWidth < 1524
                              ? "150px"
                              : window.innerWidth < 1650
                              ? "165px"
                              : "150px",
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          borderRadius: state.isFocused ? "8px" : "0px",
                        }),
                      }}
                    />
                  </div>
                  <div>
                    <Input
                      label="หัวข้อที่"
                      type="text"
                      crossOrigin="anonymous"
                      value={formData?.questNumber}
                      accept="image/*"
                      id="imageInput"
                      readOnly
                      //   onChange={handleImageUpload}
                    />
                  </div>
                </div>
                <div className="w-full gap-3">
                  <Textarea
                    label="สร้างคำถาม"
                    className="h-[110px]"
                    value={formData.question}
                    onChange={(e) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        question: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="w-full flex flex-col sm:flex-row justify-end  gap-3">
                  <div className="md:w-[100px]">
                    <Button
                      color="green"
                      variant="outlined"
                      size="sm"
                      className="w-full"
                      onClick={resetForm}
                    >
                      สร้างใหม่
                    </Button>
                  </div>
                  <div className="md:w-[100px]">
                    <Button
                      color="blue"
                      size="sm"
                      className="w-full"
                      onClick={handleSubmit}
                    >
                      บันทึก
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="flex z-10 shadow-none overflow-auto h-[60%] p-3">
              <div className="w-full  justify-center items-center">
                <div className="flex flex-col sm:flex-row gap-3  ">
                  <div className="flex gap-3">
                    <Input
                      label="ค้นหาคอร์ดเรียน"
                      crossOrigin="anonymous"
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onClick={() => setPage(1)}
                    />
                    {/* <Button className="bg-blue-500 text-white hover:bg-blue-700 whitespace-nowrap">
                ล้างค้นหา
              </Button> */}
                  </div>
                </div>
                <div className="overflow-auto   lg:h-[90%]">
                  <Card className="mt-5 h-[32vh]   overflow-auto mb-3 border-2 ">
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
                              ชื่อคอร์ด
                            </Typography>
                          </th>
                          <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 w-1 whitespace-nowrap">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold leading-none opacity-70"
                            >
                              เลือก
                            </Typography>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.data?.length === 0 ? (
                          <tr>
                            <td colSpan={3} className="text-center pt-5">
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
                              <td>
                                <div className="relative flex items-center justify-center tooltip">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal ps-4   overflow-hidden text-ellipsis whitespace-nowrap  max-w-[190px]"
                                  >
                                    {item?.title}
                                  </Typography>
                                  <div className="tooltip-text text-sm">
                                    {item?.title}
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="flex justify-center  ">
                                  <Button
                                    color="green"
                                    size="sm"
                                    className="w-full p-1 m-1 "
                                    onClick={() => handleSendList(item)}
                                  >
                                    เลือก
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </Card>
                  <div className="flex justify-end gap-5 mt-3 px-2 items-center  ">
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
                        Number(data?.totalPages) - Number(page) < 1
                          ? true
                          : false
                      }
                      onClick={() => setPage((page) => page + 1)}
                    >
                      ถัดไป
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div className="w-full lg:w-7/12">
          <Card className="flex h-[88vh] overflow-auto">
            <div className="w-full  justify-center items-center p-3">
              <div className="flex flex-col sm:flex-row gap-3  ">
                <div className="flex gap-3">
                  <Input
                    label="ค้นหาคำถาม"
                    crossOrigin="anonymous"
                    disabled={dataList?.data?.length === 0}
                    onChange={(e) => handleSearch(e.target.value)}
                    onClick={() => setPageList(1)}
                  />
                  {/* <Button className="bg-blue-500 text-white hover:bg-blue-700 whitespace-nowrap">
                ล้างค้นหา
              </Button> */}
                </div>
              </div>
              <div className="overflow-auto   lg:h-[90%]">
                <Card className="mt-5 h-[32vh]   overflow-auto mb-3 border-2  ">
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
                            ชื่อคอร์ด
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
                      {dataList?.data?.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="text-center pt-5">
                            <Typography>...ไม่พบข้อมูล...</Typography>
                          </td>
                        </tr>
                      ) : (
                        dataList?.data?.map((item, index) => (
                          <tr key={index} style={{ marginTop: "3px" }}>
                            <td className="py-2">
                              <div className="flex items-center justify-center">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  ข้อที่ {index + 1}
                                </Typography>
                              </div>
                            </td>
                            <td>
                              <div className="relative flex items-center justify-center tooltip">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal ps-4   overflow-hidden text-ellipsis whitespace-nowrap  max-w-[190px]"
                                >
                                  {item?.question}
                                </Typography>
                                <div className="tooltip-text text-sm">
                                  {item?.question}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="flex justify-center gap-2  ">
                                <IconButton
                                  size="sm"
                                  className=" text-white max-w-7 max-h-7 bg-yellow-700  "
                                  //   onClick={(e) => [
                                  //     handleModalAdd(),
                                  //     setDataEdit(item),
                                  //   ]}
                                >
                                  <MdEdit className="h-5 w-5   " />
                                </IconButton>
                                <IconButton
                                  size="sm"
                                  className=" bg-red-300 max-w-7 max-h-7 "
                                  onClick={() => {
                                    // handleDelete(item);
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
                <div className="flex justify-end gap-5 mt-3 px-2 items-center  ">
                  <Button
                    className="bg-gray-400 text-white whitespace-nowrap hover:bg-gray-600"
                    disabled={pageList === 1}
                    onClick={() =>
                      setPageList((prevPage) => Math.max(prevPage - 1, 1))
                    }
                  >
                    ก่อนหน้า
                  </Button>
                  <span style={{ whiteSpace: "nowrap" }}>
                    หน้าที่ {pageList} / {dataList?.totalPages || 1}
                  </span>
                  <Button
                    className="bg-gray-400 text-white whitespace-nowrap hover:bg-gray-600"
                    disabled={pageList >= (dataList?.totalPages || 1)}
                    onClick={() => setPageList((prevPage) => prevPage + 1)}
                  >
                    ถัดไป
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default HomeWorkPage;
