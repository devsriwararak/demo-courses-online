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
import { useState, useEffect, useCallback, useRef, useReducer } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { MdDelete, MdEdit } from "react-icons/md";
// import dynamic from "next/dynamic";

const MySwal = withReactContent(Swal);

interface Product {
  id: number;
  title: string;
}

interface List {
  product_id: number;
  count: string;
  title: string;
}

interface Question {
  products_id: number;
  title: string;
  count: string;
}

interface ListData {
  id: number;
  question: string;
  index:number
}

interface ResponseData {
  data: Question[];
  totalPages: number;
}

interface ResponseData1 {
  data: ListData[];
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

const handleAxiosError = (error: unknown, defaultMessage: string) => {
  if (axios.isAxiosError(error) && error.response) {
    toast.error(error.response.data.message || defaultMessage);
  } else {
    toast.error(defaultMessage);
  }
};

const HomeWorkPage: React.FC = () => {
  const initialState = {
    products: [] as Product[],
    statusEdit: 0,
    data: { data: [], totalPages: 1 } as ResponseData,
    dataList: { data: [], totalPages: 1 } as ResponseData1,
    searchQuery: "",
    searchList: "",
    hideSearch: true,
    page: 1,
    pageList: 1,
    formData: {
      id: 0,
      product_id: 0,
      questNumber: 0,
      question: "",
    },
    formList: {
      product_id: 0,
      count: "",
      title: "",
    },
    selectedCourseTitle: "",
  };

  type State = typeof initialState;

  type Action =
    | { type: "SET_PRODUCTS"; payload: Product[] }
    | { type: "SET_STATUS_EDIT"; payload: number }
    | { type: "SET_DATA"; payload: ResponseData }
    | { type: "SET_DATA_LIST"; payload: ResponseData1 }
    | { type: "SET_SEARCH_QUERY"; payload: string }
    | { type: "SET_SEARCH_LIST"; payload: string }
    | { type: "SET_HIDE_SEARCH"; payload: boolean }
    | { type: "SET_PAGE"; payload: number }
    | { type: "SET_PAGE_LIST"; payload: number }
    | { type: "SET_FORM_DATA"; payload: Partial<State["formData"]> }
    | { type: "SET_FORM_LIST"; payload: Partial<State["formList"]> }
    | { type: "SET_SELECTED_COURSE_TITLE"; payload: string }
    | { type: "RESET_FORM" }
    | { type: "RESET_FORM1" }
    | { type: "RESET_STATUS_EDIT" }
    | { type: "RESET_SELECTED_COURSE_TITLE" };

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case "SET_PRODUCTS":
        return { ...state, products: action.payload };
      case "SET_STATUS_EDIT":
        return { ...state, statusEdit: action.payload };
      case "SET_DATA":
        return { ...state, data: action.payload };
      case "SET_DATA_LIST":
        return { ...state, dataList: action.payload };
      case "SET_SEARCH_QUERY":
        return { ...state, searchQuery: action.payload };
      case "SET_SEARCH_LIST":
        return { ...state, searchList: action.payload };
      case "SET_HIDE_SEARCH":
        return { ...state, hideSearch: action.payload };
      case "SET_PAGE":
        return { ...state, page: action.payload };
      case "SET_PAGE_LIST":
        return { ...state, pageList: action.payload };
      case "SET_FORM_DATA":
        return { ...state, formData: { ...state.formData, ...action.payload } };
      case "SET_FORM_LIST":
        return { ...state, formList: { ...state.formList, ...action.payload } };
        case "SET_SELECTED_COURSE_TITLE":
      return { ...state, selectedCourseTitle: action.payload };
      case "RESET_SELECTED_COURSE_TITLE":
      return { ...state, selectedCourseTitle: "" };
      case "RESET_FORM":
        return {
          ...state,
          formData: initialState.formData,
          hideSearch: true,
          dataList: initialState.dataList,
        };
      case "RESET_STATUS_EDIT":
        return { ...state, statusEdit: 0 };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    products,
    statusEdit,
    data,
    dataList,
    searchQuery,
    searchList,
    hideSearch,
    page,
    pageList,
    formData,
    formList,
  } = state;

  const dragItem = useRef<number | null>(null);
  const dragItemOver = useRef<number | null>(null);

  // const handleSort = () => {
  //   if (dragItem.current !== null && dragItemOver.current !== null) {
  //     const _dataList = [...dataList.data];
  //     const draggedItemContent = _dataList.splice(dragItem.current, 1)[0];
  //     _dataList.splice(dragItemOver.current, 0, draggedItemContent);
  //     dragItem.current = null;
  //     dragItemOver.current = null;
  //     dispatch({
  //       type: "SET_DATA_LIST",
  //       payload: { ...dataList, data: _dataList },
  //     });
  //   }
  // };

