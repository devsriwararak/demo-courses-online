"use client";
import { useRecoilValue } from "recoil";
import { BuyCourseStore } from "@/store/store";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import Image from "next/image";

import axios from "axios";
import { HeaderAPI, HeaderMultiAPI } from "@/headerApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Router } from "next/router";
import { useRouter, useParams } from "next/navigation"; // Correct import
import Topsale from "../topsale";
import parse from "html-react-parser";

import CryptoJS from "crypto-js";

const MySwal = withReactContent(Swal);

const BuyCourse = () => {
  // const buyData = useRecoilValue(BuyCourseStore);
  const [buyData, setBuyData] = useState<any>(null);
  const [show, setShow] = useState(false);
  const [bill, setBill] = useState("");
  const [payId, setPayId] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [imageQrCode, setImageQrCode] = useState("");

  // check Pay
  const [checkPay, setCheckPay] = useState<any>({
    id: "",
    code: "",
    status: "",
  });

  const { id } = useParams();

  const router = useRouter();

  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "your_secret_key";

  const decryptData = (ciphertext: string) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const userId = decryptData(localStorage.getItem("Id") || "");

  const truncateText = (text: string, limit: number) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  const fetchData = async () => {
    try {
      setImageQrCode("");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/api/product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${decryptData(
              localStorage.getItem("Token") || ""
            )}`,
          },
        }
      );
      if (res.status === 200) {
        console.log(res.data);

        setBuyData(res.data);
        const price = res.data.products_price_sale
          ? res.data.products_price_sale
          : res.data.products_price;
        await fetchDataMyPay(price);
      } else {
        toast.error("error");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data from server.");
    }
  };

  const fetchDataMyPay = async (price: number) => {
    try {
      const sendData = {
        products_id: id,
        users_id: userId,
      };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/pay/users/check_pay`,
        sendData,
        {
          headers: {
            Authorization: `Bearer ${decryptData(
              localStorage.getItem("Token") || ""
            )}`,
          },
        }
      );
      
      if (res.status === 200) {
        setCheckPay({
          id: res.data.id,
          code: res.data.code,
          status: res.data.status,
        });

        if (res.data.id) {
          setShow(true);
          await fetchDataCreateQrCode(price);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Create QR Code
  const fetchDataCreateQrCode = async (price: number ) => {
    try {
      const sendData = { price : price || 0 };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/pay/users/qr_code/create`,
        sendData,
        {
          headers: {
            Authorization: `Bearer ${decryptData(
              localStorage.getItem("Token") || ""
            )}`,
          },
        }
      );
      if (res.status === 200) {
        setImageQrCode("qr.svg");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [show]);

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]); // Capture the file when the input changes
  };

  const handleCheck = async () => {
    setLoading(true);
    MySwal.fire({
      title: "กำลังส่งข้อมูล...",
      allowOutsideClick: false,
      width: "350px",
      padding: "35px",
      didOpen: () => {
        MySwal.showLoading();
      },
    });

    const data = {
      users_id: Number(userId),
      product_id: Number(buyData?.product_id),
    };
    try {
      console.log(data);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/pay/add`,
        data,
        {
          ...HeaderAPI(decryptData(localStorage.getItem("Token") || "")),
        }
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        setPayId(res.data.pay_id);
        setShow(true);
        setBill(res?.data?.bill_number);
        MySwal.close();
      } else {
        return;
      }
    } catch (err) {
      MySwal.close();
      const error = err as { response: { data: { message: string } } };
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("กรุณาแนบไฟล์สลิป!"); // Display an error message if no file is selected
      return;
    }

    setLoading(true);
    MySwal.fire({
      title: "กำลังส่งข้อมูล...",
      allowOutsideClick: false,
      width: "350px",
      padding: "35px",
      didOpen: () => {
        MySwal.showLoading();
      },
    });

    const formData = new FormData();
    formData.append("pay_id", payId ? payId : checkPay.id);

    // const price =
    //   buyData?.price_sale && buyData?.price_sale > 0
    //     ? buyData?.price_sale.toString()
    //     : buyData?.price?.toString() || "0";

    formData.append("price", buyData?.products_price);
    formData.append("file", file);

    try {
      console.log(Object.fromEntries(formData));
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/pay/upload_slip`,
        formData,
        { ...HeaderMultiAPI(decryptData(localStorage.getItem("Token") || "")) }
      );

      console.log(response);

      if (response.status === 200) {
       await fetchDataMyPay(0)
        toast.success(response.data.message);
        setSuccess(true);
        MySwal.close();
       
      } else {
        setLoading(false);
        toast.error("Form submission failed!");
        MySwal.close();
      }
    } catch (err) {
      MySwal.close();
      const error = err as { response: { data: { message: string } } };
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center  lg:flex-row gap-5 py-20 px-6 lg:px-36   ">
      <ToastContainer autoClose={2000} theme="colored" />

      <div className="w-full md:w-3/5 ">
        <Card className="lg:h-[550px] w-full overflow-auto gap-5 !bg-white ">
          <div className="w-full flex justify-center bg-gray-300 rounded-sm   ">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${buyData?.product_image}`}
              alt=""
              width={400}
              height={400}
              className="flex w-auto h-auto lg:w-[400px]  "
            />
          </div>
          <div className="flex flex-col gap-3 py-6  px-2 md:px-10">
            <div className=" flex gap-2 ps-3 ">
              <Typography className="font-bold ">หัวข้อ :</Typography>
              <Typography>{buyData?.product_title || ""}</Typography>
            </div>

            <div className=" flex gap-2 ps-3 ">
              <Typography className="font-bold ">ราคา :</Typography>
              <Typography>
                {/* {buyData?.products_price_sale || 0 > 0
                  ? buyData?.products_price_sale?.toLocaleString()
                  : buyData?.products_price?.toLocaleString()} */}
                {buyData?.products_price_sale
                  ? buyData?.products_price_sale.toLocaleString()
                  : buyData?.products_price.toLocaleString()}
              </Typography>
              <Typography>บาท</Typography>
            </div>

            <div className=" flex gap-2 ps-3 text-red-500 ">
              <Typography className="font-bold  ">ลดราคาจาก :</Typography>
              <Typography>
                {buyData?.products_price_sale
                  ? buyData?.products_price.toLocaleString()
                  : 0}
              </Typography>
              <Typography className="">บาท</Typography>
            </div>

            <div className=" flex gap-2 ps-3 ">
              <Typography className="font-bold ">รายละเอียด :</Typography>
              {/* <Typography>{truncateText(buyData?.dec || "", 70)}</Typography> */}
              <div>{parse(buyData?.product_dec || "")}</div>
            </div>
            <div className="mt-4 mb-10">
              <h1 className="text-lg">รายละเอียดบทเรียน</h1>
              <div className="mt-5 bg-gray-50 rounded-md">
                {buyData?.result_list?.map((lesson: any, index: number) => (
                  <div
                    key={index}
                    className="flex border-b  py-3 px-5 justify-between items-center border  border-gray-200 hover:bg-gray-100 transition duration-200"
                  >
                    <h2 className="font-semibold text-sm text-gray-700">
                      {lesson.title}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      จำนวน {lesson.video_count} บทเรียน
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="w-full md:w-2/5  ">
        <Card className="lg:h-[550px] w-full overflow-auto gap-5 px-6 py-4">
          <div className="w-full sm:w-[150px] ">
            <Button
              className="w-full justify-center items-center text-base font-normal mb-0"
              size="sm"
              style={{
                backgroundImage:
                  "linear-gradient(150deg, rgba(162,102,246,1) 10.8%, rgba(203,159,249,1) 94.3%)",
              }}
              onClick={handleCheck}
              disabled={checkPay.id}
            >
              ทำรายการซื้อ
            </Button>
          </div>

          {show && (
            <>
              <hr />
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="w-full">
                  {imageQrCode && (
                    <img
                      src={`${process.env.NEXT_PUBLIC_API}/${imageQrCode}`}
                      className="w-32"
                      alt=""
                    />
                  )}
                </div>
                <div className="w-full">
                  <ul>
                    <li>ธนาคาร : พร้อมเพย์</li>
                    <li>เลขที่บัญชี : 0850032649</li>
                    <li>ชื่อเจ้าของบัญชี : นาย</li>
                  </ul>
                </div>
              </div>
            </>
          )}

          <hr className=" " />
          {show ? (
            <div className="flex flex-col gap-3 ">
              <div className="flex flex-col 2xl:flex-row gap-5 2xl:gap-[57px] items-center mb-2 ">
                <div className="w-full">
                  <Typography className="font-bold whitespace-nowrap  ">
                    บิลเลขที่ :
                  </Typography>
                  <Typography className="text-base">
                    {bill || checkPay.code}
                  </Typography>
                </div>
                
                <div className="w-full">
                  <div className={`${checkPay.status == 0 ? "bg-red-500" : "bg-green-500"} py-2 px-4  flex gap-2 rounded-md`}>
                    <Typography className="font-semibold text-white">
                      สถานะ :
                    </Typography>
                    <Typography className="font-semibold text-white">
                      {checkPay.status == 0 ? "ยังไม่ชำระ": "ชำระเงินแล้ว"}
                    </Typography>
                  </div>

               
                </div>
              </div>

              {success ? (
                ""
              ) : (
                <div className="">
                  <hr className="" />

                  <div className="flex flex-col 2xl:flex-row items-center gap-5 2xl:gap-[34px]  py-2">
                    <div className="w-full">
                      <Typography className="font-bold text-base whitespace-nowrap ">
                        ราคารวมภาษีมูลค่าเพิ่ม :
                      </Typography>
                      <Typography className="text-lg">
                        ราคา{" "}
                        {buyData?.products_price_sale || 0 > 0
                          ? buyData?.products_price_sale?.toLocaleString()
                          : buyData?.products_price?.toLocaleString()}{" "}
                        บาท
                      </Typography>
                    </div>

                    <div className="w-full">
                      <Input
                        type="file"
                        label="แนบสลิป files"
                        onChange={handleFileChange}
                        crossOrigin="anonymous"
                      />
                    </div>
                  </div>
                </div>
              )}

              <hr className="" />
              {success || checkPay.status === 1 ? (
                <div className=" flex gap-2  w-full sm:w-[200px] mt-5">
                  <Button
                    className="w-full justify-center items-center text-base font-normal mb-0"
                    size="sm"
                    style={{
                      backgroundImage:
                        "linear-gradient(150deg, rgba(162,102,246,1) 10.8%, rgba(203,159,249,1) 94.3%)",
                    }}
                    onClick={() => router.push("/user/mycourse")}
                  >
                    ไปที่คอร์สเรียนของคุณ
                  </Button>
                </div>
              ) : (
                <div className=" flex gap-2 w-full sm:w-[150px] mt-3 ">
                  <Button
                    className="w-full justify-center items-center text-base font-normal mb-0"
                    size="sm"
                    style={{
                      backgroundImage:
                        "linear-gradient(150deg, rgba(162,102,246,1) 10.8%, rgba(203,159,249,1) 94.3%)",
                    }}
                    onClick={handleSubmit}
                  >
                    สั่งซื้อคอร์สเรียนนี้
                  </Button>
                </div>
              )}
              <small className="text-red-700 mt-1">
                ** เราใช่ระบบตรวจจับสลิปโอนเงิน กรุณาตรวจสอบให้ถูกต้องก่อนโอน
              </small>
            </div>
          ) : (
            ""
          )}
        </Card>
      </div>
    </div>
  );
};

export default BuyCourse;
