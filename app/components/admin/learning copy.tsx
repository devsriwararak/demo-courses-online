"use client";
import {
  Card,
  Button,
  Input,
  Select,
  Option,
  ThemeProvider,
} from "@material-tailwind/react";
import axios from "axios";
import { HeaderAPI, HeaderMultiAPI } from "@/headerApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useCallback, useRef } from "react";

import Swal from "sweetalert2"; // นำเข้า sweetalert2
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

import dynamic from "next/dynamic";
import LearningShow from "./learningShow";

const TextEditor = dynamic(() => import("./richTextEditor"), { ssr: false });

interface Category {
  id: number;
  name: string;
}

interface Course {
  category_id: number;
  id: number;
  image: string;
  price: number;
  price_sale: number;
  title: string;
  video: string;
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
  const [selectedCategory, setSelectedCategory] = useState<any>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [image, setImage] = useState<string | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [editorData, setEditorData] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [regularPrice, setRegularPrice] = useState<number>(0);
  const [discountPrice, setDiscountPrice] = useState<number>(0);

  const categorySelectRef = useRef<HTMLSelectElement>(null);

  const fetchCategory = useCallback(async () => {
    const requestData = { page, search: searchQuery };
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
  }, [page, searchQuery]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory, page]);

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
          setImage(resizedImage);
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
    if (file) {
      setVideo(file);
    } else {
      toast.error("Please upload a valid video file.");
    }
  };

  const handleSubmit = async () => {

    MySwal.fire({
      title: 'กำลังส่งข้อมูล...',
      allowOutsideClick: false,
      width: "350px",
      padding: "35px",
      didOpen: () => {
        MySwal.showLoading();
      },
    });

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", regularPrice.toString());
    formData.append("price_sale", discountPrice.toString());
    formData.append("category_id", selectedCategory.toString());
    if (image) {
      formData.append("image", image);
    }
    if (video) {
      formData.append("video", video);
    }
    formData.append("dec", editorData);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/product/add`,
        formData,
        { ...HeaderMultiAPI(localStorage.getItem("Token")) }
      );
      console.log(res)
      if (res.status === 200) {
        toast.success(res.data.message);
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
    setTitle("");
    setRegularPrice(0);
    setDiscountPrice(0);
    setSelectedCategory("");
    setImage(null);
    setVideo(null);
    setEditorData("");

    console.log('selectedCategory :', selectedCategory);


    // Reset file inputs
    const imageInput = document.getElementById("imageInput") as HTMLInputElement;
    const videoInput = document.getElementById("videoInput") as HTMLInputElement;

    if (imageInput) {
      imageInput.value = "";
    }

    if (videoInput) {
      videoInput.value = "";
    }
  }

  // ฟังก์ชันการแจ้งเตือน toast
  const showToast = (message: string, type: "success" | "error") => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  // ฟังก์ชันสำหรับอัปเดตข้อมูลที่ต้องการแก้ไข
  const handleEdit = (data: Course) => {
    setTitle(data.title);
    setRegularPrice(data.price);
    setDiscountPrice(data.price_sale);
    setSelectedCategory(data.category_id.toString());
    setImage(data.image);
    setVideo(data.video);
    setEditorData(data.description); // Assuming there's a description field
  };

  return (
    <ThemeProvider value={theme}>
      <div className="flex flex-col lg:flex-row  justify-center gap-3  overflow-auto">
        <ToastContainer autoClose={2000} theme="colored" />
        <div className="w-full lg:w-7/12">
          <Card className="flex h-[88vh] overflow-auto">
            <form className="flex flex-col w-full p-5 gap-4" >
              <div>
                <Input
                  label="หัวข้อ"
                  crossOrigin="anonymous"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-5 xl:flex-row md:justify-between">
                <div className="w-full xl:w-4/12">
                  <Input
                    label="ราคาปกติ"
                    type="number"
                    min={0}
                    crossOrigin="anonymous"
                    value={regularPrice.toString()}
                    onChange={(e) =>
                      setRegularPrice(parseFloat(e.target.value))
                    }
                  />
                </div>
                <div className="w-full xl:w-4/12">
                  <Input
                    label="ราคาส่วนลด"
                    type="number"
                    min={0}
                    crossOrigin="anonymous"
                    value={discountPrice.toString()}
                    onChange={(e) =>
                      setDiscountPrice(parseFloat(e.target.value))
                    }
                  />
                </div>

                <div className="w-full xl:w-4/12  flex justify-center">
                  {/* 
                  <Select label="หมวดหมู่" value={selectedCategory} onChange={(e) => setSelectedCategory(e)}>
                    <Option value="" >เลือก</Option>
                    {categories.map((category) => (
                      <Option key={category.id} value={category.id.toString()}>
                        {category.name}
                      </Option>
                    ))}
                  </Select> */}

                  <select
                    className=" w-full border-2 border-gray-300 px-4 rounded-md text-sm font-light"
                    value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">เลือกหมวดหมู่</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id.toString()}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-5 xl:flex-row">
                <div className="w-full xl:w-4/12">
                  <Input
                    label="Uploadรูปหน้าปก"
                    type="file"
                    crossOrigin="anonymous"
                    accept="image/*"
                    id="imageInput"
                    onChange={handleImageUpload}
                  />
                </div>
                <div className="w-full xl:w-4/12">
                  <Input
                    label="Upload VDO"
                    type="file"
                    accept="video/*"
                    id="videoInput"
                    onChange={handleVideoUpload}
                    crossOrigin="anonymous"
                  />
                </div>
              </div>
              <div>
                <TextEditor value={editorData} onEditorChange={setEditorData} />
              </div>
              <div className="flex flex-col gap-5 md:flex-row justify-end">
                <div className="md:w-[100px]">

                  <Button color="green" variant="outlined" size="sm" className="w-full" onClick={resetForm}>
                    สร้างใหม่
                  </Button>
                </div>
                <div className="md:w-[100px]">
                  <Button color="blue" size="sm" className="w-full" onClick={handleSubmit}>
                    บันทึก
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        </div>
        <div className="w-full lg:w-5/12 " >
          <Card className="flex h-[88vh] overflow-auto ">
            <LearningShow showToast={showToast} onEdit={handleEdit} />
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default LearningPage;
