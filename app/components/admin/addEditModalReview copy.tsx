import { useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button,
  Typography,
  Select,
  Option,
  Card,
  CardBody,
} from "@material-tailwind/react";
import { AiOutlineStop } from "react-icons/ai";
import { FaRegSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Image from "next/image";

interface ReviewFormData {
  id: number;
  title: string;
  image_title: string;
  dec: string;
  coverFile: File | null;
  albumFiles: File[];
  type: number;
}

interface AddEditModalReviewProps {
  open: boolean;
  handleModalAdd: () => void;
  formData: ReviewFormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleAddReview: () => void;
  dataEdit: ReviewFormData | null;
  setFormData: React.Dispatch<React.SetStateAction<ReviewFormData>>;
  setCoverFile: React.Dispatch<React.SetStateAction<File | null>>;
  coverFile: File | null;
  setAlbumFiles: React.Dispatch<React.SetStateAction<File[]>>;
  initialReviewImages: string[];
}

const AddEditModalReview: React.FC<AddEditModalReviewProps> = ({
  open,
  handleModalAdd,
  formData,
  handleChange,
  handleAddReview,
  dataEdit,
  setFormData,
  setCoverFile,
  setAlbumFiles,
  initialReviewImages,
}) => {
  const [reviewImages, setReviewImages] = useState<string[]>(initialReviewImages);

  useEffect(() => {
    if (dataEdit) {
      setFormData({
        id: dataEdit.id,
        title: dataEdit.title,
        image_title: dataEdit.image_title,
        dec: dataEdit.dec,
        coverFile: null,
        albumFiles: [],
        type: dataEdit.type,
      });
      setReviewImages(initialReviewImages);
    }
  }, [dataEdit, setFormData, initialReviewImages]);

  const handleSelectChange = (name: string, value: string | undefined) => {
    if (value !== undefined) {
      handleChange({
        target: {
          name,
          value,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCoverFile(e.target.files[0]);
    }
  };

  const handleAlbumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAlbumFiles(Array.from(e.target.files));
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = reviewImages.filter((_, i) => i !== index);
    setReviewImages(updatedImages);
    console.log('Updated reviewImages:', updatedImages); // Log updated reviewImages
  };

  return (
    <Dialog
      open={open}
      size={dataEdit ? "xl" : "xs"}
      handler={handleModalAdd}
      className="h-auto"
    >
      <DialogHeader className="bg-blue-700 py-3 px-3 justify-center text-lg text-white opacity-80">
        <Typography variant="h5">
          {dataEdit ? "แก้ไขข้อมูล" : "เพิ่มข้อมูล"}
        </Typography>
      </DialogHeader>
      <DialogBody divider className="overflow-auto">
        <div className="flex flex-col lg:flex-row gap-5">
          <div
            className={`w-full ${
              dataEdit ? "lg:w-4/12" : ""
            } flex flex-col  gap-4`}
          >
            <Input
              name="title"
              value={formData?.title}
              onChange={handleChange}
              label="หัวข้อ"
              crossOrigin
            />
            <Input
              name="dec"
              value={formData.dec}
              onChange={handleChange}
              label="รายละเอียด"
              crossOrigin
            />
            <Select
              name="type"
              label="เลือกประเภท"
              value={formData.type?.toString() || "0"}
              onChange={(value) => handleSelectChange("type", value)}
            >
              <Option value="0">สัมมนา</Option>
              <Option value="1">รีวิว</Option>
            </Select>
            <Input
              type="file"
              onChange={handleCoverChange}
              label="เลือกรูปปก"
              crossOrigin
            />
            <Input
              type="file"
              multiple
              label="เลือกอัลบั้ม"
              onChange={handleAlbumChange}
              crossOrigin
            />
          </div>
          {dataEdit && (
            <div className="w-full lg:w-8/12 h-[400px] flex flex-col gap-4 overflow-auto p-4 border border-gray-300 rounded-md shadow-sm">
              <Typography variant="h6" className="text-center">
                รูปภาพรีวิว
              </Typography>
              <div className="grid grid-cols-2 gap-4">
                {reviewImages?.map((image, index) => {
                  console.log(image);
                  return (
                    <Card key={index} className="shadow-lg relative">
                      <CardBody>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${image?.image}`}
                          alt={`Review Image ${index + 1}`}
                          width={400}
                          height={400}
                          className="rounded-md object-cover"
                        />
                        <button
                          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-200"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <MdDelete size={24} color="red" />
                        </button>
                      </CardBody>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
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
          onClick={handleAddReview}
          className="flex text-base mr-1"
        >
          <span className="mr-2 text-xl">
            <FaRegSave />
          </span>
          บันทึก
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AddEditModalReview;
