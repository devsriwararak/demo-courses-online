import React, { useState } from "react";
import { Card, Button, Input } from "@material-tailwind/react";
import Select from "react-select";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
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
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());

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
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    onFormSubmit({ ...formData, dec: content }, statusEdit);
  };

  return (
    <div>
      <Card className="flex xl:h-[85vh] overflow-auto">

        <form
          className="flex flex-col w-full px-5 mt-5 gap-4"
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
          <div className="flex flex-col gap-2 xl:flex-row md:justify-between">
            <div className="w-full xl:w-3/12">
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
            <div className="w-full xl:w-3/12">
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
            <div className="w-full xl:w-3/12 flex  justify-center">
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
                className="z-20 w-full "
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

          <div className=" relative z-10">
            <RichTextEditor
              value={formData.dec}
              onEditorChange={setEditorState}
            />
          </div>
          <div className="flex flex-col gap-3 md:flex-row  mb-3 justify-end">
          <div className="md:w-[100px]" >
          <Button
          size="sm"
            className="bg-gray-500 text-sm w-full text-white hover:bg-blue-700 whitespace-nowrap"
            onClick={() => setLearningAdd(0)}
          >
            ออก
          </Button>
        </div>
            <div className="md:w-[100px]">
              <Button
                color="purple"
                variant="outlined"
                size="sm"
                className="w-full text-sm"
                onClick={onResetForm}
              >
                สร้างใหม่
              </Button>
            </div>
            <div className="md:w-[100px]">
              <Button color="purple" size="sm" className="w-full text-sm" type="submit">
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
