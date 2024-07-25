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
import {
  MdDelete,
  MdEdit,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

const MySwal = withReactContent(Swal);

interface Product {
  id: number;
  title: string;
}

interface Chapter {
  id: number;
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
  index: number;
}

interface ResponseData {
  data: Question[];
  totalPages: number;
}

interface ResponseData1 {
  data: ListData[];
  totalPages: number;
}

interface ChapterOption extends Chapter {
  value: number;
  label: string;
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
    chapters: [] as Chapter[],
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
      products_title_id: 0,
      question: "",
      questionImage: null as File | null,
      solutionImage: null as File | null,
    },
    formList: {
      product_id: 0,
      count: "",
      title: "",
    },
    selectedCourseTitle: "",
    selectedChapter: null as number | null, // เพิ่ม selectedChapter ที่นี่
  };

  type State = typeof initialState;

  type Action =
    | { type: "SET_PRODUCTS"; payload: Product[] }
    | { type: "SET_CHAPTERS"; payload: Chapter[] }
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
    | { type: "RESET_FORM_LIST" }
    | { type: "RESET_FORM_DATA" }
    | { type: "RESET_STATUS_EDIT" }
    | { type: "RESET_SELECTED_COURSE_TITLE" }
    | { type: "SET_SELECTED_CHAPTER"; payload: number | null } // เพิ่ม action สำหรับ selectedChapter
    | { type: "RESET_SELECTED_CHAPTER" }; // เพิ่ม action สำหรับรีเซ็ต selectedChapter

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case "SET_PRODUCTS":
        return { ...state, products: action.payload };
      case "SET_CHAPTERS":
        return { ...state, chapters: action.payload };
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
      case "RESET_FORM_LIST":
        return { ...state, dataList: initialState.dataList };
      case "RESET_FORM_DATA":
        return { ...state, formData: initialState.formData };
      case "SET_SELECTED_COURSE_TITLE":
        return { ...state, selectedCourseTitle: action.payload };
      case "RESET_SELECTED_COURSE_TITLE":
        return { ...state, selectedCourseTitle: "" };
      case "SET_SELECTED_CHAPTER":
        return { ...state, selectedChapter: action.payload }; // เพิ่ม case สำหรับ selectedChapter
      case "RESET_SELECTED_CHAPTER":
        return { ...state, selectedChapter: null }; // เพิ่ม case สำหรับรีเซ็ต selectedChapter
      case "RESET_FORM":
        return {
          ...state,
          formData: initialState.formData,
          hideSearch: true,
          dataList: initialState.dataList,
          selectedChapter: null, // รีเซ็ต selectedChapter ใน RESET_FORM
        };
      case "RESET_STATUS_EDIT":
        return { ...state, statusEdit: 0 };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    products,
    chapters,
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

  console.log(dataList);

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
        };
        console.log(data);
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/question/list/change`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          }
        );

        if (res.status === 200) {
          toast.success(res.data.message);
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
      console.log(res.data);
      if (res.status === 200) {
        dispatch({ type: "SET_PRODUCTS", payload: res.data.data });
      } else {
        toast.error("Error fetching products");
      }
    } catch (err) {
      handleAxiosError(err, "Form submission failed");
    }
  }, []);

  const fetchChapters = useCallback(async (id: number) => {
    try {
      console.log(id);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/api/question/select/courses/${id}`,
        { ...HeaderAPI(localStorage.getItem("Token")) }
      );
      console.log(res);
      if (res.status === 200) {
        dispatch({ type: "SET_CHAPTERS", payload: res.data.data });
      } else {
        toast.error("Error fetching chapters");
      }
    } catch (err) {
      handleAxiosError(err, "Failed to fetch chapters");
    }
  }, []);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const [select1, setSelect1] = useState<any>(null);


  const handleCategoryChange = (selectedOption: any) => {
    const selectedProductId = selectedOption?.value || 0;
    dispatch({
      type: "SET_FORM_DATA",
      payload: { product_id: selectedProductId },
    });
    dispatch({ type: "RESET_SELECTED_COURSE_TITLE" });
    dispatch({ type: "RESET_FORM_LIST" });
    fetchCheckNum(selectedProductId);
    fetchChapters(selectedProductId);
    // setSelect1(selectedProductId);
    setSelect1(selectedOption); // เก็บตัวเลือกทั้งหมดใน select1
  };

  const [select2, setSelect2] = useState<any>(null);

  const handleChapterChange = (selectedOption: any) => {
    console.log(selectedOption)
    const selectedChapterId = selectedOption?.value || null;
    dispatch({
      type: "SET_SELECTED_CHAPTER",
      payload: selectedChapterId,
    });
    dispatch({
      type: "SET_FORM_DATA",
      payload: { products_title_id: selectedChapterId },
    });
    setSelect2(selectedOption);
    handleSendList();
  };

  const convertFileToBase64 = (file: File | null): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve("");
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const fetchCheckNum = useCallback(async (id: number | undefined) => {
    if (typeof id === "undefined" || id === null) {
      return;
    }

    try {
      console.log(id);
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
      console.log(err);
      handleAxiosError(err, "Form submission failed");
    }
  }, []);

  const handleSubmit = async () => {
    const questionImageBase64 = await convertFileToBase64(
      formData.questionImage
    );
    const solutionImageBase64 = await convertFileToBase64(
      formData.solutionImage
    );

    console.log(solutionImageBase64);

    const data = {
      products_id: formData.product_id,
      products_title_id: formData.products_title_id,
      index: formData.questNumber,
      question: formData.question,
      image_question: questionImageBase64 ,
      image_answer: solutionImageBase64,
    };

    try {
      console.log(data);
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
        if (statusEdit === 0) {
          console.log("aaa");
          fetchQuestion();
          dispatch({ type: "RESET_FORM" });
          dispatch({ type: "RESET_SELECTED_COURSE_TITLE" });
        } else {
          console.log("bbbb");
          fetchQuestion();
          dispatch({ type: "RESET_FORM" });
          dispatch({ type: "RESET_SELECTED_COURSE_TITLE" });
          fetchList(formData.product_id, searchList);
          dispatch({ type: "RESET_STATUS_EDIT" });
        }
      } else {
        toast.error("Form submission failed!");
      }
    } catch (err) {
      console.log(err);
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


  const fetchList1 = useCallback(async () => {
    const requestData = {
      products_id: select1?.value, 
      products_title_id: select2?.value,
      page: pageList,
      search:searchList,
      full: false,
    };
    console.log(requestData);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/question/list`,
        requestData,
        {
          ...HeaderAPI(localStorage.getItem("Token")),
        }
      );
      console.log(res.data);
      if (res.status === 200) {
        dispatch({ type: "SET_DATA_LIST", payload: res.data });
        dispatch({ type: "SET_HIDE_SEARCH", payload: false });
      } else {
        toast.error("error");
      }
    } catch (error) {
      console.error(error);
      toast.error("error");
    }
  }, [pageList, select1, select2,searchList]);

  useEffect(() => {
    if (select2) {
      fetchList1();
    }
  }, [pageList, fetchList1,select2,searchList]);

  const handleSendList = async () => {
    dispatch({ type: "SET_SELECTED_COURSE_TITLE", payload: select1 });
    dispatch({ type: "SET_PAGE_LIST", payload: 1 });
    await fetchList1();
  };

  const resetForm = () => {
    dispatch({ type: "RESET_FORM" });
    dispatch({ type: "RESET_STATUS_EDIT" });
    dispatch({ type: "RESET_SELECTED_COURSE_TITLE" });
    dispatch({ type: "RESET_SELECTED_CHAPTER" });
    setSelect1(null)
    setSelect2(null)
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
            // fetchList(formList.product_id, searchList);
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

  return (
    <ThemeProvider value={theme}>
      <div className="flex flex-col lg:flex-row justify-center gap-3 overflow-auto">
        <ToastContainer autoClose={2000} theme="colored" />
        <div className="w-full lg:w-5/12">
          <div className="flex flex-col gap-3">
            <Card className="flex shadow-none overflow-auto p-3">
              <div className="flex flex-col gap-3 py-5 w-full justify-center lg:justify-start">
                <div className="flex w-full flex-col justify-between sm:flex-row gap-3">
                  <div className="w-full sm:w-2/3">
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

                  <div className="w-full sm:w-1/4">
                    <Input
                      label="หัวข้อที่"
                      type="text"
                        crossOrigin="anonymous"
                      value={formData.questNumber}
                      readOnly
                    />
                  </div>
                </div>

                <div>
                  <Select
                    options={chapters?.map((chapter) => ({
                      value: chapter.id,
                      label: chapter.title,
                    }))}
                    onChange={handleChapterChange}
                    value={
                      chapters
                        ?.map((chapter) => ({
                          value: chapter.id,
                          label: chapter.title,
                        }))
                        .find(
                          (option) =>
                            option.value === state.selectedChapter
                        ) || null
                    }
                    placeholder="เลือกบทที่"
                    isClearable
                    isDisabled={statusEdit === 1}
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
                <div className="w-full gap-3">
                  <Input
                    type="file"
                    label="รูปคำถาม"
                    onChange={(e) =>
                      dispatch({
                        type: "SET_FORM_DATA",
                        payload: { questionImage: e.target.files?.[0] || null },
                      })
                    }
                     crossOrigin="anonymous"
                  />
                </div>
                <div className="w-full gap-3">
                  <Input
                    type="file"
                    label="รูปเฉลย"
                    onChange={(e) =>
                      dispatch({
                        type: "SET_FORM_DATA",
                        payload: { solutionImage: e.target.files?.[0] || null },
                      })
                    }
                     crossOrigin="anonymous"
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
          </div>
        </div>
        <div className="w-full lg:w-7/12">
          <Card className="flex overflow-auto">
            <div className="w-full justify-center py-5 items-center p-3">
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
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
                <div className="flex flex-col gap-1 ps-5">
                  <div>
                  <Typography className="font-bold">
                    คอร์สเรียน: <span>{select1?.label}</span>
                  </Typography>
                  </div>
                  <div>
                  <Typography className="font-bold">
                    บทเรียน: <span>{select2?.label}</span>
                  </Typography>
                  </div>
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
                            onDragOver={(e) => e.preventDefault()}
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
                  <button
                    className="bg-gray-400 text-white whitespace-nowrap hover:bg-gray-600"
                    disabled={pageList === 1}
                    onClick={() =>
                      dispatch({
                        type: "SET_PAGE_LIST",
                        payload: Math.max(pageList - 1, 1),
                      })
                    }
                  >
                    <MdOutlineKeyboardDoubleArrowLeft />
                  </button>
                  <span style={{ whiteSpace: "nowrap" }}>
                    หน้าที่ {pageList} / {dataList.totalPages || 1}
                  </span>
                  <button
                    className="bg-gray-400 text-white whitespace-nowrap hover:bg-gray-600"
                    disabled={pageList >= (dataList.totalPages || 1)}
                    onClick={() =>
                      dispatch({ type: "SET_PAGE_LIST", payload: pageList + 1 })
                    }
                  >
                    <MdOutlineKeyboardDoubleArrowRight />
                  </button>
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
