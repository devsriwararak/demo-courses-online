"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { Button, Card, Typography } from "@material-tailwind/react";
import ReactPlayer from "react-player";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

interface PageProps {
  params: {
    id: string;
  };
}

interface ProductData {
  product_id: number;
  product_title: string;
  // titles: Title[];
}

interface ProductTitle {
  title_id: number;
  title: string;
  videos: ProductVideos[];
}

interface ProductVideos {
  video_id: number;
}

const Study: React.FC<PageProps> = ({ params }) => {
  const [data, setData] = useState<ProductData | null>(null); // Update state to hold a single object

  // นาย
  const [dataTitle, setDataTitle] = useState<ProductTitle[]>([]);
  const [dataVideo, setDataVideo] = useState<ProductVideos[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [selectedVideoId, setSelectedVideoId] = useState<any | null>(null);

  // State Active
  const [activeTitle, setActiveTitle] = useState<any | null>(null);
  const [activeVideo, setActiveVideo] = useState<any | null>(null);

  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "your_secret_key";

  const decryptData = (ciphertext: string) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const userId = decryptData(localStorage.getItem("Id") || "");

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/api/users/product/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${decryptData(
              localStorage.getItem("Token") || ""
            )}`,
          },
        }
      );
      if (res.status === 200) {
        setData({
          product_id: res.data[0].product_id,
          product_title: res.data[0].product_title,
        });
        setDataTitle(res.data[0].titles);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data from server.");
    }
  };

  const handleClick = (id: any) => {
    const newData = dataTitle
      .filter((item) => item.title_id === id)
      .map((item) => item.videos);
    const flatVideos = newData.flat();
    setDataVideo(flatVideos);
    setActiveTitle(id);
  };

  const handleChangePage = (page: number) => {
    setPageNumber(page);
  };

  const handlePlayClick = (id: number) => {
    setSelectedVideoId(id);
    setActiveVideo(id);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const videoRef = useRef<ReactPlayer>(null);

  const seekTo = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.seekTo(seconds);
    }
  };

  // console.log(data?.titles)

  return (
    <div className="  container mx-auto py-8">
      <ToastContainer autoClose={2000} theme="colored" />

      <h1>
        {data?.product_id} {data?.product_title}
      </h1>

      <div className="flex flex-col lg:flex-row gap-4 mt-6">
        <div className="w-full lg:w-2/3 ">
          <ShowVideo id={selectedVideoId} />
        </div>
        <div className="w-full lg:w-1/3">
          <div className="bg-white shadow-lg rounded-md border border-gray-200 ">
            <h2 className="py-2  px-4 bg-gray-300 text-gray-900 rounded-t-md">
              หัวข้อหลัก{" "}
            </h2>
            <ul className="py-2 px-4 mb-8">
              {dataTitle?.map((item: any, index: any) => (
                <li
                  onClick={() => handleClick(item.title_id)}
                  key={item.title_id}
                  className={`pt-3 pb-3 px-4 hover:bg-gray-200  rounded-md cursor-pointer ${
                    activeTitle == item.title_id && "bg-gray-300"
                  }`}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full mt-5 text-left flex flex-col md:flex-row gap-3 ">
            <Link
              href="/user/mycourse"
              className="bg-indigo-900 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
            >
              คอร์สเรียนของฉัน
            </Link>

            <Link
              href="/user/shopcourse"
              className="bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-md"
            >
              ซื้อคอร์สเรียนใหม่
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mt-5">
        <button
          className={`text-lg ${
            pageNumber === 1 && "border-b-4 border-indigo-900"
          }`}
          onClick={() => handleChangePage(1)}
        >
          คลิปวีดีโอ
        </button>
        <button
          className={`text-lg ${
            pageNumber === 2 && "border-b-4 border-indigo-900"
          }`}
          onClick={() => handleChangePage(2)}
        >
          ตอบคำถาม
        </button>
      </div>

      <div className="mt-5">
        {pageNumber === 1 ? (
          <VideoSection
            dataVideo={dataVideo}
            onPlayClick={handlePlayClick}
            activeVideo={activeVideo}
          />
        ) : (
          <QuestionSection
            product_id={data?.product_id}
            activeTitle={activeTitle}
            userId={userId}
          />
        )}
      </div>
    </div>
  );
};

export default Study;

// Components โชว์รายการวีดีโอ
export const VideoSection = ({
  dataVideo,
  onPlayClick,
  activeVideo,
}: {
  dataVideo: any[];
  onPlayClick: (id: number) => void;
  activeVideo: any;
}) => {
  return (
    <div className="bg-white w-2/3 rounded-md py-6 px-8">
      <ul className="flex flex-col gap-2">
        {dataVideo?.map((item: any, index: any) => (
          <li
            className={`hover:bg-gray-200 pt-3 py-3 px-4 flex flex-row justify-between items-center rounded-md ${
              activeVideo === item.video_id && "bg-gray-300"
            } `}
            key={item.video_id}
          >
            {" "}
            คลิปวีดีโอที่ {index + 1}
            <button
              className={`bg-red-800 hover:bg-red-700 text-white px-4 rounded-md `}
              onClick={() => onPlayClick(item.video_id)}
            >
              เล่น
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ต้องการปิดปุ่มดาวน์โหลด จาก video element
export const ShowVideo = ({ id }: { id: number }) => {
  const [videoData, setVideoData] = useState<any>(null);

  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "your_secret_key";

  const decryptData = (ciphertext: string) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/api/users/product/video/${id}`,
        {
          headers: {
            Authorization: `Bearer ${decryptData(
              localStorage.getItem("Token") || ""
            )}`,
          },
          responseType: "blob",
        }
      );
      // setVideoData(res.data);
      const videoBlob = new Blob([res.data], { type: "video/mp4" });
      const videoUrl = URL.createObjectURL(videoBlob);
      setVideoData(videoUrl); // สร้าง URL จาก blob และเก็บลง state
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div>
      {/* <p>Video ID: {id} </p>
      <p>Video path: {videoData} </p> */}
      {videoData ? (
        <video
          controls
          className="w-full custom-video "
          controlsList="nodownload"
          key={videoData}
          onContextMenu={(e) => e.preventDefault()}
        >
          <source src={videoData} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="bg-black lg:h-[400px] rounded-sm">
          <h2 className="text-xl text-gray-400 text-center pt-8">
            กรุณาเลือกคอร์สเรียนที่ต้องการ
          </h2>
        </div>
      )}
    </div>
  );
};

