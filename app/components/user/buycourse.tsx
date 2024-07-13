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
import { useRouter } from "next/navigation";

const MySwal = withReactContent(Swal);

const BuyCourse = () => {
  const buyData = useRecoilValue(BuyCourseStore);
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const router =useRouter()

  const truncateText = (text: string, limit: number) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

//   const handleCheck = async () => {
//     MySwal.fire({
//       title: "กำลังส่งข้อมูล...",
//       allowOutsideClick: false,
//       width: "350px",
//       padding: "35px",
//       didOpen: () => {
//         MySwal.showLoading();
//       },
//     });

//     const data = {
//       title: buyData?.title,
//     };
//     try {
//       console.log(show);
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API}/api`,
// data,
//         { ...HeaderMultiAPI(localStorage.getItem("Token")) }
//       );

//       if (response.status === 200) {
//         toast.success(response.data.message);
//         MySwal.close();
//       } else {
//         toast.error("Form submission failed!");
//         MySwal.close();
//       }
//     } catch (err) {
//       MySwal.close();
//       setShow(true);
//       const error = err as { response: { data: { message: string } } };
//       toast.error(error.response.data.message);
//     }
//   };


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

  //   const data = {
  //     title: buyData?.title,
  //   };
  //   try {
  //     console.log(show);
  //     const response = await axios.post(
  //       `${process.env.NEXT_PUBLIC_API}/api`,
  //       data,
  //       { ...HeaderMultiAPI(localStorage.getItem("Token")) }
  //     );

  //     if (response.status === 200) {
  //       toast.success(response.data.message);
  //       MySwal.close();
  //     } else {
  //       toast.error("Form submission failed!");
  //       MySwal.close();
  //     }
  //   } catch (err) {
  //     MySwal.close();
  //     setSuccess(true);
  //     const error = err as { response: { data: { message: string } } };
  //     toast.error(error.response.data.message);
  //   }
  // };



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
      title: buyData?.title,
    };
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api`,
        data,
        { ...HeaderMultiAPI(localStorage.getItem("Token")) }
      );

      setTimeout(() => {
        if (response.status === 200) {
          toast.success(response.data.message);
          MySwal.close();
        } else {
          toast.error("Form submission failed!");
          MySwal.close();
        }
        setLoading(false);
      }, 5000); // ตั้งเวลา 5 วินาที
    } catch (err) {
      setTimeout(() => {
        MySwal.close();
        setShow(true);
        const error = err as { response: { data: { message: string } } };
        toast.error(error.response.data.message);
        setLoading(false);
      }, 2000); // ตั้งเวลา 5 วินาที
    }
  };

  const handleSubmit = async () => {
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
      title: buyData?.title,
    };
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api`,
        data,
        { ...HeaderMultiAPI(localStorage.getItem("Token")) }
      );

      setTimeout(() => {
        if (response.status === 200) {
          toast.success(response.data.message);
          MySwal.close();
        } else {
          toast.error("Form submission failed!");
          MySwal.close();
        }
        setLoading(false);
      }, 5000); // ตั้งเวลา 5 วินาที
    } catch (err) {
      setTimeout(() => {
        MySwal.close();
        setSuccess(true);
        const error = err as { response: { data: { message: string } } };
        toast.error(error.response.data.message);
        setLoading(false);
      }, 2000); // ตั้งเวลา 5 วินาที
    }
  }



  return (
    <div
      className="xl:h-[700px] overflow-auto "
      
      // style={{
      //   backgroundImage:
      //     "linear-gradient(150deg,  rgba(162,102,246,1) 10.8%, rgba(203,159,249,1) 94.3%)",
      // }}
    >
      <ToastContainer autoClose={2000} theme="colored" />
      <div className="flex flex-col w-full justify-center items-center  lg:flex-row gap-5 pt-10 lg:px-36 overflow-auto  ">
        <div className="w-full md:w-3/5 ">
          <Card className="h-[550px] w-full overflow-auto gap-5 !bg-white ">
            <div className="w-full flex justify-center bg-gray-300 rounded-sm   ">
              <Image
                src={buyData?.image || ""}
                alt=""
                width={400}
                height={400}
                // className="flex h-[250px] "
              />
            </div>
            <div className="flex flex-col gap-3 py-6  px-2 md:px-10">
              <div className=" flex gap-2 ps-3 ">
                <Typography className="font-bold ">Titel:</Typography>
                <Typography>
                  {truncateText(buyData?.title || "", 20)}
                </Typography>
              </div>
          
              <div className=" flex gap-2 ps-3 ">
                <Typography className="font-bold ">Price:</Typography>
                <Typography>
                  {buyData?.price_sale || 0 > 0
                    ? buyData?.price_sale.toLocaleString()
                    : buyData?.price.toLocaleString()}
                </Typography>
                <Typography>บาท</Typography>
              </div>

              <div className=" flex gap-2 ps-3 ">
                <Typography className="font-bold ">Dec:</Typography>
                {/* <Typography>{truncateText(buyData?.dec || "", 70)}</Typography> */}
                <Typography >{buyData?.dec || ""}</Typography>

              </div>
            </div>
          </Card>
        </div>
        <div className="w-full md:w-2/5  ">
          <Card className="h-[550px] w-full overflow-auto gap-5 px-6 py-4">
            <div className="w-[150px] p-2">
              <Button
                className="w-full justify-center items-center text-base font-normal mb-0"
                size="sm"
                style={{
                  backgroundImage:
                    "linear-gradient(150deg, rgba(162,102,246,1) 10.8%, rgba(203,159,249,1) 94.3%)",
                }}
                onClick={handleCheck}
              >
                สั่งซื้อ
              </Button>
            </div>
            {show ? (
              <div className="flex flex-col gap-3">
                <div className=" flex gap-2 ps-5 ">
                  <Typography className="font-bold ">บิลเลขที่:</Typography>
                  <Typography>A0001</Typography>
                </div>
                <div className=" flex gap-2  ps-2  ">
                  {success ? (
                    <div className="bg-green-500 px-3 flex gap-2 ">
                      <Typography className="font-semibold ">สถานะ:</Typography>
                      <Typography className="font-semibold ">
                        ชำระเงินแล้ว
                      </Typography>
                    </div>
                  ) : (
                    <div className="bg-red-500 py-2 px-8 flex gap-2 ">
                      <Typography className="font-semibold text-white ">สถานะ:</Typography>
                      <Typography className="font-semibold text-white ">
                        รอชำระเงิน
                      </Typography>
                    </div>
                  )}
                </div>

                {success ? (
                  ""
                ) : (
                  <div className="">
                    <div className=" flex gap-2 ps-5  ">
                      <Typography className="font-bold text-xl ">ราคา :</Typography>
                      <Typography className="text-xl">
                        {buyData?.price_sale || 0 > 0
                          ? buyData?.price_sale.toLocaleString()
                          : buyData?.price.toLocaleString()}
                      </Typography>
                      <Typography className="text-xl">บาท</Typography>
                    </div>
                    <div className=" flex gap-2 ps-5 mt-5 w-[200px] ">
                      <Input type="file" label="แนบสลิป files" crossOrigin />
                    </div>
                  </div>
                )}
                {success ? (
                  <div className=" flex gap-2 ps-2 w-[200px] mt-3">
                    <Button
                      className="w-full justify-center items-center text-base font-normal mb-0"
                      size="sm"
                      style={{
                        backgroundImage:
                          "linear-gradient(150deg, rgba(162,102,246,1) 10.8%, rgba(203,159,249,1) 94.3%)",
                      }}
                      onClick={() => router.push("/user/mycourse") }
                    >
                      ไปที่คอร์สเรียนของคุณ
                    </Button>
                  </div>
                ) : (
                  <div className=" flex gap-2 ps-5 w-[150px] mt-3 ">
                    <Button
                      className="w-full justify-center items-center text-base font-normal mb-0"
                      size="sm"
                      style={{
                        backgroundImage:
                          "linear-gradient(150deg, rgba(162,102,246,1) 10.8%, rgba(203,159,249,1) 94.3%)",
                      }}
                      onClick={handleSubmit}
                    >
                      ส่ง
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              ""
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BuyCourse;
