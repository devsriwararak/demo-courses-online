"use client";
import Select from "react-select";
import axios from "axios";
import { HeaderAPI } from "@/headerApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useRef } from "react";
import CryptoJS from "crypto-js";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import Image from "next/image";

interface OptionType {
  id: number;
  new_question_id: number;
  value: number;
  label: string;
  products_title_name: string;
  products_id: number;
  products_title_id: number;
  question: string;
  name: string;
  status: number;
  image_answer: string;
  image_question: string;
  products_title: string;
}

interface QuestionProps {}

const Questions: React.FC<QuestionProps> = ({}) => {
  const [dataSelect, setDataSelect] = useState<OptionType[]>([]);
  const [dataRequest, setDataRequest] = useState<OptionType[]>([]);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<OptionType | null>(
    null
  );

  const [dataList, setDataList] = useState<OptionType[]>([]);
  const [search, setSearch] = useState<string>("");
  // saveData
  const [questionImage, setQuestionImage] = useState<File | null>(null);
  const [answerImage, setAnswerImage] = useState<File | null>(null);
  const [questionText, setQuestionText] = useState<string>("");

  const [saveDataList, setSaveDataList] = useState({
    id: 0,
    image_answer: "",
    image_question: "",
    question: "",
    products_id: "",
    products_title_id: "",
    products_name: "",
    products_title_name: "",
  });
  const [isTrue, setIsTrue] = useState<boolean>(false);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    question: "",
    image_answer: "",
    image_question: "",
  });

  // useRef
  const questionImageRef = useRef<HTMLInputElement | null>(null);
  const answerImageRef = useRef<HTMLInputElement | null>(null);

  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "your_secret_key";
  const decryptData = (ciphertext: string) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const fetchDataSelect = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/question/new`,
        {
          page: 1,
          full: false,
        },
        {
          ...HeaderAPI(decryptData(localStorage.getItem("Token") || "")),
        }
      );

      if (res.status === 200) {
        const options: OptionType[] = res.data.data.map((item: any) => ({
          value: item.id,
          // label: item.products_title,
          label: item.name,
          products_title: item.products_title,
          products_title_name: item.products_title_name,
          products_id: item.products_id,
          products_title_id: item.products_title_id,
          new_question_id: item.id || null,
        }));
        setDataSelect(options);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataRequest = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/question/new`,
        {
          page: 1,
          full: true,
        },
        {
          ...HeaderAPI(decryptData(localStorage.getItem("Token") || "")),
        }
      );

      if (res.status === 200) {
        const options: OptionType[] = res.data.data.map((item: any) => ({
          value: item.id,
          label: item.products_title,
          products_title: item.products_title,
          products_title_name: item.products_title_name,
          products_id: item.products_id,
          products_title_id: item.products_title_id,
          name: item.name,
          status: item.status,
          new_question_id: item.id || null,
        }));
        setDataRequest(options);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataList = async () => {
    try {
      const data = {
        page: 1,
        products_id: selectedOption
          ? selectedOption?.products_id
          : selectedRequest?.products_id,
        products_title_id: selectedOption
          ? selectedOption?.products_title_id
          : selectedRequest?.products_title_id,
        search: search ? search : "",
        new_question_id: selectedOption?.value
          ? selectedOption?.value
          : selectedRequest?.value,
      };

      console.log(data);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/question/list`,
        data,
        {
          ...HeaderAPI(decryptData(localStorage.getItem("Token") || "")),
        }
      );

      if (res.status === 200) {
        setDataList(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (option: OptionType | null, number: any) => {
    // เคลียค่า
    if (questionImageRef.current) questionImageRef.current.value = "";
    if (answerImageRef.current) answerImageRef.current.value = "";
    setQuestionText("");
    setSelectedOption(null);
    setSelectedRequest(null);
    setSaveDataList({
      id: 0,
      image_answer: "",
      image_question: "",
      question: "",
      products_id: "",
      products_title_id: "",
      products_name: "",
      products_title_name: "",
    });

    if (number === 1) {
      setSelectedOption(option);
      console.log("Selected:", option);
      if (selectedRequest) {
        setSelectedRequest(null);
      }
    } else {
      setSelectedRequest(option);
      console.log("Request:", option);
      if (selectedOption) {
        setSelectedOption(null);
      }
    }
  };

  const fetchAllData = async () => {
    try {
      await Promise.all([fetchDataSelect(), fetchDataRequest()]);
    } catch (error) {
      console.log(error);
    }
  };

  // แปลงรูปเป็น Base 64
  const convertToBase64 = (
    file: File
  ): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result); // เมื่อแปลงสำเร็จ คืนค่าผลลัพธ์
      reader.onerror = (error) => reject(error);
    });
  };

  // CRUD CARD 3
  const handleSendData = async (e: any) => {
    e.preventDefault();
    try {
      const products_id = selectedOption?.products_id
        ? selectedOption?.products_id
        : selectedRequest?.products_id;
      const products_title_id = selectedOption?.products_title_id
        ? selectedOption?.products_title_id
        : selectedRequest?.products_title_id;
      const question = questionText;
      const new_question_id = selectedOption?.new_question_id
        ? selectedOption?.new_question_id
        : selectedRequest?.new_question_id;

      const formData = new FormData();

      // เพิ่มค่าลงใน formData
      if (products_id || saveDataList?.products_id)
        formData.append(
          "products_id",
          products_id?.toString()
            ? products_id?.toString()
            : saveDataList?.products_id.toString()
        );
      if (products_title_id || saveDataList?.products_title_id)
        formData.append(
          "products_title_id",
          products_title_id?.toString()
            ? products_title_id?.toString()
            : saveDataList.products_title_id
        );
      if (question || saveDataList?.question)
        formData.append(
          "question",
          question ? question : saveDataList?.question
        );

      if (new_question_id)
        formData.append("new_question_id", new_question_id.toString());

      // ถ้ามี id
      if (saveDataList.id) formData.append("id", saveDataList.id.toString());

      // แปลงรูปคำถามเป็น Base64
      if (questionImage) {
        console.log("111111111111");

        const base64QuestionImage = await convertToBase64(questionImage);
        if (base64QuestionImage) {
          formData.append("image_question", base64QuestionImage.toString());
        }
      } else {
        console.log("222222222222");
        formData.append(
          "image_question",
          saveDataList.image_question.toString()
        );
      }

      // แปลงรูปเฉลยเป็น Base64
      if (answerImage) {
        console.log("333333333333");
        console.log(answerImage);

        const base64AnswerImage = await convertToBase64(answerImage);
        if (base64AnswerImage) {
          formData.append("image_answer", base64AnswerImage.toString());
        }
      } else {
        console.log("4444444444444");
        formData.append("image_answer", saveDataList.image_answer.toString());
      }

      // formData.forEach((value, key) => {
      //   console.log(`${key}: ${value}`);
      // });

      let res = null;

      // ส่งข้อมูล
      if (!saveDataList.id) {
        res = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/question/add`,
          formData,
          {
            ...HeaderAPI(decryptData(localStorage.getItem("Token") || "")),
          }
        );
      } else {
        res = await axios.put(
          `${process.env.NEXT_PUBLIC_API}/api/question/list`,
          formData,
          {
            ...HeaderAPI(decryptData(localStorage.getItem("Token") || "")),
          }
        );
      }

      if (res.status === 200) {
        await fetchDataList();
        await fetchDataSelect();
        await fetchDataRequest();

        // เคลียค่า
        if (questionImageRef.current) questionImageRef.current.value = "";
        if (answerImageRef.current) answerImageRef.current.value = "";
        setQuestionText("");
        setSelectedOption(null);
        setSelectedRequest(null);
        setSaveDataList({
          id: 0,
          image_answer: "",
          image_question: "",
          question: "",
          products_id: "",
          products_title_id: "",
          products_name: "",
          products_title_name: "",
        });
        if (!saveDataList.id) {
          window.location.reload();
        }
        toast.success(res.data.message);
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.data) toast.error(error.response.data);
      if (error.response.data.message) toast.error(error.response.data.message);
    }
  };

  const gandleDelete = async (id: number) => {
    try {
      // ส่งข้อมูล
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API}/api/question/list/${id}`,
        {
          ...HeaderAPI(decryptData(localStorage.getItem("Token") || "")),
        }
      );

      if (res.status === 200) {
        await fetchDataList();
        toast.success(res.data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleShowEdit = async (id: any) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/api/question/list/${id}`,
        {
          ...HeaderAPI(decryptData(localStorage.getItem("Token") || "")),
        }
      );

      if (res.status === 200) {
        // setQuestionText(res.data.question);
        // setIdEdit(res.data.id);
        // setOldAnswerImage(res.data.image_answer);
        // setOldQuestionImage(res.data.image_question);

        setSaveDataList({
          id: res.data.id,
          image_answer: res.data.image_answer,
          image_question: res.data.image_question,
          question: res.data.question,
          products_id: res.data.products_id,
          products_title_id: res.data.products_title_id,
          products_name: res.data.products_name,
          products_title_name: res.data.products_title_name,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Modal Open
  const handleOpenModal = (
    question: string,
    image_answer: string,
    image_question: string
  ) => {
    console.log({ image_answer, image_question });

    // ตั้งค่าข้อมูลใน Modal
    setModalData({
      question,
      image_answer,
      image_question,
    });

    // เปิด Modal
    setIsModalOpen(true);
  };

  // const toggleValue = () => {
  //   const newValue = !isTrue;
  //   setIsTrue(newValue);
  //   localStorage.setItem("isTrue", newValue.toString()); // บันทึกลงใน localStorage
  // };

  useEffect(() => {
    localStorage.setItem("isTrue", JSON.stringify(false));
    fetchAllData();
  }, []);

  useEffect(() => {
    if (selectedOption || selectedRequest || search) {
      fetchDataList();
    }
  }, [selectedOption, selectedRequest, search]);

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-3 ">
      <ToastContainer autoClose={2000} theme="colored" />

      {/* เรนเดอร์ Modal */}
      <TestModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        modalData={modalData}
      />

      {/* SECTION 1 */}
      <section className="w-full lg:w-4/6  ">
        <p className="text-sm font-semibold">ยังไม่ทำรายการ</p>
        <Select
          value={selectedOption}
          onChange={(option) => handleChange(option, 1)}
          options={dataSelect}
          placeholder="เลือก"
          className="w-full shadow-xl mt-3"
        />
        <div className="bg-white shadow-xl rounded-md px-4 py-4 mt-4 lg:h-[520px] overflow-y-scroll">
          <p className="text-sm font-semibold">รายการที่เคยขอไปแล้ว</p>
          <ul className="py-4">
            {dataRequest.map((item, index) => (
              <li
                key={item.value}
                className={`${item.new_question_id == selectedRequest?.new_question_id ? "bg-gray-200" : "" } px-2 rounded-sm flex flex-row justify-between pt-2 py-2 hover:bg-gray-100`}
              >
                <p className="text-sm">
                  {index + 1}. {item.name}{" "}
                </p>
                <div className="flex flex-row gap-2 ">
                  {item.status === 1 ? (
                    <p className="text-xs bg-green-100 text-green-800 px-2 rounded-md flex items-center">
                      ส่งแล้ว
                    </p>
                  ) : (
                    <p className="text-xs bg-red-100 text-red-800 px-2 rounded-md flex items-center">
                      รอดำเนินการ
                    </p>
                  )}
                  <button
                    onClick={() => handleChange(item, 2)}
                    className="bg-purple-600 hover:bg-purple-800 text-white px-2 rounded-md"
                  >
                    เลือก
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION 2 */}

      <section className="w-full lg:w-3/6   ">
        <div className="bg-white shadow-xl rounded-md px-6 py-4  ">
          <p className="text-sm font-semibold">
            {saveDataList.id ? "แก้ไขข้อมูล" : "เพิ่มข้อมูลใหม่"}
          </p>
          <div className="mt-4 text-sm flex flex-col gap-2">
            <p>
              คอร์สเรียน{" "}
              <span className="text-gray-700">
              {saveDataList.products_name
                ? saveDataList.products_name
                : selectedOption?.products_title
                ? selectedOption?.products_title
                : selectedRequest?.products_title}
              </span>
            </p>
            <p>
              บทเรียน{" "}
             <span className="text-gray-700">
             {saveDataList.products_title_name
                ? saveDataList.products_title_name
                : selectedOption?.products_title_name
                ? selectedOption?.products_title_name
                : selectedRequest?.products_title_name}
             </span>
            </p>
          </div>

          <form className="mt-4">
            <div className="mt-2">
              <Input
                crossOrigin="anonymous"
                label="รูปคำถาม"
                type="file"
                ref={questionImageRef}
                onChange={(e) =>
                  setQuestionImage(e.target.files ? e.target.files[0] : null)
                }
                className=""
                color="purple"
              />
            </div>

            <div className="mt-6">
              <Input
                crossOrigin="anonymous"
                label="รูปสำหรับเฉลย"
                type="file"
                ref={answerImageRef}
                color="purple"
                onChange={(e) =>
                  setAnswerImage(e.target.files ? e.target.files[0] : null)
                }
              />
            </div>

            <div className="mt-4 flex flex-col ">
              <label htmlFor="" className="text-sm text-gray-700 mb-2">
                สร้างคำถาม
              </label>
              <Textarea
                value={questionText ? questionText : saveDataList.question}
                onChange={(e) => setQuestionText(e.target.value)}
                className="bg-gray-200 h-40"
                name=""
                id=""
                label="สร้างคำถาม"
                color="purple"
              ></Textarea>
            </div>

            <div className="text-right my-6">
              <button
                onClick={handleSendData}
                className="bg-purple-700 hover:bg-purple-500 rounded-md text-white px-4 py-1 text-sm "
              >
                {saveDataList.id ? "อัพเดท" : "บันทึก"}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* SECTION 2 */}

      <section className="w-full lg:w-3/6">
        <div className="bg-white shadow-xl rounded-md px-4 py-4 lg:h-[610px] overflow-y-scroll">
        <p className="text-sm font-semibold mb-2">รายการ</p>
          <Input
            crossOrigin="anonymous"
            type="text"
            className="bg-gray-200 w-full"
            label="ค้นหา"
            value={search}
            onChange={(e) => setSearch(e.target.value ?? "")}
            color="purple"
          />

          <ul className="mt-6">
            {dataList.map((item, index) => (
              <li
                key={item.id}
                className={`${item.id === saveDataList.id ? "bg-gray-200": ""} px-2 rounded-sm flex flex-row justify-between pt-1.5 pb-1.5 hover:bg-gray-100`}
              >
                <p className="text-sm">{index + 1}. {" "} <span className="text-gray-700">{item.question}</span></p>
                <div className=" flex flex-row gap-2">
                  <button
                    className="text-sm text-purple-700 px-1 border border-purple-200 rounded-md  "
                    onClick={() =>
                      handleOpenModal(
                        item.question,
                        item.image_answer,
                        item.image_question
                      )
                    }
                  >
                    รูป
                  </button>
                  <button
                    className="text-sm bg-purple-700 text-white px-1 rounded-md"
                    onClick={() => handleShowEdit(item.id)}
                  >
                    แก้ไข
                  </button>
                  <button
                    onClick={() => gandleDelete(item.id)}
                    className="text-sm bg-red-500 text-white px-1 rounded-md"
                  >
                    ลบ
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Questions;

export const TestModal = ({
  isModalOpen,
  setIsModalOpen,
  modalData,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalData: { image_answer: string; image_question: string; question: string };
}) => {
  return (
    <Dialog open={isModalOpen} handler={setIsModalOpen} className="bg-gray-200">
      <DialogBody divider>
        <h2>คำถาม : {modalData.question}</h2>

        <div className="flex flex-col md:flex-row gap-3">
          <div className="w-full">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${modalData.image_answer}`}
              alt=""
              width={700}
              height={700}
            />
          </div>
          <div className="w-full">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${modalData.image_question}`}
              alt=""
              width={700}
              height={700}
            />
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          size="sm"
          color="red"
          onClick={() => setIsModalOpen(false)}
          className="mr-1 text-sm"
        >
          <span>ปิด</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

// ใช่ Next.ts มีอยู่ 2 components หน้า Question.tsx และ Sidebar.tsx ต้องการให้ Question เปลี่ยนแปลง State และส่งไปที่หน้า Sidebar เพื่่อ Fetchdata