// Components คำถามตอบ
export const QuestionSection = ({
  product_id,
  activeTitle,
  userId
}: {
  product_id: any;
  activeTitle: number;
  userId:any
}) => {
  const [data, setData] = useState<any | []>([]);

  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "your_secret_key";
  const decryptData = (ciphertext: string) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const fetchData = async () => {
    try {
      const data = {
        products_id: product_id,
        products_title_id: activeTitle,
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/question/list`,
        data,
        {
          headers: {
            Authorization: `Bearer ${decryptData(
              localStorage.getItem("Token") || ""
            )}`,
          },
        }
      );

      console.log(res.data.data);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTitle]);


  const handleRequest = async () => {
    try {
      const data = {
        status: 0,
        users_id: userId, 
        products_id: product_id,
        products_title_id: activeTitle,
      };

      console.log(data)
  
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/question/new/add`,
        data,
        {
          headers: {
            Authorization: `Bearer ${decryptData(localStorage.getItem("Token") || "")}`,
          },
        }
      );
  
      if (res.status === 200) {
        toast.success(res.data.message);
      } else {
        toast.error("มีข้อผิดพลาดเกิดขึ้น");
      }
    } catch (err) {
      const error = err as { response: { data: { message: string } } };
      toast.error(error.response.data.message);
    }
  };


  
  return (
    <div>
      {product_id} <br />
      {activeTitle}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="w-2/4 bg-white px-6 py-4 rounded-md shadow-sm border border-gray-200">
          <ul className="flex flex-col gap-4">
            {data.map((item: any, index: number) => (
              <li className="flex flex-row justify-between" key={item.id}>
                ข้อที่ {index + 1} : {item.question}
                <button className="bg-indigo-900 text-gray-300 px-2 rounded-md text-sm">
                  ดูเฉลย
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-1/4">
          <div className="bg-white shadow-md rounded-md">
            <h2 className="bg-gray-300 text-gray-900 px-8 py-2 rounded-t-md">
              รูปเฉลย
            </h2>

            <div className=" px-8 py-4">ไม่มีข้อมูล ...</div>
          </div>
        </div>

        <div className="w-1/4">
        <Button onClick={handleRequest}>ขอชุดคำถามใหม่</Button>
          <div className="bg-white shadow-md rounded-md">
            <div className=" px-8 py-4">ไม่มีข้อมูล ...</div>
          </div>

          <br />
          <div className="bg-white shadow-md rounded-md">
            <div className=" px-8 py-4">ไม่มีข้อมูล ...</div>
          </div>
        </div>
      </div>
    </div>
  );
};
