import React, { useState } from "react";
import { Card, Button, Input } from "@material-tailwind/react";
import Select from "react-select";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";

import RichTextEditor from "./richTextEditor";

interface Category {
  id: number;
  name: string;
}

interface FormData {
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
}

interface LearningADDProps {
  categories: Category[];
  onFormSubmit: (formData: FormData, statusEdit: number) => void;
  onResetForm: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  statusEdit: number;
  setLearningAdd: (value: number) => void;
}

const LearningADD: React.FC<LearningADDProps> = ({
  categories,
  onFormSubmit,
  onResetForm,
  formData,
  setFormData,
  statusEdit,
  setLearningAdd,
}) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(formData, statusEdit);
  };

  return (
    <div>
      <Card className="flex  overflow-auto">
        <div className=" flex px-6 pt-5  justify-end">
          <Button
            className="bg-blue-500 text-white hover:bg-blue-700 whitespace-nowrap"
            onClick={()=>setLearningAdd(0)}
          >
            ออก
          </Button>
        </div>
        <form
          className="flex flex-col w-full px-5 mt-3 gap-4"
          onSubmit={handleSubmit}
        >
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
                value={formData?.regularPrice?.toString()}
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
                value={formData.discountPrice?.toString()}
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
                  value: category.id?.toString(),
                  label: category.name,
                }))}
                onChange={handleCategoryChange}
                value={
                  categories
                    .map((category) => ({
                      value: category.id?.toString(),
                      label: category.name,
                    }))
                    .find((option) => option.value === formData.category_id) ||
                  null
                }
                placeholder="เลือกหมวดหมู่"
                isClearable
                className="z-20 w-full xl:w-[200px]"
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
          </div>
          <div>
            {/* <CustomEditor
              value={formData.dec}
              onEditorChange={(data) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  dec: data,
                }))
              }
            /> */}
               <RichTextEditor
        value={formData.dec}
        onEditorChange={(data) =>
          setFormData((prevFormData) => ({
            ...prevFormData,
            dec: data,
          }))
        }
      />
          </div>
          <div className="flex flex-col gap-5 md:flex-row  mb-3 justify-end">
            <div className="md:w-[100px]">
              <Button
                color="green"
                variant="outlined"
                size="sm"
                className="w-full"
                onClick={onResetForm}
              >
                สร้างใหม่
              </Button>
            </div>
            <div className="md:w-[100px]">
              <Button color="blue" size="sm" className="w-full" type="submit">
                บันทึก
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LearningADD;
