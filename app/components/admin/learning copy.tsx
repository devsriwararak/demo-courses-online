"use client";
import {
  Card,
  Button,
  Input,
  ThemeProvider,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import Select from "react-select";
import axios from "axios";
import { HeaderAPI, HeaderMultiAPI } from "@/headerApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { MdDelete, MdEdit } from "react-icons/md";

const MySwal = withReactContent(Swal);

import dynamic from "next/dynamic";
import LearningShow from "./learningShow";
import LearningTitle from "./learningTitel";

const CustomEditor = dynamic(() => import("./richTextEditor"), { ssr: false });

interface Category {
  id: number;
  name: string;
}

interface CourseSelect {
  id: number;
  name: string;
}

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
  lesson: string;
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

const LearningPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusEdit, setStatusEdit] = useState(0); // เพิ่มสถานะนี้
  const [page, setPage] = useState<number>(0);
  const [pageTitle, setPageTitle] = useState<number>(0);
  const [courseSelect, setCourseSelect] = useState();
  const [dataTitle, setDataTitle] = useState([]);
  const [formData, setFormData] = useState({
    id: 0,
    category_id: "",
    image: null as string | null,
    videoFile: null as File | null,
    videoUrl: "",
    dec: "",
    title: "",
    lesson: "",
    regularPrice: 0,
    discountPrice: 0,
  });

  const fetchCategory = useCallback(async () => {
    const requestData = { page, full: true };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/category`,
        requestData,
        { ...HeaderAPI(localStorage.getItem("Token")) }
      );
      if (res.status === 200) {
        setCategories(res.data.data);
      } else {
        toast.error("error");
      }
    } catch (err) {
      const error = err as { response: { data: { message: string } } };
      toast.error(error.response.data.message);
    }
  }, [page]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory, page]);

  const handleCategoryChange = (selectedOption: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      category_id: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = 1200;
          canvas.height = 800;
          ctx.drawImage(img, 0, 0, 1200, 800);
          const resizedImage = canvas.toDataURL("image/jpeg");
          setFormData((prevFormData) => ({
            ...prevFormData,
            image: resizedImage,
          }));
        }
      };
      img.onerror = () => {
        toast.error("Invalid image file.");
        event.target.value = ""; // Reset input value
      };
    } else {
      toast.error("Please upload a valid image file.");
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
    if (file) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        videoFile: file,
      }));
    } else {
      toast.error("Please upload a valid video file.");
    }
  };

  console.log(formData.videoFile);

  // const handleSubmit = async () => {
  //   MySwal.fire({
  //     title: "กำลังส่งข้อมูล...",
  //     allowOutsideClick: false,
  //     width: "350px",
  //     padding: "35px",
  //     didOpen: () => {
  //       MySwal.showLoading();
  //     },
  //   });

  //   const formDataToSubmit = new FormData();
  //   formDataToSubmit.append("title", formData.title);
  //   formDataToSubmit.append("price", formData.regularPrice.toString());
  //   formDataToSubmit.append("price_sale", formData.discountPrice.toString());
  //   formDataToSubmit.append("category_id", formData.selectedCategory.toString());
  //   if (formData.image) {
  //     formDataToSubmit.append("image", formData.image);
  //   }
  //   if (formData.video) {
  //     formDataToSubmit.append("video", formData.video);
  //   }
  //   formDataToSubmit.append("dec", formData.dec);

  //   try {
  //     const res = await axios.post(
  //       `${process.env.NEXT_PUBLIC_API}/api/product/add`,
  //       formDataToSubmit,
  //       { ...HeaderMultiAPI(localStorage.getItem("Token")) }
  //     );
  //     console.log(res);
  //     if (res.status === 200) {
  //       toast.success(res.data.message);
  //       resetForm();
  //       MySwal.close();
  //     } else {
  //       toast.error("Form submission failed!");
  //       MySwal.close();
  //     }
  //   } catch (err) {
  //     MySwal.close();
  //     const error = err as { response: { data: { message: string } } };
  //     toast.error(error.response.data.message);
  //   }
  // };

  const handleSubmit = async () => {
    MySwal.fire({
      title: "กำลังส่งข้อมูล...",
      allowOutsideClick: false,
      width: "350px",
      padding: "35px",
      didOpen: () => {
        MySwal.showLoading();
      },
    });

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("title", formData.title);
    formDataToSubmit.append("price", formData.regularPrice.toString());
    formDataToSubmit.append("price_sale", formData.discountPrice.toString());
    formDataToSubmit.append("category_id", formData.category_id.toString());
    if (statusEdit === 1) {
      formDataToSubmit.append("id", formData.id.toString());
    }
    if (formData.image) {
      formDataToSubmit.append("image", formData.image);
    }
    if (formData.videoFile) {
      formDataToSubmit.append("video", formData.videoFile);
    } else if (formData.videoUrl) {
      formDataToSubmit.append("video_url", formData.videoUrl);
    }
    formDataToSubmit.append("dec", formData.dec);

    try {
      let res;
      if (statusEdit === 0) {
        res = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/product/add`,
          formDataToSubmit,
          { ...HeaderMultiAPI(localStorage.getItem("Token")) }
        );
      } else {
        res = await axios.put(
          `${process.env.NEXT_PUBLIC_API}/api/product`,
          formDataToSubmit,
          { ...HeaderMultiAPI(localStorage.getItem("Token")) }
        );
      }

      console.log(res.data.id);
      if (res.status === 200) {
        toast.success(res.data.message);
        fetchTitle(res?.data?.id);
        setCourseSelect(res?.data?.id);
        resetForm();
        MySwal.close();
      } else {
        toast.error("Form submission failed!");
        MySwal.close();
      }
    } catch (err) {
      console.log(err);
      MySwal.close();
      const error = err as { response: { data: { message: string } } };
      toast.error(error.response.data.message);
    }
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      category_id: "",
      image: null,
      videoFile: null,
      videoUrl: "",
      dec: "",
      title: "",
      lesson: "",
      regularPrice: 0,
      discountPrice: 0,
    });
    setStatusEdit(0); // รีเซ็ตสถานะ

    // Reset file inputs
    const imageInput = document.getElementById(
      "imageInput"
    ) as HTMLInputElement;
    const videoInput = document.getElementById(
      "videoInput"
    ) as HTMLInputElement;

    if (imageInput) {
      imageInput.value = "";
    }

    if (videoInput) {
      videoInput.value = "";
    }
  };

  // ฟังก์ชันการแจ้งเตือน toast
  const showToast = (message: string, type: "success" | "error") => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleEdit = (data: Course) => {
    setFormData({
      id: data.id,
      category_id: data.category_id.toString(),
      image: data.image,
      videoFile: null,
      videoUrl: data.video,
      dec: data.dec,
      title: data.title,
      lesson: "",
      regularPrice: data.price,
      discountPrice: data.price_sale,
    });
    setStatusEdit(1); // ตั้งสถานะเป็นแก้ไข
  };

  const fetchTitle = useCallback(
    async (id: any) => {
      const data = {
        products_id: id,
        page: pageTitle,
      };
      try {
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
    [pageTitle]
  );

  const handleAddTitle = useCallback(async () => {
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
      console.log(res);
      if (res.status === 200) {
        setDataTitle(res.data);
        fetchTitle(courseSelect);
      } else {
        toast.error("error");
      }
    } catch (err) {
      const error = err as { response: { data: { message: string } } };
      toast.error(error.response.data.message);
    }
  }, [courseSelect, formData.lesson, fetchTitle]);

  console.log(dataTitle);

  return (
    <ThemeProvider value={theme}>
      <div className="flex flex-col xl:flex-row justify-center gap-3 overflow-auto">
        <ToastContainer autoClose={2000} theme="colored" />

        {/* ฝั่งซ้าย */}
        <div className="w-full xl:w-4/12">
          <Card className="flex h-[717px] overflow-auto">
            <LearningShow showToast={showToast} onEdit={handleEdit} />
          </Card>
        </div>

        {/* ฝั่งขวา */}
        <div className="flex  flex-col w-full xl:w-8/12 gap-3 ">
          <div>
            <Card className="flex h-[300px] overflow-auto">
              <form className="flex flex-col w-full p-5 gap-4">
                <div>
                  <Input
                    label="สร้างคอร์สเรียน"
                    crossOrigin="anonymous"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        title: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col gap-5 xl:flex-row md:justify-between">
                  <div className="w-full xl:w-4/12">
                    <Input
                      label="ราคาปกติ"
                      type="number"
                      min={0}
                      crossOrigin="anonymous"
                      value={formData.regularPrice.toString()}
                      onChange={(e) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          regularPrice: parseFloat(e.target.value),
                        }))
                      }
                    />
                  </div>
                  <div className="w-full xl:w-4/12">
                    <Input
                      label="ราคาลดแล้ว"
                      type="number"
                      min={0}
                      crossOrigin="anonymous"
                      value={formData?.discountPrice?.toString()}
                      onChange={(e) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          discountPrice: parseFloat(e.target.value),
                        }))
                      }
                    />
                  </div>
                  <div className="w-full xl:w-4/12 flex justify-center">
                    <Select
                      options={categories.map((category) => ({
                        value: category.id.toString(),
                        label: category.name,
                      }))}
                      onChange={handleCategoryChange}
                      value={
                        categories
                          .map((category) => ({
                            value: category.id.toString(),
                            label: category.name,
                          }))
                          .find(
                            (option) => option.value === formData.category_id
                          ) || null
                      }
                      placeholder="เลือกหมวดหมู่"
                      isClearable
                      className="z-20 w-full xl:w-[200px] "
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          borderRadius: "8px", // ปรับความมนของกรอบ
                        }),
                        menu: (provided) => ({
                          ...provided,
                          borderRadius: "8px", // ปรับความมนของเมนู dropdown
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          borderRadius: state.isFocused ? "8px" : "0px", // ปรับความมนของ option เมื่อ focus
                        }),
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-5 xl:flex-row">
                  <div className="w-full xl:w-[200px]">
                    <Input
                      label="Uploadรูปหน้าปก"
                      type="file"
                      crossOrigin="anonymous"
                      accept="image/*"
                      id="imageInput"
                      onChange={handleImageUpload}
                    />
                  </div>
                  {/* <div className="w-full xl:w-[200px]">
                  <Input
                    label="Upload VDO"
                    type="file"
                    accept="video/*"
                    id="videoInput"
                    onChange={handleVideoUpload}
                    crossOrigin="anonymous"
                  />
                </div> */}
                </div>
                <div>
                  <CustomEditor
                    value={formData.dec}
                    onEditorChange={(data) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        dec: data,
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col gap-5 md:flex-row justify-end">
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
              </form>
            </Card>
          </div>

        </div>
      </div>
    </ThemeProvider>
  );
};

export default LearningPage;