  const handleSort = async () => {
    if (dragItem.current !== null && dragItemOver.current !== null) {
      const _dataList = [...dataList.data];
      const draggedItemContent = _dataList.splice(dragItem.current, 1)[0];
      _dataList.splice(dragItemOver.current, 0, draggedItemContent);
      dragItem.current = null;
      dragItemOver.current = null;
      dispatch({
        type: "SET_DATA_LIST",
        payload: { ...dataList, data: _dataList },
      });
  
      // ส่งข้อมูลไปยัง API หลังจากการเปลี่ยนตำแหน่ง
      try {
        const data = {
          arrData: _dataList,
          page: pageList,
        }
        console.log(data)
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/question/list/change`,
          data,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
          }
        );
  
        if (res.status === 200) {
          toast.success(res.data.message);
          // dispatch({ type: "RESET_FORM" });
          // dispatch({ type: "RESET_STATUS_EDIT" });
          // dispatch({ type: "RESET_SELECTED_COURSE_TITLE" });
        } else {
          toast.error("Failed to update data");
        }
      } catch (err) {
        handleAxiosError(err, "Failed to update data");
      }
    }
  };

  const fetchProduct = useCallback(async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/product`,
        { full: true },
        { ...HeaderAPI(localStorage.getItem("Token")) }
      );
      if (res.status === 200) {
        dispatch({ type: "SET_PRODUCTS", payload: res.data.data });
      } else {
        toast.error("Error fetching products");
      }
    } catch (err) {
      handleAxiosError(err, "Form submission failed");
    }
  }, []);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleCategoryChange = (selectedOption: any) => {
    dispatch({
      type: "SET_FORM_DATA",
      payload: { product_id: selectedOption?.value || 0 },
    });
    fetchCheckNum(selectedOption?.value);
  };

  const fetchCheckNum = useCallback(async (id: number) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/api/question/check_index/${id}`,
        { ...HeaderAPI(localStorage.getItem("Token")) }
      );
      if (res.status === 200) {
        dispatch({
          type: "SET_FORM_DATA",
          payload: { questNumber: res.data },
        });
      } else {
        toast.error("Error fetching question number");
      }
    } catch (err) {
        handleAxiosError(err, "Form submission failed");
    }
  }, []);

  const handleSubmit = async () => {
    const data = {
      products_id: formData.product_id,
      question: formData.question,
      ...(statusEdit === 0
        ? { index: formData.questNumber }
        : { id: formData.id }),
    };

    try {
      const res =
        statusEdit === 0
          ? await axios.post(
              `${process.env.NEXT_PUBLIC_API}/api/question/add`,
              data,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("Token")}`,
                },
              }
            )
          : await axios.put(
              `${process.env.NEXT_PUBLIC_API}/api/question/list`,
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
        // dispatch({ type: "RESET_FORM" });
        fetchList(formData.product_id, searchList);
        dispatch({ type: "RESET_STATUS_EDIT" });
        // dispatch({ type: "RESET_SELECTED_COURSE_TITLE" });
      } else {
        toast.error("Form submission failed!");
      }
    } catch (err) {
      console.log(err)
      handleAxiosError(err, "Form submission failed");
    }
  };

  const fetchQuestion = useCallback(async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/question`,
        { search: searchQuery, page, full: false },
        { ...HeaderAPI(localStorage.getItem("Token")) }
      );
      if (res.status === 200) {
        dispatch({ type: "SET_DATA", payload: res.data });
      } else {
        toast.error("Error fetching questions");
      }
    } catch (err) {
      handleAxiosError(err, "Form submission failed");
    }
  }, [page, searchQuery]);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion, page]);

  const fetchList = useCallback(
    async (products_id: number, value: string) => {
      dispatch({
        type: "SET_FORM_LIST",
        payload: { product_id: products_id, count: "", title: "" },
      });
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/question/list`,
          { products_id, search: value || "", page: pageList, full: false },
          { ...HeaderAPI(localStorage.getItem("Token")) }
        );
        if (res.status === 200) {
          dispatch({ type: "SET_DATA_LIST", payload: res.data });
          dispatch({ type: "SET_HIDE_SEARCH", payload: false });
        } else {
          toast.error("Error fetching list");
        }
      } catch (err) {
        handleAxiosError(err, "Form submission failed");
      }
    },
    [pageList]
  );

  useEffect(() => {
    if (formList.product_id) {
      fetchList(formList.product_id, searchList);
    }
  }, [pageList, formList.product_id, searchList, fetchList]);

  // const handleSendList = async (item: any) => {
  //   dispatch({ type: "SET_SELECTED_COURSE_TITLE", payload: item.title });
  //   await fetchList(item.products_id, "");
  // };
  const handleSendList = async (item: any) => {
    dispatch({ type: "SET_SELECTED_COURSE_TITLE", payload: item.title });
    dispatch({ type: "SET_PAGE_LIST", payload: 1 }); // ตั้งค่า pageList เป็น 1
    await fetchList(item.products_id, "");
  };

  const resetForm = () => {
    dispatch({ type: "RESET_FORM" });
    dispatch({ type: "RESET_STATUS_EDIT" });
    dispatch({ type: "RESET_SELECTED_COURSE_TITLE" });
  };

  const handleEdit = (data: any) => {
    dispatch({
      type: "SET_FORM_DATA",
      payload: {
        id: data.id,
        question: data.question,
        product_id: formList.product_id,
        questNumber: data.index, 
      },
    });
    dispatch({ type: "SET_STATUS_EDIT", payload: 1 });
  };

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "คุณจะไม่สามารถย้อนกลับได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่, ลบเลย!",
      cancelButtonText: "ยกเลิก",
      background: "#f9f9f9",
      width: "350px",
      padding: "1em",
      backdrop: `
        rgba(0,0,0,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(
            `${process.env.NEXT_PUBLIC_API}/api/question/list/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
              },
            }
          );
          if (res.status === 200) {
            fetchList(formList.product_id, searchList);
            resetForm();
            Swal.fire({
              text: "ข้อมูลของคุณถูกลบแล้ว.",
              icon: "success",
              width: "400px",
              background: "#f9f9f9",
              timer: 1000,
              timerProgressBar: true,
              backdrop: `
              rgba(0,0,0,0.4)
              url("/images/nyan-cat.gif")
              left top
              no-repeat
            `,
            });
          } else {
            toast.error("เกิดข้อผิดพลาด");
          }
        } catch (err) {
          handleAxiosError(err, "Form submission failed");
        }
      }
    });
  };

  console.log(dataList)
  return (
    <ThemeProvider value={theme}>
      <div className="flex flex-col lg:flex-row justify-center gap-3 overflow-auto">
        <ToastContainer autoClose={2000} theme="colored" />
        <div className="w-full lg:w-5/12">
          <div className="flex flex-col h-[88vh] gap-3">
            <Card className="flex shadow-none overflow-auto h-[40%] p-3">
              <div className="flex flex-col gap-3 w-full justify-center lg:justify-start">
                <div className="flex w-full flex-col justify-between lg:flex-row gap-3">
                  <div>
                    <Select
                      options={products.map((product) => ({
                        value: product.id,
                        label: product.title,
                      }))}
                      onChange={handleCategoryChange}
                      value={
                        products
                          .map((product) => ({
                            value: product.id,
                            label: product.title,
                          }))
                          .find(
                            (option) => option.value === formData.product_id
                          ) || null
                      }
                      placeholder="เลือกคอร์ดเรียน"
                      isClearable
                      isDisabled={statusEdit === 1}
                      className="w-full xl:w-[300px]"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          borderRadius: "8px",
                        }),
                        menu: (provided) => ({
                          ...provided,
                          borderRadius: "8px",
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
                      value={formData.questNumber}
                      readOnly
                    />
                  </div>
                </div>
                <div className="w-full gap-3">
                  <Textarea
                    label="สร้างคำถาม"
                    className="h-[110px]"
                    value={formData.question}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_FORM_DATA",
                        payload: { question: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="w-full flex flex-col sm:flex-row justify-end gap-3">
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
              <div className="w-full justify-center items-center">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex gap-3">
                    <Input
                      label="ค้นหาคอร์ดเรียน"
                      crossOrigin="anonymous"
                      onChange={(e) =>
                        dispatch({
                          type: "SET_SEARCH_QUERY",
                          payload: e.target.value,
                        })
                      }
                      onClick={() => dispatch({ type: "SET_PAGE", payload: 1 })}
                    />
                  </div>
                </div>
                <div className="overflow-auto lg:h-[90%]">
                  <Card className="mt-5 h-[32vh] overflow-auto mb-3 border-2">
                    <table className="w-full min-w-max">
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
                        {data.data.length === 0 ? (
                          <tr>
                            <td colSpan={3} className="text-center pt-5">
                              <Typography>...ไม่พบข้อมูล...</Typography>
                            </td>
                          </tr>
                        ) : (
                          data.data.map((item, index) => (
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
                                    className="font-normal ps-4 overflow-hidden text-ellipsis whitespace-nowrap max-w-[190px]"
                                  >
                                    {item.title}
                                  </Typography>
                                  <div className="tooltip-text text-sm">
                                    {item.title}
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="flex justify-center">
                                  <Button
                                    color="green"
                                    size="sm"
                                    className="w-full p-1 m-1"
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
                  <div className="flex justify-end gap-5 mt-3 px-2 items-center">
                    <Button
                      className="bg-gray-400 text-white whitespace-nowrap hover:bg-gray-600"
                      disabled={page === 1}
                      onClick={() =>
                        dispatch({
                          type: "SET_PAGE",
                          payload: Math.max(page - 1, 1),
                        })
                      }
                    >
                      ก่อนหน้า
                    </Button>
                    <span style={{ whiteSpace: "nowrap" }}>
                      หน้าที่ {page} / {data.totalPages || 1}
                    </span>
                    <Button
                      className="bg-gray-400 text-white whitespace-nowrap hover:bg-gray-600"
                      disabled={page >= (data.totalPages || 1)}
                      onClick={() =>
                        dispatch({ type: "SET_PAGE", payload: page + 1 })
                      }
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
            <div className="w-full justify-center items-center p-3">
              <div className="flex flex-col  gap-3">
                <div className="flex gap-3 ">
                  <Input
                    label="ค้นหาคำถาม"
                    crossOrigin="anonymous"
                    disabled={hideSearch}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_SEARCH_LIST",
                        payload: e.target.value,
                      })
                    }
                    onClick={() =>
                      dispatch({ type: "SET_PAGE_LIST", payload: 1 })
                    }
                  />
                </div>
                <div className="flex gap-3 ps-5">
                  <Typography>
                    คอร์สเรียน: <span>{state?.selectedCourseTitle}</span>
                  </Typography>
                </div>
              </div>

              <div className="overflow-auto lg:h-[90%]">
                <Card className="mt-5 h-[32vh] overflow-auto mb-3 border-2">
                  <table className="w-full min-w-max">
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
                            คำถาม
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
                      {dataList.data.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="text-center pt-5">
                            <Typography>...ไม่พบข้อมูล...</Typography>
                          </td>
                        </tr>
                      ) : (
                        dataList.data.map((item, index) => (
                          <tr
                            key={index}
                            style={{ marginTop: "3px" }}
                            draggable
                            onDragStart={() => (dragItem.current = index)}
                            onDragEnter={() => (dragItemOver.current = index)}
                            onDragEnd={handleSort}
                            onDragOver={(e) => e.preventDefault}
                          >
                            <td className="py-2">
                              <div className="flex items-center justify-center">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  ข้อที่ {item?.index}
                                </Typography>
                              </div>
                            </td>
                            <td>
                              <div className="relative flex items-center justify-center mt-2 tooltip">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal ps-4 overflow-hidden text-ellipsis whitespace-nowrap max-w-[190px]"
                                >
                                  {item.question}
                                </Typography>
                                <div className="tooltip-text text-sm">
                                  {item.question}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="flex justify-center mt-2 gap-2">
                                <IconButton
                                  size="sm"
                                  className="text-white max-w-7 max-h-7 bg-yellow-700"
                                  onClick={() => handleEdit(item)}
                                >
                                  <MdEdit className="h-5 w-5" />
                                </IconButton>
                                <IconButton
                                  size="sm"
                                  className="bg-red-300 max-w-7 max-h-7"
                                  onClick={() => handleDelete(item.id)}
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
                </Card>
                <div className="flex justify-end gap-5 mt-3 px-2 items-center">
                  <Button
                    className="bg-gray-400 text-white whitespace-nowrap hover:bg-gray-600"
                    disabled={pageList === 1}
                    onClick={() =>
                      dispatch({
                        type: "SET_PAGE_LIST",
                        payload: Math.max(pageList - 1, 1),
                      })
                    }
                  >
                    ก่อนหน้า
                  </Button>
                  <span style={{ whiteSpace: "nowrap" }}>
                    หน้าที่ {pageList} / {dataList.totalPages || 1}
                  </span>
                  <Button
                    className="bg-gray-400 text-white whitespace-nowrap hover:bg-gray-600"
                    disabled={pageList >= (dataList.totalPages || 1)}
                    onClick={() =>
                      dispatch({ type: "SET_PAGE_LIST", payload: pageList + 1 })
                    }
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
